import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Soft Blue
        blue: {
          50:  '#f0f7ff',
          100: '#e0efff',
          200: '#baddff',
          300: '#7cc2ff',
          400: '#3aa0f5',
          500: '#1a82e0',
          600: '#1166c0',
        },
        // Accent — Sage Green
        sage: {
          50:  '#f4f7f4',
          100: '#e6ede6',
          200: '#c8d9c8',
          300: '#9bbc9b',
          400: '#6a9e6a',
          500: '#4d824d',
        },
        // Neutrals — Warm Gray
        gray: {
          50:  '#fafafa',
          100: '#f5f5f4',
          200: '#e8e8e6',
          300: '#d4d4d0',
          400: '#a8a8a3',
          500: '#737370',
          600: '#525250',
          700: '#3a3a38',
          800: '#262624',
          900: '#161614',
        },
        // Base
        white: '#ffffff',
        cream: '#fdfcfb',
      },

      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],  // Headlines
        body:    ['Inter', 'sans-serif'],              // Body text
        accent:  ['DM Sans', 'sans-serif'],            // Labels / UI
      },

      fontSize: {
        'display-2xl': ['4.5rem',  { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg':  ['3rem',    { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-md':  ['2.25rem', { lineHeight: '1.25' }],
        'display-sm':  ['1.875rem',{ lineHeight: '1.3' }],
      },

      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      boxShadow: {
        'soft-sm': '0 1px 4px 0 rgba(0,0,0,0.05)',
        'soft':    '0 2px 12px 0 rgba(0,0,0,0.07)',
        'soft-md': '0 4px 24px 0 rgba(0,0,0,0.08)',
        'soft-lg': '0 8px 40px 0 rgba(0,0,0,0.10)',
        'soft-xl': '0 16px 64px 0 rgba(0,0,0,0.12)',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}

export default config