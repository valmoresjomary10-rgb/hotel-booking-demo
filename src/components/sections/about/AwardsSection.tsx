'use client'

import { useEffect, useRef, useState } from 'react'
import { Award, Star, Globe, Leaf } from 'lucide-react'

const awards = [
  {
    icon: Star,
    title: 'Forbes Travel Guide',
    subtitle: 'Five Star Award',
    year: '2012 – Present',
    description: 'Continuously recognized as one of the finest hotels in Southeast Asia.',
  },
  {
    icon: Globe,
    title: 'Leading Hotels of the World',
    subtitle: 'Member Since 2012',
    year: '2012',
    description: 'Inducted into the most prestigious collection of independent luxury hotels globally.',
  },
  {
    icon: Award,
    title: 'Condé Nast Traveller',
    subtitle: 'Gold List — Philippines #1',
    year: '2019, 2022, 2024',
    description: 'Voted the top hotel in the Philippines by the world\'s most discerning travellers.',
  },
  {
    icon: Leaf,
    title: 'LEED Gold Certified',
    subtitle: 'Sustainable Luxury',
    year: '2020',
    description: 'One of only three hotels in Manila to achieve LEED Gold certification for sustainability.',
  },
]

const stats = [
  { value: '26', label: 'Years of Excellence' },
  { value: '48', label: 'Luxury Suites' },
  { value: '4.9', label: 'Average Guest Rating' },
  { value: '12', label: 'International Awards' },
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

export default function AwardsSection() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-cream-100 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-500">
            Recognition
          </span>
          <h2 className="mt-3 font-display text-4xl font-light text-charcoal-900 md:text-6xl">
            Awards &amp; <em className="italic text-gold-500">Accolades</em>
          </h2>
          <div className="mt-5 h-px w-16 bg-gold-400" />
        </div>

        <div className="mb-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award, i) => {
            const Icon = award.icon
            return (
              <div
                key={award.title}
                className={`group border border-charcoal-900/10 bg-white p-8 transition-all duration-700 hover:border-gold-400 hover:shadow-lg ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center border border-gold-400/30 text-gold-500 transition-colors group-hover:border-gold-400 group-hover:bg-gold-400/5">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <p className="font-accent text-[10px] uppercase tracking-[0.25em] text-gold-500">
                  {award.year}
                </p>
                <h3 className="mt-1 font-display text-lg font-light text-charcoal-900">
                  {award.title}
                </h3>
                <p className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-700/50">
                  {award.subtitle}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-charcoal-700/60">
                  {award.description}
                </p>
              </div>
            )
          })}
        </div>

        <div
          className={`grid grid-cols-2 divide-x divide-y divide-charcoal-900/10 border border-charcoal-900/10 bg-charcoal-900 md:grid-cols-4 md:divide-y-0 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <span className="font-display text-5xl font-light text-gold-400">
                {stat.value}
              </span>
              <span className="mt-1 font-accent text-[10px] uppercase tracking-[0.2em] text-cream-200/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
