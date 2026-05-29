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
        'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
        {
          // Primary — blue
          'bg-blue-500 text-white hover:bg-blue-600 shadow-soft hover:shadow-soft-md hover:-translate-y-0.5':
            variant === 'primary',
          // Secondary — white outlined
          'bg-white text-gray-800 border border-gray-200 hover:border-blue-300 hover:text-blue-500 shadow-soft-sm':
            variant === 'secondary',
          // Ghost — transparent
          'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900':
            variant === 'ghost',
          // Outline — blue outlined
          'border border-blue-400 text-blue-500 hover:bg-blue-500 hover:text-white':
            variant === 'outline',
          // Sizes
          'text-xs px-4 py-2': size === 'sm',
          'text-sm px-6 py-3': size === 'md',
          'text-base px-8 py-4 w-full justify-center': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
})

Button.displayName = 'Button'
export default Button