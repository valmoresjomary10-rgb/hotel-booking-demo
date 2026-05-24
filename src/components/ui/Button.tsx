import { cn } from '@/lib/utils/cn'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className, variant = 'primary', size = 'md', ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-accent tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-gold-500 text-cream-50 hover:bg-gold-600': variant === 'primary',
          'bg-charcoal-900 text-cream-50 hover:bg-charcoal-800': variant === 'secondary',
          'bg-transparent text-charcoal-900 hover:text-gold-500': variant === 'ghost',
          'border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-cream-50': variant === 'outline',
          'text-xs px-4 py-2': size === 'sm',
          'text-sm px-6 py-3': size === 'md',
          'text-base px-8 py-4': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
})

Button.displayName = 'Button'
export default Button
