import { Metadata } from 'next'
import AmenitiesHeroSection from '@/components/sections/amenities/AmenitiesHeroSection'
import AmenitiesGridSection from '@/components/sections/amenities/AmenitiesGridSection'
import AmenitiesDetailSection from '@/components/sections/amenities/AmenitiesDetailSection'

export const metadata: Metadata = {
  title: 'Amenities | Hotel Lumière',
  description:
    'Discover world-class amenities at Hotel Lumière — from our infinity pool and fine dining to the Lumière Spa and rooftop terrace.',
}

export default function AmenitiesPage() {
  return (
    <>
      <AmenitiesHeroSection />
      <AmenitiesGridSection />
      <AmenitiesDetailSection />
    </>
  )
}
