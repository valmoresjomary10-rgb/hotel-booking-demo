import { cn } from '@/lib/utils/cn'

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('w-6 h-6 border-2 border-gold-400 border-t-transparent rounded-full animate-spin', className)}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
