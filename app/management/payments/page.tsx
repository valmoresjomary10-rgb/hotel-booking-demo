'use client'

import { useState, useEffect } from 'react'
import { CreditCard, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'
import { mockBookings } from '@/constants/bookingData'
import { Booking } from '@/types/booking'

const paymentStatusStyle: Record<string, string> = {
  paid: 'text-emerald-600 bg-emerald-50',
  unpaid: 'text-amber-600 bg-amber-50',
  refunded: 'text-blue-500 bg-blue-50',
}

export default function PaymentsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid' | 'refunded'>('all')

  useEffect(() => {
    const stored = localStorage.getItem('lum_bookings')
    setBookings(stored ? JSON.parse(stored) : mockBookings)
  }, [])

  const totalRevenue = bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.totalPrice, 0)
  const totalUnpaid = bookings.filter(b => b.paymentStatus === 'unpaid').reduce((sum, b) => sum + b.totalPrice, 0)
  const totalRefunded = bookings.filter(b => b.paymentStatus === 'refunded').reduce((sum, b) => sum + b.totalPrice, 0)

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.paymentStatus === filter)

  const stats = [
    { label: 'Total Revenue', value: `₱${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-600' },
    { label: 'Unpaid', value: `₱${totalUnpaid.toLocaleString()}`, icon: Clock, color: 'text-amber-500' },
    { label: 'Refunded', value: `₱${totalRefunded.toLocaleString()}`, icon: XCircle, color: 'text-blue-500' },
    { label: 'Paid Bookings', value: bookings.filter(b => b.paymentStatus === 'paid').length, icon: CheckCircle, color: 'text-emerald-600' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Management</p>
        <h2 className="font-display text-3xl text-charcoal-900">Payments</h2>
        <p className="font-body text-sm text-charcoal-700/40 mt-1">Payment records are managed via PayMongo — this is a read-only overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white border border-cream-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">{stat.label}</p>
                <Icon size={14} className={stat.color} />
              </div>
              <p className="font-display text-2xl text-charcoal-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6">
        {(['all', 'paid', 'unpaid', 'refunded'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`font-accent text-[9px] uppercase tracking-widest px-4 py-2 transition-colors ${
              filter === f
                ? 'bg-charcoal-900 text-cream-50'
                : 'border border-cream-200 text-charcoal-700/50 hover:text-charcoal-900 hover:border-charcoal-700/20'
            }`}>
            {f === 'all' ? `All (${bookings.length})` : `${f} (${bookings.filter(b => b.paymentStatus === f).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-cream-200">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-cream-200">
          {['Code', 'Guest', 'Room', 'Date', 'Amount', 'Status'].map(h => (
            <p key={h} className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">{h}</p>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard size={28} className="text-charcoal-700/20 mx-auto mb-3" />
            <p className="font-body text-sm text-charcoal-700/40">No payments found.</p>
          </div>
        ) : (
          filtered.map(booking => (
            <div key={booking.id}
              className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 items-center px-6 py-4 border-b border-cream-200 last:border-0 hover:bg-cream-50 transition-colors">
              <span className="font-accent text-[10px] tracking-widest text-gold-500">{booking.confirmationCode}</span>
              <div>
                <p className="font-body text-sm text-charcoal-900">{booking.guest.firstName} {booking.guest.lastName}</p>
                <p className="font-body text-xs text-charcoal-700/50">{booking.guest.email}</p>
              </div>
              <span className="font-body text-sm text-charcoal-700/60">{booking.roomName}</span>
              <span className="font-body text-xs text-charcoal-700/50">{booking.checkIn}</span>
              <span className="font-body text-sm text-charcoal-900 font-medium">₱{booking.totalPrice.toLocaleString()}</span>
              <span className={`font-accent text-[9px] uppercase tracking-widest px-2 py-1 ${paymentStatusStyle[booking.paymentStatus]}`}>
                {booking.paymentStatus}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
