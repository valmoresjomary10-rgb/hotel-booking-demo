import { NextRequest, NextResponse } from 'next/server'
import { createPaymentIntent, createSource } from '@/lib/payments/paymongo'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { method, amount, description, bookingData } = body

    if (!method || !amount || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: method, amount, description' },
        { status: 400 }
      )
    }

    // ── Credit / Debit Card ───────────────────────────────────────────────────
    if (method === 'card') {
      const intent = await createPaymentIntent({ amount, description })
      return NextResponse.json({
        type: 'card',
        clientKey:       intent.data.attributes.client_key,
        paymentIntentId: intent.data.id,
      })
    }

    // ── GCash / Maya ──────────────────────────────────────────────────────────
    if (method === 'gcash' || method === 'maya') {
      const { firstName, lastName, email, phone } = bookingData ?? {}

      if (!firstName || !lastName || !email || !phone) {
        return NextResponse.json(
          { error: 'Missing billing info for e-wallet payment' },
          { status: 400 }
        )
      }

      const params = new URLSearchParams({
        amount:      String(amount),
        description,
        firstName,
        lastName,
        email,
        phone,
      })

      const source = await createSource({
        amount,
        type:        method === 'maya' ? 'paymaya' : 'gcash',
        description,
        successUrl:  `${APP_URL}/booking/payment-callback?status=success&${params}`,
        failedUrl:   `${APP_URL}/booking/payment-callback?status=failed`,
        billingName: `${firstName} ${lastName}`,
        billingEmail: email,
        billingPhone: phone,
      })

      return NextResponse.json({
        type:        'ewallet',
        redirectUrl: source.data.attributes.redirect.checkout_url,
        sourceId:    source.data.id,
      })
    }

    return NextResponse.json({ error: 'Unsupported payment method' }, { status: 400 })

  } catch (err: unknown) {
    console.error('[/api/payments] Error:', err)
    const message = err instanceof Error ? err.message : 'Payment initialization failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
