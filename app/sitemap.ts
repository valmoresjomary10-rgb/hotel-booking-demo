import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://hotellumiere.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()

  const [roomsResult, blogsResult] = await Promise.allSettled([
    supabase.from('rooms').select('slug, updated_at'),
    supabase.from('blog_posts').select('slug, updated_at'),
  ])

  const rooms = roomsResult.status === 'fulfilled' ? (roomsResult.value.data ?? []) : []
  const blogs = blogsResult.status === 'fulfilled' ? (blogsResult.value.data ?? []) : []

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                      lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/rooms`,           lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/amenities`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/gallery`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/offers`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/about`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`,            lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  ]

  const roomRoutes: MetadataRoute.Sitemap = rooms.map((room) => ({
    url:             `${BASE_URL}/rooms/${room.slug}`,
    lastModified:    room.updated_at ? new Date(room.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority:        0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
    url:             `${BASE_URL}/blog/${post.slug}`,
    lastModified:    post.updated_at ? new Date(post.updated_at) : new Date(),
    changeFrequency: 'monthly',
    priority:        0.6,
  }))

  return [...staticRoutes, ...roomRoutes, ...blogRoutes]
}
