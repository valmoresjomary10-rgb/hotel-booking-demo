import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Divider from '@/components/ui/Divider'

const featuredRooms = [
  {
    name: 'Deluxe Room',
    slug: 'deluxe-room',
    description: 'Elegant comfort with city views, premium bedding, and a marble en-suite bathroom.',
    price: 8500,
    size: 35,
    capacity: 2,
    badge: 'Popular',
    bg: 'bg-charcoal-800',
  },
  {
    name: 'Junior Suite',
    slug: 'junior-suite',
    description: 'A spacious retreat with a separate living area, panoramic views, and butler service.',
    price: 15000,
    size: 65,
    capacity: 3,
    badge: 'Featured',
    bg: 'bg-charcoal-700',
  },
  {
    name: 'Presidential Suite',
    slug: 'presidential-suite',
    description: 'The pinnacle of luxury. Private terrace, grand piano, and dedicated concierge.',
    price: 35000,
    size: 120,
    capacity: 4,
    badge: 'Exclusive',
    bg: 'bg-charcoal-900',
  },
]

export default function FeaturedRoomsSection() {
  return (
    <section className="py-24 bg-cream-100">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-accent text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">
            Accommodations
          </p>
          <h2 className="font-display text-charcoal-900 font-light"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Our Finest Rooms
          </h2>
          <Divider ornamental className="mt-6" />
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <div key={room.slug} className="group bg-cream-50 shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden">
              {/* Image placeholder */}
              <div className={`${room.bg} h-64 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge label={room.badge} variant="gold" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-accent text-cream-50 text-xs tracking-widest uppercase">{room.size} m² · Up to {room.capacity} guests</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="font-display text-charcoal-900 text-2xl font-light">{room.name}</h3>
                <p className="font-body text-charcoal-700 text-sm leading-relaxed">{room.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-cream-200">
                  <div>
                    <span className="font-display text-gold-500 text-2xl">₱{room.price.toLocaleString()}</span>
                    <span className="font-body text-charcoal-700/60 text-sm"> / night</span>
                  </div>
                  <Link href={`/rooms/${room.slug}`}>
                    <Button variant="outline" size="sm">View Room</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/rooms">
            <Button variant="primary" size="lg">View All Rooms</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
