'use client'

import { useState, useEffect } from 'react'
import { rooms as initialRooms } from '@/constants/roomData'
import { Room } from '@/types/room'
import RoomCard from '@/components/rooms/RoomCard'
import Divider from '@/components/ui/Divider'

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)

  useEffect(() => {
    const stored = localStorage.getItem('lum_rooms')
    if (stored) setRooms(JSON.parse(stored))
  }, [])

  return (
    <>
      {/* Hero */}
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
      </section>

      {/* Grid */}
      <section className="bg-cream-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </>
  )
}
