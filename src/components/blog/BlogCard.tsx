import Link from 'next/link'
import { BlogPost } from '@/types/blog'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative bg-charcoal-900 overflow-hidden">
          <div className="h-72 bg-gradient-to-br from-charcoal-800 to-charcoal-700 flex items-end">
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
            <div className="relative z-10 p-8">
              <span className="font-accent text-[10px] uppercase tracking-widest text-gold-400 border border-gold-400/40 px-3 py-1">
                {post.category}
              </span>
              <h2 className="font-display text-3xl text-cream-50 mt-4 leading-tight group-hover:text-gold-400 transition-colors">
                {post.title}
              </h2>
              <p className="font-body text-sm text-cream-200/70 mt-3 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 text-cream-200/50 text-xs font-body">
                <span className="flex items-center gap-1.5"><Calendar aria-hidden="true" size={12} />{formattedDate}</span>
                <span className="flex items-center gap-1.5"><Clock aria-hidden="true" size={12} />{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block border border-cream-200 hover:border-gold-400/50 transition-colors duration-300">
      <div className="h-48 bg-gradient-to-br from-charcoal-800 to-charcoal-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="font-accent text-[9px] uppercase tracking-widest text-gold-400 bg-charcoal-900/80 px-2 py-1">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-charcoal-900 leading-snug group-hover:text-gold-500 transition-colors">
          {post.title}
        </h3>
        <p className="font-body text-sm text-charcoal-700/70 mt-2 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-200">
          <div className="flex items-center gap-3 text-charcoal-700/50 text-xs font-body">
            <span className="flex items-center gap-1"><Calendar aria-hidden="true" size={11} />{formattedDate}</span>
            <span className="flex items-center gap-1"><Clock aria-hidden="true" size={11} />{post.readTime} min</span>
          </div>
          <span className="flex items-center gap-1 text-gold-500 text-xs font-accent uppercase tracking-wider group-hover:gap-2 transition-all">
            Read <ArrowRight aria-hidden="true" size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}
