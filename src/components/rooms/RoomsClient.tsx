'use client'

import { useState, useEffect } from 'react'
import RoomCard from '@/components/rooms/RoomCard'
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
    <section className="relative py-32 md:py-44" style={{ backgroundColor: '#000000' }}>
        <div className="pointer-events-none absolute inset-8 border border-white/10" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-blue-400" />
            <span className="font-accent text-xs uppercase tracking-[0.3em] text-blue-400">
              Accommodations
            </span>
            <span className="h-px w-12 bg-blue-400" />
          </div>
          <h1 className="font-display text-5xl font-light text-white md:text-7xl">
            Rooms & <em className="italic text-blue-400">Suites</em>
          </h1>
          <p className="mt-6 font-body text-base leading-relaxed text-gray-400 md:text-lg max-w-xl mx-auto">
            Each of our rooms is a sanctuary of calm — thoughtfully designed to offer the highest standard of comfort and elegance.
          </p>

          {/* Date Picker */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col items-start">
              <label htmlFor="filterCheckIn" className="font-accent text-[10px] uppercase tracking-widest text-blue-400/70 mb-1">Check-in</label>
              <input
                id="filterCheckIn"
                type="date"
                min={today}
                value={checkIn}
                onChange={e => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut('') }}
                className="bg-gray-800 border border-gray-700 text-white font-body text-sm px-4 py-2.5 focus:outline-none focus:border-blue-400/50 w-44 [color-scheme:dark]"
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="filterCheckOut" className="font-accent text-[10px] uppercase tracking-widest text-blue-400/70 mb-1">Check-out</label>
              <input
                id="filterCheckOut"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white font-body text-sm px-4 py-2.5 focus:outline-none focus:border-blue-400/50 w-44 [color-scheme:dark]"
              />
            </div>
            {(checkIn || checkOut) && (
              <button
                onClick={() => { setCheckIn(''); setCheckOut(''); setUnavailableIds([]) }}
                className="font-accent text-[9px] uppercase tracking-widest text-blue-400/60 hover:text-blue-400 transition-colors mt-4 sm:mt-5"
              >
                Clear dates
              </button>
            )}
          </div>

          {checkIn && checkOut && !checking && (
            <p className="font-body text-gray-400 text-sm mt-4">
              {unavailableIds.length === 0
                ? 'All rooms available for your dates.'
                : `${unavailableIds.length} room${unavailableIds.length > 1 ? 's' : ''} unavailable for your dates.`}
            </p>
          )}
          {checking && (
            <p className="font-body text-gray-400 text-sm mt-4">Checking availability...</p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-6">
        {loading ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => {
              const isUnavailable = unavailableIds.includes(room.id)
              return (
                <div key={room.id} className={isUnavailable ? 'opacity-50 pointer-events-none relative' : ''}>
                  {isUnavailable && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/10">
                      <span className="bg-gray-900 text-white font-accent text-[9px] uppercase tracking-widest px-4 py-2">
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