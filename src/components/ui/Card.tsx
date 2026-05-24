import { cn } from '@/lib/utils/cn'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered'
}

export default function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div className={cn(
      'bg-cream-50 overflow-hidden',
      {
        'shadow-md': variant === 'default',
        'shadow-xl': variant === 'elevated',
        'border border-cream-200': variant === 'bordered',
      },
      className
    )} {...props} />
  )
}
