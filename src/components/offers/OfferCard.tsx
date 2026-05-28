import Link from 'next/link'
import { Offer } from '@/types/offer'
import { ArrowRight, Check, Calendar } from 'lucide-react'

interface OfferCardProps {
  offer: Offer
  featured?: boolean
}

export default function OfferCard({ offer, featured = false }: OfferCardProps) {
  const validUntil = new Date(offer.validUntil).toLocaleDateString('en-PH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/offers/${offer.slug}`} className="group block">
        <div className="bg-charcoal-900 relative overflow-hidden">
          {offer.badge && (
            <div className="absolute top-6 right-6 z-10">
              <span className="font-accent text-[9px] uppercase tracking-widest bg-gold-500 text-charcoal-900 px-3 py-1.5">
                {offer.badge}
              </span>
            </div>
          )}
          <div className="p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-accent text-[10px] uppercase tracking-widest text-gold-400/70">{offer.category}</span>
              <h2 className="font-display text-4xl text-cream-50 mt-3 leading-tight group-hover:text-gold-400 transition-colors">
                {offer.title}
              </h2>
              <p className="font-body text-gold-400 italic text-lg mt-1">{offer.tagline}</p>
              <div className="w-12 h-px bg-gold-400/40 mt-5 mb-5" />
              <p className="font-body text-cream-200/70 text-sm leading-relaxed">{offer.description}</p>
              <div className="flex items-center gap-4 mt-6">
                {offer.discount > 0 && (
                  <span className="font-body text-cream-200/40 line-through text-sm" aria-label={`Original price ₱${offer.originalPrice.toLocaleString()}`}>₱{offer.originalPrice.toLocaleString()}</span>
                )}
                <span className="font-display text-3xl text-gold-400">₱{offer.packagePrice.toLocaleString()}</span>
                {offer.discount > 0 && (
                  <span className="font-accent text-[9px] uppercase tracking-widest text-gold-400 border border-gold-400/40 px-2 py-1">
                    {offer.discount}% off
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-cream-200/40 text-xs font-body">
                <Calendar size={11} /> Valid until {validUntil}
              </div>
            </div>
            <div className="space-y-2.5">
              {offer.inclusions.slice(0, 5).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={13} className="text-gold-400 mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-cream-200/70">{item}</span>
                </div>
              ))}
              <div className="pt-4">
                <span className="inline-flex items-center gap-2 font-accent text-[10px] uppercase tracking-widest text-gold-400 group-hover:gap-3 transition-all">
                  View Offer <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/offers/${offer.slug}`} className="group block border border-cream-200 hover:border-gold-400/50 transition-colors duration-300">
      {offer.badge && (
        <div className="bg-charcoal-900 px-6 py-2 flex justify-between items-center">
          <span className="font-accent text-[9px] uppercase tracking-widest text-gold-400">{offer.category}</span>
          <span className="font-accent text-[9px] uppercase tracking-widest bg-gold-500 text-charcoal-900 px-2 py-0.5">{offer.badge}</span>
        </div>
      )}
      {!offer.badge && (
        <div className="bg-charcoal-900 px-6 py-2">
          <span className="font-accent text-[9px] uppercase tracking-widest text-gold-400">{offer.category}</span>
        </div>
      )}
      <div className="p-6">
        <h3 className="font-display text-xl text-charcoal-900 leading-snug group-hover:text-gold-500 transition-colors">
          {offer.title}
        </h3>
        <p className="font-body text-gold-500 italic text-sm mt-1">{offer.tagline}</p>
        <p className="font-body text-sm text-charcoal-700/70 mt-3 line-clamp-2 leading-relaxed">{offer.description}</p>
        <div className="mt-4 pt-4 border-t border-cream-200 flex items-center justify-between">
          <div>
            {offer.discount > 0 && (
              <span className="font-body text-charcoal-700/40 line-through text-xs block" aria-label={`Original price ₱${offer.originalPrice.toLocaleString()}`}>₱{offer.originalPrice.toLocaleString()}</span>
            )}
            <span className="font-display text-2xl text-gold-500">₱{offer.packagePrice.toLocaleString()}</span>
          </div>
          <span className="flex items-center gap-1 text-gold-500 text-xs font-accent uppercase tracking-wider group-hover:gap-2 transition-all">
            View <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}
