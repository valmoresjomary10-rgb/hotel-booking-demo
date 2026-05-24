import { offers } from '@/constants/offersData'
import OfferGrid from '@/components/offers/OfferGrid'

export default function OfferGridSection() {
  return (
    <section className="bg-cream-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <OfferGrid offers={offers} />
      </div>
    </section>
  )
}
