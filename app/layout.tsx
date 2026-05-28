import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Cinzel } from 'next/font/google'
import './globals.css'
import { defaultMetadata } from '@/lib/seo/metadata'
import { hotelStructuredData } from '@/lib/seo/structuredData'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
})
const jost = Jost({
  subsets: ['latin'],
  variable: '--font-body',
})
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-accent',
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${cinzel.variable}`}>
      <body className="font-body bg-cream-100 text-charcoal-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelStructuredData()) }}
        />
        {children}
      </body>
    </html>
  )
}
