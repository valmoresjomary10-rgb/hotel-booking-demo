'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useBooking } from '@/hooks/useBooking'
import BookingStepIndicator from './BookingStepIndicator'
import BookingDateSelector from './BookingDateSelector'
import BookingGuestInfoForm from './BookingGuestInfoForm'
import BookingReviewAndPay from './BookingReviewAndPay'
import BookingRoomSummary from './BookingRoomSummary'
import BookingPriceSummary from './BookingPriceSummary'
import type { GuestInfo } from '@/types/booking'
import type { PaymentMethodData } from './BookingReviewAndPay'

interface BookingFormProps {
  initialDates?: { checkIn: string; checkOut: string; nights: number; adults: number; children: number }
  room: {
    id: string
    name: string
    slug: string
    images: string[]
    pricePerNight: number
    bedType: string
    capacity: number
  }
}

export default function BookingForm({ room, initialDates }: BookingFormProps) {
  const router = useRouter()
  const [bookingError, setBookingError] = useState<string | null>(null)

  const { state, totalPrice, setDates, setGuests, setGuestInfo, goToStep } = useBooking({
    roomId:        room.id,
    checkIn:       initialDates?.checkIn  ?? '',
    checkOut:      initialDates?.checkOut ?? '',
    nights:        initialDates?.nights   ?? 0,
    adults:        initialDates?.adults   ?? 1,
    children:      initialDates?.children ?? 0,
    step:          (initialDates?.nights ?? 0) > 0 ? 2 : 1,
    roomName:      room.name,
    roomSlug:      room.slug,
    roomImage:     room.images?.[0] || '',
    pricePerNight: room.pricePerNight,
    bedType:       room.bedType,
    capacity:      room.capacity,
  })

  const taxes      = Math.round(totalPrice * 0.12)
  const grandTotal = totalPrice + taxes

  const handleDatesSubmit = (values: {
    checkIn: string; checkOut: string
    adults: number; children: number; nights: number
  }) => {
    setDates(values.checkIn, values.checkOut, values.nights)
    setGuests(values.adults, values.children)
    goToStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGuestInfoSubmit = (values: GuestInfo) => {
    setGuestInfo(values)
    goToStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleConfirm = async (paymentData: PaymentMethodData) => {
    setBookingError(null)

    // ── CARD FLOW ─────────────────────────────────────────────────────────────
    if (paymentData.method === 'card') {

      // 1. Create payment intent (server-side)
      const payRes = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method:      'card',
          amount:      grandTotal,
          description: `Hotel Lumière — ${state.roomName} (${state.nights} nights)`,
        }),
      })
      if (!payRes.ok) {
        const err = await payRes.json()
        throw new Error(err?.error || 'Payment initialisation failed')
      }
      const { paymentIntentId, clientKey } = await payRes.json()
      if (!paymentIntentId || !clientKey) throw new Error('Invalid payment intent response')

      // 2. Tokenise card client-side via PayMongo
      const pmRes = await fetch('https://api.paymongo.com/v1/payment_methods', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY + ':')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            attributes: {
              type: 'card',
              details: {
                card_number: paymentData.cardNumber,
                exp_month:   parseInt(paymentData.cardExpMonth ?? '0'),
                exp_year:    parseInt(paymentData.cardExpYear  ?? '0'),
                cvc:         paymentData.cardCvc,
              },
              billing: {
                name:  `${state.guest.firstName} ${state.guest.lastName}`,
                email: state.guest.email,
                phone: state.guest.phone,
              },
            },
          },
        }),
      })
      if (!pmRes.ok) {
        const err = await pmRes.json()
        throw new Error(err?.errors?.[0]?.detail ?? 'Card tokenisation failed')
      }
      const pm = await pmRes.json()
      const paymentMethodId = pm.data.id

      // 3. Attach payment method — confirm payment BEFORE saving booking
      const attachRes = await fetch('/api/payments/attach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId,
          paymentMethodId,
          returnUrl: `${window.location.origin}/booking/confirmation`,
        }),
      })
      if (!attachRes.ok) {
        const err = await attachRes.json()
        throw new Error(err?.error ?? 'Failed to attach payment method')
      }
      const attachResult = await attachRes.json()
      const status       = attachResult?.data?.attributes?.status

      // 3DS redirect — save pending booking first so webhook can finalize it
      const nextAction = attachResult?.data?.attributes?.next_action
      if (nextAction?.type === 'redirect') {
        // Save booking as pending before redirect
        const bookRes = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomId: state.roomId, roomName: state.roomName,
            checkIn: state.checkIn, checkOut: state.checkOut,
            adults: state.adults, nights: state.nights, children: state.children,
            pricePerNight: state.pricePerNight, totalPrice: grandTotal,
            guest: state.guest, paymentMethod: 'card',
            paymentIntentId, sourceId: null,
          }),
        })
        if (!bookRes.ok) {
          const err = await bookRes.json()
          throw new Error(err?.error || 'Failed to create booking')
        }
        window.location.href = nextAction.redirect.url
        return
      }

      // Payment succeeded without 3DS — save booking now
      if (status === 'succeeded') {
        const bookRes = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomId: state.roomId, roomName: state.roomName,
            checkIn: state.checkIn, checkOut: state.checkOut,
            adults: state.adults, nights: state.nights, children: state.children,
            pricePerNight: state.pricePerNight, totalPrice: grandTotal,
            guest: state.guest, paymentMethod: 'card',
            paymentIntentId, sourceId: null,
          }),
        })
        if (!bookRes.ok) {
          const err = await bookRes.json()
          throw new Error(err?.error || 'Failed to save booking')
        }
        const { confirmationCode } = await bookRes.json()
        router.push(`/booking/confirmation?code=${confirmationCode}`)
        return
      }

      throw new Error('Payment was not completed. Please check your card details and try again.')
    }

    // ── E-WALLET FLOW (GCash / Maya) ──────────────────────────────────────────
    if (paymentData.method === 'gcash' || paymentData.method === 'maya') {

      // 1. Create source
      const payRes = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method:      paymentData.method,
          amount:      grandTotal,
          description: `Hotel Lumière — ${state.roomName} (${state.nights} nights)`,
          bookingData: {
            firstName: state.guest.firstName,
            lastName:  state.guest.lastName,
            email:     state.guest.email,
            phone:     state.guest.phone,
          },
        }),
      })
      if (!payRes.ok) {
        const err = await payRes.json()
        throw new Error(err?.error || 'Payment initialisation failed')
      }
      const { redirectUrl, sourceId } = await payRes.json()

      // 2. Save booking as pending before redirecting to e-wallet
      const bookRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: state.roomId, roomName: state.roomName,
          checkIn: state.checkIn, checkOut: state.checkOut,
          adults: state.adults, nights: state.nights, children: state.children,
          pricePerNight: state.pricePerNight, totalPrice: grandTotal,
          guest: state.guest, paymentMethod: paymentData.method,
          paymentIntentId: null, sourceId,
        }),
      })
      if (!bookRes.ok) {
        const err = await bookRes.json()
        throw new Error(err?.error || 'Failed to create booking')
      }

      // 3. Redirect to GCash/Maya — webhook will mark it paid on return
      if (redirectUrl) {
        window.location.href = redirectUrl
        return
      }

      throw new Error('No redirect URL returned for e-wallet payment.')
    }
  }

  const stepTitles = { 1: 'Select Dates & Guests', 2: 'Guest Information', 3: 'Review & Pay' }

  return (
    <div className="min-h-screen bg-cream-100 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase font-accent text-gold-500 mb-3">Hotel Lumière</p>
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal-900 mb-6">Reserve Your Stay</h1>
          <BookingStepIndicator currentStep={state.step} />
          {bookingError && (
            <div role="alert" aria-live="polite" className="mt-4 bg-red-50 border border-red-200 px-4 py-3 text-center">
              <p className="font-body text-sm text-red-600">{bookingError}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="bg-charcoal-900 border border-charcoal-700 rounded-sm p-6 sm:p-8">
              <h2 aria-live="polite" aria-atomic="true" className="font-display text-2xl text-cream-100 mb-6">{stepTitles[state.step]}</h2>

              {state.step === 1 && (
                <BookingDateSelector
                  roomId={room.id}
                  initialValues={{ checkIn: state.checkIn, checkOut: state.checkOut, adults: state.adults, nights: state.nights, children: state.children }}
                  onSubmit={handleDatesSubmit}
                />
              )}
              {state.step === 2 && (
                <BookingGuestInfoForm
                  initialValues={state.guest}
                  onSubmit={handleGuestInfoSubmit}
                  onBack={() => goToStep(1)}
                />
              )}
              {state.step === 3 && (
                <BookingReviewAndPay
                  state={state}
                  totalPrice={totalPrice}
                  onBack={() => goToStep(2)}
                  onConfirm={handleConfirm}
                />
              )}
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-32">
            <BookingRoomSummary
              roomName={state.roomName} roomImage={state.roomImage}
              bedType={state.bedType} capacity={state.capacity}
              checkIn={state.checkIn} checkOut={state.checkOut}
              nights={state.nights} adults={state.adults} children={state.children}
            />
            {state.nights > 0 && (
              <BookingPriceSummary pricePerNight={state.pricePerNight} nights={state.nights} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
