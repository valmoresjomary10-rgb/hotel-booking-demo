'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Tag } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const CATEGORIES = ['Romance', 'Wellness', 'Experience', 'Value', 'Family', 'Seasonal']
const BADGES = ['', 'Most Popular', 'New', 'Best Value', 'Limited']

interface Promotion {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  long_description: string
  category: string
  badge: string | null
  discount: number
  original_price: number
  package_price: number
  valid_from: string
  valid_until: string
  featured: boolean
  inclusions: string[]
  terms: string
}

const empty: Partial<Promotion> = {
  title: '', tagline: '', description: '', long_description: '', category: 'Romance',
  badge: null, discount: 0, original_price: 0, package_price: 0,
  valid_from: '', valid_until: '', featured: false, inclusions: [], terms: '', slug: '',
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ mode: 'add' | 'edit'; data: Partial<Promotion> } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Promotion | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchPromotions() }, [])

  const fetchPromotions = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setPromotions(data)
    setLoading(false)
  }

  const handleSave = async () => {
    if (!modal) return
    setSaving(true)
    const supabase = createClient()
    const slug = modal.data.title?.toLowerCase().replace(/\s+/g, '-') ?? `promo-${Date.now()}`

    if (modal.mode === 'add') {
      await supabase.from('promotions').insert({ ...empty, ...modal.data, slug })
    } else {
      await supabase.from('promotions').update({ ...modal.data, slug }).eq('id', modal.data.id!)
    }
    await fetchPromotions()
    setModal(null)
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    const supabase = createClient()
    await supabase.from('promotions').delete().eq('id', deleteTarget.id)
    await fetchPromotions()
    setDeleteTarget(null)
  }

  const update = (key: string, value: unknown) => {
    setModal(m => m ? { ...m, data: { ...m.data, [key]: value } } : m)
  }

  const statusColor = (p: Promotion) => {
    const expired = p.valid_until && new Date(p.valid_until) < new Date()
    if (expired) return 'text-charcoal-700/30 bg-cream-100'
    if (p.featured) return 'text-gold-500 bg-gold-50'
    return 'text-emerald-600 bg-emerald-50'
  }

  const statusLabel = (p: Promotion) => {
    const expired = p.valid_until && new Date(p.valid_until) < new Date()
    if (expired) return 'Expired'
    if (p.featured) return 'Featured'
    return 'Active'
  }

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-white border border-cream-200 p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-charcoal-700/30 hover:text-charcoal-900 transition-colors">
              <X size={16} />
            </button>
            <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-2">
              {modal.mode === 'add' ? 'New Promotion' : 'Edit Promotion'}
            </p>
            <h3 className="font-display text-2xl text-charcoal-900 mb-6">
              {modal.mode === 'add' ? 'Add Promotion' : modal.data.title}
            </h3>

            <div className="space-y-4">
              {[{ label: 'Title', key: 'title' }, { label: 'Tagline', key: 'tagline' }].map(f => (
                <div key={f.key}>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">{f.label}</label>
                  <input value={(modal.data as Record<string, unknown>)[f.key] as string ?? ''}
                    onChange={e => update(f.key, e.target.value)}
                    className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
              ))}

              <div>
                <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Description</label>
                <textarea value={modal.data.description ?? ''} onChange={e => update('description', e.target.value)} rows={3}
                  className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50 resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Category</label>
                  <select value={modal.data.category ?? 'Romance'} onChange={e => update('category', e.target.value)}
                    className="w-full border border-cream-200 px-3 py-2 font-accent text-[9px] uppercase tracking-widest focus:outline-none focus:border-gold-400/50">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Badge</label>
                  <select value={modal.data.badge ?? ''} onChange={e => update('badge', e.target.value || null)}
                    className="w-full border border-cream-200 px-3 py-2 font-accent text-[9px] uppercase tracking-widest focus:outline-none focus:border-gold-400/50">
                    {BADGES.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Original Price (₱)</label>
                  <input type="number" value={modal.data.original_price ?? 0} onChange={e => update('original_price', Number(e.target.value))}
                    className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Package Price (₱)</label>
                  <input type="number" value={modal.data.package_price ?? 0} onChange={e => update('package_price', Number(e.target.value))}
                    className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Discount (%)</label>
                  <input type="number" value={modal.data.discount ?? 0} onChange={e => update('discount', Number(e.target.value))}
                    className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Valid From</label>
                  <input type="date" value={modal.data.valid_from ?? ''} onChange={e => update('valid_from', e.target.value)}
                    className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
                <div>
                  <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Valid Until</label>
                  <input type="date" value={modal.data.valid_until ?? ''} onChange={e => update('valid_until', e.target.value)}
                    className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
              </div>

              <div>
                <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Terms & Conditions</label>
                <textarea value={modal.data.terms ?? ''} onChange={e => update('terms', e.target.value)} rows={2}
                  className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50 resize-none" />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={modal.data.featured ?? false}
                  onChange={e => update('featured', e.target.checked)} className="accent-gold-500" />
                <label htmlFor="featured" className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/60">Mark as Featured</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)}
                className="flex-1 border border-cream-200 hover:border-charcoal-700/20 font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 text-charcoal-700/60 hover:text-charcoal-900 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-charcoal-900 font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 transition-colors">
                {saving ? 'Saving...' : modal.mode === 'add' ? 'Add Promotion' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white border border-cream-200 p-8 max-w-sm w-full mx-4">
            <button onClick={() => setDeleteTarget(null)} className="absolute top-4 right-4 text-charcoal-700/30 hover:text-charcoal-900 transition-colors">
              <X size={16} />
            </button>
            <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-2">Confirm Delete</p>
            <h3 className="font-display text-2xl text-charcoal-900 mb-2">Delete Promotion?</h3>
            <p className="font-body text-sm text-charcoal-700/60 mb-6">
              This will permanently delete <span className="text-charcoal-900 font-medium">{deleteTarget.title}</span>. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-cream-200 hover:border-charcoal-700/20 font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 text-charcoal-700/60 hover:text-charcoal-900 transition-colors">
                Keep
              </button>
              <button onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Management</p>
          <h2 className="font-display text-3xl text-charcoal-900">Promotions</h2>
        </div>
        <button onClick={() => setModal({ mode: 'add', data: { ...empty } })}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-accent text-[9px] uppercase tracking-widest px-5 py-2.5 transition-colors">
          <Plus size={13} />
          Add Promotion
        </button>
      </div>

      <div className="bg-white border border-cream-200">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-cream-200">
          {['Title', 'Category', 'Price', 'Valid Until', 'Status', ''].map(h => (
            <p key={h} className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">{h}</p>
          ))}
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-cream-100 animate-pulse" />)}
          </div>
        ) : promotions.length === 0 ? (
          <div className="p-12 text-center">
            <Tag size={28} className="text-charcoal-700/20 mx-auto mb-3" />
            <p className="font-body text-sm text-charcoal-700/40">No promotions yet.</p>
          </div>
        ) : (
          promotions.map(offer => (
            <div key={offer.id} className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-4 items-center px-6 py-4 border-b border-cream-200 last:border-0 hover:bg-cream-50 transition-colors">
              <div>
                <p className="font-body text-sm text-charcoal-900 font-medium">{offer.title}</p>
                <p className="font-body text-xs text-charcoal-700/50 truncate max-w-xs">{offer.tagline}</p>
              </div>
              <span className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/50">{offer.category}</span>
              <div className="text-right">
                <p className="font-body text-sm text-charcoal-900">₱{offer.package_price.toLocaleString()}</p>
                {offer.discount > 0 && <p className="font-accent text-[9px] text-gold-500">{offer.discount}% off</p>}
              </div>
              <span className="font-body text-xs text-charcoal-700/50">{offer.valid_until}</span>
              <span className={`font-accent text-[9px] uppercase tracking-widest px-2 py-1 ${statusColor(offer)}`}>
                {statusLabel(offer)}
              </span>
              <div className="flex gap-2">
                <button onClick={() => setModal({ mode: 'edit', data: { ...offer } })}
                  className="text-charcoal-700/30 hover:text-gold-500 transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => setDeleteTarget(offer)}
                  className="text-charcoal-700/30 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
