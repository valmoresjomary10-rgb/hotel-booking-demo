'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const MAX_ATTEMPTS = 3
const LOCKOUT_MINUTES = 15
const LOCKOUT_MS = LOCKOUT_MINUTES * 60 * 1000
const STORAGE_KEY = 'lum_login_attempts'

interface AttemptData {
  count: number
  lockedUntil: number | null
}

function getAttemptData(): AttemptData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { count: 0, lockedUntil: null }
    return JSON.parse(raw)
  } catch {
    return { count: 0, lockedUntil: null }
  }
}

function saveAttemptData(data: AttemptData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function clearAttemptData() {
  localStorage.removeItem(STORAGE_KEY)
}

export default function ManagementLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS)
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)
  const [countdown, setCountdown] = useState('')

  // Load attempt data on mount
  useEffect(() => {
    const data = getAttemptData()
    if (data.lockedUntil && data.lockedUntil > Date.now()) {
      setLockedUntil(data.lockedUntil)
    } else if (data.lockedUntil && data.lockedUntil <= Date.now()) {
      clearAttemptData()
    } else {
      setAttemptsLeft(MAX_ATTEMPTS - data.count)
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    if (!lockedUntil) return
    const interval = setInterval(() => {
      const remaining = lockedUntil - Date.now()
      if (remaining <= 0) {
        clearAttemptData()
        setLockedUntil(null)
        setAttemptsLeft(MAX_ATTEMPTS)
        setCountdown('')
        clearInterval(interval)
        return
      }
      const mins = Math.floor(remaining / 60000)
      const secs = Math.floor((remaining % 60000) / 1000)
      setCountdown(`${mins}:${secs.toString().padStart(2, '0')}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [lockedUntil])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (lockedUntil) return

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      const data = getAttemptData()
      const newCount = data.count + 1

      if (newCount >= MAX_ATTEMPTS) {
        const lockTime = Date.now() + LOCKOUT_MS
        saveAttemptData({ count: newCount, lockedUntil: lockTime })
        setLockedUntil(lockTime)
        setAttemptsLeft(0)
        setError('')
      } else {
        saveAttemptData({ count: newCount, lockedUntil: null })
        setAttemptsLeft(MAX_ATTEMPTS - newCount)
        setError(`Invalid email or password. ${MAX_ATTEMPTS - newCount} attempt${MAX_ATTEMPTS - newCount === 1 ? '' : 's'} remaining.`)
      }

      setLoading(false)
      return
    }

    clearAttemptData()
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

        {lockedUntil ? (
          /* Locked state */
          <div className="text-center space-y-6">
            <div className="bg-red-500/10 border border-red-500/30 px-6 py-8">
              <p className="font-accent text-[10px] uppercase tracking-widest text-red-400 mb-3">
                Account Temporarily Locked
              </p>
              <p className="font-display text-4xl text-red-400 mb-3">{countdown}</p>
              <p className="font-body text-xs text-cream-200/50">
                Too many failed attempts. Please wait before trying again.
              </p>
            </div>
            <p className="font-body text-xs text-cream-200/30">
              If you've forgotten your password, contact{' '}
              <span className="text-gold-400/60">reservations@hotellumiere.com</span>
            </p>
          </div>
        ) : (
          /* Login form */
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
              <div className="bg-red-500/10 border border-red-500/30 px-4 py-3">
                <p className="font-body text-xs text-red-400 text-center">{error}</p>
              </div>
            )}

            {attemptsLeft < MAX_ATTEMPTS && attemptsLeft > 0 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                  <div key={i}
                    className={`h-1 w-8 rounded-full transition-colors ${
                      i < attemptsLeft ? 'bg-gold-400' : 'bg-red-500'
                    }`}
                  />
                ))}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-charcoal-900 font-accent text-[11px] uppercase tracking-widest py-4 transition-colors mt-2">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="font-body text-xs text-cream-200/30 text-center">
              Forgot your password?{' '}
              <span className="text-gold-400/60">Contact your administrator</span>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
