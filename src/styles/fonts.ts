// src/lib/fonts.ts
// ─── Font Configuration (Next.js Font Optimization) ──────────────────────────
// Uses next/font/google for zero-layout-shift, self-hosted font loading.
// All fonts are preloaded and served from the same origin.

import { Cormorant_Garamond, Jost, Cinzel, JetBrains_Mono } from 'next/font/google'

// ─── Display Font — Cormorant Garamond ────────────────────────────────────────
// Used for: Hero headlines, section titles, room names, large display text
// Character: Elegant, editorial, classic luxury — thin strokes, high contrast
export const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style:  ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

// ─── Body Font — Jost ─────────────────────────────────────────────────────────
// Used for: Body text, UI labels, navigation, buttons, form fields
// Character: Clean geometric sans, modern, highly legible — pairs well with serifs
export const fontBody = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style:  ['normal'],
  variable: '--font-jost',
  display: 'swap',
  preload: true,
})

// ─── Accent Font — Cinzel ─────────────────────────────────────────────────────
// Used for: Labels, badges, eyebrow text, uppercase decorative text, star ratings
// Character: Classical Roman inscriptions style — all-caps, authoritative, refined
export const fontAccent = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style:  ['normal'],
  variable: '--font-cinzel',
  display: 'swap',
  preload: false, // only load when needed
})

// ─── Mono Font — JetBrains Mono ───────────────────────────────────────────────
// Used for: Admin code, booking reference numbers, confirmation codes
export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  style:  ['normal'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})

// ─── Combined font variables string (for layout.tsx) ─────────────────────────
// Usage in Root Layout:
//   <body className={fontVariables}>
export const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontAccent.variable,
  fontMono.variable,
].join(' ')

// ─── Font class names (for direct use without CSS variables) ──────────────────
export const fontClasses = {
  display: fontDisplay.className,
  body:    fontBody.className,
  accent:  fontAccent.className,
  mono:    fontMono.className,
}
