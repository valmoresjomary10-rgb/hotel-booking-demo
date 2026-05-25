import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://hotellumiere.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Hotel Lumière — Where Luxury Meets Serenity',
    template: '%s | Hotel Lumière',
  },
  description:
    'Experience unparalleled luxury at Hotel Lumière in Cebu, Philippines. Book your stay and enjoy world-class amenities, stunning rooms, and exceptional service.',
  keywords: [
    'luxury hotel Cebu',
    'Hotel Lumière',
    'Cebu hotel',
    'luxury accommodation Philippines',
    'hotel booking Cebu',
    'resort Cebu Philippines',
  ],
  authors: [{ name: 'Hotel Lumière' }],
  creator: 'Hotel Lumière',
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: BASE_URL,
    siteName: 'Hotel Lumière',
    title: 'Hotel Lumière — Where Luxury Meets Serenity',
    description:
      'Experience unparalleled luxury at Hotel Lumière in Cebu, Philippines.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hotel Lumière — Where Luxury Meets Serenity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Lumière — Where Luxury Meets Serenity',
    description:
      'Experience unparalleled luxury at Hotel Lumière in Cebu, Philippines.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ── Page-specific helpers ─────────────────────────────────────────────────────

export function buildMetadata(overrides: Metadata): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...(overrides.openGraph ?? {}),
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...(overrides.twitter ?? {}),
    },
  }
}

export function buildRoomMetadata(room: {
  name: string
  description: string
  images: string[]
  pricePerNight: number
  slug: string
}): Metadata {
  return buildMetadata({
    title: room.name,
    description: room.description,
    openGraph: {
      title: `${room.name} | Hotel Lumière`,
      description: room.description,
      url: `${BASE_URL}/rooms/${room.slug}`,
      images: room.images?.[0]
        ? [{ url: room.images[0], width: 1200, height: 630, alt: room.name }]
        : undefined,
    },
  })
}
