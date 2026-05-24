'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { rooms } from '@/constants/roomData'
import BookingForm from '@/components/booking/BookingForm'

function BookingContent() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get('roomId')
  const room = rooms.find((r) => r.id === roomId)
  if (!room) return <div>Room not found</div>
  return (
    <BookingForm room={{
      id: room.id,
      name: room.name,
      slug: room.slug,
      images: room.images || [],
      pricePerNight: room.pricePerNight,
      bedType: room.bedType,
      capacity: room.capacity,
    }} />
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}