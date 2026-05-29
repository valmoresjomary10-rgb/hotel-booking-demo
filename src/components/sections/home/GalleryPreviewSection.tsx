import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const galleryImages = [
  {
    src: '/images/gallery/gallery-1.jpg',
    alt: 'Hotel lobby',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/images/gallery/gallery-2.jpg',
    alt: 'Swimming pool',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/gallery/gallery-3.jpg',
    alt: 'Deluxe room',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/gallery/gallery-4.jpg',
    alt: 'Restaurant dining',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/gallery/gallery-5.jpg',
    alt: 'Garden terrace',
    span: 'col-span-1 row-span-1',
  },
]

export default function GalleryPreviewSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="section-wrapper">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="section-label">Gallery</p>
            <h2 className="section-heading">
              See It For Yourself
            </h2>
            <p className="section-subheading">
              A glimpse of the spaces, views, and moments
              waiting for you at Hotel Lumière.
            </p>
          </div>
          <Link
            href="/gallery"
            className="btn-secondary text-sm shrink-0 w-fit"
          >
            View Full Gallery
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[480px] md:h-[560px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20
                              transition-all duration-300 rounded-2xl" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full
                              group-hover:translate-y-0 transition-transform duration-300">
                <span
                  className="inline-block bg-white/90 backdrop-blur-sm
                             text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}