'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, BedDouble, CalendarCheck, Images,
  FileText, Tag, CreditCard, LogOut,
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
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/management-login')
    router.refresh()
  }

  return (
    <aside className="w-64 shrink-0 bg-charcoal-900 h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-charcoal-700">
        <p className="font-accent text-[10px] uppercase tracking-widest text-gold-400/60 mb-0.5">Management</p>
        <p className="font-display text-xl text-cream-50">Hotel Lumière</p>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-body transition-colors ${
                active ? 'bg-gold-500/10 text-gold-400' : 'text-cream-200/50 hover:text-cream-200 hover:bg-charcoal-800'
              }`}>
              <Icon size={16} className={active ? 'text-gold-400' : ''} />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="px-3 py-4 border-t border-charcoal-700">
        <button onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-body text-cream-200/40 hover:text-cream-200/70 transition-colors">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
