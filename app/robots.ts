import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://hotellumiere.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/management/',
          '/management-login/',
          '/booking/confirmation',
          '/booking/payment-callback',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
