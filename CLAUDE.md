# Hotel Lumière — Claude Context File

## Project Overview
Luxury hotel booking web app called **Hotel Lumière** ("Where Luxury Meets Serenity").
Located in Manila, Philippines. Currency: PHP (₱).

## Tech Stack
- Next.js 14 App Router · TypeScript · Tailwind CSS
- Supabase (database, future auth)
- PayMongo (payment, Phase 12)
- react-hook-form + Zod validation
- date-fns, lucide-react, framer-motion

## CRITICAL: Folder Structure
The app router lives in the ROOT `app/` folder — NOT `src/app/`.
- Pages and API routes → `app/`
- Components, hooks, lib, types, constants → `src/`
- The `@/` alias points to `src/`

## Design System (gold + charcoal + cream)
- Colors: gold-400/500, charcoal-900/800/700, cream-50/100/200
- Fonts: Cormorant Garamond (display), Jost (body), Cinzel (accent/labels)
- Font classes: font-display, font-body, font-accent

## Room Data
Currently using mock data from `src/constants/roomData.ts`.
Room IDs are simple strings: '1', '2', '3', etc. (not UUIDs yet).
Supabase integration comes in Phase 11.

## Phase Progress
| Phase | Status | Notes |
|---|---|---|
| Phase 1 | ✅ | Architecture |
| Phase 2 | ✅ | Design tokens, Tailwind config |
| Phase 3 | ✅ | Shared UI components |
| Phase 4 | ✅ | Navbar, Footer, layouts |
| Phase 5 | ✅ | Home page |
| Phase 6 | ✅ | Rooms listing + Room detail |
| Phase 7 | ✅ | Booking flow (dates → guest info → review → confirmation) |
| Phase 8 | ✅ | About, Gallery, Amenities, Contact pages |
| Phase 9 | ✅ | Blog + Offers pages |
| Phase 10 | ✅ | Admin layout + management pages |
| Phase 11 | ⏳ | Supabase integration |
| Phase 12 | ⏳ | PayMongo payment integration |
| Phase 13 | ⏳ | SEO, performance, accessibility |
| Phase 14 | ⏳ | Deployment (Vercel) |

## Phase 7 Notes
- Booking flow: /booking?roomId=1 → 3 steps → /booking/confirmation?code=XXXXXXXX
- API route at app/api/bookings/route.ts (currently returns mock confirmation code)
- Supabase bookings table SQL ready in bookings_table.sql (run in Phase 11)
- PayMongo placeholder in BookingReviewAndPay.tsx (wire up in Phase 12)
- VAT calculated at 12% (Philippine standard)
- BookingConfirmationCard uses Supabase — update to mock in Phase 11