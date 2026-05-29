import HeroSection from '@/components/sections/home/HeroSection'
import FeaturedRoomsSection from '@/components/sections/home/FeaturedRoomsSection'
import AmenitiesHighlightSection from '@/components/sections/home/AmenitiesHighlightSection'
import TestimonialsSection from '@/components/sections/home/TestimonialsSection'
import GalleryPreviewSection from '@/components/sections/home/GalleryPreviewSection'
import OffersPreviewSection from '@/components/sections/home/OffersPreviewSection'
import CTASection from '@/components/sections/home/CTASection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedRoomsSection />
      <AmenitiesHighlightSection />
      <OffersPreviewSection />
      <GalleryPreviewSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}