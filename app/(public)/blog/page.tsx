import { Metadata } from 'next'
import BlogHeroSection from '@/components/sections/blog/BlogHeroSection'
import BlogGridSection from '@/components/sections/blog/BlogGridSection'

export const metadata: Metadata = {
  title: 'Journal | Hotel Lumière',
  description: 'Stories, travel guides, dining discoveries, and wellness wisdom from Hotel Lumière — Manila\'s premier luxury hotel.',
}

export default function BlogPage() {
  return (
    <>
      <BlogHeroSection />
      <BlogGridSection />
    </>
  )
}
