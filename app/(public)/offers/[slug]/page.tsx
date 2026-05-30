import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { offers } from '@/constants/offersData'
import { ArrowLeft, Check, Calendar, Info } from 'lucide-react'
import Button from '@/components/ui/Button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const offer = offers.find(o => o.slug === slug)
  if (!offer) return { title: 'Offer Not Found' }
  return {
    title: `${offer.title} | Hotel Lumière`,
    description: offer.description,
  }
}

export async function generateStaticParams() {
  return offers.map(o => ({ slug: o.slug }))
}

export default async function OfferDetailPage({ params }: Props) {
  const { slug } = await params
  const offer = offers.find(o => o.slug === slug)
  if (!offer) notFound()

  const validUntil = new Date(offer.validUntil).toLocaleDateString('en-PH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const renderBody = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
  return <h2 key={i} className="font-display text-2xl text-gray-900 mt-10 mb-4">{line.replace('## ', '')}</h2>
}
if (line.trim() === '') return <br key={i} />
return <p key={i} className="font-body text-gray-700/80 leading-relaxed">{line}</p>
    })
  }

  const related = offers.filter(o => o.id !== offer.id && o.category === offer.category).slice(0, 2)

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/offers"
            className="inline-flex items-center gap-2 font-accent text-[10px] uppercase tracking-widest text-blue-400/70 hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft size={12} /> Back to Offers
          </Link>
          {offer.badge && (
            <div className="mb-4">
              <span className="font-accent text-[9px] uppercase tracking-widest bg-blue-500 text-gray-900 px-3 py-1.5">
                {offer.badge}
              </span>
            </div>
          )}
          <span className="font-accent text-[10px] uppercase tracking-widest text-blue-400 border border-blue-400/40 px-3 py-1">
            {offer.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-white mt-6 leading-tight">{offer.title}</h1>
          <p className="font-body text-blue-400 italic text-xl mt-3">{offer.tagline}</p>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-6 mb-6" />
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {offer.discount > 0 && (
              <span className="font-body text-gray-200/40 line-through">₱{offer.originalPrice.toLocaleString()}</span>
            )}
            <span className="font-display text-4xl text-blue-400">₱{offer.packagePrice.toLocaleString()}</span>
            {offer.discount > 0 && (
              <span className="font-accent text-[9px] uppercase tracking-widest text-blue-400 border border-blue-400/40 px-2 py-1">
                {offer.discount}% off
              </span>
            )}
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-gray-200/40 text-xs font-body">
            <Calendar size={11} /> Valid until {validUntil}
          </div>
        </div>
      </section>

      {/* Body + Inclusions */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {renderBody(offer.longDescription)}
          </div>
          <div>
            <div className="border border-blue-400/20 p-6 sticky top-24">
  <p className="font-accent text-[10px] uppercase tracking-widest text-blue-400 mb-4">What's Included</p>
              <div className="space-y-3">
                {offer.inclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={13} className="text-blue-500 mt-0.5 shrink-0" />
                    <span className="font-body text-sm text-gray-700/80">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link href="/booking">
  <Button variant="outline" size="lg">
    Book This Offer
  </Button>
</Link>
              </div>
              <div className="mt-4 flex items-start gap-2 text-gray-500/60">
                <Info size={11} className="mt-0.5 shrink-0" />
                <p className="font-body text-[11px] leading-relaxed">{offer.terms}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="font-accent text-[10px] uppercase tracking-widest text-blue-400 mb-2">You May Also Like</p>
<h2 className="font-display text-2xl text-gray-900 mb-8">More Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map(o => (
                <Link key={o.id} href={`/offers/${o.slug}`} className="group block border border-blue-400/20 hover:border-blue-400/50 transition-colors p-6">
  <span className="font-accent text-[9px] uppercase tracking-widest text-blue-400">{o.category}</span>
  <h3 className="font-display text-lg text-gray-900 mt-2 group-hover:text-blue-400 transition-colors leading-snug">{o.title}</h3>
  <p className="font-body text-sm text-gray-500/70 mt-1 italic">{o.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      </>
  )
}
