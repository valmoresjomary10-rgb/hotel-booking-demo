// src/components/booking/BookingDateSelector.tsx
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, differenceInCalendarDays, addDays } from 'date-fns'
import { Calendar, ChevronRight, CheckCircle, XCircle, Loader } from 'lucide-react'
import { bookingDatesSchema, type BookingDatesFormValues } from '@/lib/validations/bookingSchema'

interface BookingDateSelectorProps {
  roomId?: string
  initialValues?: {
    checkIn: string
    checkOut: string
    adults: number
    children: number
    nights: number
  }
  onSubmit: (values: BookingDatesFormValues & { nights: number }) => void
}

const today = format(new Date(), 'yyyy-MM-dd')
const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd')

export default function BookingDateSelector({
  roomId,
  initialValues,
  onSubmit,
}: BookingDateSelectorProps) {
  const [availability, setAvailability] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingDatesFormValues>({
    resolver: zodResolver(bookingDatesSchema),
    defaultValues: {
      checkIn: initialValues?.checkIn || today,
      checkOut: initialValues?.checkOut || tomorrow,
      adults: initialValues?.adults || 1,
      children: initialValues?.children || 0,
    },
  })

  const checkIn = watch('checkIn')
  const checkOut = watch('checkOut')

  const nights =
    checkIn && checkOut
      ? Math.max(0, differenceInCalendarDays(new Date(checkOut), new Date(checkIn)))
      : 0

  // Check availability whenever dates change
  useEffect(() => {
    if (!roomId || !checkIn || !checkOut || nights <= 0) {
      setAvailability('idle')
      return
    }
    setAvailability('checking')
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/rooms/availability?checkIn=${checkIn}&checkOut=${checkOut}`
        )
        const data = await res.json()
        const unavailable = (data.unavailableRoomIds ?? []).includes(roomId)
        setAvailability(unavailable ? 'unavailable' : 'available')
      } catch {
        setAvailability('idle')
      }
    }, 500) // debounce 500ms
    return () => clearTimeout(timer)
  }, [roomId, checkIn, checkOut, nights])

  const handleFormSubmit = (values: BookingDatesFormValues) => {
    onSubmit({ ...values, nights })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Date fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Check-in */}
        <div className="space-y-2">
          <label htmlFor="checkIn" className="block text-xs tracking-widest uppercase font-accent text-gold-400">
            Check-In
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-500/60 pointer-events-none" />
            <input
              id="checkIn"
              type="date"
              min={today}
              aria-describedby={errors.checkIn ? 'checkIn-error' : undefined}
              {...register('checkIn')}
              className={`
                w-full bg-charcoal-800 border pl-10 pr-4 py-3 text-cream-100 text-sm
                font-body rounded-sm outline-none transition-colors
                focus:border-gold-400 placeholder:text-charcoal-700
                ${errors.checkIn ? 'border-red-500/60' : 'border-charcoal-700'}
              `}
            />
          </div>
          {errors.checkIn && (
            <p id="checkIn-error" role="alert" className="text-xs text-red-400">{errors.checkIn.message}</p>
          )}
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <label htmlFor="checkOut" className="block text-xs tracking-widest uppercase font-accent text-gold-400">
            Check-Out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-500/60 pointer-events-none" />
            <input
              id="checkOut"
              type="date"
              min={checkIn || tomorrow}
              aria-describedby={errors.checkOut ? 'checkOut-error' : undefined}
              {...register('checkOut')}
              className={`
                w-full bg-charcoal-800 border pl-10 pr-4 py-3 text-cream-100 text-sm
                font-body rounded-sm outline-none transition-colors
                focus:border-gold-400
                ${errors.checkOut ? 'border-red-500/60' : 'border-charcoal-700'}
              `}
            />
          </div>
          {errors.checkOut && (
            <p id="checkOut-error" role="alert" className="text-xs text-red-400">{errors.checkOut.message}</p>
          )}
        </div>
      </div>

      {/* Nights indicator */}
      {nights > 0 && (
        <div className="flex items-center gap-3 py-3 px-4 bg-gold-500/10 border border-gold-500/20 rounded-sm">
          <div className="h-px flex-1 bg-gold-500/20" />
          <span className="text-xs tracking-widest uppercase font-accent text-gold-400">
            {nights} {nights === 1 ? 'Night' : 'Nights'}
          </span>
          <div className="h-px flex-1 bg-gold-500/20" />
        </div>
      )}

      {/* Availability status */}
      {availability === 'checking' && (
        <div role="status" aria-live="polite" className="flex items-center gap-3 py-3 px-4 bg-charcoal-800 border border-charcoal-700 rounded-sm">
          <Loader className="h-4 w-4 text-gold-400 animate-spin" aria-hidden="true" />
          <p className="font-body text-sm text-cream-100/60">Checking availability...</p>
        </div>
      )}
      {availability === 'available' && (
        <div role="status" aria-live="polite" className="flex items-center gap-3 py-3 px-4 bg-green-900/20 border border-green-500/30 rounded-sm">
          <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
          <p className="font-body text-sm text-green-300">This room is available for your selected dates.</p>
        </div>
      )}
      {availability === 'unavailable' && (
        <div role="alert" aria-live="assertive" className="flex items-center gap-3 py-3 px-4 bg-red-900/20 border border-red-500/30 rounded-sm">
          <XCircle className="h-4 w-4 text-red-400 shrink-0" />
          <div>
            <p className="font-body text-sm text-red-300 font-medium">This room is unavailable for your selected dates.</p>
            <p className="font-body text-xs text-red-300/60 mt-0.5">Please choose different dates or go back to select another room.</p>
          </div>
        </div>
      )}

      {/* Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Adults */}
        <div className="space-y-2">
          <label htmlFor="adults" className="block text-xs tracking-widest uppercase font-accent text-gold-400">
            Adults
          </label>
          <select
            id="adults"
            {...register('adults', { valueAsNumber: true })}
            className={`
              w-full bg-charcoal-800 border px-4 py-3 text-cream-100 text-sm
              font-body rounded-sm outline-none transition-colors
              focus:border-gold-400
              ${errors.adults ? 'border-red-500/60' : 'border-charcoal-700'}
            `}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n} className="bg-charcoal-800">
                {n} {n === 1 ? 'Adult' : 'Adults'}
              </option>
            ))}
          </select>
          {errors.adults && (
            <p className="text-xs text-red-400">{errors.adults.message}</p>
          )}
        </div>

        {/* Children */}
        <div className="space-y-2">
          <label htmlFor="children" className="block text-xs tracking-widest uppercase font-accent text-gold-400">
            Children
            <span className="ml-1 text-charcoal-700 normal-case tracking-normal font-body">
              (under 12)
            </span>
          </label>
          <select
            id="children"
            {...register('children', { valueAsNumber: true })}
            className="w-full bg-charcoal-800 border border-charcoal-700 px-4 py-3 text-cream-100 text-sm
              font-body rounded-sm outline-none transition-colors focus:border-gold-400"
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n} className="bg-charcoal-800">
                {n} {n === 1 ? 'Child' : 'Children'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={availability === 'unavailable' || availability === 'checking'}
        aria-label={availability === 'unavailable' ? 'Room unavailable, please select different dates' : 'Continue to guest information'}
        className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400
          disabled:opacity-40 disabled:cursor-not-allowed
          text-charcoal-900 font-accent text-xs tracking-widest uppercase py-4 px-6
          transition-colors duration-200 rounded-sm"
      >
        {availability === 'unavailable' ? 'Room Unavailable' : 'Continue to Guest Info'}
        {availability !== 'unavailable' && <ChevronRight className="h-4 w-4" />}
      </button>
    </form>
  )
}
