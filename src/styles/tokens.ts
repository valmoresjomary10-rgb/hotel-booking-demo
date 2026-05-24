// src/lib/tokens.ts
// ─── Design Tokens — TypeScript Reference ────────────────────────────────────
// Single source of truth for all design decisions.
// Use these in dynamic styles (framer-motion, inline styles, JS-driven logic).
// For static Tailwind classes, use the tailwind.config.ts tokens directly.

export const tokens = {
  // ─── Colors ───────────────────────────────────────────────────────────────
  colors: {
    gold: {
      50:  '#fdfaf0',
      100: '#faf3d0',
      200: '#f3e49a',
      300: '#e9ce62',
      400: '#dbb83a',
      500: '#c9a227',   // brand primary
      600: '#a8821a',
      700: '#856314',
      800: '#624910',
      900: '#3e2e0a',
    },
    charcoal: {
      50:  '#f5f5f5',
      100: '#e8e8e8',
      200: '#d0d0d0',
      300: '#a8a8a8',
      400: '#7a7a7a',
      500: '#555555',
      600: '#3d3d3d',
      700: '#2a2a2a',
      800: '#1c1c1c',
      900: '#111111',
    },
    cream: {
      50:  '#fefefe',
      100: '#faf8f3',
      200: '#f4efe4',
      300: '#ece3d2',
      400: '#e0d4be',
      500: '#d2c4a8',
    },
    semantic: {
      primary:    '#c9a227',
      secondary:  '#111111',
      background: '#faf8f3',
      foreground: '#111111',
      border:     '#e0d4be',
      muted:      '#f4efe4',
      accent:     '#c9a227',
    },
  },

  // ─── Typography ───────────────────────────────────────────────────────────
  fonts: {
    display: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
    body:    'var(--font-jost), "Jost", system-ui, sans-serif',
    accent:  'var(--font-cinzel), "Cinzel", Georgia, serif',
    mono:    'var(--font-mono), "JetBrains Mono", monospace',
  },

  fontSizes: {
    xs:   '0.75rem',   // 12px
    sm:   '0.875rem',  // 14px
    base: '1rem',      // 16px
    lg:   '1.125rem',  // 18px
    xl:   '1.25rem',   // 20px
    '2xl':'1.5rem',    // 24px
    '3xl':'1.875rem',  // 30px
    '4xl':'2.25rem',   // 36px
    '5xl':'3rem',      // 48px
    '6xl':'3.75rem',   // 60px
    '7xl':'4.5rem',    // 72px
    '8xl':'6rem',      // 96px
  },

  // ─── Spacing ──────────────────────────────────────────────────────────────
  spacing: {
    sectionXs: '3rem',
    sectionSm: '5rem',
    sectionMd: '7rem',
    sectionLg: '10rem',
    sectionXl: '14rem',
  },

  // ─── Border Radius ────────────────────────────────────────────────────────
  radius: {
    xs:   '0.125rem',
    sm:   '0.25rem',
    base: '0.375rem',
    md:   '0.5rem',
    lg:   '0.75rem',
    xl:   '1rem',
    '2xl':'1.5rem',
    '3xl':'2rem',
    full: '9999px',
  },

  // ─── Shadows ──────────────────────────────────────────────────────────────
  shadows: {
    xs:      '0 1px 2px 0 rgb(0 0 0 / 0.04)',
    sm:      '0 1px 3px 0 rgb(0 0 0 / 0.07)',
    base:    '0 4px 6px -1px rgb(0 0 0 / 0.08)',
    md:      '0 8px 16px -2px rgb(0 0 0 / 0.1)',
    lg:      '0 16px 32px -4px rgb(0 0 0 / 0.12)',
    xl:      '0 24px 48px -8px rgb(0 0 0 / 0.14)',
    '2xl':   '0 40px 80px -12px rgb(0 0 0 / 0.18)',
    goldSm:  '0 0 16px 0 rgb(201 162 39 / 0.25)',
    goldMd:  '0 0 32px 0 rgb(201 162 39 / 0.3)',
    card:    '0 2px 12px 0 rgb(0 0 0 / 0.08)',
    cardHover:'0 8px 32px 0 rgb(0 0 0 / 0.14)',
  },

  // ─── Transitions ──────────────────────────────────────────────────────────
  transitions: {
    ease: {
      luxury:   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      spring:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
      smooth:   'cubic-bezier(0.4, 0, 0.2, 1)',
      outExpo:  'cubic-bezier(0.19, 1, 0.22, 1)',
    },
    duration: {
      fast:   150,
      base:   300,
      slow:   500,
      slower: 700,
    },
  },

  // ─── Z-Index ──────────────────────────────────────────────────────────────
  zIndex: {
    behind:   -1,
    base:      0,
    raised:   10,
    sticky:  100,
    dropdown:200,
    overlay: 300,
    modal:   400,
    toast:   500,
    tooltip: 600,
    max:    9999,
  },
} as const

export type Tokens = typeof tokens
export type GoldShade = keyof typeof tokens.colors.gold
export type CharcoalShade = keyof typeof tokens.colors.charcoal
export type CreamShade = keyof typeof tokens.colors.cream
