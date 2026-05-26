import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/payments/paymongo'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const sigHeader = req.headers.get('paymongo-signature') ?? ''

    // ── Verify signature ──────────────────────────────────────────────────────
    if (!verifyWebhookSignature(rawBody, sigHeader)) {
      console.warn('[webhook] Invalid PayMongo signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(rawBody)
    const eventType = event?.data?.attributes?.type as string
    const resource  = event?.data?.attributes?.data

    console.log('[webhook] Received event:', eventType)

    // ── Payment Intent paid (card) ────────────────────────────────────────────
    if (eventType === 'payment.paid') {
      const paymentIntentId = resource?.attributes?.payment_intent_id as string | undefined
      if (!paymentIntentId) {
        return NextResponse.json({ error: 'Missing payment_intent_id' }, { status: 400 })
      }

      const supabase = await createClient()
      const { error } = await supabase
        .from('bookings')
        .update({
          payment_status: 'paid',
          status:         'confirmed',
          paymongo_payment_id: resource?.id,
        })
        .eq('paymongo_payment_intent_id', paymentIntentId)

      if (error) {
        console.error('[webhook] Supabase update error (card):', error)
        return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
      }
    }

    // ── Source chargeable (GCash / Maya) ──────────────────────────────────────
    if (eventType === 'source.chargeable') {
      const sourceId = resource?.id as string | undefined
      const amount   = resource?.attributes?.amount as number | undefined

      if (!sourceId || !amount) {
        return NextResponse.json({ error: 'Missing source data' }, { status: 400 })
      }

      // Create a payment against the chargeable source
      const chargeRes = await fetch('https://api.paymongo.com/v1/payments', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY! + ':').toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            attributes: {
              amount,
              source:      { id: sourceId, type: 'source' },
              currency:    'PHP',
              description: 'Hotel Lumière Booking',
            },
          },
        }),
      })

      if (!chargeRes.ok) {
        const err = await chargeRes.json()
        console.error('[webhook] Charge error:', err)
        return NextResponse.json({ error: 'Charge failed' }, { status: 500 })
      }

      const charge = await chargeRes.json()

      // Update booking to paid
      const supabase = await createClient()
      const { error } = await supabase
        .from('bookings')
        .update({
          payment_status:      'paid',
          status:              'confirmed',
          paymongo_payment_id: charge?.data?.id,
        })
        .eq('paymongo_source_id', sourceId)

      if (error) {
        console.error('[webhook] Supabase update error (ewallet):', error)
        return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
      }
    }

    return NextResponse.json({ received: true })

  } catch (err: unknown) {
    console.error('[webhook] Unhandled error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
