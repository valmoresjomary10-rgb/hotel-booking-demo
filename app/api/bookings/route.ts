import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = createAdminClient()

    const confirmationCode = Math.random().toString(36).substring(2, 10).toUpperCase()

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        confirmation_code: confirmationCode,
        room_id: body.roomId ?? null,
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
