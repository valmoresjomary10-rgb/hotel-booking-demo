'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

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

export default function AmenitiesDetailSection() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-charcoal-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div
          ref={ref}
          className={`grid gap-16 lg:grid-cols-2 lg:gap-24 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Left: Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=900&q=85&auto=format&fit=crop"
                alt="Lumière Spa"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute -bottom-4 -right-4 h-full w-full border border-gold-400/30" />
            </div>
            {/* Floating label */}
            <div className="absolute -bottom-6 left-6 bg-gold-400 px-8 py-4">
              <p className="font-accent text-xs uppercase tracking-widest text-charcoal-900">
                Signature Experience
              </p>
              <p className="font-display text-2xl font-light text-charcoal-900">
                The Lumière Ritual
              </p>
            </div>
          </div>

          {/* Right: Text */}
          <div className="flex flex-col justify-center pt-10 lg:pt-0">
            <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-400">
              Featured
            </span>
            <h2 className="mt-3 font-display text-4xl font-light text-cream-50 md:text-5xl">
              The Art of <em className="italic text-gold-400">Restoration</em>
            </h2>
            <div className="mt-5 h-px w-16 bg-gold-400" />

            <p className="mt-8 font-body text-base leading-relaxed text-cream-200/60">
              Our signature 3-hour Lumière Ritual begins with a traditional Filipino
              hilot consultation, followed by a warm coconut shell massage, a
              gold-infused facial, and a private hydrotherapy soak.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-cream-200/60">
              Each ritual is personalised by your therapist and concludes with a
              private rest in our silk-draped recovery suite with complimentary
              herbal teas and fresh tropical fruit.
            </p>

            <div className="mt-10 flex flex-wrap gap-6">
              <div>
                <p className="font-display text-3xl font-light text-gold-400">3hrs</p>
                <p className="font-accent text-[10px] uppercase tracking-widest text-cream-200/40">Duration</p>
              </div>
              <div className="w-px bg-gold-400/20" />
              <div>
                <p className="font-display text-3xl font-light text-gold-400">₱8,500</p>
                <p className="font-accent text-[10px] uppercase tracking-widest text-cream-200/40">Per Person</p>
              </div>
              <div className="w-px bg-gold-400/20" />
              <div>
                <p className="font-display text-3xl font-light text-gold-400">Daily</p>
                <p className="font-accent text-[10px] uppercase tracking-widest text-cream-200/40">Availability</p>
              </div>
            </div>

            <Link
              href="/booking"
              className="mt-10 inline-flex w-fit items-center gap-3 border border-gold-400 px-8 py-4 font-accent text-xs uppercase tracking-widest text-gold-400 transition-all duration-300 hover:bg-gold-400 hover:text-charcoal-900"
            >
              Reserve Your Experience
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
