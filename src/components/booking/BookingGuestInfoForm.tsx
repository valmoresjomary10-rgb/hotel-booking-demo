// src/components/booking/BookingGuestInfoForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, ChevronRight, User, Mail, Phone, Globe, FileText } from 'lucide-react'
import { guestInfoSchema, type GuestInfoFormValues } from '@/lib/validations/bookingSchema'
import type { GuestInfo } from '@/types/booking'

const COUNTRIES = [
  'Philippines', 'United States', 'United Kingdom', 'Australia', 'Canada',
  'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Indonesia', 'Thailand',
  'China', 'Hong Kong', 'Taiwan', 'India', 'UAE', 'Saudi Arabia',
  'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Switzerland',
  'New Zealand', 'Other',
]

interface BookingGuestInfoFormProps {
  initialValues?: GuestInfo
  onSubmit: (values: GuestInfo) => void
  onBack: () => void
}

interface FieldProps {
  label: string
  error?: string
  icon: React.ReactNode
  children: React.ReactNode
}

function Field({ label, error, icon, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs tracking-widest uppercase font-accent text-gold-400">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/60 pointer-events-none">
          {icon}
        </div>
        {children}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

const inputClass = (hasError?: boolean) =>
  `w-full bg-charcoal-800 border pl-10 pr-4 py-3 text-cream-100 text-sm
  font-body rounded-sm outline-none transition-colors focus:border-gold-400
  placeholder:text-charcoal-700
  ${hasError ? 'border-red-500/60' : 'border-charcoal-700'}`

export default function BookingGuestInfoForm({
  initialValues,
  onSubmit,
  onBack,
}: BookingGuestInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestInfoFormValues>({
    resolver: zodResolver(guestInfoSchema),
    defaultValues: initialValues || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: 'Philippines',
      specialRequests: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="First Name" error={errors.firstName?.message} icon={<User className="h-4 w-4" />}>
          <input
            type="text"
            placeholder="Juan"
            {...register('firstName')}
            className={inputClass(!!errors.firstName)}
          />
        </Field>
        <Field label="Last Name" error={errors.lastName?.message} icon={<User className="h-4 w-4" />}>
          <input
            type="text"
            placeholder="dela Cruz"
            {...register('lastName')}
            className={inputClass(!!errors.lastName)}
          />
        </Field>
      </div>

      {/* Email */}
      <Field label="Email Address" error={errors.email?.message} icon={<Mail className="h-4 w-4" />}>
        <input
          type="email"
          placeholder="juan@example.com"
          {...register('email')}
          className={inputClass(!!errors.email)}
        />
      </Field>

      {/* Phone + Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Phone Number" error={errors.phone?.message} icon={<Phone className="h-4 w-4" />}>
          <input
            type="tel"
            placeholder="+63 917 000 0000"
            {...register('phone')}
            className={inputClass(!!errors.phone)}
          />
        </Field>
        <Field label="Country" error={errors.country?.message} icon={<Globe className="h-4 w-4" />}>
          <select
            {...register('country')}
            className={`${inputClass(!!errors.country)} appearance-none`}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c} className="bg-charcoal-800">
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Special requests */}
      <div className="space-y-2">
        <label className="block text-xs tracking-widest uppercase font-accent text-gold-400">
          Special Requests
          <span className="ml-1 text-charcoal-700 normal-case tracking-normal font-body text-xs">
            (optional)
          </span>
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3.5 h-4 w-4 text-gold-500/60 pointer-events-none" />
          <textarea
            rows={3}
            placeholder="Early check-in, dietary requirements, accessibility needs..."
            {...register('specialRequests')}
            className="w-full bg-charcoal-800 border border-charcoal-700 pl-10 pr-4 py-3
              text-cream-100 text-sm font-body rounded-sm outline-none transition-colors
              focus:border-gold-400 placeholder:text-charcoal-700 resize-none"
          />
        </div>
        {errors.specialRequests && (
          <p className="text-xs text-red-400">{errors.specialRequests.message}</p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 border border-charcoal-700 hover:border-gold-500/40
            text-cream-200 font-accent text-xs tracking-widest uppercase py-4 px-6
            transition-colors duration-200 rounded-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400
            text-charcoal-900 font-accent text-xs tracking-widest uppercase py-4 px-6
            transition-colors duration-200 rounded-sm"
        >
          Review Booking
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}
