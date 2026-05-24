// src/app/(public)/booking/confirmation/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import BookingConfirmationCard from '@/components/booking/BookingConfirmationCard'
import { siteConfig } from '@/constants/siteConfig'

export const metadata: Metadata = {
  title: `Booking Confirmed | ${siteConfig.name}`,
  description: 'Your reservation at Hotel Lumière is confirmed.',
}

interface ConfirmationPageProps {
  searchParams: { code?: string }
}

export default async function BookingConfirmationPage({ searchParams }: ConfirmationPageProps) {
  if (!searchParams.code) notFound()

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('bookings')
    .select('*, rooms(name)')
    .eq('confirmation_code', searchParams.code.toUpperCase())
    .single()

  if (error || !data) notFound()

  return (
    <BookingConfirmationCard
      confirmationCode={data.confirmation_code}
      roomName={data.rooms?.name ?? 'Your Room'}
      checkIn={data.check_in}
      checkOut={data.check_out}
      nights={data.nights}
      adults={data.adults}
      children={data.children}
      guestName={`${data.first_name} ${data.last_name}`}
      email={data.email}
      totalPrice={data.total_price}
    />
  )
}
