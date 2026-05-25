// src/lib/payments/paymongo.ts

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY!
const PAYMONGO_BASE_URL = 'https://api.paymongo.com/v1'

const authHeader = () => ({
  Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY + ':').toString('base64')}`,
  'Content-Type': 'application/json',
})

// ── Payment Intent (Credit / Debit Card) ─────────────────────────────────────

export interface CreatePaymentIntentParams {
  amount: number        // in PHP, will be converted to centavos
  description: string
  statementDescriptor?: string
}

export async function createPaymentIntent(params: CreatePaymentIntentParams) {
  const res = await fetch(`${PAYMONGO_BASE_URL}/payment_intents`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      data: {
        attributes: {
          amount: Math.round(params.amount * 100),   // centavos
          payment_method_allowed: ['card'],
          payment_method_options: { card: { request_three_d_secure: 'any' } },
          currency: 'PHP',
          description: params.description,
          statement_descriptor: params.statementDescriptor ?? 'Hotel Lumiere',
        },
      },
    }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err?.errors?.[0]?.detail ?? 'Failed to create payment intent')
  }
  return res.json()
}

export async function attachPaymentMethod(paymentIntentId: string, paymentMethodId: string, returnUrl: string) {
  const res = await fetch(`${PAYMONGO_BASE_URL}/payment_intents/${paymentIntentId}/attach`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      data: {
        attributes: {
          payment_method: paymentMethodId,
          return_url: returnUrl,
        },
      },
    }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err?.errors?.[0]?.detail ?? 'Failed to attach payment method')
  }
  return res.json()
}

// ── Source (GCash / Maya) ─────────────────────────────────────────────────────

export type EWalletType = 'gcash' | 'paymaya'

export interface CreateSourceParams {
  amount: number
  type: EWalletType
  description: string
  successUrl: string
  failedUrl: string
  billingName: string
  billingEmail: string
  billingPhone: string
}

export async function createSource(params: CreateSourceParams) {
  const res = await fetch(`${PAYMONGO_BASE_URL}/sources`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      data: {
        attributes: {
          amount: Math.round(params.amount * 100),
          redirect: {
            success: params.successUrl,
            failed:  params.failedUrl,
          },
          billing: {
            name:  params.billingName,
            email: params.billingEmail,
            phone: params.billingPhone,
          },
          type:     params.type,
          currency: 'PHP',
        },
      },
    }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err?.errors?.[0]?.detail ?? 'Failed to create payment source')
  }
  return res.json()
}

// ── Retrieve a Payment Intent ─────────────────────────────────────────────────

export async function retrievePaymentIntent(paymentIntentId: string) {
  const res = await fetch(`${PAYMONGO_BASE_URL}/payment_intents/${paymentIntentId}`, {
    headers: authHeader(),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err?.errors?.[0]?.detail ?? 'Failed to retrieve payment intent')
  }
  return res.json()
}

// ── Webhook signature verification ───────────────────────────────────────────

import crypto from 'crypto'

export function verifyWebhookSignature(rawBody: string, sigHeader: string): boolean {
  const secret = process.env.PAYMONGO_WEBHOOK_SECRET!
  const [, timestamp, signature] = sigHeader.match(/t=(\d+),li=([a-f0-9]+)/) ?? []
  if (!timestamp || !signature) return false
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex')
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}