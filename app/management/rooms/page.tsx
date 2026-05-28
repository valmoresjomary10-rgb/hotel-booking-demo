'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, BedDouble } from 'lucide-react'

type Room = {
  id: string
  name: string
  slug: string
  size: number
  floor: number
  bedType: string
  pricePerNight: number
  capacity: number
  status: string
  featured: boolean
}

export default function ManageRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRooms = async () => {
    setLoading(true)
    const res = await fetch('/api/rooms')
    const data = await res.json()
    setRooms(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { fetchRooms() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this room? This cannot be undone.')) return
    const res = await fetch(`/api/rooms/${id}`, { method: 'DELETE' })
    if (res.ok) fetchRooms()
    else alert('Failed to delete room.')
  }

  const statusColor = (status: string) => {
    if (status === 'available') return 'text-green-600 bg-green-50'
    if (status === 'booked') return 'text-gold-600 bg-gold-50'
    return 'text-red-500 bg-red-50'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Management</p>
          <h2 className="font-display text-3xl text-charcoal-900">Rooms</h2>
        </div>
        <Link
          href="/management/rooms/new"
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-accent text-[10px] uppercase tracking-widest px-5 py-3 transition-colors"
        >
          <Plus size={14} /> Add Room
        </Link>
      </div>

      <div className="bg-white border border-cream-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cream-200">
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Room</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Type</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Price/Night</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Capacity</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Status</th>
              <th className="text-left px-6 py-3 font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">Featured</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center font-body text-sm text-charcoal-700/40">Loading...</td></tr>
            ) : rooms.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center font-body text-sm text-charcoal-700/40">No rooms found.</td></tr>
            ) : rooms.map(room => (
              <tr key={room.id} className="border-b border-cream-200 last:border-0 hover:bg-cream-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-charcoal-900 flex items-center justify-center shrink-0">
                      <BedDouble size={14} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="font-body text-sm text-charcoal-900">{room.name}</p>
                      <p className="font-body text-xs text-charcoal-700/40">{room.size} m² · Floor {room.floor}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-body text-sm text-charcoal-700/70 capitalize">{room.bedType}</td>
                <td className="px-6 py-4 font-body text-sm text-charcoal-900">₱{Number(room.pricePerNight).toLocaleString()}</td>
                <td className="px-6 py-4 font-body text-sm text-charcoal-700/70">{room.capacity} guests</td>
                <td className="px-6 py-4">
                  <span className={`font-accent text-[9px] uppercase tracking-widest px-2 py-1 ${statusColor(room.status)}`}>
                    {room.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-body text-sm text-charcoal-700/70">
                  {room.featured ? '✓' : '—'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/management/rooms/${room.id}`} className="p-2 text-charcoal-700/40 hover:text-gold-500 transition-colors">
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => handleDelete(room.id)} className="p-2 text-charcoal-700/40 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
