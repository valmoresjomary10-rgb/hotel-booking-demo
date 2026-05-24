'use client'

import { useState, useEffect } from 'react'
import { Save, Hotel, Home, Users, Search } from 'lucide-react'

const TABS = [
  { id: 'hotel', label: 'Hotel Info', icon: Hotel },
  { id: 'homepage', label: 'Homepage', icon: Home },
  { id: 'about', label: 'About', icon: Users },
  { id: 'seo', label: 'SEO', icon: Search },
]

const defaultContent = {
  hotel: {
    name: 'Hotel Lumière',
    tagline: 'Where Luxury Meets Serenity',
    description: 'A premier luxury hotel experience nestled in the heart of Manila, Philippines.',
    address: '123 Grand Avenue, Manila, Philippines',
    phone: '+63 2 8888 0000',
    email: 'reservations@hotellumiere.com',
    checkIn: '14:00',
    checkOut: '12:00',
    instagram: 'https://instagram.com/hotellumiere',
    facebook: 'https://facebook.com/hotellumiere',
  },
  homepage: {
    heroHeading: 'Where Luxury Meets Serenity',
    heroSubheading: 'Experience unparalleled comfort and elegance in the heart of Manila.',
    heroCta: 'Reserve Your Stay',
    featuredTitle: 'Our Signature Rooms',
    featuredSubtitle: 'Each room is a sanctuary of comfort, thoughtfully designed for the discerning traveler.',
    ctaHeading: 'Begin Your Journey',
    ctaSubheading: 'Reserve your stay at Hotel Lumière and experience the art of fine hospitality.',
    ctaButton: 'Book Now',
  },
  about: {
    heroHeading: 'Our Story',
    heroSubheading: 'A legacy of luxury, warmth, and world-class hospitality.',
    storyTitle: 'A Vision of Excellence',
    storyBody: 'Hotel Lumière was founded with a single vision: to create a sanctuary where every guest feels like royalty. Since opening our doors, we have welcomed thousands of travelers from around the world, offering them an experience that blends Filipino warmth with international standards of luxury.',
    teamTitle: 'The People Behind the Magic',
    teamSubtitle: 'Our dedicated team works tirelessly to ensure every stay exceeds expectations.',
    awardsTitle: 'Recognition & Awards',
  },
  seo: {
    homeTitle: 'Hotel Lumière — Where Luxury Meets Serenity',
    homeDescription: 'Experience unparalleled luxury at Hotel Lumière, Manila\'s premier boutique hotel. Book your stay today.',
    roomsTitle: 'Rooms & Suites — Hotel Lumière',
    roomsDescription: 'Explore our collection of luxury rooms and suites, each designed for the discerning traveler.',
    aboutTitle: 'About Us — Hotel Lumière',
    aboutDescription: 'Learn about the story, vision, and team behind Hotel Lumière, Manila\'s finest luxury hotel.',
    contactTitle: 'Contact Us — Hotel Lumière',
    contactDescription: 'Get in touch with Hotel Lumière. We\'re here to help with reservations and inquiries.',
  },
}

type ContentData = typeof defaultContent

function Field({ label, value, onChange, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean
}) {
  return (
    <div>
      <label className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40 block mb-1">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={4}
          className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50 resize-none" />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)}
          className="w-full border border-cream-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold-400/50" />
      )}
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 pt-2 pb-1 border-b border-cream-200 mb-4">{children}</p>
}

