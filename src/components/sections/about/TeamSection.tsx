'use client'

import { useEffect, useRef, useState } from 'react'

const team = [
  {
    name: 'Isabella Reyes',
    title: 'General Manager',
    bio: 'With 20 years at the helm, Isabella has shaped Lumière into the finest address in Manila. A graduate of EHL Lausanne, she leads with warmth and precision.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Marco Santos',
    title: 'Executive Chef',
    bio: 'Marco trained under Joël Robuchon in Paris before returning to the Philippines to champion modern Filipino cuisine at Restaurant Lumière.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Camille Delos Reyes',
    title: 'Head of Guest Experience',
    bio: 'Camille\'s philosophy is simple: every guest should feel like a family member. She orchestrates our legendary personalised hospitality programmes.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Rafael Oña',
    title: 'Spa & Wellness Director',
    bio: 'Rafael brings ancient Filipino healing traditions into the Lumière Spa, blending hilot massage with contemporary wellness science.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop',
  },
]

function useInView(threshold = 0.15) {
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

export default function TeamSection() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-charcoal-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-16 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-400">
            The People Behind Lumière
          </span>
          <h2 className="mt-3 font-display text-4xl font-light text-cream-50 md:text-6xl">
            Meet Our <em className="italic text-gold-400">Visionaries</em>
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-gold-400" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`group relative overflow-hidden transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal-900/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="font-body text-sm leading-relaxed text-cream-200/80">
                    {member.bio}
                  </p>
                </div>
              </div>
              <div className="mt-4 border-l-2 border-gold-400 pl-4">
                <h3 className="font-display text-lg font-light text-cream-50">
                  {member.name}
                </h3>
                <p className="font-accent text-xs uppercase tracking-widest text-gold-400/80">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
