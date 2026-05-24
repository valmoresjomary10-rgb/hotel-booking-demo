// src/components/booking/BookingStepIndicator.tsx
'use client'

import { Check } from 'lucide-react'

interface Step {
  number: 1 | 2 | 3
  label: string
}

const STEPS: Step[] = [
  { number: 1, label: 'Dates & Guests' },
  { number: 2, label: 'Guest Info' },
  { number: 3, label: 'Review & Pay' },
]

interface BookingStepIndicatorProps {
  currentStep: 1 | 2 | 3
}

export default function BookingStepIndicator({ currentStep }: BookingStepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, index) => {
        const isCompleted = step.number < currentStep
        const isActive = step.number === currentStep

        return (
          <div key={step.number} className="flex items-center">
            {/* Step bubble */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300
                  font-accent tracking-wider
                  ${isCompleted
                    ? 'border-gold-500 bg-gold-500 text-charcoal-900'
                    : isActive
                    ? 'border-gold-400 bg-transparent text-gold-400'
                    : 'border-charcoal-700 bg-transparent text-charcoal-700'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                className={`
                  text-xs tracking-widest uppercase font-accent hidden sm:block
                  ${isActive ? 'text-gold-400' : isCompleted ? 'text-gold-500/70' : 'text-charcoal-700'}
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div
                className={`
                  h-px w-16 sm:w-24 mx-2 mb-5 transition-all duration-500
                  ${step.number < currentStep ? 'bg-gold-500' : 'bg-charcoal-700'}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
