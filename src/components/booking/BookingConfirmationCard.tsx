// src/components/booking/BookingConfirmationCard.tsx
'use client'

import Link from 'next/link'
import { CheckCircle2, Calendar, Users, Mail, Home, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

interface BookingConfirmationCardProps {
  confirmationCode: string
  roomName: string
  checkIn: string
  checkOut: string
  nights: number
  adults: number
  children: number
  guestName: string
  email: string
  totalPrice: number
}

function formatDate(dateStr: string) {
  try {
    return format(new Date(dateStr), 'EEEE, MMMM d, yyyy')
  } catch {
    return dateStr
  }
}

function formatPHP(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function BookingConfirmationCard({
  confirmationCode,
  roomName,
  checkIn,
  checkOut,
  nights,
  adults,
  children,
  guestName,
  email,
  totalPrice,
}: BookingConfirmationCardProps) {
  return (
    <div className="min-h-screen bg-cream-100 pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Success icon + heading */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-gold-500" />
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gold-500/5 animate-ping" />
            </div>
          </div>
          <p className="text-xs tracking-widest uppercase font-accent text-gold-500 mb-3">
            Booking Confirmed
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal-900 mb-3">
            Merci, {guestName.split(' ')[0]}!
          </h1>
          <p className="text-cream-200/80 font-body text-sm">
            Your reservation at Hotel Lumière has been confirmed.
            A confirmation email has been sent to{' '}
            <span className="text-charcoal-900 font-semibold">{email}</span>.
          </p>
        </div>

        {/* Confirmation code banner */}
        <div className="bg-charcoal-900 border border-gold-500/30 rounded-sm p-5 text-center mb-6">
          <p className="text-xs tracking-widest uppercase font-accent text-charcoal-700 mb-2">
            Confirmation Code
          </p>
          <p className="font-accent text-3xl tracking-[0.3em] text-gold-400">
            {confirmationCode}
          </p>
          <p className="text-xs text-charcoal-700 font-body mt-2">
            Please keep this code for your records
          </p>
        </div>

        {/* Booking details card */}
        <div className="bg-charcoal-900 border border-charcoal-700 rounded-sm overflow-hidden mb-6">
          {/* Card header */}
          <div className="px-6 py-4 border-b border-charcoal-700">
            <h2 className="font-display text-xl text-cream-100">{roomName}</h2>
          </div>

          {/* Details grid */}
          <div className="p-6 space-y-0">
            {[
              {
                icon: <Calendar className="h-4 w-4" />,
                label: 'Check-In',
                value: formatDate(checkIn),
              },
              {
                icon: <Calendar className="h-4 w-4" />,
                label: 'Check-Out',
                value: formatDate(checkOut),
              },
              {
                icon: <Calendar className="h-4 w-4" />,
                label: 'Duration',
                value: `${nights} ${nights === 1 ? 'Night' : 'Nights'}`,
              },
              {
                icon: <Users className="h-4 w-4" />,
                label: 'Guests',
                value: `${adults} ${adults === 1 ? 'Adult' : 'Adults'}${
                  children > 0
                    ? `, ${children} ${children === 1 ? 'Child' : 'Children'}`
                    : ''
                }`,
              },
              {
                icon: <Mail className="h-4 w-4" />,
                label: 'Email',
                value: email,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-3.5 border-b border-charcoal-700/50 last:border-0"
              >
                <div className="text-gold-500/60 mt-0.5 shrink-0">{item.icon}</div>
                <div className="flex-1 flex justify-between items-start">
                  <span className="text-xs tracking-widest uppercase font-accent text-charcoal-700">
                    {item.label}
                  </span>
                  <span className="text-sm text-cream-100 font-body text-right ml-4">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="px-6 py-4 bg-gold-500/5 border-t border-gold-500/20 flex justify-between items-center">
            <span className="text-xs tracking-widest uppercase font-accent text-gold-400">
              Total Paid
            </span>
            <span className="font-display text-2xl text-gold-400">
              {formatPHP(totalPrice)}
            </span>
          </div>
        </div>

        {/* Info note */}
        <div className="bg-cream-200 border border-cream-200 rounded-sm p-4 mb-8">
          <p className="text-xs text-charcoal-700 font-body leading-relaxed">
            <span className="font-semibold text-charcoal-800">Check-in time:</span> 2:00 PM ·{' '}
            <span className="font-semibold text-charcoal-800">Check-out time:</span> 12:00 PM ·
            Please present this confirmation code upon arrival. For any concerns, contact us at{' '}
            <span className="text-charcoal-900 font-semibold">reservations@hotellumiere.com</span>
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium text-sm py-4 px-6 rounded-xl transition-all duration-200"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/rooms"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm py-4 px-6 rounded-xl transition-all duration-200"
          >
            Explore More Rooms
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
