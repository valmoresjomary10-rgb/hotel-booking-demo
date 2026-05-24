export interface Offer {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  longDescription: string
  category: string
  badge: string | null
  discount: number
  originalPrice: number
  packagePrice: number
  validFrom: string
  validUntil: string
  featured: boolean
  inclusions: string[]
  terms: string
}
