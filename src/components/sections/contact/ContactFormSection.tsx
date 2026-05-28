'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, MapPin, Phone, Mail, Clock } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Grand Avenue, Manila, Philippines',
    href: 'https://maps.google.com/?q=10.1283125,124.3188125',
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+63 2 8888 0000',
    href: 'tel:+6328888000',
    external: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'reservations@hotellumiere.com',
    href: 'mailto:reservations@hotellumiere.com',
    external: false,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Front Desk open 24 hours, 7 days a week',
    href: null,
    external: false,
  },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactFormSection() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormState('success')
        setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <section className="bg-cream-100 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">

          {/* Left: Contact Info */}
          <div className="lg:col-span-2">
            <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-500">
              Contact Details
            </span>
            <h2 className="mt-3 font-display text-3xl font-light text-charcoal-900 md:text-4xl">
              Find Us at <em className="italic text-gold-500">Lumière</em>
            </h2>
            <div className="mt-5 h-px w-16 bg-gold-400" />

            <div className="mt-10 space-y-8">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold-400/40 text-gold-500">
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/40">
                        {item.label}
                      </p>
                      {item.href ? (
                        
                          <a href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel="noreferrer"
                          className="mt-0.5 font-body text-sm text-charcoal-900 transition-colors hover:text-gold-500"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 font-body text-sm text-charcoal-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Map */}
            <div className="mt-10 overflow-hidden">
              <iframe
                title="Hotel Lumiere Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=124.3168125%2C10.1263125%2C124.3208125%2C10.1303125&layer=mapnik&marker=10.1283125%2C124.3188125"
                width="100%"
                height="220"
                style={{ border: 0, filter: 'grayscale(80%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-500">
              Send a Message
            </span>
            <h2 className="mt-3 font-display text-3xl font-light text-charcoal-900 md:text-4xl">
              How Can We <em className="italic text-gold-500">Help?</em>
            </h2>
            <div className="mt-5 h-px w-16 bg-gold-400" />

            {formState === 'success' && (
              <div role="alert" aria-live="polite" className="mt-8 flex items-start gap-4 border border-gold-400/40 bg-gold-400/5 p-6">
                <CheckCircle className="mt-0.5 shrink-0 text-gold-500" size={20} strokeWidth={1.5} />
                <div>
                  <p className="font-display text-lg text-charcoal-900">Message Sent</p>
                  <p className="mt-1 font-body text-sm text-charcoal-700/60">
                    Thank you for reaching out. A member of our team will respond within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {formState === 'error' && (
              <div role="alert" aria-live="assertive" className="mt-8 flex items-start gap-4 border border-red-300 bg-red-50 p-6">
                <AlertCircle className="mt-0.5 shrink-0 text-red-500" size={20} strokeWidth={1.5} />
                <div>
                  <p className="font-display text-lg text-charcoal-900">Something went wrong</p>
                  <p className="mt-1 font-body text-sm text-charcoal-700/60">
                    Please try again or contact us directly by phone or email.
                  </p>
                </div>
              </div>
            )}

            {formState !== 'success' && (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/50">
                      First Name <span className="text-gold-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-2 w-full border border-charcoal-900/15 bg-white px-4 py-3 font-body text-sm text-charcoal-900 outline-none transition-colors placeholder:text-charcoal-700/30 focus:border-gold-400"
                      placeholder="Isabella"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/50">
                      Last Name <span className="text-gold-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-2 w-full border border-charcoal-900/15 bg-white px-4 py-3 font-body text-sm text-charcoal-900 outline-none transition-colors placeholder:text-charcoal-700/30 focus:border-gold-400"
                      placeholder="Reyes"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/50">
                      Email <span className="text-gold-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 w-full border border-charcoal-900/15 bg-white px-4 py-3 font-body text-sm text-charcoal-900 outline-none transition-colors placeholder:text-charcoal-700/30 focus:border-gold-400"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/50">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 w-full border border-charcoal-900/15 bg-white px-4 py-3 font-body text-sm text-charcoal-900 outline-none transition-colors placeholder:text-charcoal-700/30 focus:border-gold-400"
                      placeholder="+63 9XX XXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/50">
                    Subject <span className="text-gold-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-2 w-full border border-charcoal-900/15 bg-white px-4 py-3 font-body text-sm text-charcoal-900 outline-none transition-colors focus:border-gold-400"
                  >
                    <option value="">Select a subject</option>
                    <option value="reservation">Reservation Inquiry</option>
                    <option value="special-request">Special Request</option>
                    <option value="spa">Spa Booking</option>
                    <option value="events">Events & Weddings</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="font-accent text-[10px] uppercase tracking-widest text-charcoal-700/50">
                    Message <span className="text-gold-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 w-full resize-none border border-charcoal-900/15 bg-white px-4 py-3 font-body text-sm text-charcoal-900 outline-none transition-colors placeholder:text-charcoal-700/30 focus:border-gold-400"
                    placeholder="Tell us how we can assist you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="flex items-center gap-3 border border-gold-400 bg-gold-400 px-10 py-4 font-accent text-xs uppercase tracking-widest text-charcoal-900 transition-all duration-300 hover:bg-transparent hover:text-gold-500 disabled:opacity-60"
                >
                  {formState === 'loading' ? (
                    <>
                      <span role="status" aria-label="Sending message" className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal-900 border-t-transparent" />
                      <span aria-hidden="true">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} strokeWidth={1.5} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
