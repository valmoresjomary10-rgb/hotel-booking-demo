// src/components/booking/BookingRoomSummary.tsx
'use client'

import Image from 'next/image'
import { BedDouble, Users, Maximize2 } from 'lucide-react'
import { format } from 'date-fns'

interface BookingRoomSummaryProps {
  roomName: string
  roomImage: string
  bedType: string
  capacity: number
  checkIn: string
  checkOut: string
  nights: number
  adults: number
  children: number
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  try {
    const [y,m,d] = dateStr.split("-").map(Number)
    return format(new Date(y, m-1, d), "EEE, MMM d, yyyy")
  } catch {
    return dateStr
  }
}

export default function BookingRoomSummary({
  roomName,
  roomImage,
  bedType,
  capacity,
  checkIn,
  checkOut,
  nights,
  adults,
  children,
}: BookingRoomSummaryProps) {
  return (
    <div className="border border-charcoal-700 rounded-sm overflow-hidden">
      {/* Room image */}
      {roomImage ? (
        <div className="relative h-40 w-full bg-charcoal-800">
          <Image
            src={roomImage}
            alt={roomName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
        </div>
      ) : (
        <div className="h-40 w-full bg-charcoal-800 flex items-center justify-center">
          <BedDouble className="h-10 w-10 text-charcoal-700" />
        </div>
      )}

      <div className="p-5 space-y-5">
        {/* Room name */}
        <div>
          <p className="text-xs tracking-widest uppercase font-accent text-gold-400 mb-1">
            Your Room
          </p>
          <h3 className="font-display text-xl text-cream-100">{roomName}</h3>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-cream-200/60 font-body">
              <BedDouble className="h-3.5 w-3.5" />
              {bedType.charAt(0).toUpperCase() + bedType.slice(1)} Bed
            </span>
            <span className="flex items-center gap-1.5 text-xs text-cream-200/60 font-body">
              <Users className="h-3.5 w-3.5" />
              Up to {capacity} guests
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-charcoal-700" />

        {/* Dates */}
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs tracking-widest uppercase font-accent text-charcoal-700">
              Check-In
            </span>
            <span className="text-sm text-cream-100 font-body text-right">
              {formatDate(checkIn)}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs tracking-widest uppercase font-accent text-charcoal-700">
              Check-Out
            </span>
            <span className="text-sm text-cream-100 font-body text-right">
              {formatDate(checkOut)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 bg-gold-500/10 rounded-sm">
            <span className="text-xs tracking-widest uppercase font-accent text-gold-400">
              Duration
            </span>
            <span className="text-sm text-gold-400 font-accent">
              {nights} {nights === 1 ? 'Night' : 'Nights'}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-charcoal-700" />

        {/* Guests */}
        <div className="flex justify-between">
          <span className="text-xs tracking-widest uppercase font-accent text-charcoal-700">
            Guests
          </span>
          <span className="text-sm text-cream-100 font-body">
            {adults} {adults === 1 ? 'Adult' : 'Adults'}
            {children > 0 && `, ${children} ${children === 1 ? 'Child' : 'Children'}`}
          </span>
        </div>
      </div>
    </div>
  )
}
