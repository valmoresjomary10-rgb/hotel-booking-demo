import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogPosts } from '@/constants/blogData'
import BlogPostBody from '@/components/blog/BlogPostBody'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | Hotel Lumière`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Hotel Lumière`,
      description: post.excerpt,
      url: `https://hotellumiere.com/blog/${post.slug}`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Hotel Lumière`,
      description: post.excerpt,
    },
  }
}

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const related = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2)

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal-900 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-accent text-[10px] uppercase tracking-widest text-gold-400/70 hover:text-gold-400 transition-colors mb-8"
          >
            <ArrowLeft size={12} /> Back to Journal
          </Link>
          <span className="font-accent text-[10px] uppercase tracking-widest text-gold-400 border border-gold-400/40 px-3 py-1">
            {post.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-cream-50 mt-6 leading-tight">
            {post.title}
          </h1>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-6 mb-6" />
          <p className="font-body text-cream-200/70 text-lg leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center justify-center gap-6 mt-6 text-cream-200/50 text-sm font-body">
            <span className="flex items-center gap-1.5"><Calendar size={13} />{formattedDate}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime} min read</span>
          </div>
          <p className="font-body text-cream-200/40 text-xs mt-3">
            By {post.author.name} · {post.author.role}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-cream-50 py-20 px-6">
        <BlogPostBody body={post.body} />
        <div className="max-w-2xl mx-auto mt-12 pt-8 border-t border-cream-200">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={13} className="text-gold-500" />
            {post.tags.map(tag => (
              <span key={tag} className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/60 border border-cream-200 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="bg-cream-100 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-2">Continue Reading</p>
            <h2 className="font-display text-2xl text-charcoal-900 mb-8">More from our Journal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map(p => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group block border border-cream-200 hover:border-gold-400/50 transition-colors p-6">
                  <span className="font-accent text-[9px] uppercase tracking-widest text-gold-500">{p.category}</span>
                  <h3 className="font-display text-lg text-charcoal-900 mt-2 group-hover:text-gold-500 transition-colors leading-snug">{p.title}</h3>
                  <p className="font-body text-sm text-charcoal-700/60 mt-2 line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
