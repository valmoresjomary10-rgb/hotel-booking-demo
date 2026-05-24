// src/components/booking/BookingPriceSummary.tsx
'use client'

interface BookingPriceSummaryProps {
  pricePerNight: number
  nights: number
  showTaxNote?: boolean
}

function formatPHP(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function BookingPriceSummary({
  pricePerNight,
  nights,
  showTaxNote = true,
}: BookingPriceSummaryProps) {
  const subtotal = pricePerNight * nights
  const taxes = Math.round(subtotal * 0.12) // 12% VAT Philippines
  const total = subtotal + taxes

  return (
    <div className="border border-charcoal-700 rounded-sm p-5 space-y-4">
      <p className="text-xs tracking-widest uppercase font-accent text-gold-400">
        Price Summary
      </p>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-cream-200/70 font-body">
            {formatPHP(pricePerNight)} × {nights} {nights === 1 ? 'night' : 'nights'}
          </span>
          <span className="text-cream-100 font-body">{formatPHP(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-cream-200/70 font-body">Taxes & fees (12% VAT)</span>
          <span className="text-cream-100 font-body">{formatPHP(taxes)}</span>
        </div>

        <div className="h-px bg-charcoal-700" />

        <div className="flex justify-between items-center">
          <span className="text-xs tracking-widest uppercase font-accent text-gold-400">
            Total
          </span>
          <span className="text-xl font-display text-gold-400">{formatPHP(total)}</span>
        </div>
      </div>

      {showTaxNote && (
        <p className="text-xs text-charcoal-700 font-body">
          Inclusive of 12% VAT. No hidden charges.
        </p>
      )}
    </div>
  )
}
