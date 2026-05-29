import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { siteConfig } from '@/constants/siteConfig'

export default function CTASection() {
  return (
    <section className="section-padding bg-white">
      <div className="section-wrapper">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center"
          style={{
            background: 'linear-gradient(135deg, var(--color-blue-50) 0%, var(--color-white) 50%, var(--color-sage-50) 100%)',
            border: '1.5px solid var(--color-blue-100)',
          }}
        >

          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--color-blue-200), transparent)' }}
          />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--color-sage-200), transparent)' }}
          />

          {/* Content */}
          <div className="relative z-10">
            <p className="section-label mb-4">Ready to Visit?</p>
            <h2
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-5"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              Start Planning
              <span className="block text-blue-500">Your Stay Today</span>
            </h2>
            <p
              className="text-base md:text-lg text-gray-500 max-w-xl mx-auto mb-10"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Whether it's a family vacation, a romantic getaway, or a solo
              adventure — we're here to make it memorable.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link href="/booking" className="btn-primary text-base px-8 py-4">
                Book Your Room
                <ArrowRight size={18} />
              </Link>
              <Link href="/rooms" className="btn-secondary text-base px-8 py-4">
                Browse Rooms
              </Link>
            </div>

            {/* Contact nudge */}
            <div className="flex items-center justify-center gap-2">
              <Phone size={14} className="text-gray-400" />
              <p
                className="text-sm text-gray-400"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                Prefer to call? Reach us at{' '}
                
                  href={`tel:${siteConfig.phone}`}
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}