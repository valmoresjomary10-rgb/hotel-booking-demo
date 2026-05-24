export type GalleryCategory = 'all' | 'rooms' | 'dining' | 'spa' | 'exterior' | 'events'

export interface GalleryItem {
  id: string
  src: string
  thumb: string
  alt: string
  category: GalleryCategory
  span?: 'normal' | 'wide' | 'tall'
}

export const galleryCategories: { label: string; value: GalleryCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Rooms & Suites', value: 'rooms' },
  { label: 'Dining', value: 'dining' },
  { label: 'Spa & Wellness', value: 'spa' },
  { label: 'Exterior', value: 'exterior' },
  { label: 'Events', value: 'events' },
]

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80&auto=format&fit=crop',
    alt: 'Presidential Suite bedroom',
    category: 'rooms',
    span: 'wide',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80&auto=format&fit=crop',
    alt: 'Deluxe suite bathroom',
    category: 'rooms',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80&auto=format&fit=crop',
    alt: 'Hotel pool at sunset',
    category: 'exterior',
    span: 'tall',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop',
    alt: 'Restaurant Lumière fine dining',
    category: 'dining',
    span: 'wide',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80&auto=format&fit=crop',
    alt: 'Lumière Spa treatment room',
    category: 'spa',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80&auto=format&fit=crop',
    alt: 'Hotel exterior at night',
    category: 'exterior',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80&auto=format&fit=crop',
    alt: 'Infinity pool',
    category: 'exterior',
    span: 'wide',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&q=80&auto=format&fit=crop',
    alt: 'Spa massage suite',
    category: 'spa',
    span: 'tall',
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop',
    alt: 'Private dining room',
    category: 'dining',
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80&auto=format&fit=crop',
    alt: 'Grand ballroom event setup',
    category: 'events',
    span: 'wide',
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=600&q=80&auto=format&fit=crop',
    alt: 'Junior suite living area',
    category: 'rooms',
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80&auto=format&fit=crop',
    alt: 'Wedding reception setup',
    category: 'events',
  },
]
