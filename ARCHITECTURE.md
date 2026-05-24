# Luxury Hotel Booking — Project Architecture
## Stack: Next.js 14 App Router · TypeScript · Tailwind CSS

---

## 1. FOLDER STRUCTURE

```
hotel-booking/
├── public/
│   ├── images/
│   │   ├── rooms/
│   │   ├── gallery/
│   │   ├── amenities/
│   │   └── hero/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/                          # Next.js App Router root
│   │   │
│   │   ├── (public)/                 # Public layout group
│   │   │   ├── layout.tsx            # Public layout (navbar + footer)
│   │   │   ├── page.tsx              # / → Home
│   │   │   ├── rooms/
│   │   │   │   ├── page.tsx          # /rooms → Room Listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # /rooms/[slug] → Room Details
│   │   │   ├── booking/
│   │   │   │   ├── page.tsx          # /booking → Booking Form
│   │   │   │   └── confirmation/
│   │   │   │       └── page.tsx      # /booking/confirmation
│   │   │   ├── about/
│   │   │   │   └── page.tsx          # /about
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx          # /gallery
│   │   │   ├── amenities/
│   │   │   │   └── page.tsx          # /amenities
│   │   │   ├── contact/
│   │   │   │   └── page.tsx          # /contact
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx          # /blog → Blog Listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # /blog/[slug] → Blog Post
│   │   │   └── offers/
│   │   │       ├── page.tsx          # /offers → Promotions Listing
│   │   │       └── [slug]/
│   │   │           └── page.tsx      # /offers/[slug] → Offer Detail
│   │   │
│   │   ├── management-login/         # Admin login (NO public nav)
│   │   │   └── page.tsx
│   │   │
│   │   ├── management/               # Admin layout group
│   │   │   ├── layout.tsx            # Admin layout (sidebar + topbar)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # /management/dashboard
│   │   │   ├── rooms/
│   │   │   │   ├── page.tsx          # /management/rooms → Room List
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx      # /management/rooms/new
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # /management/rooms/[id] → Edit
│   │   │   ├── bookings/
│   │   │   │   ├── page.tsx          # /management/bookings → All Bookings
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # /management/bookings/[id]
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx          # /management/gallery
│   │   │   ├── content/
│   │   │   │   └── page.tsx          # /management/content
│   │   │   ├── promotions/
│   │   │   │   ├── page.tsx          # /management/promotions
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── payments/
│   │   │       └── page.tsx          # /management/payments
│   │   │
│   │   ├── api/                      # API Routes (future)
│   │   │   ├── bookings/
│   │   │   │   └── route.ts
│   │   │   ├── rooms/
│   │   │   │   └── route.ts
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   └── payments/
│   │   │       └── route.ts
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx                # Root layout (fonts, metadata, providers)
│   │   └── not-found.tsx
│   │
│   ├── components/                   # All reusable components
│   │   │
│   │   ├── ui/                       # Atomic / base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Drawer.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   ├── StarRating.tsx
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   ├── layout/                   # Public layout pieces
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavbarMobile.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── FooterNewsletter.tsx
│   │   │   └── CookieBanner.tsx
│   │   │
│   │   ├── management/               # Admin layout pieces
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminTopbar.tsx
│   │   │   ├── AdminDataTable.tsx
│   │   │   ├── AdminStatCard.tsx
│   │   │   └── AdminFormWrapper.tsx
│   │   │
│   │   ├── rooms/                    # Room-specific components
│   │   │   ├── RoomCard.tsx
│   │   │   ├── RoomCardSkeleton.tsx
│   │   │   ├── RoomGrid.tsx
│   │   │   ├── RoomFilters.tsx
│   │   │   ├── RoomAmenityList.tsx
│   │   │   ├── RoomImageCarousel.tsx
│   │   │   ├── RoomAvailabilityBadge.tsx
│   │   │   ├── RoomPriceDisplay.tsx
│   │   │   └── RoomDetailHero.tsx
│   │   │
│   │   ├── booking/                  # Booking flow components
│   │   │   ├── BookingForm.tsx
│   │   │   ├── BookingDateSelector.tsx
│   │   │   ├── BookingGuestSelector.tsx
│   │   │   ├── BookingRoomSummary.tsx
│   │   │   ├── BookingPriceSummary.tsx
│   │   │   ├── BookingStepIndicator.tsx
│   │   │   ├── BookingGuestInfoForm.tsx
│   │   │   ├── BookingSpecialRequests.tsx
│   │   │   └── BookingConfirmationCard.tsx
│   │   │
│   │   ├── gallery/                  # Gallery components
│   │   │   ├── GalleryGrid.tsx
│   │   │   ├── GalleryLightbox.tsx
│   │   │   ├── GalleryFilter.tsx
│   │   │   └── GalleryImage.tsx
│   │   │
│   │   ├── blog/                     # Blog components
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogGrid.tsx
│   │   │   ├── BlogHero.tsx
│   │   │   └── BlogPostBody.tsx
│   │   │
│   │   ├── offers/                   # Promotions components
│   │   │   ├── OfferCard.tsx
│   │   │   ├── OfferGrid.tsx
│   │   │   ├── OfferBadge.tsx
│   │   │   └── OfferCountdown.tsx
│   │   │
│   │   └── sections/                 # Page-level sections (per page)
│   │       ├── home/
│   │       │   ├── HeroSection.tsx
│   │       │   ├── FeaturedRoomsSection.tsx
│   │       │   ├── AmenitiesHighlightSection.tsx
│   │       │   ├── TestimonialsSection.tsx
│   │       │   ├── GalleryPreviewSection.tsx
│   │       │   ├── OffersPreviewSection.tsx
│   │       │   └── CTASection.tsx
│   │       ├── about/
│   │       │   ├── AboutHeroSection.tsx
│   │       │   ├── HotelStorySection.tsx
│   │       │   ├── TeamSection.tsx
│   │       │   └── AwardsSection.tsx
│   │       ├── amenities/
│   │       │   ├── AmenitiesHeroSection.tsx
│   │       │   ├── AmenitiesGridSection.tsx
│   │       │   └── AmenitiesDetailSection.tsx
│   │       └── contact/
│   │           ├── ContactHeroSection.tsx
│   │           ├── ContactFormSection.tsx
│   │           └── ContactMapSection.tsx
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useBooking.ts             # Booking form state management
│   │   ├── useRooms.ts               # Room fetching / filtering
│   │   ├── useAvailability.ts        # Check room availability
│   │   ├── useGallery.ts             # Gallery state / lightbox
│   │   ├── useMediaQuery.ts          # Responsive breakpoint detection
│   │   ├── useScrollLock.ts          # Lock scroll when modal is open
│   │   ├── useLocalStorage.ts        # Persist state in localStorage
│   │   └── useDebounce.ts            # Debounce inputs
│   │
│   ├── lib/                          # Utilities & service layers
│   │   ├── supabase/                 # Future Supabase integration
│   │   │   ├── client.ts             # Browser client
│   │   │   ├── server.ts             # Server client
│   │   │   └── middleware.ts
│   │   ├── payments/                 # Future payment integration
│   │   │   ├── stripe.ts             # Stripe client setup
│   │   │   └── helpers.ts
│   │   ├── validations/              # Zod schemas
│   │   │   ├── bookingSchema.ts
│   │   │   ├── contactSchema.ts
│   │   │   └── roomSchema.ts
│   │   ├── utils/
│   │   │   ├── formatCurrency.ts
│   │   │   ├── formatDate.ts
│   │   │   ├── calculateNights.ts
│   │   │   ├── generateSlug.ts
│   │   │   └── cn.ts                 # Tailwind class merger (clsx + twMerge)
│   │   └── seo/
│   │       ├── metadata.ts           # generateMetadata helpers
│   │       └── structuredData.ts     # JSON-LD schemas
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── room.ts
│   │   ├── booking.ts
│   │   ├── guest.ts
│   │   ├── offer.ts
│   │   ├── gallery.ts
│   │   ├── blog.ts
│   │   ├── amenity.ts
│   │   └── index.ts                  # Barrel export
│   │
│   ├── constants/                    # App-wide constants
│   │   ├── navigation.ts             # Public nav links
│   │   ├── amenities.ts              # Amenity definitions
│   │   ├── roomTypes.ts              # Room type enums
│   │   ├── bedTypes.ts               # Bed type options
│   │   └── siteConfig.ts             # Hotel name, address, contact info
│   │
│   ├── config/                       # Environment & feature config
│   │   ├── env.ts                    # Typed env vars
│   │   └── features.ts               # Feature flags
│   │
│   ├── styles/                       # Global / token styles
│   │   ├── tokens.css                # CSS custom properties
│   │   └── typography.css            # Heading / body styles
│   │
│   └── middleware.ts                 # Route protection for /management/*
│
├── .env.local                        # Environment variables
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## 2. ROUTE STRUCTURE

### Public Routes
| Route | Page |
|---|---|
| `/` | Home |
| `/rooms` | Room Listing |
| `/rooms/[slug]` | Room Details |
| `/booking` | Booking Form |
| `/booking/confirmation` | Booking Confirmation |
| `/about` | About |
| `/gallery` | Gallery |
| `/amenities` | Amenities |
| `/contact` | Contact |
| `/blog` | Blog Listing |
| `/blog/[slug]` | Blog Post |
| `/offers` | Promotions |
| `/offers/[slug]` | Offer Detail |

### Management Routes (Private)
| Route | Page |
|---|---|
| `/management-login` | Admin Login |
| `/management/dashboard` | Dashboard |
| `/management/rooms` | Manage Rooms |
| `/management/rooms/new` | Add Room |
| `/management/rooms/[id]` | Edit Room |
| `/management/bookings` | All Bookings |
| `/management/bookings/[id]` | Booking Detail |
| `/management/gallery` | Manage Gallery |
| `/management/content` | Website Content |
| `/management/promotions` | Promotions |
| `/management/payments` | Payments |

---

## 3. LAYOUT STRUCTURE

### Root Layout — `src/app/layout.tsx`
```tsx
// Fonts, global CSS, metadata, Providers (context, toast, etc.)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

