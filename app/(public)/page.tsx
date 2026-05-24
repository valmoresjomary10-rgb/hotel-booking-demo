import HeroSection from '@/components/sections/home/HeroSection'
import FeaturedRoomsSection from '@/components/sections/home/FeaturedRoomsSection'
import AmenitiesHighlightSection from '@/components/sections/home/AmenitiesHighlightSection'
import TestimonialsSection from '@/components/sections/home/TestimonialsSection'
import CTASection from '@/components/sections/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedRoomsSection />
      <AmenitiesHighlightSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
