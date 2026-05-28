export default function AboutHeroSection() {
  return (
    <section className="relative bg-charcoal-900 py-32 md:py-44">
      <div className="pointer-events-none absolute inset-8 border border-gold-400/10" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gold-400" />
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-400">
            Our Story
          </span>
          <span className="h-px w-12 bg-gold-400" />
        </div>
        <h1 className="font-display text-5xl font-light text-cream-50 md:text-7xl">
          A Legacy of{' '}
          <em className="italic text-gold-400">Refined Luxury</em>
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-cream-200/60 md:text-lg">
          Since 1998, Hotel Lumière has been Manila's most celebrated sanctuary —
          where timeless elegance meets heartfelt Filipino hospitality.
        </p>
      </div>
    </section>
  )
}
