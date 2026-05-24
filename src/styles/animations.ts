// src/lib/animations.ts
// ─── Framer Motion Animation Variants ────────────────────────────────────────
// Reusable motion variants for consistent luxury animations across all pages.
// Usage: import { fadeInUp } from '@/lib/animations'
//        <motion.div variants={fadeInUp} initial="hidden" animate="visible">

import type { Variants, Transition } from 'framer-motion'

// ─── Shared Transitions ───────────────────────────────────────────────────────
export const transitions = {
  luxury: {
    duration: 0.7,
    ease: [0.25, 0.46, 0.45, 0.94],
  } satisfies Transition,

  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } satisfies Transition,

  snappy: {
    duration: 0.4,
    ease: [0.19, 1, 0.22, 1],
  } satisfies Transition,

  slow: {
    duration: 1.0,
    ease: [0.25, 0.46, 0.45, 0.94],
  } satisfies Transition,

  fast: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  } satisfies Transition,
}

// ─── Fade Variants ────────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: transitions.luxury },
}

export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.luxury },
}

export const fadeInDown: Variants = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: transitions.luxury },
}

export const fadeInLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: transitions.luxury },
}

export const fadeInRight: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: transitions.luxury },
}

// ─── Scale Variants ───────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: transitions.luxury },
}

export const scaleInCenter: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
}

// ─── Stagger Container ────────────────────────────────────────────────────────
// Wrap a list of items — children will animate in sequence
export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

// ─── Slide Variants ───────────────────────────────────────────────────────────
export const slideUp: Variants = {
  hidden:  { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: transitions.snappy },
  exit:    { y: '100%', opacity: 0, transition: transitions.fast },
}

export const slideDown: Variants = {
  hidden:  { y: '-100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: transitions.snappy },
  exit:    { y: '-100%', opacity: 0, transition: transitions.fast },
}

export const slideRight: Variants = {
  hidden:  { x: '-100%' },
  visible: { x: 0, transition: transitions.snappy },
  exit:    { x: '-100%', transition: transitions.fast },
}

// ─── Hero Variants ────────────────────────────────────────────────────────────
export const heroContent: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.3,
    },
  },
}

export const heroSubtitle: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.5,
    },
  },
}

export const heroCTA: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.7,
    },
  },
}

// ─── Card Hover (for Framer Motion whileHover) ────────────────────────────────
export const cardHover = {
  whileHover: {
    y: -4,
    boxShadow: '0 8px 32px 0 rgb(0 0 0 / 0.14)',
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const imageZoomHover = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const buttonPress = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.1 },
}

// ─── Overlay / Modal ──────────────────────────────────────────────────────────
export const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

export const modalVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.96, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 30 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.2 },
  },
}

// ─── Gold line reveal ─────────────────────────────────────────────────────────
export const lineReveal: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.3,
    },
  },
}
