'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, BedDouble, CalendarCheck, Images,
  FileText, Tag, CreditCard, LogOut, Sparkles, Phone,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Dashboard', href: '/management/dashboard', icon: LayoutDashboard },
  { label: 'Rooms', href: '/management/rooms', icon: BedDouble },
  { label: 'Bookings', href: '/management/bookings', icon: CalendarCheck },
  { label: 'Gallery', href: '/management/gallery', icon: Images },
  { label: 'Content', href: '/management/content', icon: FileText },
  { label: 'Promotions', href: '/management/promotions', icon: Tag },
  { label: 'Payments', href: '/management/payments', icon: CreditCard },
  { label: 'Amenities', href: '/management/amenities', icon: Sparkles },
  { label: 'Contact', href: '/management/contact', icon: Phone },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/management-login')
    router.refresh()
  }

  return (
    <>
      <aside className="w-64 shrink-0 bg-gray-900 h-screen flex flex-col">
        <div className="px-6 py-6 border-b border-gray-700">
          <p className="font-accent text-[10px] uppercase tracking-widest text-blue-400/60 mb-0.5">Management</p>
          <p className="font-display text-xl text-white">Hotel Lumière</p>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link key={href} href={href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-body transition-colors ${
                  active ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400/70 hover:text-gray-200 hover:bg-gray-800'
                }`}>
                <Icon aria-hidden="true" size={16} className={active ? 'text-blue-400' : ''} />
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-gray-700">
          <button onClick={() => setShowConfirm(true)}
            aria-label="Sign out of management panel"
            className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-body text-gray-400/50 hover:text-gray-200/70 transition-colors">
            <LogOut aria-hidden="true" size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)} />
          {/* Modal */}
          <div role="dialog" aria-modal="true" aria-labelledby="signout-title" className="relative bg-gray-800 border border-gray-700 p-8 w-full max-w-sm mx-4">
            <h3 id="signout-title" className="font-display text-xl text-white mb-2">Sign Out</h3>
            <p className="font-body text-sm text-gray-300/60 mb-8">
              Are you sure you want to sign out of the management panel?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                aria-label="Cancel sign out"
                className="flex-1 border border-gray-700 text-gray-300/60 hover:text-gray-200 font-accent text-[10px] uppercase tracking-widest py-3 transition-colors">
                Cancel
              </button>
              <button onClick={handleSignOut}
                aria-label="Confirm sign out"
                className="flex-1 bg-blue-500 hover:bg-blue-400 text-gray-900 font-accent text-[10px] uppercase tracking-widest py-3 transition-colors">
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
