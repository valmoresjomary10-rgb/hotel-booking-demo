const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://hotellumiere.com'

export function hotelStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: 'Hotel Lumière',
    description: 'A premier luxury hotel experience in Bohol, Philippines.',
    url: BASE_URL,
    telephone: '+6328888000',
    email: 'reservations@hotellumiere.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Grand Avenue',
      addressLocality: "Panglao",
      addressRegion: "Bohol",
      addressCountry: 'PH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.1283125,
      longitude: 124.3188125,
    },
    image: `${BASE_URL}/images/og-image.jpg`,
    priceRange: '₱₱₱',
    starRating: { '@type': 'Rating', ratingValue: '5' },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi',      value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool',  value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Spa',            value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant',     value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Room Service',   value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Fitness Center', value: true },
    ],
    sameAs: [
      'https://instagram.com/hotellumiere',
      'https://facebook.com/hotellumiere',
    ],
  }
}

export function roomStructuredData(room: {
  name: string
  description: string
  images: string[]
  pricePerNight: number
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    description: room.description,
    image: room.images,
    url: `${BASE_URL}/rooms/${room.slug}`,
    offers: {
      '@type': 'Offer',
      price: room.pricePerNight,
      priceCurrency: 'PHP',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function breadcrumbStructuredData(
  items: { name: string; href: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  }
}
