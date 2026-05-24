'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ManagementLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    router.push('/management/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-accent text-[10px] uppercase tracking-widest text-gold-400/60 mb-1">Management</p>
          <h1 className="font-display text-3xl text-cream-50">Hotel Lumière</h1>
          <div className="w-10 h-px bg-gold-400/40 mx-auto mt-4" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-accent text-[9px] uppercase tracking-widest text-cream-200/40 block mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@hotellumiere.com"
              className="w-full bg-charcoal-800 border border-charcoal-700 text-cream-50 font-body text-sm px-4 py-3 focus:outline-none focus:border-gold-400/50 placeholder:text-cream-200/20"
              required />
          </div>
          <div>
            <label className="font-accent text-[9px] uppercase tracking-widest text-cream-200/40 block mb-1.5">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-charcoal-800 border border-charcoal-700 text-cream-50 font-body text-sm px-4 py-3 focus:outline-none focus:border-gold-400/50 placeholder:text-cream-200/20"
              required />
          </div>
          {error && (
            <p className="font-body text-xs text-red-400 text-center">{error}</p>
          )}
          <button type="submit" disabled={loading}
            className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-charcoal-900 font-accent text-[11px] uppercase tracking-widest py-4 transition-colors mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
