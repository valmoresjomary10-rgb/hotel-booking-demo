import Link from 'next/link'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

const amenities = [
  { icon: '🏊', title: 'Infinity Pool', description: 'Rooftop pool with panoramic city views' },
  { icon: '🍽️', title: 'Fine Dining', description: 'Award-winning restaurant and bar' },
  { icon: '💆', title: 'Lumière Spa', description: 'Full-service spa and wellness center' },
  { icon: '🏋️', title: 'Fitness Center', description: '24/7 state-of-the-art gym facilities' },
  { icon: '🚗', title: 'Valet Parking', description: 'Complimentary valet for all guests' },
  { icon: '✈️', title: 'Airport Transfer', description: 'Private luxury transfers on request' },
]

export default function AmenitiesHighlightSection() {
  return (
    <section className="py-24 bg-charcoal-900">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-accent text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
            Experience
          </p>
          <h2 className="font-display text-cream-50 font-light"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            World-Class Amenities
          </h2>
          <Divider ornamental className="mt-6 opacity-40" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {amenities.map((item) => (
            <div key={item.title} className="group text-center p-8 border border-charcoal-700 hover:border-gold-500/50 transition-all duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-accent text-cream-50 text-sm tracking-widest uppercase mb-2">{item.title}</h3>
              <p className="font-body text-cream-200/60 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/amenities">
            <Button variant="outline" size="lg" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900">
              Explore All Amenities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
