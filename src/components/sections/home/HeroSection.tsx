import Link from 'next/link'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal-900">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/40 via-charcoal-900/20 to-charcoal-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="font-accent text-gold-400 text-sm tracking-[0.3em] uppercase mb-6">
          Welcome to
        </p>
        <h1 className="font-display text-cream-50 font-light mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '1.05' }}>
          Hotel Lumière
        </h1>
        <Divider ornamental className="my-6 opacity-60" />
        <p className="font-body text-cream-200 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Where every moment is crafted with elegance. Experience luxury redefined in the heart of Manila.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking">
            <Button variant="primary" size="lg" className="min-w-[180px]" aria-label="Book your stay at Hotel Lumière">
              Book Your Stay
            </Button>
          </Link>
          <Link href="/rooms">
            <Button variant="outline" size="lg" className="min-w-[180px] border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-charcoal-900">
              Explore Rooms
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 mt-16 pt-8 border-t border-cream-50/20">
          {[
            { value: '48', label: 'Luxury Rooms' },
            { value: '5★', label: 'Rating', ariaValue: '5 star rating' },
            { value: '15+', label: 'Years of Excellence' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-gold-400 text-3xl font-light" aria-label={'ariaValue' in stat ? stat.ariaValue : stat.value}>{stat.value}</p>
              <p className="font-accent text-cream-200/70 text-xs tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-accent text-cream-200/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gold-400/50" />
      </div>
    </section>
  )
}
