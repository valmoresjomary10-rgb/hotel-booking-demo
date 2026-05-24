import { Metadata } from 'next'
import AboutHeroSection from '@/components/sections/about/AboutHeroSection'
import HotelStorySection from '@/components/sections/about/HotelStorySection'
import TeamSection from '@/components/sections/about/TeamSection'
import AwardsSection from '@/components/sections/about/AwardsSection'

export const metadata: Metadata = {
  title: 'About Us | Hotel Lumière',
  description:
    "Discover the story, people, and values behind Hotel Lumière — Manila's most celebrated luxury hotel since 1998.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <HotelStorySection />
      <TeamSection />
      <AwardsSection />
    </>
  )
}
