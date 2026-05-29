import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Maria Santos',
    location: 'Cebu City, Philippines',
    rating: 5,
    review:
      'We had the most wonderful family vacation here. The staff were so warm and attentive, and the kids absolutely loved the pool. We will definitely be coming back!',
    stay: 'Family Room · 4 nights',
    avatar: 'MS',
  },
  {
    id: 2,
    name: 'James & Lea Reyes',
    location: 'Davao, Philippines',
    rating: 5,
    review:
      'Perfect place for our anniversary getaway. The room was spotless, the breakfast was delicious, and the location is very convenient. Felt like home but better!',
    stay: 'Deluxe Room · 2 nights',
    avatar: 'JR',
  },
  {
    id: 3,
    name: 'Thomas Müller',
    location: 'Munich, Germany',
    rating: 5,
    review:
      'As a foreign traveler, I was a bit nervous but the team made me feel so welcome from the moment I arrived. Clean, comfortable, and great value. Highly recommend.',
    stay: 'Superior Room · 5 nights',
    avatar: 'TM',
  },
  {
    id: 4,
    name: 'Ana Gonzalez',
    location: 'Manila, Philippines',
    rating: 5,
    review:
      'Staycation done right! The interiors are so pretty and relaxing. I loved waking up to the garden view every morning. The staff remembered my name by day two.',
    stay: 'Garden View Room · 3 nights',
    avatar: 'AG',
  },
  {
    id: 5,
    name: 'Kevin & Sarah Lim',
    location: 'Singapore',
    rating: 5,
    review:
      'We visit Manila every year and this is now our go-to hotel. The rooms are always immaculate, the beds are incredibly comfortable, and the breakfast buffet is top-notch.',
    stay: 'Junior Suite · 3 nights',
    avatar: 'KL',
  },
  {
    id: 6,
    name: 'Josephine Cruz',
    location: 'Quezon City, Philippines',
    rating: 5,
    review:
      'Brought my elderly parents here for their anniversary and the staff went above and beyond to make them feel special. So grateful for the thoughtful gestures.',
    stay: 'Deluxe Room · 2 nights',
    avatar: 'JC',
  },
]

const avatarColors = [
  'bg-blue-100 text-blue-600',
  'bg-sage-100 text-sage-600',
  'bg-blue-50 text-blue-500',
  'bg-gray-100 text-gray-600',
  'bg-blue-100 text-blue-600',
  'bg-sage-100 text-sage-600',
]

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="section-wrapper">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="section-label">Guest Reviews</p>
          <h2 className="section-heading">
            What Our Guests Say
          </h2>
          <p className="section-subheading mx-auto text-center">
            Real stories from real guests — families, couples,
            and travelers who called Hotel Lumière home.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-14">
          {[
            { value: '4.9', label: 'Average Rating' },
            { value: '500+', label: 'Happy Guests' },
            { value: '98%', label: 'Would Return' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p
                className="text-3xl font-bold text-blue-500 mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {value}
              </p>
              <p
                className="text-xs text-gray-400 tracking-wide"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100
                         hover:border-blue-100 hover:shadow-soft
                         transition-all duration-200 flex flex-col gap-4"
            >
              {/* Quote icon + Stars */}
              <div className="flex items-center justify-between">
                <Quote size={20} className="text-blue-200" />
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className="text-blue-400 fill-blue-400"
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p
                className="text-sm text-gray-600 leading-relaxed flex-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                "{t.review}"
              </p>

              {/* Stay tag */}
              <span className="badge badge-blue w-fit text-xs">
                {t.stay}
              </span>

              {/* Guest Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                <div className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  text-xs font-bold shrink-0 ${avatarColors[i]}
                `}
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-gray-800"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs text-gray-400"
                    style={{ fontFamily: 'var(--font-accent)' }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}