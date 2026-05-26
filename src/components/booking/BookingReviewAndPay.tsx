'use client'

import { useState } from 'react'
import { ChevronLeft, CreditCard, Lock, AlertCircle, Smartphone, Wallet } from 'lucide-react'
import { format } from 'date-fns'
import type { BookingFormState } from '@/types/booking'

interface BookingReviewAndPayProps {
  state: BookingFormState
  totalPrice: number
  onBack: () => void
  onConfirm: (paymentMethod: PaymentMethodData) => Promise<void>
}

export interface PaymentMethodData {
  method: 'card' | 'gcash' | 'maya'
  // card only
  cardNumber?: string
  cardExpMonth?: string
  cardExpYear?: string
  cardCvc?: string
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
  try { return format(new Date(dateStr), 'EEE, MMM d, yyyy') }
  catch { return dateStr }
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

const METHODS = [
  { id: 'card',  label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'gcash', label: 'GCash',               icon: Smartphone },
  { id: 'maya',  label: 'Maya',                icon: Wallet },
] as const

export default function BookingReviewAndPay({
  state,
  totalPrice,
  onBack,
  onConfirm,
}: BookingReviewAndPayProps) {
  const [method, setMethod]         = useState<'card' | 'gcash' | 'maya'>('card')
  const [cardNumber, setCardNumber] = useState('')
  const [expMonth, setExpMonth]     = useState('')
  const [expYear, setExpYear]       = useState('')
  const [cvc, setCvc]               = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)

