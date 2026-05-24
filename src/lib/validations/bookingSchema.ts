// src/lib/validations/bookingSchema.ts
import { z } from 'zod'

export const bookingDatesSchema = z
  .object({
    checkIn: z.string().min(1, 'Check-in date is required'),
    checkOut: z.string().min(1, 'Check-out date is required'),
    adults: z.number().min(1, 'At least 1 adult is required').max(10),
    children: z.number().min(0).max(10),
  })
  .refine(
    (data) => {
      if (!data.checkIn || !data.checkOut) return true
      return new Date(data.checkOut) > new Date(data.checkIn)
    },
    { message: 'Check-out must be after check-in', path: ['checkOut'] }
  )

export const guestInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^[+\d\s\-()]+$/, 'Invalid phone number'),
  country: z.string().min(1, 'Country is required'),
  specialRequests: z.string().max(500).optional(),
})

export const createBookingSchema = z.object({
  roomId: z.string().uuid(),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.number().min(1),
  children: z.number().min(0),
  pricePerNight: z.number().positive(),
  totalPrice: z.number().positive(),
  guest: guestInfoSchema,
})

export type BookingDatesFormValues = z.infer<typeof bookingDatesSchema>
export type GuestInfoFormValues = z.infer<typeof guestInfoSchema>
export type CreateBookingPayload = z.infer<typeof createBookingSchema>
