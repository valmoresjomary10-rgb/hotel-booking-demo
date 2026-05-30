export default function AmenitiesHeroSection() {
  return (
    <section className="relative py-32 md:py-44" style={{ backgroundColor: '#000000' }}>
      <div className="pointer-events-none absolute inset-8 border border-white/10" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-blue-400" />
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-blue-400">
            Curated Experiences
          </span>
          <span className="h-px w-12 bg-blue-400" />
        </div>
        <h1 className="font-display text-5xl font-light text-white md:text-7xl">
          Amenities &{' '}
          <em className="italic text-blue-400">Experiences</em>
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-gray-400 md:text-lg">
          Every detail at Hotel Lumière is crafted to elevate your stay — from
          world-class dining to restorative spa rituals and beyond.
        </p>
      </div>
    </section>
  )
}