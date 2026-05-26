import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const body = await req.json()
  const { error } = await supabase
    .from('rooms')
    .update({
      name: body.name,
      slug: body.slug,
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
    })
    .eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { error } = await supabase.from('rooms').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data, error } = await supabase.from('rooms').select('*').eq('id', id).single()
  if (error || !data) return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  return NextResponse.json({
    id: data.id, name: data.name, slug: data.slug, description: data.description,
    pricePerNight: Number(data.price_per_night), capacity: data.capacity,
    bedType: data.bed_type, status: data.status, size: data.size, floor: data.floor,
    featured: data.featured, amenities: data.amenities ?? [], images: data.images ?? [],
  })
}
