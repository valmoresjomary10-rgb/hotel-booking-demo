'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Room } from '@/types/room'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

interface RoomCardProps {
  room: Room
  index?: number
}

export default function RoomCard({ room, index = 0 }: RoomCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  return (
    <>
      <article aria-label={room.name} className="group bg-cream-50 shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden">
        {/* Image — opens lightbox */}
        <button
          onClick={() => { setLightboxIndex(0); setLightboxOpen(true) }}
          className="h-64 relative overflow-hidden bg-charcoal-800 block cursor-zoom-in w-full"
          aria-label={`View photos of ${room.name}`}
        >
          {room.images?.[0] && (
            <Image
              src={room.images[0]}
              alt={room.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            {room.featured && <Badge label="Featured" variant="gold" />}
            <Badge
              label={room.status === 'available' ? 'Available' : room.status === 'booked' ? 'Booked' : 'Maintenance'}
              variant={room.status === 'available' ? 'success' : 'danger'}
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-accent text-cream-50 text-xs tracking-widest uppercase">
              {room.size} m² · {room.bedType} bed · Up to {room.capacity} guests
            </p>
          </div>
          {/* Zoom hint */}
          <span className="absolute top-4 right-4 bg-charcoal-900/60 text-cream-50 font-accent text-[10px] tracking-widest uppercase px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            View Photos
          </span>
        </button>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-display text-charcoal-900 text-2xl font-light">{room.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-gold-400 text-sm" aria-hidden="true">★</span>
              <span className="font-body text-charcoal-700 text-sm">{room.rating}</span>
              <span className="font-body text-charcoal-700/50 text-xs">({room.reviewCount})</span>
            </div>
          </div>
          <p className="font-body text-charcoal-700 text-sm leading-relaxed line-clamp-2">
            {room.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-cream-200">
            <div>
              <span className="font-display text-gold-500 text-2xl">
                ₱{room.pricePerNight.toLocaleString()}
              </span>
              <span className="font-body text-charcoal-700/60 text-sm"> / night</span>
            </div>
            <Link href={`/rooms/${room.slug}`}>
              <Button variant="outline" size="sm" aria-label={`View ${room.name}`}>View Room</Button>
            </Link>
          </div>
        </div>
      </article>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white font-accent text-xs tracking-widest uppercase bg-white/20 hover:bg-white/40 px-4 py-2 transition-colors z-10"
          >
            ✕
          </button>
          <span className="absolute top-4 left-1/2 -translate-x-1/2 font-accent text-xs tracking-widest text-white uppercase z-10">
            {lightboxIndex + 1} / {room.images.length}
          </span>
          <button
            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i === 0 ? room.images.length - 1 : i - 1) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 text-white text-2xl flex items-center justify-center transition-colors z-10"
          >‹</button>
          <div
            className="relative w-full max-w-5xl mx-16 aspect-[16/9]"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={room.images[lightboxIndex]}
              alt={`${room.name} — photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i === room.images.length - 1 ? 0 : i + 1) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 text-white text-2xl flex items-center justify-center transition-colors z-10"
          >›</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {room.images.map((img, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setLightboxIndex(i) }}
                className={`relative w-16 h-10 overflow-hidden transition-all ${i === lightboxIndex ? 'ring-2 ring-gold-400 opacity-100' : 'opacity-40 hover:opacity-70'}`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}