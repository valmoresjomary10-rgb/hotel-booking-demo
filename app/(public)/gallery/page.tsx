import { Metadata } from 'next'
import GalleryHeroSection from '@/components/sections/gallery/GalleryHeroSection'
import GalleryGridSection from '@/components/sections/gallery/GalleryGridSection'

export const metadata: Metadata = {
  title: 'Gallery | Hotel Lumière',
  description: 'Explore the stunning spaces, suites, dining, and spa of Hotel Lumière through our photo gallery.',
}

export default function GalleryPage() {
  return (
    <>
      <GalleryHeroSection />
      <GalleryGridSection />
    </>
  )
}
