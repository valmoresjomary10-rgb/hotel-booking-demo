import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRoomsFromSupabase } from '@/lib/supabase/rooms'

export async function GET() {
  const rooms = await getRoomsFromSupabase()
  return NextResponse.json(rooms)
}

export async function POST(req: NextRequest) {
  const supabase = createAdminClient()
  const body = await req.json()
  const { data, error } = await supabase
    .from('rooms')
    .insert({
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
      description: body.description,
      price_per_night: body.pricePerNight,
      capacity: body.capacity,
      bed_type: body.bedType,
      status: body.status,
      size: body.size,
      floor: body.floor,
      featured: body.featured,
      amenities: body.amenities,
      images: body.images ?? [],
      rating: body.rating ?? 5.0,
      review_count: body.reviewCount ?? 0,
    })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
