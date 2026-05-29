import Link from 'next/link'
import { ArrowRight, Tag, Clock } from 'lucide-react'

const offers = [
  {
    id: 1,
    badge: 'Limited Time',
    title: 'Early Bird Special',
    desc: 'Book 30 days in advance and enjoy 20% off your entire stay. Valid for all room types.',
    discount: '20% OFF',
    validUntil: 'Dec 31, 2025',
    color: 'bg-blue-50 border-blue-100',
    badgeColor: 'badge-blue',
  },
  {
    id: 2,
    badge: 'Family Deal',
    title: 'Family Fun Package',
    desc: 'Stay 3 nights and get the 4th night free. Includes breakfast for up to 2 adults and 2 kids.',
    discount: 'STAY 3 GET 1',
    validUntil: 'Mar 31, 2026',
    color: 'bg-sage-50 border-sage-100',
    badgeColor: 'badge-sage',
  },
  {
    id: 3,
    badge: 'Couples',
    title: 'Romantic Getaway',
    desc: 'Special rate for couples including late checkout, welcome fruit basket, and room upgrade.',
    discount: '15% OFF',
    validUntil: 'Feb 28, 2026',
    color: 'bg-gray-50 border-gray-200',
    badgeColor: 'badge-gray',
  },
]

export default function OffersPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="section-wrapper">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="section-label">Special Offers</p>
            <h2 className="section-heading">
              Deals Made for You
            </h2>
            <p className="section-subheading">
              Great value packages for families, couples,
              and every kind of traveler.
            </p>
          </div>
          <Link
            href="/offers"
            className="btn-secondary text-sm shrink-0 w-fit"
          >
            All Offers
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`
                relative rounded-2xl border p-6 flex flex-col gap-4
                hover:shadow-soft transition-all duration-200 group
                ${offer.color}
              `}
            >
              {/* Discount stamp */}
              <div className="absolute top-5 right-5">
                <div
                  className="w-16 h-16 rounded-full bg-white shadow-soft-md
                             flex items-center justify-center text-center"
                >
                  <span
                    className="text-xs font-bold text-blue-500 leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {offer.discount}
                  </span>
                </div>
              </div>

              {/* Badge */}
              <span className={`badge w-fit ${offer.badgeColor}`}>
                <Tag size={10} className="mr-1" />
                {offer.badge}
              </span>

              {/* Title & Desc */}
              <div>
                <h3
                  className="text-lg font-bold text-gray-900 mb-2 pr-16"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {offer.title}
                </h3>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {offer.desc}
                </p>
              </div>

              {/* Valid until */}
              <div className="flex items-center gap-1.5 text-gray-400 mt-auto">
                <Clock size={12} />
                <span
                  className="text-xs"
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  Valid until {offer.validUntil}
                </span>
              </div>

              {/* CTA */}
              <Link
                href={`/offers`}
                className="btn-secondary text-sm w-full justify-center mt-1"
              >
                Claim Offer
                <ArrowRight size={14} />
              </Link>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}