  const taxes     = Math.round(totalPrice * 0.12)
  const grandTotal = totalPrice + taxes

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    try {
      await onConfirm({
        method,
        cardNumber:   method === 'card' ? cardNumber.replace(/\s/g, '') : undefined,
        cardExpMonth: method === 'card' ? expMonth : undefined,
        cardExpYear:  method === 'card' ? expYear  : undefined,
        cardCvc:      method === 'card' ? cvc      : undefined,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatCardNumber = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  return (
    <div className="space-y-8">

      {/* Stay summary */}
      <div>
        <p className="text-xs tracking-widest uppercase font-accent text-gold-400 mb-4">Booking Summary</p>
        <div className="border border-charcoal-700 rounded-sm p-5">
          <Row label="Room"     value={state.roomName} />
          <Row label="Check-In" value={formatDate(state.checkIn)} />
          <Row label="Check-Out" value={formatDate(state.checkOut)} />
          <Row label="Duration" value={`${state.nights} ${state.nights === 1 ? 'Night' : 'Nights'}`} />
          <Row label="Guests"   value={`${state.adults} ${state.adults === 1 ? 'Adult' : 'Adults'}${state.children > 0 ? `, ${state.children} ${state.children === 1 ? 'Child' : 'Children'}` : ''}`} />
        </div>
      </div>

      {/* Guest summary */}
      <div>
        <p className="text-xs tracking-widest uppercase font-accent text-gold-400 mb-4">Guest Details</p>
        <div className="border border-charcoal-700 rounded-sm p-5">
          <Row label="Name"    value={`${state.guest.firstName} ${state.guest.lastName}`} />
          <Row label="Email"   value={state.guest.email} />
          <Row label="Phone"   value={state.guest.phone} />
          <Row label="Country" value={state.guest.country} />
          {state.guest.specialRequests && (
            <Row label="Requests" value={state.guest.specialRequests} />
          )}
        </div>
      </div>

      {/* Price breakdown */}
      <div>
        <p className="text-xs tracking-widest uppercase font-accent text-gold-400 mb-4">Price Breakdown</p>
        <div className="border border-charcoal-700 rounded-sm p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-cream-200/70 font-body">{formatPHP(state.pricePerNight)} × {state.nights} nights</span>
            <span className="text-cream-100 font-body">{formatPHP(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cream-200/70 font-body">VAT (12%)</span>
            <span className="text-cream-100 font-body">{formatPHP(taxes)}</span>
          </div>
          <div className="h-px bg-charcoal-700" />
          <div className="flex justify-between items-center">
            <span className="text-xs tracking-widest uppercase font-accent text-gold-400">Total Due</span>
            <span className="text-2xl font-display text-gold-400">{formatPHP(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Payment method selector */}
      <div>
        <p className="text-xs tracking-widest uppercase font-accent text-gold-400 mb-4">Payment Method</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {METHODS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setMethod(id)}
              aria-pressed={method === id}
              aria-label={`Pay with ${label}`}
              className={`flex flex-col items-center gap-2 py-4 px-3 border rounded-sm transition-colors duration-200
                ${method === id
                  ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                  : 'border-charcoal-700 text-cream-200/50 hover:border-charcoal-600 hover:text-cream-200/70'
                }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-accent tracking-widest uppercase text-center leading-tight">
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Card fields */}
        {method === 'card' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-xs tracking-widest uppercase font-accent text-charcoal-700 mb-2">
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                className="w-full bg-charcoal-800 border border-charcoal-700 rounded-sm px-4 py-3
                  text-cream-100 font-body text-sm placeholder:text-charcoal-700
                  focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="expMonth" className="block text-xs tracking-widest uppercase font-accent text-charcoal-700 mb-2">
                  Month
                </label>
                <input
                  id="expMonth"
                  type="text"
                  inputMode="numeric"
                  placeholder="MM"
                  value={expMonth}
                  onChange={e => setExpMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  maxLength={2}
                  className="w-full bg-charcoal-800 border border-charcoal-700 rounded-sm px-4 py-3
                    text-cream-100 font-body text-sm placeholder:text-charcoal-700
                    focus:outline-none focus:border-gold-500/60 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="expYear" className="block text-xs tracking-widest uppercase font-accent text-charcoal-700 mb-2">
                  Year
                </label>
                <input
                  id="expYear"
                  type="text"
                  inputMode="numeric"
                  placeholder="YYYY"
                  value={expYear}
                  onChange={e => setExpYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  className="w-full bg-charcoal-800 border border-charcoal-700 rounded-sm px-4 py-3
                    text-cream-100 font-body text-sm placeholder:text-charcoal-700
                    focus:outline-none focus:border-gold-500/60 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-xs tracking-widest uppercase font-accent text-charcoal-700 mb-2">
                  CVC
                </label>
                <input
                  id="cvc"
                  type="text"
                  inputMode="numeric"
                  placeholder="123"
                  value={cvc}
                  onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  className="w-full bg-charcoal-800 border border-charcoal-700 rounded-sm px-4 py-3
                    text-cream-100 font-body text-sm placeholder:text-charcoal-700
                    focus:outline-none focus:border-gold-500/60 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* E-wallet notice */}
        {(method === 'gcash' || method === 'maya') && (
          <div className="flex items-start gap-3 py-3 px-4 bg-charcoal-800 border border-charcoal-700 rounded-sm">
            <Smartphone className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
            <p className="text-xs text-cream-200/70 font-body">
              You will be redirected to{' '}
              <span className="text-gold-400 font-semibold">
                {method === 'gcash' ? 'GCash' : 'Maya'}
              </span>{' '}
              to complete your payment. Once confirmed, you'll be brought back to your booking confirmation.
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div role="alert" aria-live="assertive" className="flex items-center gap-2 py-3 px-4 bg-red-500/10 border border-red-500/30 rounded-sm">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" aria-hidden="true" />
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
              <span role="status" aria-label="Processing payment" className="h-4 w-4 border-2 border-charcoal-900/30 border-t-charcoal-900 rounded-full animate-spin" />
              <span aria-hidden="true">Processing...</span>
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              {method === 'card' ? 'Pay Now' : `Pay with ${method === 'gcash' ? 'GCash' : 'Maya'}`}
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-charcoal-700 font-body text-center flex items-center justify-center gap-1.5">
        <Lock className="h-3 w-3" />
        Payments secured by PayMongo
      </p>
    </div>
  )
}
