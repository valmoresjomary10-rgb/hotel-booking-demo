'use client'

import { useState, useEffect } from 'react'
import RoomCard from '@/components/rooms/RoomCard'
import Divider from '@/components/ui/Divider'
import type { Room } from '@/types/room'

export default function RoomsClient() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [unavailableIds, setUnavailableIds] = useState<string[]>([])
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    fetch('/api/rooms')
      .then(r => r.json())
      .then(data => { setRooms(data); setLoading(false) })
  }, [])

  useEffect(() => {
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      setUnavailableIds([])
      return
    }
    setChecking(true)
    fetch(`/api/rooms/availability?checkIn=${checkIn}&checkOut=${checkOut}`)
      .then(r => r.json())
      .then(data => { setUnavailableIds(data.unavailableRoomIds ?? []); setChecking(false) })
  }, [checkIn, checkOut])

  const today = new Date().toISOString().split('T')[0]

  return (
    <>
      <section className="bg-charcoal-900 pt-40 pb-20 text-center">
        <p className="font-accent text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
          Accommodations
        </p>
        <h1 className="font-display text-cream-50 font-light"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          Rooms & Suites
        </h1>
        <Divider className="mx-auto mt-6 mb-6 w-16" />
        <p className="font-body text-cream-200/60 max-w-xl mx-auto px-6">
          Each of our rooms is a sanctuary of calm — thoughtfully designed to offer the highest standard of comfort and elegance.
        </p>

        {/* Date Picker */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
          <div className="flex flex-col items-start">
            <label htmlFor="filterCheckIn" className="font-accent text-[10px] uppercase tracking-widest text-gold-400/70 mb-1">Check-in</label>
            <input
              id="filterCheckIn"
              type="date"
              min={today}
              value={checkIn}
              onChange={e => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut('') }}
              className="bg-charcoal-800 border border-charcoal-700 text-cream-50 font-body text-sm px-4 py-2.5 focus:outline-none focus:border-gold-400/50 w-44"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="filterCheckOut" className="font-accent text-[10px] uppercase tracking-widest text-gold-400/70 mb-1">Check-out</label>
            <input
              id="filterCheckOut"
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
              className="bg-charcoal-800 border border-charcoal-700 text-cream-50 font-body text-sm px-4 py-2.5 focus:outline-none focus:border-gold-400/50 w-44"
            />
          </div>
          {(checkIn || checkOut) && (
            <button
              onClick={() => { setCheckIn(''); setCheckOut(''); setUnavailableIds([]) }}
              aria-label="Clear selected dates"
              className="font-accent text-[9px] uppercase tracking-widest text-gold-400/60 hover:text-gold-400 transition-colors mt-4 sm:mt-5"
            >
              Clear dates
            </button>
          )}
        </div>

        {checkIn && checkOut && !checking && (
          <p className="font-body text-cream-200/50 text-sm mt-4">
            {unavailableIds.length === 0
              ? 'All rooms available for your dates.'
              : `${unavailableIds.length} room${unavailableIds.length > 1 ? 's' : ''} unavailable for your dates.`}
          </p>
        )}
        {checking && (
          <p className="font-body text-cream-200/40 text-sm mt-4">Checking availability...</p>
        )}
      </section>

      <section className="bg-cream-100 py-20 px-6">
        {loading ? (
          <div role="status" aria-busy="true" aria-label="Loading rooms" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} aria-hidden="true" className="bg-cream-50 h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => {
              const isUnavailable = unavailableIds.includes(room.id)
              return (
                <div key={room.id} className={isUnavailable ? 'opacity-50 pointer-events-none relative' : ''}>
                  {isUnavailable && (
                    <div aria-label="Room unavailable for selected dates" className="absolute inset-0 z-10 flex items-center justify-center bg-charcoal-900/10">
                      <span aria-hidden="true" className="bg-charcoal-900 text-cream-50 font-accent text-[9px] uppercase tracking-widest px-4 py-2">
                        Unavailable
                      </span>
                    </div>
                  )}
                  <RoomCard room={room} index={index} />
                </div>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
