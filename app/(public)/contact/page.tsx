import { Metadata } from 'next'
import ContactHeroSection from '@/components/sections/contact/ContactHeroSection'
import ContactFormSection from '@/components/sections/contact/ContactFormSection'

export const metadata: Metadata = {
  title: 'Contact Us | Hotel Lumière',
  description:
    'Get in touch with Hotel Lumière. We are here 24/7 for reservations, special requests, events, and any assistance you need.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactFormSection />
    </>
  )
}
