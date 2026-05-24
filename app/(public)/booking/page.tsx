'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { rooms } from '@/constants/roomData'
import BookingForm from '@/components/booking/BookingForm'

function BookingContent() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get('roomId')
  const checkIn = searchParams.get('checkIn') ?? ''
  const checkOut = searchParams.get('checkOut') ?? ''
  const adults = parseInt(searchParams.get('adults') ?? '1')
  const children = parseInt(searchParams.get('children') ?? '0')

  const room = rooms.find((r) => r.id === roomId)
  if (!room) return <div>Room not found</div>

  // Calculate nights if dates provided
  let nights = 0
  if (checkIn && checkOut) {
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
    nights = Math.round(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <BookingForm
      room={{
        id: room.id,
        name: room.name,
        slug: room.slug,
        images: room.images || [],
        pricePerNight: room.pricePerNight,
        bedType: room.bedType,
        capacity: room.capacity,
      }}
      initialDates={{ checkIn, checkOut, nights, adults, children }}
    />
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}
