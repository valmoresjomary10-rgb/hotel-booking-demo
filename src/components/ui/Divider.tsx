import { cn } from '@/lib/utils/cn'

interface DividerProps {
  className?: string
  ornamental?: boolean
}

export default function Divider({ className, ornamental = false }: DividerProps) {
  if (ornamental) {
    return (
      <div className={cn('flex items-center gap-4 my-6', className)}>
        <div className="flex-1 h-px bg-gold-400 opacity-40" />
        <span className="text-gold-400 text-lg">✦</span>
        <div className="flex-1 h-px bg-gold-400 opacity-40" />
      </div>
    )
  }
  return <hr className={cn('border-cream-200 my-6', className)} />
}
