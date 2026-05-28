'use client'

import { useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { galleryItems, galleryCategories, type GalleryCategory } from './galleryData'

export default function GalleryGridSection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
  }, [filtered.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
  }, [filtered.length])

  return (
    <section className="bg-cream-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              aria-pressed={activeCategory === cat.value}
              aria-label={`Filter by ${cat.label}`}
              className={`font-accent text-xs uppercase tracking-widest px-5 py-2.5 border transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'border-gold-400 bg-gold-400 text-charcoal-900'
                  : 'border-charcoal-900/20 text-charcoal-700 hover:border-gold-400 hover:text-gold-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              aria-label={`View ${item.alt}`}
              className="group relative mb-4 w-full cursor-pointer overflow-hidden break-inside-avoid text-left"
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.thumb}
                alt={item.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal-900/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ZoomIn className="text-gold-400" size={28} strokeWidth={1.5} />
                <p className="mt-2 font-accent text-[10px] uppercase tracking-widest text-cream-200/80">
                  View
                </p>
              </div>
              {/* Gold border on hover */}
              <div className="pointer-events-none absolute inset-0 border border-gold-400/0 transition-all duration-300 group-hover:border-gold-400/60" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-charcoal-900/95"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            aria-label="Close lightbox"
            className="absolute right-6 top-20 text-cream-200/60 transition-colors hover:text-gold-400"
            onClick={closeLightbox}
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* Prev */}
          <button
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-200/60 transition-colors hover:text-gold-400 md:left-8"
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>

          {/* Image */}
          <div
            className="relative mx-16 max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="max-h-[85vh] w-full object-contain shadow-2xl"
            />
            <p className="mt-3 text-center font-accent text-xs uppercase tracking-widest text-cream-200/40">
              {filtered[lightboxIndex].alt}
            </p>
            <p className="mt-1 text-center font-body text-xs text-cream-200/20">
              {lightboxIndex + 1} / {filtered.length}
            </p>
          </div>

          {/* Next */}
          <button
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-200/60 transition-colors hover:text-gold-400 md:right-8"
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </section>
  )
}
