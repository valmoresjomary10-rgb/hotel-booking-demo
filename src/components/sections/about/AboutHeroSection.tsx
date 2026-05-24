'use client'

import { useEffect, useRef } from 'react'

export default function AboutHeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrollY = window.scrollY
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=85&auto=format&fit=crop"
          alt="Hotel Lumière exterior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/40 to-charcoal-900/80" />
      </div>

      <div className="pointer-events-none absolute inset-8 hidden border border-gold-400/20 md:block" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-in mb-6 flex items-center gap-3">
          <span className="h-px w-12 bg-gold-400" />
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-400">
            Our Story
          </span>
          <span className="h-px w-12 bg-gold-400" />
        </div>

        <h1
          className="animate-fade-in font-display text-5xl font-light leading-tight text-cream-50 md:text-7xl lg:text-8xl"
          style={{ animationDelay: '150ms' }}
        >
          A Legacy of
          <br />
          <em className="italic text-gold-400">Refined Luxury</em>
        </h1>

        <p
          className="animate-fade-in mt-6 max-w-xl font-body text-base leading-relaxed text-cream-200/70 md:text-lg"
          style={{ animationDelay: '300ms' }}
        >
          Since 1998, Hotel Lumière has been Manila's most celebrated sanctuary —
          where timeless elegance meets heartfelt Filipino hospitality.
        </p>

        <div
          className="animate-fade-in absolute bottom-10 flex flex-col items-center gap-2"
          style={{ animationDelay: '600ms' }}
        >
          <span className="font-accent text-[10px] uppercase tracking-widest text-cream-200/40">
            Scroll
          </span>
          <div className="h-10 w-px animate-pulse bg-gradient-to-b from-gold-400/60 to-transparent" />
        </div>
      </div>
    </section>
  )
}
