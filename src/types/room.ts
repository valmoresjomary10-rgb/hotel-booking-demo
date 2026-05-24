export type BedType = 'single' | 'double' | 'queen' | 'king' | 'twin'
export type RoomStatus = 'available' | 'booked' | 'maintenance'

export interface Room {
  id: string
  slug: string
  name: string
  description: string
  pricePerNight: number
  capacity: number
  bedType: BedType
  amenities: string[]
  images: string[]
  status: RoomStatus
  rating: number
  reviewCount: number
  size: number
  floor?: number
  featured: boolean
  createdAt: string
  updatedAt: string
}