export default function ContentPage() {
  const [content, setContent] = useState<ContentData>(defaultContent)
  const [activeTab, setActiveTab] = useState('hotel')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('lum_content')
    if (stored) setContent(JSON.parse(stored))
  }, [])

  const update = (section: keyof ContentData, key: string, value: string) => {
    setContent(c => ({ ...c, [section]: { ...c[section], [key]: value } }))
  }

  const handleSave = () => {
    localStorage.setItem('lum_content', JSON.stringify(content))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Management</p>
          <h2 className="font-display text-3xl text-charcoal-900">Content</h2>
        </div>
        <button onClick={handleSave}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-accent text-[9px] uppercase tracking-widest px-5 py-2.5 transition-colors">
          <Save size={13} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8">
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 font-accent text-[9px] uppercase tracking-widest px-4 py-2.5 transition-colors ${
                activeTab === tab.id
                  ? 'bg-charcoal-900 text-cream-50'
                  : 'border border-cream-200 text-charcoal-700/50 hover:text-charcoal-900 hover:border-charcoal-700/20'
              }`}>
              <Icon size={11} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Hotel Info */}
      {activeTab === 'hotel' && (
        <div className="bg-white border border-cream-200 p-6 space-y-4">
          <SectionHeading>General</SectionHeading>
          <Field label="Hotel Name" value={content.hotel.name} onChange={v => update('hotel', 'name', v)} />
          <Field label="Tagline" value={content.hotel.tagline} onChange={v => update('hotel', 'tagline', v)} />
          <Field label="Description" value={content.hotel.description} onChange={v => update('hotel', 'description', v)} multiline />
          <SectionHeading>Contact</SectionHeading>
          <Field label="Address" value={content.hotel.address} onChange={v => update('hotel', 'address', v)} />
          <Field label="Phone" value={content.hotel.phone} onChange={v => update('hotel', 'phone', v)} />
          <Field label="Email" value={content.hotel.email} onChange={v => update('hotel', 'email', v)} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Check-in Time" value={content.hotel.checkIn} onChange={v => update('hotel', 'checkIn', v)} />
            <Field label="Check-out Time" value={content.hotel.checkOut} onChange={v => update('hotel', 'checkOut', v)} />
          </div>
          <SectionHeading>Social Media</SectionHeading>
          <Field label="Instagram URL" value={content.hotel.instagram} onChange={v => update('hotel', 'instagram', v)} />
          <Field label="Facebook URL" value={content.hotel.facebook} onChange={v => update('hotel', 'facebook', v)} />
        </div>
      )}

      {/* Homepage */}
      {activeTab === 'homepage' && (
        <div className="bg-white border border-cream-200 p-6 space-y-4">
          <SectionHeading>Hero Section</SectionHeading>
          <Field label="Heading" value={content.homepage.heroHeading} onChange={v => update('homepage', 'heroHeading', v)} />
          <Field label="Subheading" value={content.homepage.heroSubheading} onChange={v => update('homepage', 'heroSubheading', v)} multiline />
          <Field label="CTA Button Text" value={content.homepage.heroCta} onChange={v => update('homepage', 'heroCta', v)} />
          <SectionHeading>Featured Rooms Section</SectionHeading>
          <Field label="Title" value={content.homepage.featuredTitle} onChange={v => update('homepage', 'featuredTitle', v)} />
          <Field label="Subtitle" value={content.homepage.featuredSubtitle} onChange={v => update('homepage', 'featuredSubtitle', v)} multiline />
          <SectionHeading>CTA Section</SectionHeading>
          <Field label="Heading" value={content.homepage.ctaHeading} onChange={v => update('homepage', 'ctaHeading', v)} />
          <Field label="Subheading" value={content.homepage.ctaSubheading} onChange={v => update('homepage', 'ctaSubheading', v)} multiline />
          <Field label="Button Text" value={content.homepage.ctaButton} onChange={v => update('homepage', 'ctaButton', v)} />
        </div>
      )}

      {/* About */}
      {activeTab === 'about' && (
        <div className="bg-white border border-cream-200 p-6 space-y-4">
          <SectionHeading>Hero</SectionHeading>
          <Field label="Heading" value={content.about.heroHeading} onChange={v => update('about', 'heroHeading', v)} />
          <Field label="Subheading" value={content.about.heroSubheading} onChange={v => update('about', 'heroSubheading', v)} multiline />
          <SectionHeading>Hotel Story</SectionHeading>
          <Field label="Section Title" value={content.about.storyTitle} onChange={v => update('about', 'storyTitle', v)} />
          <Field label="Story Body" value={content.about.storyBody} onChange={v => update('about', 'storyBody', v)} multiline />
          <SectionHeading>Team Section</SectionHeading>
          <Field label="Title" value={content.about.teamTitle} onChange={v => update('about', 'teamTitle', v)} />
          <Field label="Subtitle" value={content.about.teamSubtitle} onChange={v => update('about', 'teamSubtitle', v)} multiline />
          <SectionHeading>Awards Section</SectionHeading>
          <Field label="Title" value={content.about.awardsTitle} onChange={v => update('about', 'awardsTitle', v)} />
        </div>
      )}

      {/* SEO */}
      {activeTab === 'seo' && (
        <div className="bg-white border border-cream-200 p-6 space-y-4">
          <SectionHeading>Home Page</SectionHeading>
          <Field label="Page Title" value={content.seo.homeTitle} onChange={v => update('seo', 'homeTitle', v)} />
          <Field label="Meta Description" value={content.seo.homeDescription} onChange={v => update('seo', 'homeDescription', v)} multiline />
          <SectionHeading>Rooms Page</SectionHeading>
          <Field label="Page Title" value={content.seo.roomsTitle} onChange={v => update('seo', 'roomsTitle', v)} />
          <Field label="Meta Description" value={content.seo.roomsDescription} onChange={v => update('seo', 'roomsDescription', v)} multiline />
          <SectionHeading>About Page</SectionHeading>
          <Field label="Page Title" value={content.seo.aboutTitle} onChange={v => update('seo', 'aboutTitle', v)} />
          <Field label="Meta Description" value={content.seo.aboutDescription} onChange={v => update('seo', 'aboutDescription', v)} multiline />
          <SectionHeading>Contact Page</SectionHeading>
          <Field label="Page Title" value={content.seo.contactTitle} onChange={v => update('seo', 'contactTitle', v)} />
          <Field label="Meta Description" value={content.seo.contactDescription} onChange={v => update('seo', 'contactDescription', v)} multiline />
        </div>
      )}
    </div>
  )
}
