'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface RoomImageSlideshowProps {
  images: string[]
  roomName: string
}

export default function RoomImageSlideshow({ images, roomName }: RoomImageSlideshowProps) {
  const [current, setCurrent] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const prev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrent(i => (i === 0 ? images.length - 1 : i - 1))
  }, [images.length])

  const next = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrent(i => (i === images.length - 1 ? 0 : i + 1))
  }, [images.length])

  const prevLightbox = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setLightboxIndex(i => (i === 0 ? images.length - 1 : i - 1))
  }, [images.length])

  const nextLightbox = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setLightboxIndex(i => (i === images.length - 1 ? 0 : i + 1))
  }, [images.length])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, prevLightbox, nextLightbox])

  return (
    <>
      {/* Main Slideshow */}
      <div className="relative w-full h-[60vh] min-h-[400px] bg-charcoal-900 overflow-hidden group">
        {/* Main Image */}
        <button
          onClick={() => openLightbox(current)}
          className="absolute inset-0 w-full h-full cursor-zoom-in"
          aria-label={`View ${roomName} photo ${current + 1} fullscreen`}
        >
          <Image
            src={images[current]}
            alt={`${roomName} — photo ${current + 1}`}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/20 to-transparent" />
          {/* Zoom hint */}
          <span className="absolute top-4 right-4 bg-charcoal-900/60 text-cream-50 font-accent text-[10px] tracking-widest uppercase px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to expand
          </span>
        </button>

        {/* Prev / Next */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-charcoal-900/60 hover:bg-gold-500 text-cream-50 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-charcoal-900/60 hover:bg-gold-500 text-cream-50 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Next image"
        >
          ›
        </button>

        {/* Counter */}
        <div className="absolute bottom-20 right-4 z-10 bg-charcoal-900/60 text-cream-50 font-accent text-xs tracking-widest px-3 py-1">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 px-0 py-3 bg-charcoal-800 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative flex-shrink-0 w-20 h-14 overflow-hidden transition-all duration-200 ${
              i === current
                ? 'ring-2 ring-gold-400 opacity-100'
                : 'opacity-50 hover:opacity-80'
            }`}
            aria-label={`Go to photo ${i + 1}`}
          >
            <Image
              src={img}
              alt={`${roomName} thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-charcoal-900/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-cream-50 font-accent text-xs tracking-widest uppercase bg-charcoal-800/80 hover:bg-gold-500 px-4 py-2 transition-colors"
            aria-label="Close lightbox"
          >
            Close ✕
          </button>

          {/* Counter */}
          <span className="absolute top-4 left-1/2 -translate-x-1/2 font-accent text-xs tracking-widest text-cream-200/60 uppercase">
            {lightboxIndex + 1} / {images.length}
          </span>

          {/* Prev */}
          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-charcoal-800/80 hover:bg-gold-500 text-cream-50 text-2xl flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl mx-16 aspect-[16/9]"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${roomName} — photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Next */}
          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-charcoal-800/80 hover:bg-gold-500 text-cream-50 text-2xl flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            ›
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setLightboxIndex(i) }}
                className={`relative w-16 h-10 overflow-hidden transition-all ${
                  i === lightboxIndex ? 'ring-2 ring-gold-400 opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
