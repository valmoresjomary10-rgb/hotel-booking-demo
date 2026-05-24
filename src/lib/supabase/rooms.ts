import { createAdminClient } from '@/lib/supabase/admin'
import type { Room } from '@/types/room'

function mapRoom(r: any): Room {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description,
    pricePerNight: Number(r.price_per_night),
    capacity: r.capacity,
    bedType: r.bed_type,
    amenities: r.amenities ?? [],
    images: r.images ?? [],
    status: r.status ?? 'available',
    rating: Number(r.rating) ?? 0,
    reviewCount: r.review_count ?? 0,
    size: r.size ?? 0,
    floor: r.floor ?? undefined,
    featured: r.featured ?? false,
    createdAt: r.created_at ?? '',
    updatedAt: r.updated_at ?? '',
  }
}

export async function getRoomsFromSupabase(): Promise<Room[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .order('price_per_night', { ascending: true })

  if (error) {
    console.error('Error fetching rooms:', error)
    return []
  }
  return (data ?? []).map(mapRoom)
}

export async function getRoomBySlugFromSupabase(slug: string): Promise<Room | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return mapRoom(data)
}
