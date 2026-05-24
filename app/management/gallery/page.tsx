'use client'

import { useState, useEffect, useRef } from 'react'
import { Upload, Trash2, X, ImageIcon } from 'lucide-react'
import { mockGalleryImages, galleryCategories, GalleryImage, GalleryCategory } from '@/constants/galleryData'

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all')
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null)
  const [uploadPreview, setUploadPreview] = useState<{ url: string; name: string; category: GalleryCategory } | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('lum_gallery')
    setImages(stored ? JSON.parse(stored) : mockGalleryImages)
  }, [])

  const save = (updated: GalleryImage[]) => {
    setImages(updated)
    localStorage.setItem('lum_gallery', JSON.stringify(updated))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setUploadPreview({ url: reader.result as string, name: file.name.replace(/\.[^/.]+$/, ''), category: 'gallery' })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleUploadConfirm = () => {
    if (!uploadPreview) return
    setUploading(true)
    const newImage: GalleryImage = {
      id: `g${Date.now()}`,
      url: uploadPreview.url,
      name: uploadPreview.name,
      category: uploadPreview.category,
      uploadedAt: new Date().toISOString().split('T')[0],
    }
    setTimeout(() => {
      save([newImage, ...images])
      setUploadPreview(null)
      setUploading(false)
    }, 400)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    save(images.filter(img => img.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  const filtered = activeCategory === 'all' ? images : images.filter(img => img.category === activeCategory)

  return (
    <>
      {/* Upload Modal */}
      {uploadPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm" onClick={() => setUploadPreview(null)} />
          <div className="relative bg-white border border-cream-200 p-8 max-w-md w-full mx-4">
            <button onClick={() => setUploadPreview(null)} className="absolute top-4 right-4 text-charcoal-700/30 hover:text-charcoal-900 transition-colors">
              <X size={16} />
            </button>
            <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-2">New Image</p>
            <h3 className="font-display text-2xl text-charcoal-900 mb-4">Upload Image</h3>
            <img src={uploadPreview.url} alt="preview" className="w-full h-48 object-cover mb-4 border border-cream-200" />
            <div className="space-y-3 mb-6">
              <div>
                <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Name</label>
                <input value={uploadPreview.name} onChange={e => setUploadPreview(p => p ? { ...p, name: e.target.value } : p)}
                  className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
              </div>
              <div>
                <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">Category</label>
                <select value={uploadPreview.category} onChange={e => setUploadPreview(p => p ? { ...p, category: e.target.value as GalleryCategory } : p)}
                  className="w-full border border-cream-200 px-3 py-2 font-accent text-[9px] uppercase tracking-widest focus:outline-none focus:border-gold-400/50">
                  {galleryCategories.filter(c => c.value !== 'all').map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setUploadPreview(null)}
                className="flex-1 border border-cream-200 hover:border-charcoal-700/20 font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 text-charcoal-700/60 hover:text-charcoal-900 transition-colors">
                Cancel
              </button>
              <button onClick={handleUploadConfirm} disabled={uploading}
                className="flex-1 bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-charcoal-900 font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 transition-colors">
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white border border-cream-200 p-8 max-w-sm w-full mx-4">
            <button onClick={() => setDeleteTarget(null)} className="absolute top-4 right-4 text-charcoal-700/30 hover:text-charcoal-900 transition-colors">
              <X size={16} />
            </button>
            <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-2">Confirm Delete</p>
            <h3 className="font-display text-2xl text-charcoal-900 mb-2">Delete Image?</h3>
            <p className="font-body text-sm text-charcoal-700/60 mb-4">
              This will permanently delete <span className="text-charcoal-900 font-medium">{deleteTarget.name}</span>. This cannot be undone.
            </p>
            <img src={deleteTarget.url} alt={deleteTarget.name} className="w-full h-32 object-cover mb-6 border border-cream-200" />
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

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Management</p>
          <h2 className="font-display text-3xl text-charcoal-900">Gallery</h2>
        </div>
        <button onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-accent text-[9px] uppercase tracking-widest px-5 py-2.5 transition-colors">
          <Upload size={13} />
          Upload Image
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 mb-6">
        {galleryCategories.map(cat => (
          <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
            className={`font-accent text-[9px] uppercase tracking-widest px-4 py-2 transition-colors ${
              activeCategory === cat.value
                ? 'bg-charcoal-900 text-cream-50'
                : 'border border-cream-200 text-charcoal-700/50 hover:text-charcoal-900 hover:border-charcoal-700/20'
            }`}>
            {cat.label} {cat.value === 'all' ? `(${images.length})` : `(${images.filter(i => i.category === cat.value).length})`}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-cream-200 p-16 text-center">
          <ImageIcon size={32} className="text-charcoal-700/20 mx-auto mb-3" />
          <p className="font-body text-sm text-charcoal-700/40">No images in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(img => (
            <div key={img.id} className="group relative bg-white border border-cream-200 overflow-hidden">
              <img src={img.url} alt={img.name} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/50 transition-all duration-200 flex items-center justify-center">
                <button onClick={() => setDeleteTarget(img)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-2">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-3 border-t border-cream-200">
                <p className="font-body text-xs text-charcoal-900 truncate">{img.name}</p>
                <p className="font-accent text-[9px] uppercase tracking-widest text-gold-500 mt-0.5">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
