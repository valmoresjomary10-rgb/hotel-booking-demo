import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import BookingConfirmationCard from '@/components/booking/BookingConfirmationCard'
import { siteConfig } from '@/constants/siteConfig'

export const metadata: Metadata = {
  title: `Booking Confirmed | ${siteConfig.name}`,
  description: 'Your reservation at Hotel Lumière is confirmed.',
}

interface ConfirmationPageProps {
  searchParams: Promise<{ code?: string }>
}

export default async function BookingConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { code } = await searchParams
  if (!code) notFound()

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('confirmation_code', code.toUpperCase())
    .single()

  if (error || !data) notFound()

  return (
    <BookingConfirmationCard
      confirmationCode={data.confirmation_code}
      roomName={data.room_name ?? 'Your Room'}
      checkIn={data.check_in}
      checkOut={data.check_out}
      nights={data.nights}
      adults={data.adults}
      children={data.children}
      guestName={`${data.guest_first_name} ${data.guest_last_name}`}
      email={data.guest_email}
      totalPrice={data.total_price}
    />
  )
}
