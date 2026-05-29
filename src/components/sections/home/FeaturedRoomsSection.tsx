import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, BedDouble, Maximize2, Star } from 'lucide-react'
import { rooms } from '@/constants/roomData'

export default function FeaturedRoomsSection() {
  const featuredRooms = rooms.filter((r) => r.featured).slice(0, 3)

  return (
    <section className="section-padding bg-white">
      <div className="section-wrapper">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="section-label">Our Rooms</p>
            <h2 className="section-heading">
              Find Your Perfect Room
            </h2>
            <p className="section-subheading">
              Every room is designed with your comfort in mind —
              bright, clean, and thoughtfully furnished.
            </p>
          </div>
          <Link
            href="/rooms"
            className="btn-secondary text-sm shrink-0 w-fit"
          >
            View All Rooms
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.slug}`}
              className="card group block"
            >
              {/* Room Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.images[0] || '/images/rooms/placeholder.jpg'}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Availability badge */}
                <div className="absolute top-3 left-3">
                  <span className={`badge ${
                    room.status === 'available' ? 'badge-sage' : 'badge-gray'
                  }`}>
                    {room.status === 'available' ? 'Available' : 'Booked'}
                  </span>
                </div>
                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1
                                bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Star size={11} className="text-blue-400 fill-blue-400" />
                  <span
                    className="text-xs font-semibold text-gray-700"
                    style={{ fontFamily: 'var(--font-accent)' }}
                  >
                    {room.rating}
                  </span>
                </div>
              </div>

              {/* Room Info */}
              <div className="p-5">

                {/* Name & Price */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3
                    className="text-base font-bold text-gray-900 leading-snug"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {room.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <p
                      className="text-lg font-bold text-blue-500"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      ₱{room.pricePerNight.toLocaleString()}
                    </p>
                    <p
                      className="text-xs text-gray-400"
                      style={{ fontFamily: 'var(--font-accent)' }}
                    >
                      per night
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-sm text-gray-500 line-clamp-2 mb-4"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {room.description}
                </p>

                {/* Room specs */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Users size={13} />
                    <span
                      className="text-xs"
                      style={{ fontFamily: 'var(--font-accent)' }}
                    >
                      {room.capacity} guests
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <BedDouble size={13} />
                    <span
                      className="text-xs capitalize"
                      style={{ fontFamily: 'var(--font-accent)' }}
                    >
                      {room.bedType}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Maximize2 size={13} />
                    <span
                      className="text-xs"
                      style={{ fontFamily: 'var(--font-accent)' }}
                    >
                      {room.size} m²
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}