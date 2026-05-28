import { Waves, Utensils, Sparkles, Dumbbell, Wine, Car, Wifi, Coffee, Music, ShoppingBag, Sunset, ConciergeBell, type LucideIcon } from 'lucide-react'

export interface AmenityImage {
  url: string
  caption?: string
}

export interface Amenity {
  id: string
  icon: LucideIcon
  title: string
  description: string
  tag: string
  images: AmenityImage[]
}

export const amenities: Amenity[] = [
  {
    id: 'infinity-pool',
    icon: Waves,
    title: 'Infinity Pool',
    description: 'Our rooftop infinity pool stretches 40 metres with panoramic views of Manila Bay. Open daily from 6AM to 10PM, with poolside butler service.',
    tag: 'Outdoor',
    images: [
      { url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=85&auto=format&fit=crop', caption: 'Rooftop infinity pool at dusk' },
      { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85&auto=format&fit=crop', caption: 'Poolside lounging area' },
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85&auto=format&fit=crop', caption: 'Pool with city views' },
      { url: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1200&q=85&auto=format&fit=crop', caption: 'Evening pool ambiance' },
      { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85&auto=format&fit=crop', caption: 'Butler poolside service' },
    ],
  },
  {
    id: 'restaurant-lumiere',
    icon: Utensils,
    title: 'Restaurant Lumière',
    description: 'Our Michelin-recognised fine dining restaurant serves modern Filipino cuisine by Executive Chef Marco Santos. Open for breakfast, lunch, and dinner.',
    tag: 'Dining',
    images: [
      { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop', caption: 'Signature Filipino tasting menu' },
      { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85&auto=format&fit=crop', caption: 'Main dining hall' },
      { url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=85&auto=format&fit=crop', caption: 'Chef\'s table experience' },
      { url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200&q=85&auto=format&fit=crop', caption: 'Artisan dessert selection' },
      { url: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=85&auto=format&fit=crop', caption: 'Private dining room' },
    ],
  },
  {
    id: 'lumiere-spa',
    icon: Sparkles,
    title: 'Lumière Spa',
    description: 'A sanctuary of calm across two floors, offering traditional hilot massage, hydrotherapy, and bespoke wellness journeys curated by our therapists.',
    tag: 'Wellness',
    images: [
      { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=85&auto=format&fit=crop', caption: 'Spa treatment suite' },
      { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=85&auto=format&fit=crop', caption: 'Hydrotherapy pool' },
      { url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=85&auto=format&fit=crop', caption: 'Relaxation lounge' },
      { url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=85&auto=format&fit=crop', caption: 'Signature hilot massage' },
      { url: 'https://images.unsplash.com/photo-1607006483224-23a9168a0ae8?w=1200&q=85&auto=format&fit=crop', caption: 'Aromatherapy ritual' },
    ],
  },
  {
    id: 'fitness-centre',
    icon: Dumbbell,
    title: 'Fitness Centre',
    description: 'State-of-the-art equipment by Technogym, personal training sessions, and daily yoga classes overlooking the city skyline. Open 24 hours.',
    tag: 'Fitness',
    images: [
      { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85&auto=format&fit=crop', caption: 'Technogym equipment floor' },
      { url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=85&auto=format&fit=crop', caption: 'Cardio suite with views' },
      { url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&q=85&auto=format&fit=crop', caption: 'Personal training session' },
      { url: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&q=85&auto=format&fit=crop', caption: 'Yoga studio' },
      { url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=85&auto=format&fit=crop', caption: 'Stretching and recovery zone' },
    ],
  },
  {
    id: 'gold-bar',
    icon: Wine,
    title: 'The Gold Bar',
    description: 'Manila\'s most sophisticated cocktail lounge, featuring rare whisky collections, bespoke cocktails, and live jazz every Friday and Saturday night.',
    tag: 'Nightlife',
    images: [
      { url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=85&auto=format&fit=crop', caption: 'Signature gold cocktails' },
      { url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200&q=85&auto=format&fit=crop', caption: 'Rare whisky collection' },
      { url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200&q=85&auto=format&fit=crop', caption: 'Live jazz nights' },
      { url: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=1200&q=85&auto=format&fit=crop', caption: 'Bar interior' },
      { url: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=1200&q=85&auto=format&fit=crop', caption: 'Bespoke cocktail crafting' },
    ],
  },
  {
    id: 'grand-ballroom',
    icon: Music,
    title: 'Grand Ballroom',
    description: 'Our 1,200 sqm Grand Ballroom accommodates up to 800 guests and features state-of-the-art AV, bespoke lighting rigs, and a dedicated events team.',
    tag: 'Events',
    images: [
      { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=85&auto=format&fit=crop', caption: 'Grand Ballroom full setup' },
      { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85&auto=format&fit=crop', caption: 'Wedding banquet setup' },
      { url: 'https://images.unsplash.com/photo-1478147427282-58a87a433d11?w=1200&q=85&auto=format&fit=crop', caption: 'Gala dinner arrangement' },
      { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85&auto=format&fit=crop', caption: 'Corporate event setup' },
      { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85&auto=format&fit=crop', caption: 'Cocktail reception layout' },
    ],
  },
  {
    id: 'cafe-eclat',
    icon: Coffee,
    title: 'Café Éclat',
    description: 'An all-day café serving single-origin Philippine coffee, artisan pastries, and light bites in a sun-drenched atrium setting.',
    tag: 'Dining',
    images: [
      { url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&q=85&auto=format&fit=crop', caption: 'Atrium café setting' },
      { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=85&auto=format&fit=crop', caption: 'Single-origin Philippine coffee' },
      { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=85&auto=format&fit=crop', caption: 'Artisan pastry selection' },
      { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=85&auto=format&fit=crop', caption: 'Morning breakfast spread' },
      { url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&q=85&auto=format&fit=crop', caption: 'Café interior' },
    ],
  },
  {
    id: 'valet-transfers',
    icon: Car,
    title: 'Valet & Transfers',
    description: 'Complimentary valet parking for all guests, plus private airport transfers in our fleet of Mercedes-Benz S-Class vehicles.',
    tag: 'Concierge',
    images: [
      { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85&auto=format&fit=crop', caption: 'Mercedes-Benz S-Class fleet' },
      { url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=85&auto=format&fit=crop', caption: 'Airport transfer service' },
      { url: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=85&auto=format&fit=crop', caption: 'Hotel entrance valet' },
      { url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85&auto=format&fit=crop', caption: 'Luxury vehicle interior' },
      { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop', caption: 'Chauffeur service' },
    ],
  },
  {
    id: 'butler-service',
    icon: ConciergeBell,
    title: '24/7 Butler Service',
    description: 'Every suite guest is assigned a dedicated butler available around the clock for any request, from unpacking to private dining arrangements.',
    tag: 'Service',
    images: [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85&auto=format&fit=crop', caption: 'Suite butler service' },
      { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85&auto=format&fit=crop', caption: 'In-room dining setup' },
      { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=85&auto=format&fit=crop', caption: 'Turndown service' },
      { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85&auto=format&fit=crop', caption: 'Luxury suite amenities' },
      { url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=85&auto=format&fit=crop', caption: 'Personalised welcome' },
    ],
  },
  {
    id: 'high-speed-wifi',
    icon: Wifi,
    title: 'High-Speed WiFi',
    description: 'Complimentary gigabit WiFi throughout the property, with dedicated business workstations and private meeting rooms available on request.',
    tag: 'Business',
    images: [
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop', caption: 'Business centre' },
      { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85&auto=format&fit=crop', caption: 'Private meeting room' },
      { url: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=85&auto=format&fit=crop', caption: 'Executive workstation' },
      { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=85&auto=format&fit=crop', caption: 'Collaborative workspace' },
      { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=85&auto=format&fit=crop', caption: 'Conference facilities' },
    ],
  },
  {
    id: 'boutique-lumiere',
    icon: ShoppingBag,
    title: 'Boutique Lumière',
    description: 'Our curated in-hotel boutique carries luxury Filipino brands, bespoke fragrances, and Lumière\'s signature amenity collection.',
    tag: 'Shopping',
    images: [
      { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85&auto=format&fit=crop', caption: 'Boutique interior' },
      { url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85&auto=format&fit=crop', caption: 'Filipino luxury brands' },
      { url: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=1200&q=85&auto=format&fit=crop', caption: 'Signature fragrances' },
      { url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&q=85&auto=format&fit=crop', caption: 'Curated gift selection' },
      { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=85&auto=format&fit=crop', caption: 'Lumière collection' },
    ],
  },
  {
    id: 'rooftop-terrace',
    icon: Sunset,
    title: 'Rooftop Terrace',
    description: 'The crown jewel of Hotel Lumière — an open-air terrace with fire pits, daybeds, and unobstructed views of Manila Bay at golden hour.',
    tag: 'Outdoor',
    images: [
      { url: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=85&auto=format&fit=crop', caption: 'Rooftop at golden hour' },
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop', caption: 'Fire pit lounge area' },
      { url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=85&auto=format&fit=crop', caption: 'Daybed sunset views' },
      { url: 'https://images.unsplash.com/photo-1536625313309-53e5f1c63c01?w=1200&q=85&auto=format&fit=crop', caption: 'Manila Bay panorama' },
      { url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=85&auto=format&fit=crop', caption: 'Evening terrace ambiance' },
    ],
  },
]
