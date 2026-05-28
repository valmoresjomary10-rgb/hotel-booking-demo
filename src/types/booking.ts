// src/types/booking.ts

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'

export interface GuestInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  specialRequests?: string
}

export interface BookingDates {
  checkIn: string   // ISO date string yyyy-MM-dd
  checkOut: string  // ISO date string yyyy-MM-dd
  nights: number
}

export interface BookingGuests {
  adults: number
  children: number
}

export interface Booking {
  id: string
  confirmationCode: string
  roomId: string
  roomName: string
  room?: {
    id: string
    name: string
    slug: string
    images: string[]
    pricePerNight: number
    bedType: string
    capacity: number
  }
  guest: GuestInfo
  checkIn: string
  checkOut: string
  nights: number
  adults: number
  children: number
  pricePerNight: number
  totalPrice: number
  status: BookingStatus
  paymentStatus: PaymentStatus
  createdAt: string
}

// Step-by-step booking form state
export interface BookingFormState {
  step: 1 | 2 | 3
  roomId: string
  roomName: string
  roomSlug: string
  roomImage: string
  pricePerNight: number
  bedType: string
  capacity: number
  checkIn: string
  checkOut: string
  nights: number
  adults: number
  children: number
  guest: GuestInfo
}

export type BookingFormAction =
  | { type: 'SET_DATES'; payload: { checkIn: string; checkOut: string; nights: number } }
  | { type: 'SET_GUESTS'; payload: { adults: number; children: number } }
  | { type: 'SET_GUEST_INFO'; payload: GuestInfo }
  | { type: 'SET_STEP'; payload: 1 | 2 | 3 }
  | { type: 'RESET' }
