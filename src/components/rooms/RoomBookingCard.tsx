'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import { CheckCircle, XCircle, Loader } from 'lucide-react'

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
  const [availability, setAvailability] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle')

  const nights = Math.max(0, Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  ))

  useEffect(() => {
    if (!checkIn || !checkOut || nights <= 0) { setAvailability('idle'); return }
    setAvailability('checking')
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/rooms/availability?checkIn=${checkIn}&checkOut=${checkOut}`)
        const data = await res.json()
        const unavailable = (data.unavailableRoomIds ?? []).includes(roomId)
        setAvailability(unavailable ? 'unavailable' : 'available')
      } catch { setAvailability('idle') }
    }, 500)
    return () => clearTimeout(timer)
  }, [roomId, checkIn, checkOut, nights])

  const handleReserve = () => {
    if (availability === 'unavailable') return
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
          <label htmlFor="checkIn" className="font-accent text-charcoal-900 text-xs tracking-widest uppercase block mb-2">Check In</label>
          <input id="checkIn" type="date" value={checkIn} min={today}
            onChange={e => { setCheckIn(e.target.value); if (checkOut <= e.target.value) setCheckOut('') }}
            className="w-full border border-cream-200 bg-cream-100 px-4 py-3 font-body text-sm text-charcoal-900 focus:outline-none focus:border-gold-400" />
        </div>
        <div>
          <label htmlFor="checkOut" className="font-accent text-charcoal-900 text-xs tracking-widest uppercase block mb-2">Check Out</label>
          <input id="checkOut" type="date" value={checkOut} min={checkIn}
            onChange={e => setCheckOut(e.target.value)}
            className="w-full border border-cream-200 bg-cream-100 px-4 py-3 font-body text-sm text-charcoal-900 focus:outline-none focus:border-gold-400" />
        </div>
        <div>
          <label htmlFor="guests" className="font-accent text-charcoal-900 text-xs tracking-widest uppercase block mb-2">Guests</label>
          <select id="guests" value={guests} onChange={e => setGuests(Number(e.target.value))}
            className="w-full border border-cream-200 bg-cream-100 px-4 py-3 font-body text-sm text-charcoal-900 focus:outline-none focus:border-gold-400">
            {Array.from({ length: capacity }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        {/* Availability indicator */}
        {availability === 'checking' && (
          <div role="status" aria-live="polite" className="flex items-center gap-2 px-4 py-3 bg-cream-100 border border-cream-200">
            <Loader className="h-3.5 w-3.5 text-gold-500 animate-spin shrink-0" aria-hidden="true" />
            <span className="font-body text-xs text-charcoal-700/60">Checking availability...</span>
          </div>
        )}
        {availability === 'available' && (
          <div role="status" aria-live="polite" className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200">
            <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" aria-hidden="true" />
            <span className="font-body text-xs text-green-700">Available for your dates!</span>
          </div>
        )}
        {availability === 'unavailable' && (
          <div role="alert" aria-live="assertive" className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200">
            <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-body text-xs text-red-700 font-medium">Not available for these dates.</p>
              <p className="font-body text-xs text-red-500 mt-0.5">Try different dates.</p>
            </div>
          </div>
        )}

        {nights > 0 && availability !== 'unavailable' && (
          <div className="bg-gold-50 border border-gold-100 px-4 py-3 text-center">
            <span className="font-accent text-gold-600 text-xs tracking-widest uppercase">
              {nights} Night{nights > 1 ? 's' : ''} · ₱{(nights * pricePerNight).toLocaleString()} total
            </span>
          </div>
        )}
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleReserve}
        disabled={availability === 'unavailable' || availability === 'checking'}
        aria-label={availability === 'unavailable' ? 'Room unavailable for selected dates' : 'Reserve this room'}
      >
        {availability === 'unavailable' ? 'Room Unavailable' : 'Reserve Now'}
      </Button>
      <p className="font-body text-charcoal-700/50 text-xs text-center mt-4">
        Free cancellation up to 24 hours before check-in
      </p>
    </div>
  )
}
