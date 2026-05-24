import Divider from '@/components/ui/Divider'

const testimonials = [
  {
    quote: 'An absolutely breathtaking experience. The attention to detail and level of service is unmatched. Hotel Lumière has redefined luxury for me.',
    author: 'Sofia Reyes',
    role: 'Travel Writer',
    rating: 5,
  },
  {
    quote: 'From the moment we arrived, we felt like royalty. The Presidential Suite exceeded every expectation. We will absolutely return.',
    author: 'Marco & Elena Santos',
    role: 'Honeymooners',
    rating: 5,
  },
  {
    quote: 'The Lumière Spa is world-class. Combined with the exceptional dining, this is the finest hotel experience in the Philippines.',
    author: 'James Whitfield',
    role: 'Business Traveler',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-cream-200">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="font-accent text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">
            Guest Stories
          </p>
          <h2 className="font-display text-charcoal-900 font-light"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            What Our Guests Say
          </h2>
          <Divider ornamental className="mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-cream-50 p-8 shadow-card">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-gold-400 text-sm">★</span>
                ))}
              </div>
              <p className="font-body text-charcoal-700 text-sm leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
              <div className="border-t border-cream-200 pt-4">
                <p className="font-accent text-charcoal-900 text-xs tracking-widest uppercase">{t.author}</p>
                <p className="font-body text-charcoal-700/60 text-xs mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
