import { NextRequest, NextResponse } from 'next/server'
import { attachPaymentMethod } from '@/lib/payments/paymongo'

export async function POST(req: NextRequest) {
  try {
    const { paymentIntentId, paymentMethodId, returnUrl } = await req.json()

    if (!paymentIntentId || !paymentMethodId || !returnUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: paymentIntentId, paymentMethodId, returnUrl' },
        { status: 400 }
      )
    }

    const result = await attachPaymentMethod(paymentIntentId, paymentMethodId, returnUrl)
    return NextResponse.json(result)

  } catch (err: unknown) {
    console.error('[/api/payments/attach] Error:', err)
    const message = err instanceof Error ? err.message : 'Failed to attach payment method'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
