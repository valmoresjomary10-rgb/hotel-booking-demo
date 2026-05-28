import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Info | Hotel Lumière Management',
}

export default function ManagementContactPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-1">Management</p>
          <h1 className="font-display text-3xl text-charcoal-900">Contact Information</h1>
        </div>
      </div>

      <div className="bg-white border border-cream-200 p-6 max-w-2xl">
        <p className="font-body text-sm text-charcoal-700/60 mb-6">
          Contact details are managed via <code className="font-mono text-xs bg-cream-100 px-1">src/constants/siteConfig.ts</code>. Update that file to change the hotel's contact information across the entire site.
        </p>

        <div className="space-y-4">
          {[
            { label: 'Hotel Name', value: 'Hotel Lumière' },
            { label: 'Address', value: '123 Grand Avenue, Manila, Philippines' },
            { label: 'Phone', value: '+63 2 8888 0000' },
            { label: 'Email', value: 'reservations@hotellumiere.com' },
            { label: 'Check-in Time', value: '2:00 PM' },
            { label: 'Check-out Time', value: '12:00 PM' },
            { label: 'Instagram', value: 'https://instagram.com/hotellumiere' },
            { label: 'Facebook', value: 'https://facebook.com/hotellumiere' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 py-3 border-b border-cream-200 last:border-0">
              <span className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40 w-32 shrink-0 pt-0.5">{item.label}</span>
              <span className="font-body text-sm text-charcoal-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