### Public Layout — `src/app/(public)/layout.tsx`
```tsx
// Navbar + Footer wrap all public pages
export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

### Management Layout — `src/app/management/layout.tsx`
```tsx
// Admin sidebar + topbar, no public nav
export default function ManagementLayout({ children }) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
```

---

## 4. TYPE DEFINITIONS

### `src/types/room.ts`
```ts
export type BedType = 'single' | 'double' | 'queen' | 'king' | 'twin'
export type RoomStatus = 'available' | 'booked' | 'maintenance'

export interface Room {
  id: string
  slug: string
  name: string
  description: string
  pricePerNight: number
  capacity: number
  bedType: BedType
  amenities: string[]
  images: string[]
  status: RoomStatus
  rating: number
  reviewCount: number
  size: number         // sq meters
  floor?: number
  featured: boolean
  createdAt: string
  updatedAt: string
}
```

### `src/types/booking.ts`
```ts
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface GuestInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  specialRequests?: string
}

export interface Booking {
  id: string
  roomId: string
  room?: Room
  guest: GuestInfo
  checkIn: string
  checkOut: string
  nights: number
  adults: number
  children: number
  totalPrice: number
  status: BookingStatus
  paymentStatus: 'unpaid' | 'paid' | 'refunded'
  confirmationCode: string
  createdAt: string
}
```

---

## 5. CONSTANTS STRUCTURE

### `src/constants/siteConfig.ts`
```ts
export const siteConfig = {
  name: 'Hotel Lumière',
  tagline: 'Where Luxury Meets Serenity',
  description: 'A premier luxury hotel experience...',
  address: '123 Grand Avenue, Manila, Philippines',
  phone: '+63 2 8888 0000',
  email: 'reservations@hotellumiere.com',
  checkInTime: '14:00',
  checkOutTime: '12:00',
  currency: 'PHP',
  currencySymbol: '₱',
  socials: {
    instagram: 'https://instagram.com/hotellumiere',
    facebook: 'https://facebook.com/hotellumiere',
  }
}
```

### `src/constants/navigation.ts`
```ts
export const publicNavLinks = [
  { label: 'Rooms', href: '/rooms' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Offers', href: '/offers' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
// NOTE: /management* links are NEVER added here
```

---

## 6. MIDDLEWARE — Route Protection

### `src/middleware.ts`
```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all /management/* routes (future auth check here)
  if (pathname.startsWith('/management')) {
    // TODO: Check Supabase session cookie
    // const session = await getSession(request)
    // if (!session) return NextResponse.redirect(new URL('/management-login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/management/:path*'],
}
```

---

## 7. TAILWIND CONFIG DIRECTION

### `tailwind.config.ts`
```ts
// Extend with luxury hotel design tokens
theme: {
  extend: {
    colors: {
      gold: {
        50:  '#fdfaf0',
        100: '#faf3d0',
        400: '#d4aa5f',
        500: '#c49a3a',
        600: '#a67c1e',
      },
      charcoal: {
        900: '#0f0f0f',
        800: '#1a1a1a',
        700: '#2a2a2a',
      },
      cream: {
        50:  '#fefefe',
        100: '#f9f6f1',
        200: '#f0ebe0',
      }
    },
    fontFamily: {
      display: ['Cormorant Garamond', 'serif'],   // Headlines
      body:    ['Jost', 'sans-serif'],             // Body text
      accent:  ['Cinzel', 'serif'],                // Labels / badges
    },
    spacing: {
      '18': '4.5rem',
      '22': '5.5rem',
      '128': '32rem',
    }
  }
}
```

---

## 8. RECOMMENDED PACKAGES

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "typescript": "5.x",
    "tailwindcss": "3.x",
    "clsx": "^2.0",
    "tailwind-merge": "^2.0",
    "zod": "^3.0",
    "react-hook-form": "^7.0",
    "@hookform/resolvers": "^3.0",
    "date-fns": "^3.0",
    "react-datepicker": "^6.0",
    "swiper": "^11.0",
    "yet-another-react-lightbox": "^3.0",
    "framer-motion": "^11.0",
    "sonner": "^1.0",
    "lucide-react": "^0.400"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.x",
    "prettier": "^3",
    "prettier-plugin-tailwindcss": "^0.6"
  }
}
```

---

## 9. PHASED BUILD PLAN

| Phase | Scope |
|---|---|
| **Phase 1** ✅ | Architecture & folder structure (THIS DOCUMENT) |
| **Phase 2** ✅ Design tokens, global CSS, fonts, Tailwind config |
| **Phase 3** ✅ Shared UI components (Button, Card, Input, etc.) |
| **Phase 4** ✅ Navbar, Footer, layouts |
| **Phase 5** ✅ Home page (all sections) |
| **Phase 6** ✅ Rooms listing + Room detail pages |
| **Phase 7** ✅ | Booking flow (form, summary, confirmation) |
| **Phase 8** ✅ About, Gallery, Amenities, Contact pages |
| **Phase 9** ✅ Blog + Offers pages |
| **Phase 10** | Admin layout + all management pages |
| **Phase 11** | Supabase integration (DB, auth, API routes) |
| **Phase 12** | Payment integration (Stripe) |
| **Phase 13** | SEO, performance, accessibility audit |
| **Phase 14** | Deployment (Vercel) |
