export default function ContactHeroSection() {
  return (
    <section className="relative py-32 md:py-44" style={{ backgroundColor: '#000000' }}>
      <div className="pointer-events-none absolute inset-8 border border-white/10" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-blue-400" />
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-blue-400">
            Get In Touch
          </span>
          <span className="h-px w-12 bg-blue-400" />
        </div>
        <h1 className="font-display text-5xl font-light text-white md:text-7xl">
          We Would Love to{' '}
          <em className="italic text-blue-400">Hear From You</em>
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-gray-400 md:text-lg">
          Whether you have a question, a special request, or simply wish to plan
          your stay — our team is here for you, always.
        </p>
      </div>
    </section>
  )
}