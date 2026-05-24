import Link from 'next/link'
import { publicNavLinks } from '@/constants/navigation'
import { siteConfig } from '@/constants/siteConfig'
import Divider from '@/components/ui/Divider'

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-100">
      <div className="container mx-auto pt-16 pb-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h2 className="font-accent text-2xl tracking-widest text-cream-50">
                {siteConfig.name}
              </h2>
              <p className="font-body text-sm text-gold-400 tracking-wider uppercase mt-1">
                {siteConfig.tagline}
              </p>
            </div>
            <p className="font-body text-sm text-cream-200 leading-relaxed max-w-sm">
              Experience the pinnacle of luxury hospitality. Every detail crafted for your comfort and pleasure.
            </p>
            {/* Socials */}
            <div className="flex gap-4">
              <a href={siteConfig.socials.instagram} className="font-accent text-xs tracking-widest text-cream-200 hover:text-gold-400 transition-colors uppercase">
                Instagram
              </a>
              <a href={siteConfig.socials.facebook} className="font-accent text-xs tracking-widest text-cream-200 hover:text-gold-400 transition-colors uppercase">
                Facebook
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-accent text-xs tracking-widest text-gold-400 uppercase">
              Explore
            </h3>
            <ul className="space-y-2">
              {publicNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream-200 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-accent text-xs tracking-widest text-gold-400 uppercase">
              Contact
            </h3>
            <ul className="space-y-3 font-body text-sm text-cream-200">
              <li>{siteConfig.address}</li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold-400 transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-400 transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-cream-200/60 text-xs">
                Check-in: {siteConfig.checkInTime} · Check-out: {siteConfig.checkOutTime}
              </li>
            </ul>
          </div>
        </div>

        <Divider className="border-charcoal-700" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          <p className="font-body text-xs text-cream-200/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="font-body text-xs text-cream-200/50 hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="font-body text-xs text-cream-200/50 hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
