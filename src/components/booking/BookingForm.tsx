// src/components/booking/BookingForm.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useBooking } from '@/hooks/useBooking'
import BookingStepIndicator from './BookingStepIndicator'
import BookingDateSelector from './BookingDateSelector'
import BookingGuestInfoForm from './BookingGuestInfoForm'
import BookingReviewAndPay from './BookingReviewAndPay'
import BookingRoomSummary from './BookingRoomSummary'
import BookingPriceSummary from './BookingPriceSummary'
import type { GuestInfo } from '@/types/booking'

interface BookingFormProps {
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

export default function BookingForm({ room }: BookingFormProps) {
  const router = useRouter()

  const { state, totalPrice, setDates, setGuests, setGuestInfo, goToStep } = useBooking({
    roomId: room.id,
    roomName: room.name,
    roomSlug: room.slug,
    roomImage: room.images?.[0] || '',
    pricePerNight: room.pricePerNight,
    bedType: room.bedType,
    capacity: room.capacity,
  })

  // Step 1 → 2
  const handleDatesSubmit = (values: {
    checkIn: string
    checkOut: string
    adults: number
    children: number
    nights: number
  }) => {
    setDates(values.checkIn, values.checkOut, values.nights)
    setGuests(values.adults, values.children)
    goToStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Step 2 → 3
  const handleGuestInfoSubmit = (values: GuestInfo) => {
    setGuestInfo(values)
    goToStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Step 3 → confirm → redirect
  const handleConfirm = async () => {
    const taxes = Math.round(totalPrice * 0.12)
    const grandTotal = totalPrice + taxes

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId: state.roomId,
        roomName: state.roomName,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        adults: state.adults,
        nights: state.nights,
        children: state.children,
        pricePerNight: state.pricePerNight,
        totalPrice: grandTotal,
        guest: state.guest,
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err?.error || 'Failed to create booking')
    }

    const { confirmationCode } = await res.json()
    router.push(`/booking/confirmation?code=${confirmationCode}`)
  }

  const stepTitles = {
    1: 'Select Dates & Guests',
    2: 'Guest Information',
    3: 'Review & Confirm',
  }

  return (
    <div className="min-h-screen bg-cream-100 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase font-accent text-gold-500 mb-3">
            Hotel Lumière
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal-900 mb-6">
            Reserve Your Stay
          </h1>
          <BookingStepIndicator currentStep={state.step} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left — form */}
          <div className="lg:col-span-2">
            <div className="bg-charcoal-900 border border-charcoal-700 rounded-sm p-6 sm:p-8">
              <h2 className="font-display text-2xl text-cream-100 mb-6">
                {stepTitles[state.step]}
              </h2>

              {state.step === 1 && (
                <BookingDateSelector
                  initialValues={{
                    checkIn: state.checkIn,
                    checkOut: state.checkOut,
                    adults: state.adults,
                    nights: state.nights,
        children: state.children,
                  }}
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

          {/* Right — sidebar */}
          <div className="space-y-4 lg:sticky lg:top-32">
            <BookingRoomSummary
              roomName={state.roomName}
              roomImage={state.roomImage}
              bedType={state.bedType}
              capacity={state.capacity}
              checkIn={state.checkIn}
              checkOut={state.checkOut}
              nights={state.nights}
              adults={state.adults}
              children={state.children}
            />
            {state.nights > 0 && (
              <BookingPriceSummary
                pricePerNight={state.pricePerNight}
                nights={state.nights}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
