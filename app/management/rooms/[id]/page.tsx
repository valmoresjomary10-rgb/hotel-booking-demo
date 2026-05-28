'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BedType, RoomStatus } from '@/types/room'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

const bedTypes: BedType[] = ['single', 'double', 'queen', 'king', 'twin']
const statuses: RoomStatus[] = ['available', 'booked', 'maintenance']
const amenityOptions = [
  'Free WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Flat Screen TV',
  'Safe', 'Bathrobes', 'Coffee Maker', 'Full Bar', 'Multiple TVs', 'Plunge Pool',
  'Private Terrace', 'Grand Piano', 'Butler Service', 'Private Chef', 'Dedicated Concierge',
  'Airport Transfer', 'Jacuzzi', 'Rain Shower', 'Work Desk',
]

type FormState = {
  name: string; slug: string; description: string
  pricePerNight: number; capacity: number; bedType: BedType
  status: RoomStatus; size: number; floor: number
  featured: boolean; amenities: string[]; images: string[]
}

export default function EditRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [form, setForm] = useState<FormState | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('')

  useEffect(() => {
    fetch(`/api/rooms/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) return
        setForm({
          name: data.name ?? '',
          slug: data.slug ?? '',
          description: data.description ?? '',
          pricePerNight: Number(data.pricePerNight),
          capacity: Number(data.capacity),
          bedType: data.bedType ?? 'queen',
          status: data.status ?? 'available',
          size: Number(data.size),
          floor: Number(data.floor),
          featured: data.featured ?? false,
          amenities: data.amenities ?? [],
          images: data.images ?? [],
        })
      })
  }, [id])

  const set = (key: string, value: unknown) => setForm(f => f ? { ...f, [key]: value } : f)

  const toggleAmenity = (a: string) => {
    const current = form?.amenities ?? []
    set('amenities', current.includes(a) ? current.filter(x => x !== a) : [...current, a])
  }

  const addImage = () => {
    if (!newImageUrl.trim()) return
    set('images', [...(form?.images ?? []), newImageUrl.trim()])
    setNewImageUrl('')
  }

  const removeImage = (index: number) => {
    set('images', (form?.images ?? []).filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    setError('')
    const res = await fetch(`/api/rooms/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/management/rooms')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Failed to save changes.')
      setSaving(false)
    }
  }

  if (!form) return (
    <div className="flex items-center justify-center h-64">
      <p className="font-body text-sm text-charcoal-700/40">Loading room...</p>
    </div>
  )

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/management/rooms" className="text-charcoal-700/40 hover:text-gold-500 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Rooms</p>
          <h2 className="font-display text-3xl text-charcoal-900">Edit Room</h2>
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
              <input value={form.slug} onChange={e => set('slug', e.target.value)}
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
              <input required type="number" value={form.pricePerNight} onChange={e => set('pricePerNight', Number(e.target.value))}
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
            </div>
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Capacity *</label>
              <input required type="number" value={form.capacity} onChange={e => set('capacity', Number(e.target.value))}
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
            </div>
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Size (m²) *</label>
              <input required type="number" value={form.size} onChange={e => set('size', Number(e.target.value))}
                className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
            </div>
            <div>
              <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50 block mb-1.5">Floor</label>
              <input type="number" value={form.floor} onChange={e => set('floor', Number(e.target.value))}
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
          <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40 pb-2 border-b border-cream-200 mb-4">Room Images</p>
          <div className="space-y-3 mb-4">
            {form.images.length === 0 && <p className="font-body text-xs text-charcoal-700/40">No images added yet.</p>}
            {form.images.map((url, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <img src={url} alt="" className="w-16 h-12 object-cover border border-cream-200 shrink-0" onError={e => (e.currentTarget.style.display = 'none')} />
                <p className="font-body text-xs text-charcoal-700/60 truncate flex-1">{url}</p>
                <button type="button" onClick={() => removeImage(i)} className="p-1 text-charcoal-700/30 hover:text-red-500 transition-colors shrink-0">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="url" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
              placeholder="https://example.com/image.jpg"
              className="flex-1 border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
            <button type="button" onClick={addImage}
              className="flex items-center gap-1.5 bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-accent text-[9px] uppercase tracking-widest px-4 py-2 transition-colors">
              <Plus size={12} /> Add
            </button>
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
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
