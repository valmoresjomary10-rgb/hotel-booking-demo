'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Plus, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { BookingStatus } from '@/types/booking'

type Booking = {
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

type Room = {
  id: string
  name: string
  price_per_night: number
  status: string
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

const VAT_RATE = 0.12

function generateCode() {
  return 'LUM-' + Math.random().toString(36).substring(2, 7).toUpperCase()
}

const emptyForm = {
  firstName: '', lastName: '', email: '', phone: '', country: 'Philippines',
  roomId: '', checkIn: '', checkOut: '', adults: 1, children: 0,
  specialRequests: '', paymentStatus: 'unpaid' as string,
}

export default function ManageBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [availability, setAvailability] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle')

  useEffect(() => { fetchData() }, [])

  useEffect(() => {
    if (!form.roomId || !form.checkIn || !form.checkOut || form.checkIn >= form.checkOut) {
      setAvailability('idle')
      return
    }
    setAvailability('checking')
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/rooms/availability?checkIn=${form.checkIn}&checkOut=${form.checkOut}`)
        const data = await res.json()
        const unavailable = (data.unavailableRoomIds ?? []).includes(form.roomId)
        setAvailability(unavailable ? 'unavailable' : 'available')
      } catch { setAvailability('idle') }
    }, 500)
    return () => clearTimeout(timer)
  }, [form.roomId, form.checkIn, form.checkOut])

  const fetchData = async () => {
    setLoading(true)
    const supabase = createClient()
    const [bookingsRes, roomsRes] = await Promise.all([
      fetch('/api/management/bookings').then(r => r.json()),
      supabase.from('rooms').select('id, name, price_per_night, status').order('name'),
    ])
    if (Array.isArray(bookingsRes)) setBookings(bookingsRes)
    if (roomsRes.data) setRooms(roomsRes.data)
    setLoading(false)
  }

  const selectedRoom = rooms.find(r => r.id === form.roomId)

  const calcNights = () => {
    if (!form.checkIn || !form.checkOut) return 0
    const diff = new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)))
  }

  const nights = calcNights()
  const subtotal = (selectedRoom?.price_per_night ?? 0) * nights
  const total = Math.round(subtotal * (1 + VAT_RATE))

  const update = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = async () => {
    if (!selectedRoom || nights === 0 || !form.firstName || !form.email) return
    setSaving(true)

    const res = await fetch('/api/management/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        confirmation_code: generateCode(),
        guest_first_name: form.firstName,
        guest_last_name: form.lastName,
        guest_email: form.email,
        guest_phone: form.phone,
        guest_country: form.country,
        guest_special_requests: form.specialRequests,
        room_id: selectedRoom.id,
        room_name: selectedRoom.name,
        price_per_night: selectedRoom.price_per_night,
        check_in: form.checkIn,
        check_out: form.checkOut,
        nights,
        adults: form.adults,
        children: form.children,
        total_price: total,
        status: 'confirmed',
        payment_status: form.paymentStatus,
        booking_type: 'walk_in',
      }),
    })
    const resJson = await res.json()
    if (!res.ok) { console.error('Booking POST failed:', resJson); setSaving(false); return }

    const supabase = createClient()
    await supabase.from('rooms').update({ status: 'booked' }).eq('id', selectedRoom.id)

    await fetchData()
    setShowModal(false)
    setForm(emptyForm)
    setSaving(false)
    setAvailability('idle')
  }

  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  }

  return (
    <>
      {/* Walk-in Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white border border-cream-200 p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <button onClick={() => { setShowModal(false); setAvailability('idle') }} className="absolute top-4 right-4 text-charcoal-700/30 hover:text-charcoal-900 transition-colors">
              <X size={16} />
            </button>
            <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-2">Walk-in</p>
            <h3 className="font-display text-2xl text-charcoal-900 mb-6">New Booking</h3>

            <div className="space-y-4">
              {/* Guest Info */}
              <p className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 border-b border-cream-200 pb-1">Guest Information</p>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'First Name', key: 'firstName' }, { label: 'Last Name', key: 'lastName' }].map(f => (
                  <div key={f.key}>
                    <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">{f.label}</label>
                    <input value={(form as Record<string, unknown>)[f.key] as string}
                      onChange={e => update(f.key, e.target.value)}
                      className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Email', key: 'email' }, { label: 'Phone', key: 'phone' }].map(f => (
                  <div key={f.key}>
                    <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">{f.label}</label>
                    <input value={(form as Record<string, unknown>)[f.key] as string}
                      onChange={e => update(f.key, e.target.value)}
                      className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                  </div>
                ))}
              </div>
              <div>
                <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Country</label>
                <input value={form.country} onChange={e => update('country', e.target.value)}
                  className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
              </div>

              {/* Availability indicator */}
              {availability === 'checking' && (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-cream-100 border border-cream-200">
                  <div className="h-3 w-3 border border-gold-400 border-t-transparent rounded-full animate-spin shrink-0" />
                  <span className="font-body text-xs text-charcoal-700/60">Checking availability...</span>
                </div>
              )}
              {availability === 'available' && (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-green-50 border border-green-200">
                  <span className="text-green-500 text-sm shrink-0">✓</span>
                  <span className="font-body text-xs text-green-700">Room is available for these dates.</span>
                </div>
              )}
              {availability === 'unavailable' && (
                <div className="px-3 py-2.5 bg-yellow-50 border border-yellow-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-600 text-sm shrink-0">⚠</span>
                    <span className="font-body text-xs text-yellow-800 font-medium">Conflicting booking exists for these dates.</span>
                  </div>
                  <p className="font-body text-xs text-yellow-700/70 ml-5">You can still override and confirm if needed.</p>
                </div>
              )}

              {/* Room & Dates */}
              <p className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 border-b border-cream-200 pb-1 pt-2">Room & Stay</p>
              <div>
                <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Room</label>
                <select value={form.roomId} onChange={e => update('roomId', e.target.value)}
                  className="w-full border border-cream-200 px-3 py-2 font-accent text-[9px] uppercase tracking-widest focus:outline-none focus:border-gold-400/50">
                  <option value="">Select a room</option>
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} — ₱{r.price_per_night.toLocaleString()}/night
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Check-in</label>
                  <input type="date" value={form.checkIn} onChange={e => update('checkIn', e.target.value)}
                    className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Check-out</label>
                  <input type="date" value={form.checkOut} onChange={e => update('checkOut', e.target.value)}
                    className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Adults</label>
                  <input type="number" min={1} value={form.adults} onChange={e => update('adults', Number(e.target.value))}
                    className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Children</label>
                  <input type="number" min={0} value={form.children} onChange={e => update('children', Number(e.target.value))}
                    className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
              </div>

              {/* Payment */}
              <p className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 border-b border-cream-200 pb-1 pt-2">Payment</p>
              <div>
                <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Payment Status</label>
                <select value={form.paymentStatus} onChange={e => update('paymentStatus', e.target.value)}
                  className="w-full border border-cream-200 px-3 py-2 font-accent text-[9px] uppercase tracking-widest focus:outline-none focus:border-gold-400/50">
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              {/* Special Requests */}
              <div>
                <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Special Requests</label>
                <textarea value={form.specialRequests} onChange={e => update('specialRequests', e.target.value)} rows={2}
                  className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50 resize-none" />
              </div>

              {/* Price Summary */}
              {nights > 0 && selectedRoom && (
                <div className="bg-cream-50 border border-cream-200 p-4 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-body text-xs text-charcoal-700/50">₱{selectedRoom.price_per_night.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
                    <span className="font-body text-xs text-charcoal-900">₱{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-xs text-charcoal-700/50">VAT (12%)</span>
                    <span className="font-body text-xs text-charcoal-900">₱{(total - subtotal).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-cream-200">
                    <span className="font-accent text-[9px] uppercase tracking-widest text-charcoal-900">Total</span>
                    <span className="font-display text-lg text-charcoal-900">₱{total.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 border border-cream-200 hover:border-charcoal-700/20 font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 text-charcoal-700/60 hover:text-charcoal-900 transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={saving || !selectedRoom || nights === 0 || !form.firstName || !form.email}
                className={`flex-1 ${availability === 'unavailable' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gold-500 hover:bg-gold-600'} disabled:opacity-50 text-charcoal-900 font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 transition-colors`}>
                {saving ? 'Creating...' : availability === 'unavailable' ? 'Override & Confirm' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Management</p>
          <h2 className="font-display text-3xl text-charcoal-900">Bookings</h2>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-accent text-[9px] uppercase tracking-widest px-5 py-2.5 transition-colors">
          <Plus size={13} />
          New Booking
        </button>
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
            {loading ? <div className="h-9 w-12 bg-cream-100 animate-pulse mt-1" /> : (
              <p className="font-display text-3xl text-charcoal-900 mt-1">{s.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-cream-200 overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-cream-200">
              {['Code', 'Guest', 'Room', 'Dates', 'Total', 'Status', 'Payment', ''].map(h => (
                <th key={h} className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="px-6 py-12 text-center font-body text-sm text-charcoal-700/40">Loading...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td colSpan={8} className="px-6 py-12 text-center font-body text-sm text-charcoal-700/40">No bookings found.</td></tr>
            ) : bookings.map(b => (
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
    </>
  )
}
