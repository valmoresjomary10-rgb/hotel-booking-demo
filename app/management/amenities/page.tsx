import { Metadata } from 'next'
import { amenities } from '@/constants/amenityData'

export const metadata: Metadata = {
  title: 'Amenities | Hotel Lumière Management',
}

export default function ManagementAmenitiesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Management</p>
          <h1 className="font-display text-3xl text-charcoal-900">Amenities</h1>
        </div>
      </div>

      <div className="grid gap-4">
        {amenities.map((amenity) => {
          const Icon = amenity.icon
          return (
            <div key={amenity.id} className="bg-white border border-cream-200 p-5 flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold-400/40 text-gold-500">
                <Icon size={16} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-lg text-charcoal-900">{amenity.title}</h3>
                  <span className="font-accent text-[10px] uppercase tracking-widest text-gold-500 border border-gold-400/30 px-2 py-0.5">{amenity.tag}</span>
                </div>
                <p className="font-body text-sm text-charcoal-700/60">{amenity.description}</p>
                <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40 mt-2">{amenity.images.length} photos</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-cream-100 border border-cream-200">
        <p className="font-body text-sm text-charcoal-700/60">
          Amenity content is managed via <code className="font-mono text-xs bg-cream-200 px-1">src/constants/amenityData.ts</code>. Edit that file to update amenity details and images.
        </p>
      </div>
    </div>
  )
}
