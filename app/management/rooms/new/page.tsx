'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BedType, RoomStatus } from '@/types/room'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const bedTypes: BedType[] = ['single', 'double', 'queen', 'king', 'twin']
const statuses: RoomStatus[] = ['available', 'booked', 'maintenance']
const amenityOptions = [
  'Free WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Flat Screen TV',
  'Safe', 'Bathrobes', 'Coffee Maker', 'Full Bar', 'Multiple TVs', 'Plunge Pool',
  'Private Terrace', 'Grand Piano', 'Butler Service', 'Private Chef', 'Dedicated Concierge',
  'Airport Transfer', 'Jacuzzi', 'Rain Shower', 'Work Desk',
]

export default function NewRoomPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', slug: '', description: '', pricePerNight: '',
    capacity: '2', bedType: 'queen' as BedType, status: 'available' as RoomStatus,
    size: '', floor: '', featured: false, amenities: [] as string[],
    rating: '5.0', reviewCount: '0',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }))

  const toggleAmenity = (a: string) => {
    set('amenities', form.amenities.includes(a)
      ? form.amenities.filter(x => x !== a)
      : [...form.amenities, a])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const res = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        pricePerNight: Number(form.pricePerNight),
        capacity: Number(form.capacity),
        size: Number(form.size),
        floor: Number(form.floor),
        rating: Number(form.rating),
        reviewCount: Number(form.reviewCount),
      }),
    })
    if (res.ok) {
      router.push('/management/rooms')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Failed to save room.')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/management/rooms" className="text-charcoal-700/40 hover:text-gold-500 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Rooms</p>
          <h2 className="font-display text-3xl text-charcoal-900">Add New Room</h2>
        </div>
      </div>

      {error && <p className="mb-4 px-4 py-3 bg-red-50 border border-red-200 font-body text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-cream-200 p-6 space-y-4">
          <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40 pb-2 border-b border-cream-200">Basic Info</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Room Name *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)}
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
            </div>
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Slug</label>
              <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="auto-generated"
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
            </div>
          </div>
          <div>
            <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Description *</label>
            <textarea required value={form.description} onChange={e => set('description', e.target.value)} rows={3}
              className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50 resize-none" />
          </div>
        </div>

        <div className="bg-white border border-cream-200 p-6 space-y-4">
          <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40 pb-2 border-b border-cream-200">Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Price per Night (₱) *</label>
              <input required type="number" value={form.pricePerNight} onChange={e => set('pricePerNight', e.target.value)}
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
            </div>
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Capacity *</label>
              <input required type="number" value={form.capacity} onChange={e => set('capacity', e.target.value)}
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
            </div>
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Size (m²) *</label>
              <input required type="number" value={form.size} onChange={e => set('size', e.target.value)}
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
            </div>
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Floor</label>
              <input type="number" value={form.floor} onChange={e => set('floor', e.target.value)}
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
            </div>
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Bed Type</label>
              <select value={form.bedType} onChange={e => set('bedType', e.target.value)}
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50">
                {bedTypes.map(b => <option key={b} value={b} className="capitalize">{b}</option>)}
              </select>
            </div>
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50">
                {statuses.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="accent-gold-500" />
            <label htmlFor="featured" className="font-body text-sm text-charcoal-700/70">Featured room (shown on homepage)</label>
          </div>
        </div>

        <div className="bg-white border border-cream-200 p-6">
          <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40 pb-2 border-b border-cream-200 mb-4">Amenities</p>
          <div className="grid grid-cols-2 gap-2">
            {amenityOptions.map(a => (
              <label key={a} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.amenities.includes(a)} onChange={() => toggleAmenity(a)} className="accent-gold-500" />
                <span className="font-body text-sm text-charcoal-700/70">{a}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <Link href="/management/rooms" className="font-body text-sm text-charcoal-700/50 hover:text-charcoal-900 px-5 py-3 transition-colors">Cancel</Link>
          <button type="submit" disabled={saving}
            className="bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-charcoal-900 font-accent text-[10px] uppercase tracking-widest px-8 py-3 transition-colors">
            {saving ? 'Saving...' : 'Save Room'}
          </button>
        </div>
      </form>
    </div>
  )
}
