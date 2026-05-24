'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Stats {
  totalBookings: number
  availableRooms: number
  monthRevenue: number
  pendingPayments: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

      const [bookingsRes, roomsRes, revenueRes, pendingRes] = await Promise.all([
        // Total bookings
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        // Available rooms
        supabase.from('rooms').select('*', { count: 'exact', head: true }).eq('status', 'available'),
        // Revenue this month (confirmed + completed + paid)
        supabase.from('bookings').select('total_price').gte('created_at', monthStart).in('payment_status', ['paid']),
        // Pending payments
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('payment_status', 'unpaid'),
      ])

      const monthRevenue = (revenueRes.data ?? []).reduce((sum, b) => sum + (b.total_price ?? 0), 0)

      setStats({
        totalBookings: bookingsRes.count ?? 0,
        availableRooms: roomsRes.count ?? 0,
        monthRevenue,
        pendingPayments: pendingRes.count ?? 0,
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  const statCards = [
    { label: 'Total Bookings', value: stats ? stats.totalBookings.toString() : '—' },
    { label: 'Rooms Available', value: stats ? stats.availableRooms.toString() : '—' },
    { label: 'Revenue (Month)', value: stats ? `₱${stats.monthRevenue.toLocaleString()}` : '—' },
    { label: 'Pending Payments', value: stats ? stats.pendingPayments.toString() : '—' },
  ]

  return (
    <div>
      <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-2">Overview</p>
      <h2 className="font-display text-3xl text-charcoal-900 mb-8">Welcome back</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(stat => (
          <div key={stat.label} className="bg-white border border-cream-200 p-6">
            <p className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">{stat.label}</p>
            {loading ? (
              <div className="h-9 w-20 bg-cream-100 animate-pulse mt-2" />
            ) : (
              <p className="font-display text-3xl text-charcoal-900 mt-2">{stat.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
