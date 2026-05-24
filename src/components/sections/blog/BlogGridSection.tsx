import { blogPosts } from '@/constants/blogData'
import BlogGrid from '@/components/blog/BlogGrid'

export default function BlogGridSection() {
  return (
    <section className="bg-cream-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <BlogGrid posts={blogPosts} />
      </div>
    </section>
  )
}
