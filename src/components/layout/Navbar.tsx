'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { publicNavLinks } from '@/constants/navigation'
import { siteConfig } from '@/constants/siteConfig'
import { cn } from '@/lib/utils/cn'
import Button from '@/components/ui/Button'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-cream-50 focus:font-accent focus:text-sm focus:tracking-widest focus:uppercase"
      >
        Skip to main content
      </a>

      <header className={cn(
        'fixed top-0 left-0 right-0 z-sticky transition-all duration-300',
        scrolled
          ? 'bg-cream-50/95 backdrop-blur-sm shadow-sm border-b border-cream-200'
          : 'bg-transparent'
      )}>
        <div className="container mx-auto flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group" aria-label="Hotel Lumière — Home">
            <span className="font-accent text-xl tracking-widest text-charcoal-900 group-hover:text-gold-500 transition-colors">
              {siteConfig.name}
            </span>
            <span className="font-body text-xs tracking-wider text-gold-500 uppercase">
              {siteConfig.tagline}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className="font-body text-sm text-charcoal-700 hover:text-gold-500 transition-colors tracking-wide relative group focus-visible:outline-none focus-visible:text-gold-500"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/booking">
              <Button variant="primary" size="sm">Book Now</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={cn('w-6 h-px bg-charcoal-900 transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('w-6 h-px bg-charcoal-900 transition-all duration-300', menuOpen && 'opacity-0')} />
            <span className={cn('w-6 h-px bg-charcoal-900 transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
          </button>
        </div>

        {/* Mobile Menu */}
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          className={cn(
            'lg:hidden bg-cream-50 border-t border-cream-200 px-6 py-6 flex flex-col gap-4',
            menuOpen ? 'block' : 'hidden'
          )}
        >
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-charcoal-700 hover:text-gold-500 transition-colors py-2 border-b border-cream-200 focus-visible:outline-none focus-visible:text-gold-500"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/booking" className="mt-2">
            <Button variant="primary" size="md" className="w-full">Book Now</Button>
          </Link>
        </nav>
      </header>
    </>
  )
}
