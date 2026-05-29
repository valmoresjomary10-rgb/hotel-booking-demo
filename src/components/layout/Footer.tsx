import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { siteConfig } from '@/constants/siteConfig'
import { publicNavLinks } from '@/constants/navigation'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200">

      {/* Main Footer */}
      <div className="section-wrapper py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {siteConfig.name}
              </span>
            </Link>
            <p
              className="text-sm text-gray-500 leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              A warm, relaxing retreat in the heart of Manila.
              Perfect for families, couples, and every traveler
              looking for comfort and care.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-xl bg-white border border-gray-200 text-gray-400 transition-all duration-200 hover:text-blue-500 hover:border-blue-200"
              >
                <Instagram size={16} />
              </a>
              
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-xl bg-white border border-gray-200 text-gray-400 transition-all duration-200 hover:text-blue-500 hover:border-blue-200"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {publicNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-500 transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Info */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              Your Stay
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Book a Room', href: '/booking' },
                { label: 'View All Rooms', href: '/rooms' },
                { label: 'Special Offers', href: '/offers' },
                { label: 'Amenities', href: '/amenities' },
                { label: 'Gallery', href: '/gallery' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-500 transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-blue-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-600 leading-relaxed">
                  {siteConfig.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-blue-400 shrink-0" />
                
                  href={`tel:${siteConfig.phone}`}
                  className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-blue-400 shrink-0" />
                
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            {/* Check-in / Check-out */}
            <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex justify-between text-xs" style={{ fontFamily: 'var(--font-accent)' }}>
                <div>
                  <p className="text-gray-400 mb-1">Check-in</p>
                  <p className="font-semibold text-gray-700">{siteConfig.checkInTime}</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-right">
                  <p className="text-gray-400 mb-1">Check-out</p>
                  <p className="font-semibold text-gray-700">{siteConfig.checkOutTime}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="section-wrapper py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs text-gray-400"
            style={{ fontFamily: 'var(--font-accent)' }}
          >
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Use', href: '/terms' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-gray-400 hover:text-blue-500 transition-colors"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}