// ============================================
// HOTEL LUMIÈRE — FONTS & TYPOGRAPHY
// Scandinavian / Boutique Refresh
// ============================================

import { Plus_Jakarta_Sans, Inter, DM_Sans } from 'next/font/google'

export const fontDisplay = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

export const fontBody = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const fontAccent = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-accent',
  display: 'swap',
})