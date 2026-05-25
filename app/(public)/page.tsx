import { Metadata } from 'next'
import HeroSection from '@/components/sections/home/HeroSection'
import FeaturedRoomsSection from '@/components/sections/home/FeaturedRoomsSection'
import AmenitiesHighlightSection from '@/components/sections/home/AmenitiesHighlightSection'
import TestimonialsSection from '@/components/sections/home/TestimonialsSection'
import CTASection from '@/components/sections/home/CTASection'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Hotel Lumière — Where Luxury Meets Serenity',
  description:
    'Discover Hotel Lumière in Cebu, Philippines — a premier luxury hotel offering world-class rooms, spa, fine dining, and exceptional service. Book your stay today.',
  openGraph: {
    title: 'Hotel Lumière — Where Luxury Meets Serenity',
    description:
      'Discover Hotel Lumière in Cebu, Philippines — a premier luxury hotel offering world-class rooms, spa, fine dining, and exceptional service.',
    url: '/',
  },
})

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
