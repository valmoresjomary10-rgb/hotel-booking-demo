import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')

  if (!checkIn || !checkOut) {
    return NextResponse.json({ unavailableRoomIds: [] })
  }

  const supabase = createAdminClient()

  // Find all bookings that overlap with the requested dates
  // Overlap condition: existing.check_in < requested.check_out AND existing.check_out > requested.check_in
  const { data, error } = await supabase
    .from('bookings')
    .select('room_id')
    .neq('status', 'cancelled')
    .not('room_id', 'is', null)
    .lt('check_in', checkOut)
    .gt('check_out', checkIn)

  if (error) {
    console.error('Availability check error:', error)
    return NextResponse.json({ unavailableRoomIds: [] })
  }

  const unavailableRoomIds = [...new Set(data.map(b => b.room_id))]
  return NextResponse.json({ unavailableRoomIds })
}
