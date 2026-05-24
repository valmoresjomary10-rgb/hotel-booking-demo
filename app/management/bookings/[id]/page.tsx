'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { BookingStatus } from '@/types/booking'
import { ArrowLeft, User, BedDouble, Calendar, CreditCard, MessageSquare, X } from 'lucide-react'
import { use } from 'react'

const bookingStatuses: BookingStatus[] = ['pending', 'confirmed', 'completed', 'cancelled']
const paymentStatuses = ['unpaid', 'paid', 'refunded']

type SupabaseBooking = {
  id: string
  confirmation_code: string
  guest_first_name: string
  guest_last_name: string
  guest_email: string
  guest_phone: string
  guest_country: string
  guest_special_requests?: string
  room_name: string
  price_per_night: number
  adults: number
  children: number
  check_in: string
  check_out: string
  nights: number
  total_price: number
  status: BookingStatus
  payment_status: string
}

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [booking, setBooking] = useState<SupabaseBooking | null>(null)
  const [saving, setSaving] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single()
      if (!error && data) setBooking(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  const updateField = (key: string, value: string) => {
    setBooking(b => b ? { ...b, [key]: value } : b)
  }

  const handleSave = async () => {
    if (!booking) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('bookings').update({
      status: booking.status,
      payment_status: booking.payment_status,
    }).eq('id', id)
    setSaving(false)
    router.push('/management/bookings')
  }

  const handleCancel = async () => {
    const supabase = createClient()
    await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id)
    router.push('/management/bookings')
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="font-body text-sm text-charcoal-700/40">Loading booking...</p>
    </div>
  )

  if (!booking) return (
    <div className="flex items-center justify-center h-64">
      <p className="font-body text-sm text-charcoal-700/40">Booking not found.</p>
    </div>
  )

  const isCancelled = booking.status === 'cancelled'
  const subtotal = booking.price_per_night * booking.nights
  const vat = booking.total_price - subtotal

  return (
    <>
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm" onClick={() => setShowCancelModal(false)} />
          <div className="relative bg-white border border-cream-200 p-8 max-w-sm w-full mx-4">
            <button onClick={() => setShowCancelModal(false)} className="absolute top-4 right-4 text-charcoal-700/30 hover:text-charcoal-900 transition-colors">
              <X size={16} />
            </button>
            <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-2">Confirm Action</p>
            <h3 className="font-display text-2xl text-charcoal-900 mb-2">Cancel Booking?</h3>
            <p className="font-body text-sm text-charcoal-700/60 mb-6">
              This will mark <span className="text-charcoal-900 font-medium">{booking.confirmation_code}</span> as cancelled. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelModal(false)}
                className="flex-1 border border-cream-200 hover:border-charcoal-700/20 font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 text-charcoal-700/60 hover:text-charcoal-900 transition-colors">
                Keep Booking
              </button>
              <button onClick={handleCancel}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 transition-colors">
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/management/bookings" className="text-charcoal-700/40 hover:text-gold-500 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1">
            <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Bookings</p>
            <h2 className="font-display text-3xl text-charcoal-900">{booking.confirmation_code}</h2>
          </div>
          <div className="flex gap-2">
            <select value={booking.status} onChange={e => updateField('status', e.target.value)}
              className="border border-cream-200 px-3 py-2 font-accent text-[9px] uppercase tracking-widest focus:outline-none focus:border-gold-400/50">
              {bookingStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={booking.payment_status} onChange={e => updateField('payment_status', e.target.value)}
              className="border border-cream-200 px-3 py-2 font-accent text-[9px] uppercase tracking-widest focus:outline-none focus:border-gold-400/50">
              {paymentStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={handleSave} disabled={saving}
              className="bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-charcoal-900 font-accent text-[9px] uppercase tracking-widest px-5 py-2 transition-colors">
              {saving ? 'Saving...' : 'Save'}
            </button>
            {!isCancelled && (
              <button onClick={() => setShowCancelModal(true)}
                className="border border-red-200 hover:border-red-400 text-red-400 hover:text-red-500 font-accent text-[9px] uppercase tracking-widest px-5 py-2 transition-colors">
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-cream-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User size={14} className="text-gold-500" />
              <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40">Guest</p>
            </div>
            <p className="font-body text-base text-charcoal-900 font-medium">{booking.guest_first_name} {booking.guest_last_name}</p>
            <p className="font-body text-sm text-charcoal-700/60 mt-1">{booking.guest_email}</p>
            <p className="font-body text-sm text-charcoal-700/60">{booking.guest_phone}</p>
            <p className="font-body text-sm text-charcoal-700/60">{booking.guest_country}</p>
          </div>

          <div className="bg-white border border-cream-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BedDouble size={14} className="text-gold-500" />
              <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40">Room</p>
            </div>
            <p className="font-body text-base text-charcoal-900 font-medium">{booking.room_name}</p>
            <p className="font-body text-sm text-charcoal-700/60 mt-1">{booking.adults} adult{booking.adults > 1 ? 's' : ''}{booking.children > 0 ? `, ${booking.children} child${booking.children > 1 ? 'ren' : ''}` : ''}</p>
            <p className="font-body text-sm text-charcoal-700/60">₱{booking.price_per_night.toLocaleString()} / night</p>
          </div>

          <div className="bg-white border border-cream-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={14} className="text-gold-500" />
              <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40">Stay</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-body text-sm text-charcoal-700/50">Check-in</span>
                <span className="font-body text-sm text-charcoal-900">{booking.check_in}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-sm text-charcoal-700/50">Check-out</span>
                <span className="font-body text-sm text-charcoal-900">{booking.check_out}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-sm text-charcoal-700/50">Nights</span>
                <span className="font-body text-sm text-charcoal-900">{booking.nights}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-cream-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={14} className="text-gold-500" />
              <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40">Payment</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-body text-sm text-charcoal-700/50">Subtotal</span>
                <span className="font-body text-sm text-charcoal-900">₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-sm text-charcoal-700/50">VAT (12%)</span>
                <span className="font-body text-sm text-charcoal-900">₱{vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-cream-200">
                <span className="font-body text-sm font-medium text-charcoal-900">Total</span>
                <span className="font-display text-lg text-charcoal-900">₱{booking.total_price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {booking.guest_special_requests && (
            <div className="bg-white border border-cream-200 p-6 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={14} className="text-gold-500" />
                <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40">Special Requests</p>
              </div>
              <p className="font-body text-sm text-charcoal-700/70 leading-relaxed">{booking.guest_special_requests}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
