import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  label: string
  variant?: 'gold' | 'charcoal' | 'cream' | 'success' | 'danger'
  className?: string
}

export default function Badge({ label, variant = 'gold', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-block font-accent text-xs tracking-widest uppercase px-3 py-1',
      {
        'bg-gold-100 text-gold-600': variant === 'gold',
        'bg-charcoal-900 text-cream-50': variant === 'charcoal',
        'bg-cream-200 text-charcoal-700': variant === 'cream',
        'bg-green-100 text-green-700': variant === 'success',
        'bg-red-100 text-red-700': variant === 'danger',
      },
      className
    )}>
      {label}
    </span>
  )
}
