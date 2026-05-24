'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Waves, Utensils, Sparkles, Dumbbell, Wine,
  Car, Wifi, Coffee, Music, ShoppingBag,
  Sunset, ConciergeBell
} from 'lucide-react'

const amenities = [
  {
    icon: Waves,
    title: 'Infinity Pool',
    description:
      'Our rooftop infinity pool stretches 40 metres with panoramic views of Manila Bay. Open daily from 6AM to 10PM, with poolside butler service.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80&auto=format&fit=crop',
    tag: 'Outdoor',
  },
  {
    icon: Utensils,
    title: 'Restaurant Lumière',
    description:
      'Our Michelin-recognised fine dining restaurant serves modern Filipino cuisine by Executive Chef Marco Santos. Open for breakfast, lunch, and dinner.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop',
    tag: 'Dining',
  },
  {
    icon: Sparkles,
    title: 'Lumière Spa',
    description:
      'A sanctuary of calm across two floors, offering traditional hilot massage, hydrotherapy, and bespoke wellness journeys curated by our therapists.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&auto=format&fit=crop',
    tag: 'Wellness',
  },
  {
    icon: Dumbbell,
    title: 'Fitness Centre',
    description:
      'State-of-the-art equipment by Technogym, personal training sessions, and daily yoga classes overlooking the city skyline. Open 24 hours.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop',
    tag: 'Fitness',
  },
  {
    icon: Wine,
    title: 'The Gold Bar',
    description:
      'Manila\'s most sophisticated cocktail lounge, featuring rare whisky collections, bespoke cocktails, and live jazz every Friday and Saturday night.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80&auto=format&fit=crop',
    tag: 'Nightlife',
  },
  {
    icon: Music,
    title: 'Grand Ballroom',
    description:
      'Our 1,200 sqm Grand Ballroom accommodates up to 800 guests and features state-of-the-art AV, bespoke lighting rigs, and a dedicated events team.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80&auto=format&fit=crop',
    tag: 'Events',
  },
  {
    icon: Coffee,
    title: 'Café Éclat',
    description:
      'An all-day café serving single-origin Philippine coffee, artisan pastries, and light bites in a sun-drenched atrium setting.',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80&auto=format&fit=crop',
    tag: 'Dining',
  },
  {
    icon: Car,
    title: 'Valet & Transfers',
    description:
      'Complimentary valet parking for all guests, plus private airport transfers in our fleet of Mercedes-Benz S-Class vehicles.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&auto=format&fit=crop',
    tag: 'Concierge',
  },
  {
    icon: ConciergeBell,
    title: '24/7 Butler Service',
    description:
      'Every suite guest is assigned a dedicated butler available around the clock for any request, from unpacking to private dining arrangements.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop',
    tag: 'Service',
  },
  {
    icon: Wifi,
    title: 'High-Speed WiFi',
    description:
      'Complimentary gigabit WiFi throughout the property, with dedicated business workstations and private meeting rooms available on request.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
    tag: 'Business',
  },
  {
    icon: ShoppingBag,
    title: 'Boutique Lumière',
    description:
      'Our curated in-hotel boutique carries luxury Filipino brands, bespoke fragrances, and Lumière\'s signature amenity collection.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop',
    tag: 'Shopping',
  },
  {
    icon: Sunset,
    title: 'Rooftop Terrace',
    description:
      'The crown jewel of Hotel Lumière — an open-air terrace with fire pits, daybeds, and unobstructed views of Manila Bay at golden hour.',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80&auto=format&fit=crop',
    tag: 'Outdoor',
  },
]

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function AmenitiesGridSection() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-cream-100 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Section header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-500">
            What Awaits You
          </span>
          <h2 className="mt-3 font-display text-4xl font-light text-charcoal-900 md:text-6xl">
            Every <em className="italic text-gold-500">Indulgence</em> Imaginable
          </h2>
          <div className="mt-5 h-px w-16 bg-gold-400" />
        </div>

        {/* Amenities Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity, i) => {
            const Icon = amenity.icon
            return (
              <div
                key={amenity.title}
                className={`group overflow-hidden bg-white transition-all duration-700 hover:shadow-xl ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Tag */}
                  <div className="absolute left-4 top-4 bg-charcoal-900/80 px-3 py-1 backdrop-blur-sm">
                    <span className="font-accent text-[10px] uppercase tracking-widest text-gold-400">
                      {amenity.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center border border-gold-400/40 text-gold-500 transition-colors group-hover:border-gold-400 group-hover:bg-gold-400/5">
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-light text-charcoal-900">
                      {amenity.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-charcoal-700/65">
                    {amenity.description}
                  </p>
                </div>

                {/* Gold bottom border on hover */}
                <div className="h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-full" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
