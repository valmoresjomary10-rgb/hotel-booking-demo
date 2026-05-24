import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getRoomBySlug, rooms } from '@/constants/roomData'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

export async function generateStaticParams() {
  return rooms.map(room => ({ slug: room.slug }))
}

export default function RoomDetailPage({ params }: { params: { slug: string } }) {
  const room = getRoomBySlug(params.slug)
  if (!room) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal-900 h-[60vh] min-h-[400px] relative flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
        <div className="relative z-10 container mx-auto pb-12">
          <div className="flex gap-2 mb-4">
            {room.featured && <Badge label="Featured" variant="gold" />}
            <Badge label="Available" variant="success" />
          </div>
          <h1 className="font-display text-cream-50 font-light"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            {room.name}
          </h1>
          <div className="flex items-center gap-6 mt-3">
            <span className="font-accent text-cream-200/70 text-xs tracking-widest uppercase">
              {room.size} m²
            </span>
            <span className="font-accent text-cream-200/70 text-xs tracking-widest uppercase">
              Floor {room.floor}
            </span>
            <span className="font-accent text-cream-200/70 text-xs tracking-widest uppercase">
              Up to {room.capacity} guests
            </span>
            <div className="flex items-center gap-1">
              <span className="text-gold-400">★</span>
              <span className="font-body text-cream-200 text-sm">{room.rating} ({room.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-cream-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left — Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <h2 className="font-display text-charcoal-900 text-2xl font-light mb-4">About This Room</h2>
                <Divider ornamental className="mb-6" />
                <p className="font-body text-charcoal-700 leading-relaxed">{room.description}</p>
              </div>

              {/* Room Details */}
              <div>
                <h2 className="font-display text-charcoal-900 text-2xl font-light mb-6">Room Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Size', value: `${room.size} m²` },
                    { label: 'Bed Type', value: room.bedType.charAt(0).toUpperCase() + room.bedType.slice(1) },
                    { label: 'Capacity', value: `${room.capacity} guests` },
                    { label: 'Floor', value: `Floor ${room.floor}` },
                  ].map((detail) => (
                    <div key={detail.label} className="bg-cream-50 p-4 text-center border border-cream-200">
                      <p className="font-accent text-gold-500 text-xs tracking-widest uppercase mb-1">{detail.label}</p>
                      <p className="font-body text-charcoal-900 text-sm font-medium">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-display text-charcoal-900 text-2xl font-light mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <span className="text-gold-400 text-xs">✦</span>
                      <span className="font-body text-charcoal-700 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-cream-50 shadow-luxury p-8 sticky top-28">
                <p className="font-accent text-gold-500 text-xs tracking-widest uppercase mb-2">
                  Starting from
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-gold-500 text-4xl">
                    ₱{room.pricePerNight.toLocaleString()}
                  </span>
                  <span className="font-body text-charcoal-700/60 text-sm">/ night</span>
                </div>
                <Divider className="mb-6" />
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="font-accent text-charcoal-900 text-xs tracking-widest uppercase block mb-2">
                      Check In
                    </label>
                    <input
                      type="date"
                      className="w-full border border-cream-200 bg-cream-100 px-4 py-3 font-body text-sm text-charcoal-900 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="font-accent text-charcoal-900 text-xs tracking-widest uppercase block mb-2">
                      Check Out
                    </label>
                    <input
                      type="date"
                      className="w-full border border-cream-200 bg-cream-100 px-4 py-3 font-body text-sm text-charcoal-900 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="font-accent text-charcoal-900 text-xs tracking-widest uppercase block mb-2">
                      Guests
                    </label>
                    <select className="w-full border border-cream-200 bg-cream-100 px-4 py-3 font-body text-sm text-charcoal-900 focus:outline-none focus:border-gold-400">
                      {Array.from({ length: room.capacity }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <Link href="/booking">
                  <Button variant="primary" size="lg" className="w-full">
                    Reserve Now
                  </Button>
                </Link>
                <p className="font-body text-charcoal-700/50 text-xs text-center mt-4">
                  Free cancellation up to 24 hours before check-in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
