export default function DashboardPage() {
  return (
    <div>
      <p className="font-accent text-[10px] uppercase tracking-widest text-gold-500 mb-2">Overview</p>
      <h2 className="font-display text-3xl text-charcoal-900 mb-8">Welcome back</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: '—' },
          { label: 'Rooms Available', value: '—' },
          { label: 'Revenue (Month)', value: '—' },
          { label: 'Pending Payments', value: '—' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-cream-200 p-6">
            <p className="font-accent text-[9px] uppercase tracking-widest text-charcoal-700/40">{stat.label}</p>
            <p className="font-display text-3xl text-charcoal-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
