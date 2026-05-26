import Link from 'next/link'
import { Room } from '@/types/room'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

const bgColors = [
  'bg-charcoal-900', 'bg-charcoal-800', 'bg-charcoal-700',
]

interface RoomCardProps {
  room: Room
  index?: number
}

export default function RoomCard({ room, index = 0 }: RoomCardProps) {
  return (
    <article aria-label={room.name} className="group bg-cream-50 shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden">
      {/* Image */}
      <div className={cn('h-64 relative overflow-hidden', bgColors[index % bgColors.length])}>
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
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-charcoal-900 text-2xl font-light">{room.name}</h3>
          <div className="flex items-center gap-1 mt-1" aria-label={`Rated ${room.rating} out of 5, ${room.reviewCount} reviews`}>
            <span className="text-gold-400 text-sm" aria-hidden="true">★</span>
            <span className="font-body text-charcoal-700 text-sm" aria-hidden="true">{room.rating}</span>
            <span className="font-body text-charcoal-700/50 text-xs" aria-hidden="true">({room.reviewCount})</span>
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
  )
}
