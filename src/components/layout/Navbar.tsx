'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { publicNavLinks } from '@/constants/navigation'
import { siteConfig } from '@/constants/siteConfig'
import { cn } from '@/lib/utils/cn'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-sticky transition-all duration-300',
      scrolled
        ? 'bg-cream-50/95 backdrop-blur-sm shadow-sm border-b border-cream-200'
        : 'bg-transparent'
    )}>
      <div className="container mx-auto flex items-center justify-between h-20">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-accent text-xl tracking-widest text-charcoal-900 group-hover:text-gold-500 transition-colors">
            {siteConfig.name}
          </span>
          <span className="font-body text-xs tracking-wider text-gold-500 uppercase">
            {siteConfig.tagline}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-charcoal-700 hover:text-gold-500 transition-colors tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="primary" size="sm">
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={cn('w-6 h-px bg-charcoal-900 transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('w-6 h-px bg-charcoal-900 transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={cn('w-6 h-px bg-charcoal-900 transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-cream-50 border-t border-cream-200 px-6 py-6 flex flex-col gap-4">
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-charcoal-700 hover:text-gold-500 transition-colors py-2 border-b border-cream-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" size="md" className="mt-2 w-full">
            Book Now
          </Button>
        </div>
      )}
    </header>
  )
}
