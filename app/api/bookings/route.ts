import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = createAdminClient()

    console.log('Booking POST body.roomId:', body.roomId, '| checkIn:', body.checkIn, '| checkOut:', body.checkOut)
    // Check for conflicting bookings before inserting
    if (body.roomId) {
      const { data: conflicts } = await supabase
        .from('bookings')
        .select('id')
        .eq('room_id', body.roomId)
        .neq('status', 'cancelled')
        .lt('check_in', body.checkOut)
        .gt('check_out', body.checkIn)

      if (conflicts && conflicts.length > 0) {
        return NextResponse.json(
          { error: 'This room is already booked for the selected dates. Please choose different dates or another room.' },
          { status: 409 }
        )
      }
    }

    const confirmationCode = 'LUM-' + Math.random().toString(36).substring(2, 7).toUpperCase()

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        confirmation_code: confirmationCode,
        room_id: body.roomId || null,
        room_name: body.roomName,
        price_per_night: body.pricePerNight,
        guest_first_name: body.guest.firstName,
        guest_last_name: body.guest.lastName,
        guest_email: body.guest.email,
        guest_phone: body.guest.phone,
        guest_country: body.guest.country,
        guest_special_requests: body.guest.specialRequests ?? null,
        check_in: body.checkIn,
        check_out: body.checkOut,
        nights: body.nights,
        adults: body.adults,
        children: body.children,
        total_price: body.totalPrice,
        status: 'pending',
        payment_status: 'unpaid',
        booking_type: 'online',
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id, confirmationCode }, { status: 201 })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
