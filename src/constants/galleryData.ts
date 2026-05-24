export type GalleryCategory = 'rooms' | 'amenities' | 'hero' | 'gallery'

export interface GalleryImage {
  id: string
  url: string
  name: string
  category: GalleryCategory
  uploadedAt: string
}

export const galleryCategories: { value: GalleryCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'rooms', label: 'Rooms' },
  { value: 'amenities', label: 'Amenities' },
  { value: 'hero', label: 'Hero' },
  { value: 'gallery', label: 'Gallery' },
]

export const mockGalleryImages: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', name: 'Deluxe Room View', category: 'rooms', uploadedAt: '2024-01-01' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', name: 'Suite Interior', category: 'rooms', uploadedAt: '2024-01-02' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', name: 'Hotel Pool', category: 'amenities', uploadedAt: '2024-01-03' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800', name: 'Spa Treatment', category: 'amenities', uploadedAt: '2024-01-04' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', name: 'Hotel Exterior', category: 'hero', uploadedAt: '2024-01-05' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', name: 'Lobby Area', category: 'gallery', uploadedAt: '2024-01-06' },
]
