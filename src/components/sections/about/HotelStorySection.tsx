'use client'

import { useEffect, useRef, useState } from 'react'

const milestones = [
  {
    year: '1998',
    title: 'The Beginning',
    description:
      'Hotel Lumière opened its doors on Grand Avenue, Manila — a vision by the Reyes family to bring world-class luxury to the heart of the Philippines.',
  },
  {
    year: '2005',
    title: 'The Grand Expansion',
    description:
      'We added the East Wing and our signature rooftop terrace, doubling capacity and unveiling the iconic Lumière Spa.',
  },
  {
    year: '2012',
    title: 'International Recognition',
    description:
      'Awarded Forbes Travel Guide Five Stars and inducted into the Leading Hotels of the World collection.',
  },
  {
    year: '2019',
    title: 'Sustainable Luxury',
    description:
      'Completed a full eco-renovation — solar energy, zero-waste kitchens, and a living green facade — without compromising an ounce of elegance.',
  },
  {
    year: '2024',
    title: 'Today & Beyond',
    description:
      'Celebrating 26 years of memories, with a new suite collection and our most intimate dining experience yet: Restaurant Lumière.',
  },
]

function useInView(threshold = 0.2) {
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

export default function HotelStorySection() {
  const { ref: sectionRef, inView } = useInView(0.1)

  return (
    <section ref={sectionRef} className="bg-cream-100 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className={`mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-500">
            Our Heritage
          </span>
          <h2 className="mt-3 font-display text-4xl font-light text-charcoal-900 md:text-6xl">
            26 Years of <em className="italic text-gold-500">Lumière</em>
          </h2>
          <div className="mt-5 h-px w-16 bg-gold-400" />
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className={`relative transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85&auto=format&fit=crop"
                alt="Hotel Lumière lobby"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute -bottom-4 -right-4 h-full w-full border border-gold-400/40" />
            </div>
            <div className="absolute -bottom-6 left-6 bg-charcoal-900 px-8 py-5 shadow-2xl">
              <p className="font-display text-4xl font-light text-gold-400">26</p>
              <p className="font-accent text-xs uppercase tracking-widest text-cream-200/60">
                Years of Excellence
              </p>
            </div>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-0 top-2 h-full w-px bg-gold-400/20" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <div className="absolute -left-[25px] top-1 h-3 w-3 rounded-full border-2 border-gold-400 bg-cream-100" />
                  <span className="font-accent text-xs uppercase tracking-[0.25em] text-gold-500">
                    {m.year}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-light text-charcoal-900">
                    {m.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-charcoal-700/70">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
