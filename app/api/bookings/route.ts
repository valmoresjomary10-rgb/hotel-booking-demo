import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = createAdminClient()

    console.log('Booking POST body.roomId:', body.roomId, '| checkIn:', body.checkIn, '| checkOut:', body.checkOut)

    // ── Conflict check ────────────────────────────────────────────────────────
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

    // ── Insert booking (starts as pending / unpaid) ───────────────────────────
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        confirmation_code:           confirmationCode,
        room_id:                     body.roomId || null,
        room_name:                   body.roomName,
        price_per_night:             body.pricePerNight,
        guest_first_name:            body.guest.firstName,
        guest_last_name:             body.guest.lastName,
        guest_email:                 body.guest.email,
        guest_phone:                 body.guest.phone,
        guest_country:               body.guest.country,
        guest_special_requests:      body.guest.specialRequests ?? null,
        check_in:                    body.checkIn,
        check_out:                   body.checkOut,
        nights:                      body.nights,
        adults:                      body.adults,
        children:                    body.children,
        total_price:                 body.totalPrice,
        status:                      'pending',
        payment_status:              'unpaid',
        booking_type:                'online',
        payment_method:              body.paymentMethod ?? null,
        paymongo_payment_intent_id:  body.paymentIntentId ?? null,
        paymongo_source_id:          body.sourceId ?? null,
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    // ── Send confirmation email via Brevo ─────────────────────────────────────
    try {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY!,
        },
        body: JSON.stringify({
          subject: `Booking Confirmed — ${confirmationCode} | Hotel Lumière`,
          to: [{ email: data.guest_email, name: `${data.guest_first_name} ${data.guest_last_name}` }],
          sender: { name: 'Hotel Lumière', email: 'valmoresjomary10@gmail.com' },
          htmlContent: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
              <div style="border-bottom: 2px solid #c49a3a; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="font-size: 28px; font-weight: 300; color: #0f0f0f; margin: 0;">Hotel Lumière</h1>
                <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #c49a3a; margin: 4px 0 0;">Booking Confirmation</p>
              </div>
              <p style="font-size: 16px; font-weight: 300;">Dear ${data.guest_first_name},</p>
              <p style="font-size: 14px; line-height: 1.8; color: #2a2a2a;">
                Your reservation at Hotel Lumière has been confirmed. We look forward to welcoming you.
              </p>
              <div style="margin: 30px 0; padding: 20px; background: #f9f6f1; border-left: 3px solid #c49a3a;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin: 0 0 16px;">Booking Details</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr><td style="padding: 8px 0; color: #888; width: 140px;">Confirmation</td><td style="color: #c49a3a; font-weight: bold; letter-spacing: 2px;">${confirmationCode}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Room</td><td>${data.room_name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Check-In</td><td>${data.check_in}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Check-Out</td><td>${data.check_out}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Nights</td><td>${data.nights}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Guests</td><td>${data.adults} Adult(s)${data.children > 0 ? `, ${data.children} Child(ren)` : ''}</td></tr>
                  <tr style="border-top: 1px solid #e0d8cc;"><td style="padding: 12px 0; color: #888;">Total</td><td style="font-size: 18px; color: #c49a3a;">₱${Number(data.total_price).toLocaleString()}</td></tr>
                </table>
              </div>
              <p style="font-size: 13px; color: #555; line-height: 1.8;">
                <strong>Check-in:</strong> 2:00 PM &nbsp;·&nbsp; <strong>Check-out:</strong> 12:00 PM<br/>
                Please present your confirmation code <strong>${confirmationCode}</strong> upon arrival.
              </p>
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0ebe0;">
                <p style="font-size: 13px; color: #1a1a1a; margin: 0;">Warm regards,</p>
                <p style="font-size: 13px; color: #c49a3a; margin: 4px 0 0;">The Hotel Lumière Team</p>
                <p style="font-size: 12px; color: #aaa; margin: 4px 0 0;">reservations@hotellumiere.com · +63 2 8888 0000</p>
              </div>
            </div>
          `,
        }),
      })
    } catch (emailErr) {
      console.error('Booking email error:', emailErr)
    }

 // ── Send SMS via Semaphore ────────────────────────────────────────────────
    try {
      const phone = data.guest_phone?.replace(/\D/g, '')
      if (phone) {
        console.log('Sending SMS to:', phone)
        const smsRes = await fetch('https://api.semaphore.co/api/v4/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apikey: process.env.SEMAPHORE_API_KEY!,
            number: phone,
            message: `Hotel Lumiere: Booking confirmed! Code: ${confirmationCode}. Room: ${data.room_name}. Check-in: ${data.check_in}. Total: P${Number(data.total_price).toLocaleString()}. Questions? Call +63 2 8888 0000.`,
            sendername: 'HotelLumiere',
          }),
        })
        const smsData = await smsRes.json()
        console.log('Semaphore response:', JSON.stringify(smsData))
      }
    } catch (smsErr) {
      console.error('SMS error:', smsErr)
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
