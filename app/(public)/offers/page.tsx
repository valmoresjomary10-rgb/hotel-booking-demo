import { Metadata } from 'next'
import OfferHeroSection from '@/components/sections/offers/OfferHeroSection'
import OfferGridSection from '@/components/sections/offers/OfferGridSection'

export const metadata: Metadata = {
  title: 'Special Offers | Hotel Lumière',
  description: 'Discover exclusive packages and curated privileges at Hotel Lumière — Manila\'s premier luxury hotel.',
}

export default function OffersPage() {
  return (
    <>
      <OfferHeroSection />
      <OfferGridSection />
    </>
  )
}
