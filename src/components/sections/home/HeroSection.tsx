'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import { siteConfig } from '@/constants/siteConfig'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-bg">

      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-blue-200), transparent)' }}
      />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-sage-200), transparent)' }}
      />

      <div className="section-wrapper relative z-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text Content */}
          <div className="flex flex-col">

            {/* Location badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-soft-sm w-fit mb-8">
              <MapPin size={13} className="text-blue-400" />
              <span
                className="text-xs font-medium text-gray-500"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                Manila, Philippines
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              Your Home
              <span className="block text-blue-500">Away From Home</span>
            </h1>

            {/* Subheading */}
            <p
              className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              A warm, relaxing retreat perfect for families, couples, and every
              traveler looking for comfort, care, and a genuine Filipino welcome.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/booking" className="btn-primary text-base px-8 py-4">
                Book Your Stay
                <ArrowRight size={18} />
              </Link>
              <Link href="/rooms" className="btn-secondary text-base px-8 py-4">
                Explore Rooms
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-blue-400 fill-blue-400" />
                  ))}
                </div>
                <span
                  className="text-sm text-gray-500"
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  4.9 / 5.0
                </span>
              </div>
              <div className="w-px h-5 bg-gray-200" />
              <span
                className="text-sm text-gray-400"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                500+ happy guests
              </span>
              <div className="w-px h-5 bg-gray-200" />
              <span
                className="text-sm text-gray-400"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                Free cancellation
              </span>
            </div>

          </div>

          {/* Right — Image */}
          <div className="relative hidden lg:block">

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-soft-xl aspect-[4/5]">
              <Image
                src="/images/hero/hero-main.jpg"
                alt="Hotel Lumière — beautiful room"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating card — Check-in info */}
            <div className="absolute -left-8 bottom-12 bg-white rounded-2xl shadow-soft-lg p-4 w-52">
              <p
                className="text-xs text-gray-400 mb-3"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                Quick Check-in
              </p>
              <div className="flex justify-between text-xs mb-1" style={{ fontFamily: 'var(--font-accent)' }}>
                <span className="text-gray-500">Check-in</span>
                <span className="font-semibold text-gray-800">{siteConfig.checkInTime}</span>
              </div>
              <div className="flex justify-between text-xs" style={{ fontFamily: 'var(--font-accent)' }}>
                <span className="text-gray-500">Check-out</span>
                <span className="font-semibold text-gray-800">{siteConfig.checkOutTime}</span>
              </div>
            </div>

            {/* Floating card — Rating */}
            <div className="absolute -right-4 top-12 bg-white rounded-2xl shadow-soft-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Star size={14} className="text-blue-400 fill-blue-400" />
                <span
                  className="text-sm font-bold text-gray-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  4.9
                </span>
              </div>
              <p
                className="text-xs text-gray-400"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                Guest Rating
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z"
            fill="white"
          />
        </svg>
      </div>

    </section>
  )
}