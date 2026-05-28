'use client'

import { useEffect, useRef, useState } from 'react'
import { amenities } from '@/constants/amenityData'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [lightbox, setLightbox] = useState<{ amenityId: string; index: number } | null>(null)

  const openLightbox = (amenityId: string, index: number) => setLightbox({ amenityId, index })
  const closeLightbox = () => setLightbox(null)

  const currentAmenity = lightbox ? amenities.find(a => a.id === lightbox.amenityId) : null
  const currentImages = currentAmenity?.images ?? []

  const prev = () => {
    if (!lightbox) return
    setLightbox({ ...lightbox, index: (lightbox.index - 1 + currentImages.length) % currentImages.length })
  }
  const next = () => {
    if (!lightbox) return
    setLightbox({ ...lightbox, index: (lightbox.index + 1) % currentImages.length })
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  return (
    <>
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
                  key={amenity.id}
                  className={`group overflow-hidden bg-white transition-all duration-700 hover:shadow-xl ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {/* Main image — clickable */}
                  <button
                    onClick={() => openLightbox(amenity.id, 0)}
                    className="relative h-52 w-full overflow-hidden block focus:outline-none focus:ring-2 focus:ring-gold-400"
                    aria-label={`View photos of ${amenity.title}`}
                  >
                    <img
                      src={amenity.images[0].url}
                      alt={amenity.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Tag */}
                    <div className="absolute left-4 top-4 bg-charcoal-900/80 px-3 py-1 backdrop-blur-sm">
                      <span className="font-accent text-[10px] uppercase tracking-widest text-gold-400">
                        {amenity.tag}
                      </span>
                    </div>
                    {/* Photo count badge */}
                    <div className="absolute bottom-4 right-4 bg-charcoal-900/70 px-2.5 py-1 backdrop-blur-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-accent text-[10px] uppercase tracking-widest text-cream-50">
                        {amenity.images.length} Photos
                      </span>
                    </div>
                  </button>

                  {/* Thumbnail strip */}
                  <div className="flex gap-1 px-4 pt-3">
                    {amenity.images.slice(1).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => openLightbox(amenity.id, idx + 1)}
                        className="h-10 w-10 flex-shrink-0 overflow-hidden opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-1 focus:ring-gold-400"
                        aria-label={`View photo ${idx + 2} of ${amenity.title}`}
                      >
                        <img src={img.url} alt={img.caption ?? ''} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-3">
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

      {/* Lightbox */}
      {lightbox && currentAmenity && (
        <div
  className="fixed inset-0 z-[999] flex items-center justify-center bg-charcoal-900/95 backdrop-blur-sm"
  onClick={closeLightbox}
>
  {/* Close */}
  <button
    onClick={(e) => { e.stopPropagation(); closeLightbox() }}
    className="absolute right-6 top-20 text-cream-50/60 hover:text-cream-50 transition-colors z-10 flex items-center gap-2 group"
    aria-label="Close lightbox"
  >
    <X size={28} />
  </button>
          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 text-cream-50/60 hover:text-cream-50 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Image */}
          <div className="mx-16 flex flex-col items-center max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              key={lightbox.index}
              src={currentImages[lightbox.index].url}
              alt={currentImages[lightbox.index].caption ?? ''}
              className="max-h-[70vh] w-full object-contain"
            />
            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="font-accent text-[10px] uppercase tracking-widest text-gold-400">
                {currentAmenity.title}
              </p>
              {currentImages[lightbox.index].caption && (
                <p className="mt-1 font-body text-sm text-cream-200/60">
                  {currentImages[lightbox.index].caption}
                </p>
              )}
              <p className="mt-2 font-body text-xs text-cream-200/30">
                {lightbox.index + 1} / {currentImages.length}
              </p>
            </div>
            {/* Thumbnail strip */}
            <div className="mt-6 flex gap-2">
              {currentImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightbox({ ...lightbox, index: idx })}
                  className={`h-12 w-16 overflow-hidden transition-opacity ${idx === lightbox.index ? 'opacity-100 ring-1 ring-gold-400' : 'opacity-40 hover:opacity-70'}`}
                  aria-label={`Go to photo ${idx + 1}`}
                >
                  <img src={img.url} alt={img.caption ?? ''} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 md:right-8 text-cream-50/60 hover:text-cream-50 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  )
}
