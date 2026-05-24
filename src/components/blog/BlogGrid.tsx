import { BlogPost } from '@/types/blog'
import BlogCard from './BlogCard'

interface BlogGridProps {
  posts: BlogPost[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => !p.featured || p.id !== featured?.id)

  return (
    <div>
      {featured && (
        <div className="mb-10">
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-4">Featured Story</p>
          <BlogCard post={featured} featured />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
