import Link from 'next/link'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

export default function CTASection() {
  return (
    <section className="py-24 bg-charcoal-900 text-center">
      <div className="container mx-auto max-w-3xl">
        <p className="font-accent text-gold-400 text-xs tracking-[0.3em] uppercase mb-6">
          Reserve Your Stay
        </p>
        <h2 className="font-display text-cream-50 font-light mb-6"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          Begin Your Lumière Experience
        </h2>
        <Divider ornamental className="opacity-40 mb-6" />
        <p className="font-body text-cream-200/70 text-lg mb-10 leading-relaxed">
          Every stay at Hotel Lumière is a story waiting to be written. Let us craft yours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking">
            <Button variant="primary" size="lg" aria-label="Book your stay at Hotel Lumière">Book Now</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" aria-label="Contact Hotel Lumière" className="border-cream-200 text-cream-200 hover:bg-cream-200 hover:text-charcoal-900">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
