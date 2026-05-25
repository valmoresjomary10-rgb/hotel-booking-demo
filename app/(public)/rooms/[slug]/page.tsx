import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getRoomsFromSupabase, getRoomBySlugFromSupabase } from '@/lib/supabase/rooms'
import { buildRoomMetadata } from '@/lib/seo/metadata'
import { roomStructuredData, breadcrumbStructuredData } from '@/lib/seo/structuredData'
import Badge from '@/components/ui/Badge'
import Divider from '@/components/ui/Divider'
import RoomBookingCard from '@/components/rooms/RoomBookingCard'

export const revalidate = 60

export async function generateStaticParams() {
  const rooms = await getRoomsFromSupabase()
  return rooms.map(room => ({ slug: room.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const room = await getRoomBySlugFromSupabase(slug)
  if (!room) return {}
  return buildRoomMetadata({
    name:          room.name,
    description:   room.description,
    images:        room.images,
    pricePerNight: room.pricePerNight,
    slug:          room.slug,
  })
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const room = await getRoomBySlugFromSupabase(slug)
  if (!room) notFound()

  const roomLD       = roomStructuredData({
    name:          room.name,
    description:   room.description,
    images:        room.images,
    pricePerNight: room.pricePerNight,
    slug:          room.slug,
  })
  const breadcrumbLD = breadcrumbStructuredData([
    { name: 'Home',          href: '/' },
    { name: 'Rooms & Suites', href: '/rooms' },
    { name: room.name,       href: `/rooms/${room.slug}` },
  ])

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      {/* Hero */}
      <section className="bg-charcoal-900 h-[60vh] min-h-[400px] relative flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
        <div className="relative z-10 container mx-auto pb-12">
          <div className="flex gap-2 mb-4">
            {room.featured && <Badge label="Featured" variant="gold" />}
            <Badge label="Available" variant="success" />
          </div>
          <h1
            className="font-display text-cream-50 font-light"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            {room.name}
          </h1>
          <div className="flex items-center gap-6 mt-3">
            <span className="font-accent text-cream-200/70 text-xs tracking-widest uppercase">{room.size} m²</span>
            <span className="font-accent text-cream-200/70 text-xs tracking-widest uppercase">Floor {room.floor}</span>
            <span className="font-accent text-cream-200/70 text-xs tracking-widest uppercase">Up to {room.capacity} guests</span>
            <div className="flex items-center gap-1">
              <span className="text-gold-400" aria-hidden="true">★</span>
              <span className="font-body text-cream-200 text-sm">
                {room.rating} ({room.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="py-16 bg-cream-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-charcoal-900 text-2xl font-light mb-4">About This Room</h2>
                <Divider ornamental className="mb-6" />
                <p className="font-body text-charcoal-700 leading-relaxed">{room.description}</p>
              </div>
              <div>
                <h2 className="font-display text-charcoal-900 text-2xl font-light mb-6">Room Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Size',     value: `${room.size} m²` },
                    { label: 'Bed Type', value: room.bedType.charAt(0).toUpperCase() + room.bedType.slice(1) },
                    { label: 'Capacity', value: `${room.capacity} guests` },
                    { label: 'Floor',    value: `Floor ${room.floor}` },
                  ].map((detail) => (
                    <div key={detail.label} className="bg-cream-50 p-4 text-center border border-cream-200">
                      <p className="font-accent text-gold-500 text-xs tracking-widest uppercase mb-1">{detail.label}</p>
                      <p className="font-body text-charcoal-900 text-sm font-medium">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-display text-charcoal-900 text-2xl font-light mb-6">Amenities</h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-2">
                      <span className="text-gold-400 text-xs" aria-hidden="true">✦</span>
                      <span className="font-body text-charcoal-700 text-sm">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-1">
              <RoomBookingCard
                roomId={room.id}
                pricePerNight={room.pricePerNight}
                capacity={room.capacity}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
