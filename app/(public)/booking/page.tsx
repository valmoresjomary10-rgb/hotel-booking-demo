import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getRoomBySlugFromSupabase, getRoomsFromSupabase } from '@/lib/supabase/rooms'
import BookingForm from '@/components/booking/BookingForm'

interface BookingPageProps {
  searchParams: Promise<{
    roomId?: string
    checkIn?: string
    checkOut?: string
    adults?: string
    children?: string
  }>
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams
  const roomId = params.roomId ?? ''
  const checkIn = params.checkIn ?? ''
  const checkOut = params.checkOut ?? ''
  const adults = parseInt(params.adults ?? '1')
  const children = parseInt(params.children ?? '0')

  // Find room by ID from Supabase
  const allRooms = await getRoomsFromSupabase()
  const room = allRooms.find(r => r.id === roomId)

  if (!room) notFound()

  let nights = 0
  if (checkIn && checkOut) {
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
    nights = Math.round(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  )
}
