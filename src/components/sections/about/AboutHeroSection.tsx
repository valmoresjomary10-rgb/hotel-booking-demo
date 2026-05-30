export default function AboutHeroSection() {
  return (
    <section className="relative py-32 md:py-44" style={{ backgroundColor: '#000000' }}>
      <div className="pointer-events-none absolute inset-8 border border-white/10" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-blue-400" />
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-blue-400">
            Our Story
          </span>
          <span className="h-px w-12 bg-blue-400" />
        </div>
        <h1 className="font-display text-5xl font-light text-white md:text-7xl">
          A Legacy of{' '}
          <em className="italic text-blue-400">Refined Luxury</em>
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-gray-400 md:text-lg">
          Since 1998, Hotel Lumière has been Manila's most celebrated sanctuary —
          where timeless elegance meets heartfelt Filipino hospitality.
        </p>
      </div>
    </section>
  )
}