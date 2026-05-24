'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

interface RoomBookingCardProps {
  roomId: string
  pricePerNight: number
  capacity: number
}

export default function RoomBookingCard({ roomId, pricePerNight, capacity }: RoomBookingCardProps) {
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(tomorrow)
  const [guests, setGuests] = useState(1)

  const nights = Math.max(0, Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  ))

  const handleReserve = () => {
    router.push(`/booking?roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}&children=0`)
  }

  return (
    <div className="bg-cream-50 shadow-luxury p-8 sticky top-28">
      <p className="font-accent text-gold-500 text-xs tracking-widest uppercase mb-2">Starting from</p>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-display text-gold-500 text-4xl">₱{pricePerNight.toLocaleString()}</span>
        <span className="font-body text-charcoal-700/60 text-sm">/ night</span>
      </div>
      <Divider className="mb-6" />
      <div className="space-y-4 mb-6">
        <div>
          <label className="font-accent text-charcoal-900 text-xs tracking-widest uppercase block mb-2">Check In</label>
          <input type="date" value={checkIn} min={today}
            onChange={e => setCheckIn(e.target.value)}
            className="w-full border border-cream-200 bg-cream-100 px-4 py-3 font-body text-sm text-charcoal-900 focus:outline-none focus:border-gold-400" />
        </div>
        <div>
          <label className="font-accent text-charcoal-900 text-xs tracking-widest uppercase block mb-2">Check Out</label>
          <input type="date" value={checkOut} min={checkIn}
            onChange={e => setCheckOut(e.target.value)}
            className="w-full border border-cream-200 bg-cream-100 px-4 py-3 font-body text-sm text-charcoal-900 focus:outline-none focus:border-gold-400" />
        </div>
        <div>
          <label className="font-accent text-charcoal-900 text-xs tracking-widest uppercase block mb-2">Guests</label>
          <select value={guests} onChange={e => setGuests(Number(e.target.value))}
            className="w-full border border-cream-200 bg-cream-100 px-4 py-3 font-body text-sm text-charcoal-900 focus:outline-none focus:border-gold-400">
            {Array.from({ length: capacity }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        {nights > 0 && (
          <div className="bg-gold-50 border border-gold-100 px-4 py-3 text-center">
            <span className="font-accent text-gold-600 text-xs tracking-widest uppercase">
              {nights} Night{nights > 1 ? 's' : ''} · ₱{(nights * pricePerNight).toLocaleString()} total
            </span>
          </div>
        )}
      </div>
      <Button variant="primary" size="lg" className="w-full" onClick={handleReserve}>
        Reserve Now
      </Button>
      <p className="font-body text-charcoal-700/50 text-xs text-center mt-4">
        Free cancellation up to 24 hours before check-in
      </p>
    </div>
  )
}
