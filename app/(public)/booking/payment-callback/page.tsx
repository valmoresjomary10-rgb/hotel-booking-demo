'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')

  const paymentStatus = searchParams.get('status')
  const amount        = searchParams.get('amount')
  const description   = searchParams.get('description')
  const firstName     = searchParams.get('firstName')
  const lastName      = searchParams.get('lastName')
  const email         = searchParams.get('email')
  const phone         = searchParams.get('phone')

  useEffect(() => {
    if (paymentStatus === 'failed') {
      setStatus('failed')
      return
    }

    if (paymentStatus === 'success') {
      // Webhook will have already marked the booking paid.
      // We just need to find the confirmation code for this guest & redirect.
      const findAndRedirect = async () => {
        try {
          const res = await fetch('/api/bookings')
          const bookings = await res.json()

          const match = bookings.find(
            (b: { guest_email: string; guest_first_name: string; payment_status: string; confirmation_code: string }) =>
              b.guest_email      === email &&
              b.guest_first_name === firstName &&
              b.payment_status   === 'paid'
          )

          if (match) {
            router.replace(`/booking/confirmation?code=${match.confirmation_code}`)
          } else {
            // Webhook may still be processing — retry after 2s
            setTimeout(findAndRedirect, 2000)
          }
        } catch {
          setStatus('failed')
        }
      }

      setStatus('success')
      findAndRedirect()
    }
  }, [paymentStatus, email, firstName, router])

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4">
      <div className="bg-charcoal-900 border border-charcoal-700 rounded-sm p-10 max-w-md w-full text-center space-y-6">

        {status === 'loading' || status === 'success' ? (
          <>
            <Loader2 className="h-12 w-12 text-gold-400 animate-spin mx-auto" />
            <p className="font-display text-2xl text-cream-100">Confirming your payment…</p>
            <p className="text-sm text-cream-200/60 font-body">
              Please wait while we verify your payment and prepare your booking confirmation.
            </p>
          </>
        ) : (
          <>
            <XCircle className="h-12 w-12 text-red-400 mx-auto" />
            <p className="font-display text-2xl text-cream-100">Payment Failed</p>
            <p className="text-sm text-cream-200/60 font-body">
              Your payment could not be completed. No charge was made.
            </p>
            <button
              onClick={() => router.back()}
              className="w-full bg-gold-500 hover:bg-gold-400 text-charcoal-900
                font-accent text-xs tracking-widest uppercase py-4 px-6
                transition-colors duration-200 rounded-sm"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  )
}
