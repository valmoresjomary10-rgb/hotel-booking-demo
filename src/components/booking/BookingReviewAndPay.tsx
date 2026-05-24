// src/components/booking/BookingReviewAndPay.tsx
'use client'

import { useState } from 'react'
import { ChevronLeft, CreditCard, Lock, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import type { BookingFormState } from '@/types/booking'

interface BookingReviewAndPayProps {
  state: BookingFormState
  totalPrice: number
  onBack: () => void
  onConfirm: () => Promise<void>
}

function formatPHP(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  try {
    return format(new Date(dateStr), 'EEE, MMM d, yyyy')
  } catch {
    return dateStr
  }
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-charcoal-700/50 last:border-0">
      <span className="text-xs tracking-widest uppercase font-accent text-charcoal-700 shrink-0 mr-4">
        {label}
      </span>
      <span className="text-sm text-cream-100 font-body text-right">{value}</span>
    </div>
  )
}

export default function BookingReviewAndPay({
  state,
  totalPrice,
  onBack,
  onConfirm,
}: BookingReviewAndPayProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const taxes = Math.round(totalPrice * 0.12)
  const grandTotal = totalPrice + taxes

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    try {
      await onConfirm()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Stay summary */}
      <div>
        <p className="text-xs tracking-widest uppercase font-accent text-gold-400 mb-4">
          Booking Summary
        </p>
        <div className="border border-charcoal-700 rounded-sm p-5">
          <Row label="Room" value={state.roomName} />
          <Row label="Check-In" value={formatDate(state.checkIn)} />
          <Row label="Check-Out" value={formatDate(state.checkOut)} />
          <Row
            label="Duration"
            value={`${state.nights} ${state.nights === 1 ? 'Night' : 'Nights'}`}
          />
          <Row
            label="Guests"
            value={`${state.adults} ${state.adults === 1 ? 'Adult' : 'Adults'}${
              state.children > 0
                ? `, ${state.children} ${state.children === 1 ? 'Child' : 'Children'}`
                : ''
            }`}
          />
        </div>
      </div>

      {/* Guest summary */}
      <div>
        <p className="text-xs tracking-widest uppercase font-accent text-gold-400 mb-4">
          Guest Details
        </p>
        <div className="border border-charcoal-700 rounded-sm p-5">
          <Row
            label="Name"
            value={`${state.guest.firstName} ${state.guest.lastName}`}
          />
          <Row label="Email" value={state.guest.email} />
          <Row label="Phone" value={state.guest.phone} />
          <Row label="Country" value={state.guest.country} />
          {state.guest.specialRequests && (
            <Row label="Requests" value={state.guest.specialRequests} />
          )}
        </div>
      </div>

      {/* Price breakdown */}
      <div>
        <p className="text-xs tracking-widest uppercase font-accent text-gold-400 mb-4">
          Payment
        </p>
        <div className="border border-charcoal-700 rounded-sm p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-cream-200/70 font-body">
              {formatPHP(state.pricePerNight)} × {state.nights} nights
            </span>
            <span className="text-cream-100 font-body">{formatPHP(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cream-200/70 font-body">VAT (12%)</span>
            <span className="text-cream-100 font-body">{formatPHP(taxes)}</span>
          </div>
          <div className="h-px bg-charcoal-700" />
          <div className="flex justify-between items-center">
            <span className="text-xs tracking-widest uppercase font-accent text-gold-400">
              Total Due
            </span>
            <span className="text-2xl font-display text-gold-400">
              {formatPHP(grandTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* PayMongo placeholder notice */}
      <div className="flex items-start gap-3 py-3 px-4 bg-charcoal-800 border border-charcoal-700 rounded-sm">
        <CreditCard className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-cream-200/80 font-body">
            Payment is processed securely via{' '}
            <span className="text-gold-400 font-semibold">PayMongo</span>. You will be
            redirected to the payment page after confirming your booking.
          </p>
          <p className="text-xs text-charcoal-700 font-body mt-1">
            (Payment integration coming in Phase 12)
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 py-3 px-4 bg-red-500/10 border border-red-500/30 rounded-sm">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <p className="text-xs text-red-400 font-body">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-2 border border-charcoal-700 hover:border-gold-500/40
            text-cream-200 font-accent text-xs tracking-widest uppercase py-4 px-6
            transition-colors duration-200 rounded-sm disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400
            text-charcoal-900 font-accent text-xs tracking-widest uppercase py-4 px-6
            transition-colors duration-200 rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 border-2 border-charcoal-900/30 border-t-charcoal-900 rounded-full animate-spin" />
              Confirming...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Confirm Booking
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-charcoal-700 font-body text-center flex items-center justify-center gap-1.5">
        <Lock className="h-3 w-3" />
        Your information is encrypted and secure
      </p>
    </div>
  )
}
