'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { publicNavLinks } from '@/constants/navigation'
import { siteConfig } from '@/constants/siteConfig'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100'
            : 'bg-white/80 backdrop-blur-sm'
          }
        `}
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="section-wrapper h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/rooms" className="flex flex-col leading-none group">
            <span
            className="text-xl font-bold tracking-tight text-blue-500 transition-colors group-hover:text-blue-600"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {siteConfig.name}
            </span>
            <span
              className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-0.5"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              {siteConfig.tagline}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-auto mr-3">
            {publicNavLinks.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
  relative px-4 py-2 rounded-lg text-sm font-medium
  transition-all duration-200
  ${isActive
                      ? 'text-blue-500 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-soft-xl
          transform transition-transform duration-300 ease-smooth md:hidden
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <span
          className="text-lg font-bold text-blue-500"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {siteConfig.name}
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="px-4 py-4 flex flex-col gap-1">
          {publicNavLinks.map((link) => {
            const isActive = pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'text-blue-500 bg-blue-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Drawer CTA */}
        <div className="px-4 pt-2">
          <Link
            href="/contact"
            className="btn-primary w-full text-sm justify-center"
          >
            Contact Us
          </Link>
        </div>

        {/* Drawer Footer */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <p className="text-xs text-gray-400 text-center" style={{ fontFamily: 'var(--font-accent)' }}>
            {siteConfig.phone}
          </p>
        </div>
      </div>
    </>
  )
}