export default function AmenitiesHeroSection() {
  return (
    <section className="relative bg-charcoal-900 py-32 md:py-44">
      <div className="pointer-events-none absolute inset-8 border border-gold-400/10" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gold-400" />
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-400">
            Curated Experiences
          </span>
          <span className="h-px w-12 bg-gold-400" />
        </div>
        <h1 className="font-display text-5xl font-light text-cream-50 md:text-7xl">
          Amenities &{' '}
          <em className="italic text-gold-400">Experiences</em>
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-cream-200/60 md:text-lg">
          Every detail at Hotel Lumière is crafted to elevate your stay — from
          world-class dining to restorative spa rituals and beyond.
        </p>
      </div>
    </section>
  )
}
