import { Offer } from '@/types/offer'
import OfferCard from './OfferCard'

interface OfferGridProps {
  offers: Offer[]
}

export default function OfferGrid({ offers }: OfferGridProps) {
  const featured = offers.find(o => o.featured)
  const rest = offers.filter(o => !o.featured || o.id !== featured?.id)

  return (
    <div>
      {featured && (
        <div className="mb-10">
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-4">Featured Offer</p>
          <OfferCard offer={featured} featured />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map(offer => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  )
}
