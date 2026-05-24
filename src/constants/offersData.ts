import { Offer } from '@/types/offer'

export const offers: Offer[] = [
  {
    id: '1',
    slug: 'honeymoon-escape',
    title: 'Honeymoon Escape',
    tagline: 'Begin your forever in absolute luxury',
    description: 'Celebrate your love story with our most romantic package. Enjoy a candlelit welcome, daily breakfast for two, a couples spa treatment, and a private sunset dining experience on our terrace.',
    longDescription: `Your honeymoon deserves nothing less than perfection. At Hotel Lumière, we have crafted an experience that speaks the language of love in every detail.

Upon arrival, your suite will be adorned with fresh sampaguita blooms and a chilled bottle of Moët & Chandon awaiting you. A hand-written welcome note from our General Manager sets the tone for what lies ahead.

## What's Included

Your Honeymoon Escape package encompasses two nights in our Premier Suite, daily breakfast served in-room or on your private balcony, a 90-minute couples hilot massage at the Lumière Spa, and an intimate four-course dinner prepared exclusively for you on our rooftop terrace.

## Special Touches

We believe it is the small details that make the greatest difference. Expect rose petal turndown service each evening, a curated pillow menu, and a personalized itinerary crafted by our concierge team for your time in Manila.`,
    category: 'Romance',
    badge: 'Most Popular',
    discount: 20,
    originalPrice: 28000,
    packagePrice: 22400,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    featured: true,
    inclusions: [
      '2 nights in Premier Suite',
      'Daily breakfast for two',
      'Couples hilot spa treatment (90 min)',
      'Private rooftop dinner',
      'Welcome champagne & flowers',
      'Rose petal turndown service',
      'Late checkout (2:00 PM)',
    ],
    terms: 'Valid for new bookings only. Subject to availability. Cannot be combined with other offers.',
  },
  {
    id: '2',
    slug: 'weekend-wellness-retreat',
    title: 'Weekend Wellness Retreat',
    tagline: 'Restore your body, refresh your mind',
    description: 'Surrender to stillness with our two-night wellness package. Featuring daily spa treatments rooted in Filipino healing traditions, curated wellness meals, and guided morning meditation.',
    longDescription: `In a world that never stops, Hotel Lumière offers you permission to pause. Our Weekend Wellness Retreat is designed for the discerning guest who understands that true luxury begins with restoration.

## The Wellness Journey

Each morning begins with a guided meditation session on our garden terrace, followed by a nourishing breakfast featuring ingredients sourced from local organic farms. Your afternoons are yours to spend by the pool or in quiet contemplation.

## Spa Treatments

Included in your package are two signature spa treatments per person — choose from our hilot massage, coconut oil body wrap, or volcanic salt scrub. Each treatment is customized to your body's needs on the day.

## Wellness Cuisine

Our kitchen team has developed a special wellness menu featuring traditional Filipino superfoods — malunggay, turmeric, and calamansi — prepared in ways that are as delicious as they are nourishing.`,
    category: 'Wellness',
    badge: 'New',
    discount: 15,
    originalPrice: 18000,
    packagePrice: 15300,
    validFrom: '2024-02-01',
    validUntil: '2024-11-30',
    featured: true,
    inclusions: [
      '2 nights Deluxe Room',
      'Daily wellness breakfast',
      '2 spa treatments per person',
      'Morning meditation sessions',
      'Wellness amenity kit',
      'Access to fitness center & pool',
    ],
    terms: 'Valid Friday to Sunday only. Advance booking of 7 days required.',
  },
  {
    id: '3',
    slug: 'manila-explorer',
    title: 'Manila Explorer',
    tagline: 'Discover the soul of the city in style',
    description: 'Experience Manila like never before with our curated city exploration package. Includes a private car and guide, visits to Intramuros and BGC, and a welcome dinner showcasing the best of Filipino cuisine.',
    longDescription: `Manila is a city of extraordinary depth — colonial history, contemporary art, world-class dining, and a spirit of warmth that is uniquely Filipino. The Manila Explorer package is your key to experiencing it all.

## Your Private Guide

A knowledgeable and personable guide will accompany you throughout your stay, offering insights into Manila's history, culture, and hidden gems that most visitors never discover.

## The Itinerary

Day one takes you through Intramuros — the walled city — where centuries of history come alive in cobblestone streets and baroque churches. Day two explores the contemporary side of Manila: the galleries of Bonifacio Global City, the markets of Salcedo, and the restaurants that are putting Philippine cuisine on the global map.

## Welcome Dinner

Your first evening begins with a curated welcome dinner at our dining room, featuring a tasting menu that introduces you to the flavors of the Philippine archipelago.`,
    category: 'Experience',
    badge: null,
    discount: 10,
    originalPrice: 15000,
    packagePrice: 13500,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    featured: false,
    inclusions: [
      '2 nights Superior Room',
      'Daily breakfast',
      'Private car & guide (2 days)',
      'Welcome dinner (4-course)',
      'Intramuros & BGC tours',
      'Hotel transfers',
    ],
    terms: 'Private guide subject to availability. Tour itinerary may vary.',
  },
  {
    id: '4',
    slug: 'long-stay-privilege',
    title: 'Long Stay Privilege',
    tagline: 'The longer you stay, the more you save',
    description: 'For guests who wish to truly settle in, our Long Stay Privilege offers exceptional value alongside all the comforts of Hotel Lumière for stays of five nights or more.',
    longDescription: `Some experiences cannot be rushed. For guests who wish to immerse themselves fully in the Lumière experience — and in the extraordinary city of Manila — our Long Stay Privilege rewards your extended visit with meaningful savings and exclusive benefits.

## The Benefits

A stay of five nights or more unlocks a 25% discount on our best available rate, complimentary daily breakfast, one complimentary spa treatment per person, and access to our exclusive Long Stay Lounge for private working and relaxation.

## For Business Travelers

Manila is increasingly a destination for regional business, and Hotel Lumière has become the preferred address for executives visiting the city. Our Long Stay package includes complimentary high-speed business WiFi, daily pressing of two garments, and priority access to our business facilities.`,
    category: 'Value',
    badge: 'Best Value',
    discount: 25,
    originalPrice: 12000,
    packagePrice: 9000,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    featured: false,
    inclusions: [
      'Minimum 5 nights',
      'Daily breakfast included',
      '1 spa treatment per person',
      'Long Stay Lounge access',
      'Daily garment pressing (2 items)',
      'Complimentary WiFi',
    ],
    terms: 'Minimum 5-night stay required. Rate applied per night.',
  },
  {
    id: '5',
    slug: 'family-grand-escape',
    title: 'Family Grand Escape',
    tagline: 'Luxury memories the whole family will cherish',
    description: 'Hotel Lumière welcomes families with a package designed to delight guests of all ages. Interconnecting rooms, kids\' amenities, family dining, and curated family activities await.',
    longDescription: `Luxury and family are not mutually exclusive — at Hotel Lumière, we have always believed that the finest hospitality extends to every member of your family, regardless of age.

## Family Accommodations

The Family Grand Escape features interconnecting Deluxe Rooms, ensuring parents have their own space while children are close by. Each children's room is thoughtfully prepared with age-appropriate amenities, books, and a welcome gift.

## Family Dining

Our kitchen team prepares a family breakfast each morning that satisfies both the most adventurous adult palate and the most particular young diner. Children under 12 dine complimentary from our kids' menu at dinner.

## Activities

Our concierge team will arrange a curated program of family-friendly activities — from cooking classes featuring simple Filipino recipes to guided visits to Manila's most family-friendly cultural sites.`,
    category: 'Family',
    badge: null,
    discount: 15,
    originalPrice: 22000,
    packagePrice: 18700,
    validFrom: '2024-03-01',
    validUntil: '2024-12-31',
    featured: false,
    inclusions: [
      'Interconnecting Deluxe Rooms',
      'Daily breakfast for whole family',
      'Children under 12 dine free (dinner)',
      'Kids\' welcome amenity',
      'Family activity program',
      'Early check-in (subject to availability)',
    ],
    terms: 'Valid for families with at least one child under 12. Children\'s ages must be declared at booking.',
  },
  {
    id: '6',
    slug: 'festive-season-gala',
    title: 'Festive Season Gala',
    tagline: 'Celebrate the season in true Lumière fashion',
    description: 'Ring in the holidays with Hotel Lumière\'s most spectacular seasonal package. Gala dinner, festive decorations, NYE countdown access, and a suite upgrade await the most festive time of year.',
    longDescription: `The holiday season at Hotel Lumière is unlike anywhere else in Manila. Our lobbies come alive with spectacular installations, our dining room transforms for gala evenings, and the energy of celebration fills every corridor.

## The Gala Dinner

On Christmas Eve and New Year's Eve, our Executive Chef presents a seven-course gala dinner that represents the pinnacle of the Lumière culinary experience. Wine pairings are available to complement each course.

## New Year's Eve Countdown

Guests of the Festive Season Gala package receive priority access to our rooftop countdown event — Manila's most exclusive New Year's Eve celebration, with panoramic views of the city's fireworks display.

## Suite Life

Every Festive Season Gala booking comes with a complimentary room category upgrade, subject to availability — our gift to you for choosing to celebrate with us.`,
    category: 'Seasonal',
    badge: 'Limited',
    discount: 0,
    originalPrice: 35000,
    packagePrice: 35000,
    validFrom: '2024-12-20',
    validUntil: '2025-01-02',
    featured: false,
    inclusions: [
      '3 nights minimum',
      'Gala dinner (Christmas Eve or NYE)',
      'NYE rooftop countdown access',
      'Complimentary room upgrade',
      'Festive welcome amenity',
      'Daily breakfast',
    ],
    terms: 'Limited availability. Full payment required at booking. Non-refundable.',
  },
]
