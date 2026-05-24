export default function BlogHeroSection() {
  return (
    <section className="bg-charcoal-900 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-accent text-[11px] uppercase tracking-widest text-gold-400 mb-4">
          Journal
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-cream-50 leading-tight">
          Stories from <span className="italic text-gold-400">Lumière</span>
        </h1>
        <div className="w-16 h-px bg-gold-400 mx-auto mt-6 mb-6" />
        <p className="font-body text-cream-200/70 text-lg max-w-xl mx-auto leading-relaxed">
          Travel inspiration, dining discoveries, wellness wisdom, and behind-the-scenes stories from Manila's most celebrated luxury hotel.
        </p>
      </div>
    </section>
  )
}
