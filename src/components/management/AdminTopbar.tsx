'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const pageTitles: Record<string, string> = {
  '/management/dashboard': 'Dashboard',
  '/management/rooms': 'Rooms',
  '/management/bookings': 'Bookings',
  '/management/gallery': 'Gallery',
  '/management/content': 'Content',
  '/management/promotions': 'Promotions',
  '/management/payments': 'Payments',
}

export default function AdminTopbar() {
  const pathname = usePathname()

  const title = Object.entries(pageTitles).find(([key]) =>
    pathname === key || pathname.startsWith(key + '/')
  )?.[1] ?? 'Management'

  return (
    <header className="h-14 bg-white border-b border-cream-200 flex items-center justify-between px-6 shrink-0">
      <h1 className="font-display text-lg text-charcoal-900">{title}</h1>
      <Link
        href="/"
        target="_blank"
        aria-label="View public site (opens in new tab)"
        className="flex items-center gap-1.5 font-body text-xs text-charcoal-700/40 hover:text-gold-500 transition-colors"
      >
        <ExternalLink aria-hidden="true" size={12} />
        View Site
      </Link>
    </header>
  )
}
