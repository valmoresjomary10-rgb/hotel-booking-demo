// src/hooks/useBooking.ts
'use client'

import { useReducer, useCallback } from 'react'
import type { BookingFormState, BookingFormAction, GuestInfo } from '@/types/booking'

const initialGuestInfo: GuestInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  specialRequests: '',
}

export function createInitialState(overrides?: Partial<BookingFormState>): BookingFormState {
  return {
    step: 1,
    roomId: '',
    roomName: '',
    roomSlug: '',
    roomImage: '',
    pricePerNight: 0,
    bedType: '',
    capacity: 2,
    checkIn: '',
    checkOut: '',
    nights: 0,
    adults: 1,
    children: 0,
    guest: initialGuestInfo,
    ...overrides,
  }
}

function bookingReducer(state: BookingFormState, action: BookingFormAction): BookingFormState {
  switch (action.type) {
    case 'SET_DATES':
      return { ...state, ...action.payload }
    case 'SET_GUESTS':
      return { ...state, ...action.payload }
    case 'SET_GUEST_INFO':
      return { ...state, guest: action.payload }
    case 'SET_STEP':
      return { ...state, step: action.payload }
    case 'RESET':
      return createInitialState()
    default:
      return state
  }
}

export function useBooking(initialOverrides?: Partial<BookingFormState>) {
  const [state, dispatch] = useReducer(bookingReducer, createInitialState(initialOverrides))

  const setDates = useCallback(
    (checkIn: string, checkOut: string, nights: number) =>
      dispatch({ type: 'SET_DATES', payload: { checkIn, checkOut, nights } }),
    []
  )

  const setGuests = useCallback(
    (adults: number, children: number) =>
      dispatch({ type: 'SET_GUESTS', payload: { adults, children } }),
    []
  )

  const setGuestInfo = useCallback(
    (info: GuestInfo) => dispatch({ type: 'SET_GUEST_INFO', payload: info }),
    []
  )

  const goToStep = useCallback(
    (step: 1 | 2 | 3) => dispatch({ type: 'SET_STEP', payload: step }),
    []
  )

  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])

  const totalPrice = state.nights * state.pricePerNight

  return {
    state,
    totalPrice,
    setDates,
    setGuests,
    setGuestInfo,
    goToStep,
    reset,
  }
}
