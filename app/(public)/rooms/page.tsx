import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import RoomsClient from '@/components/rooms/RoomsClient'

export const metadata: Metadata = buildMetadata({
  title: 'Rooms & Suites',
  description:
    'Explore our collection of luxury rooms and suites at Hotel Lumière, Cebu. Each room is a sanctuary of calm — thoughtfully designed for the highest standard of comfort and elegance.',
  openGraph: {
    title: 'Rooms & Suites | Hotel Lumière',
    description:
      'Explore our collection of luxury rooms and suites at Hotel Lumière, Cebu.',
    url: '/rooms',
  },
})

export default function RoomsPage() {
  return <RoomsClient />
}
