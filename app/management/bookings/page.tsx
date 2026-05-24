import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/server'
import { BookingStatus } from '@/types/booking'

type SupabaseBooking = {
  id: string
  confirmation_code: string
  guest_first_name: string
  guest_last_name: string
  guest_email: string
  room_name: string
  check_in: string
  check_out: string
  nights: number
  total_price: number
  status: BookingStatus
  payment_status: string
}

const statusColor = (status: BookingStatus) => {
  if (status === 'confirmed') return 'text-green-700 bg-green-50'
  if (status === 'pending') return 'text-yellow-700 bg-yellow-50'
  if (status === 'completed') return 'text-blue-700 bg-blue-50'
  return 'text-red-600 bg-red-50'
}

const paymentColor = (status: string) => {
  if (status === 'paid') return 'text-green-700 bg-green-50'
  if (status === 'refunded') return 'text-blue-700 bg-blue-50'
  return 'text-red-600 bg-red-50'
}

export default async function ManageBookingsPage() {
  const supabase = await createAdminClient()
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) console.error('Bookings fetch error:', error)

  const all = bookings ?? []

  const counts = {
    all: all.length,
    pending: all.filter(b => b.status === 'pending').length,
    confirmed: all.filter(b => b.status === 'confirmed').length,
    completed: all.filter(b => b.status === 'completed').length,
    cancelled: all.filter(b => b.status === 'cancelled').length,
  }

  return (
    <div>
      <div className="mb-8">
        <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Management</p>
        <h2 className="font-display text-3xl text-charcoal-900">Bookings</h2>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: counts.all },
          { label: 'Pending', value: counts.pending },
          { label: 'Confirmed', value: counts.confirmed },
          { label: 'Completed', value: counts.completed },
        ].map(s => (
          <div key={s.label} className="bg-white border border-cream-200 p-4">
            <p className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">{s.label}</p>
            <p className="font-display text-3xl text-charcoal-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-cream-200 overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-cream-200">
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Code</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Guest</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Room</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Dates</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Total</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Status</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Payment</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {all.length === 0 && (
              <tr><td colSpan={8} className="px-6 py-12 text-center font-body text-sm text-charcoal-700/40">No bookings found.</td></tr>
            )}
            {all.map(b => (
              <tr key={b.id} className="border-b border-cream-200 last:border-0 hover:bg-cream-50 transition-colors">
                <td className="px-6 py-4 font-accent text-[10px] tracking-wider text-gold-500">{b.confirmation_code}</td>
                <td className="px-6 py-4">
                  <p className="font-body text-sm text-charcoal-900">{b.guest_first_name} {b.guest_last_name}</p>
                  <p className="font-body text-xs text-charcoal-700/40">{b.guest_email}</p>
                </td>
                <td className="px-6 py-4 font-body text-sm text-charcoal-700/70">{b.room_name}</td>
                <td className="px-6 py-4">
                  <p className="font-body text-xs text-charcoal-700/70">{b.check_in} → {b.check_out}</p>
                  <p className="font-body text-xs text-charcoal-700/40">{b.nights} night{b.nights > 1 ? 's' : ''}</p>
                </td>
                <td className="px-6 py-4 font-body text-sm text-charcoal-900">₱{Number(b.total_price).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`font-accent text-[9px] uppercase tracking-widest px-2 py-1 ${statusColor(b.status)}`}>{b.status}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-accent text-[9px] uppercase tracking-widest px-2 py-1 ${paymentColor(b.payment_status)}`}>{b.payment_status}</span>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/management/bookings/${b.id}`} className="font-accent text-[9px] uppercase tracking-widest text-gold-500 hover:text-gold-600 transition-colors">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}