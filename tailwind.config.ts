import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
'./src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    // ─── Container ────────────────────────────────────────────────────────────
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',   // 20px mobile
        sm: '1.5rem',         // 24px
        md: '2rem',           // 32px
        lg: '3rem',           // 48px
        xl: '4rem',           // 64px
        '2xl': '5rem',        // 80px
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },

    extend: {
      // ─── Color Palette ───────────────────────────────────────────────────────
      colors: {
        // Gold — primary brand accent
        gold: {
          50:  '#fdfaf0',
          100: '#faf3d0',
          200: '#f3e49a',
          300: '#e9ce62',
          400: '#dbb83a',
          500: '#c9a227',   // ← brand gold (primary)
          600: '#a8821a',
          700: '#856314',
          800: '#624910',
          900: '#3e2e0a',
          950: '#1f1604',
        },

        // Charcoal — dark base tones
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
          900: '#111111',   // ← near-black base
          950: '#080808',
        },

        // Cream — warm off-white tones
        cream: {
          50:  '#fefefe',
          100: '#faf8f3',
          200: '#f4efe4',
          300: '#ece3d2',
          400: '#e0d4be',
          500: '#d2c4a8',
          600: '#b8a888',
          700: '#96876a',
          800: '#72664f',
          900: '#4e4537',
        },

        // Slate — neutral supporting tones
        slate: {
          50:  '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },

        // Semantic tokens — mapped to palette
        primary: {
          DEFAULT: '#c9a227',
          hover:   '#a8821a',
          light:   '#f3e49a',
          dark:    '#856314',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#111111',
          hover:   '#2a2a2a',
          light:   '#3d3d3d',
          foreground: '#faf8f3',
        },
        accent: {
          DEFAULT: '#c9a227',
          subtle:  '#faf3d0',
          muted:   '#d2c4a8',
        },
        background: {
          DEFAULT: '#faf8f3',   // warm cream white
          alt:     '#f4efe4',   // slightly darker cream
          dark:    '#111111',   // dark sections
          card:    '#ffffff',
        },
        foreground: {
          DEFAULT: '#111111',
          muted:   '#555555',
          subtle:  '#7a7a7a',
          inverted:'#faf8f3',
        },
        border: {
          DEFAULT: '#e0d4be',
          muted:   '#ece3d2',
          strong:  '#b8a888',
          dark:    '#2a2a2a',
        },
        card: {
          DEFAULT:    '#ffffff',
          foreground: '#111111',
          border:     '#e0d4be',
        },
        muted: {
          DEFAULT:    '#f4efe4',
          foreground: '#555555',
        },
        destructive: {
          DEFAULT:    '#dc2626',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT:    '#16a34a',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT:    '#d97706',
          foreground: '#ffffff',
        },
      },

      // ─── Typography ──────────────────────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body:    ['var(--font-jost)', 'Jost', 'system-ui', 'sans-serif'],
        accent:  ['var(--font-cinzel)', 'Cinzel', 'Georgia', 'serif'],
        mono:    ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },

      fontSize: {
        // Display — hero headings
        'display-2xl': ['clamp(3rem, 8vw, 7rem)',      { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display-xl':  ['clamp(2.5rem, 6vw, 5.5rem)',  { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display-lg':  ['clamp(2rem, 4.5vw, 4rem)',    { lineHeight: '1.1',  letterSpacing: '-0.015em', fontWeight: '300' }],
        'display-md':  ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm':  ['clamp(1.5rem, 2.5vw, 2.25rem)',{ lineHeight: '1.2', letterSpacing: '-0.01em' }],

        // Headings
        'heading-xl':  ['2rem',    { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-lg':  ['1.75rem', { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
        'heading-md':  ['1.5rem',  { lineHeight: '1.35', letterSpacing: '-0.005em' }],
        'heading-sm':  ['1.25rem', { lineHeight: '1.4' }],
        'heading-xs':  ['1.125rem',{ lineHeight: '1.45' }],

        // Body
        'body-xl':  ['1.25rem', { lineHeight: '1.7' }],
        'body-lg':  ['1.125rem',{ lineHeight: '1.7' }],
        'body-md':  ['1rem',    { lineHeight: '1.65' }],
        'body-sm':  ['0.9375rem',{ lineHeight: '1.6' }],
        'body-xs':  ['0.875rem',{ lineHeight: '1.55' }],

        // Labels / UI
        'label-lg':  ['0.9375rem',{ lineHeight: '1', letterSpacing: '0.12em', fontWeight: '500' }],
        'label-md':  ['0.8125rem',{ lineHeight: '1', letterSpacing: '0.14em', fontWeight: '500' }],
        'label-sm':  ['0.75rem',  { lineHeight: '1', letterSpacing: '0.16em', fontWeight: '500' }],
        'label-xs':  ['0.6875rem',{ lineHeight: '1', letterSpacing: '0.2em',  fontWeight: '600' }],
      },

      fontWeight: {
        thin:       '100',
        extralight: '200',
        light:      '300',
        normal:     '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',
      },

      letterSpacing: {
        tightest: '-0.03em',
        tighter:  '-0.02em',
        tight:    '-0.01em',
        normal:   '0em',
        wide:     '0.05em',
        wider:    '0.1em',
        widest:   '0.15em',
        'ultra':  '0.2em',
      },

      lineHeight: {
        none:    '1',
        tightest:'1.05',
        tight:   '1.2',
        snug:    '1.35',
        normal:  '1.5',
        relaxed: '1.65',
        loose:   '1.8',
        loosest: '2',
      },

      // ─── Spacing ─────────────────────────────────────────────────────────────
      spacing: {
        // Micro
        '0.5':  '0.125rem',   //  2px
        '1':    '0.25rem',    //  4px
        '1.5':  '0.375rem',   //  6px
        '2':    '0.5rem',     //  8px
        '2.5':  '0.625rem',   // 10px
        '3':    '0.75rem',    // 12px
        '3.5':  '0.875rem',   // 14px
        '4':    '1rem',       // 16px
        '5':    '1.25rem',    // 20px
        '6':    '1.5rem',     // 24px
        '7':    '1.75rem',    // 28px
        '8':    '2rem',       // 32px
        '9':    '2.25rem',    // 36px
        '10':   '2.5rem',     // 40px
        '11':   '2.75rem',    // 44px
        '12':   '3rem',       // 48px
        '14':   '3.5rem',     // 56px
        '16':   '4rem',       // 64px
        '18':   '4.5rem',     // 72px
        '20':   '5rem',       // 80px
        '22':   '5.5rem',     // 88px
        '24':   '6rem',       // 96px
        '28':   '7rem',       // 112px
        '32':   '8rem',       // 128px
        '36':   '9rem',       // 144px
        '40':   '10rem',      // 160px
        '44':   '11rem',      // 176px
        '48':   '12rem',      // 192px
        '52':   '13rem',      // 208px
        '56':   '14rem',      // 224px
        '60':   '15rem',      // 240px
        '64':   '16rem',      // 256px
        '72':   '18rem',      // 288px
        '80':   '20rem',      // 320px
        '96':   '24rem',      // 384px
        '112':  '28rem',      // 448px
        '128':  '32rem',      // 512px

        // Named section spacing
        'section-xs': '3rem',    //  48px — tight sections
        'section-sm': '5rem',    //  80px — small sections
        'section-md': '7rem',    // 112px — standard sections
        'section-lg': '10rem',   // 160px — generous sections
        'section-xl': '14rem',   // 224px — hero sections
      },

      // ─── Border Radius ────────────────────────────────────────────────────────
      borderRadius: {
        none:  '0',
        xs:    '0.125rem',   //  2px
        sm:    '0.25rem',    //  4px
        DEFAULT:'0.375rem',  //  6px
        md:    '0.5rem',     //  8px
        lg:    '0.75rem',    // 12px
        xl:    '1rem',       // 16px
        '2xl': '1.5rem',     // 24px
        '3xl': '2rem',       // 32px
        '4xl': '2.5rem',     // 40px
        full:  '9999px',
      },

      // ─── Shadows ─────────────────────────────────────────────────────────────
      boxShadow: {
        // Elevation — luxury layered shadows
        'xs':   '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'sm':   '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        DEFAULT:'0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08)',
        'md':   '0 8px 16px -2px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.06)',
        'lg':   '0 16px 32px -4px rgb(0 0 0 / 0.12), 0 8px 16px -8px rgb(0 0 0 / 0.08)',
        'xl':   '0 24px 48px -8px rgb(0 0 0 / 0.14), 0 12px 24px -12px rgb(0 0 0 / 0.1)',
        '2xl':  '0 40px 80px -12px rgb(0 0 0 / 0.18)',
        'inner':'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
        'none': 'none',

        // Gold glow — for CTA hover states
        'gold-sm':  '0 0 16px 0 rgb(201 162 39 / 0.25)',
        'gold-md':  '0 0 32px 0 rgb(201 162 39 / 0.3)',
        'gold-lg':  '0 0 48px 0 rgb(201 162 39 / 0.35)',

        // Dark card shadows
        'card':     '0 2px 12px 0 rgb(0 0 0 / 0.08)',
        'card-hover':'0 8px 32px 0 rgb(0 0 0 / 0.14)',
        'luxury':   '0 32px 64px -16px rgb(0 0 0 / 0.2), 0 0 0 1px rgb(201 162 39 / 0.1)',
      },

      // ─── Animations ──────────────────────────────────────────────────────────
      keyframes: {
        // Fade
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%':   { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },

        // Scale
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-in-center': {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },

        // Shimmer — skeleton loading
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },

        // Gold pulse — for accents
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(201 162 39 / 0.4)' },
          '50%':      { boxShadow: '0 0 0 8px rgb(201 162 39 / 0)' },
        },

        // Float — decorative elements
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },

        // Reveal underline
        'underline-expand': {
          '0%':   { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },

        // Slide up — drawer / modal
        'slide-up': {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },

        // Number counter
        'count-up': {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        'fade-in':        'fade-in 0.5s ease-out forwards',
        'fade-in-up':     'fade-in-up 0.6s ease-out forwards',
        'fade-in-down':   'fade-in-down 0.6s ease-out forwards',
        'fade-in-left':   'fade-in-left 0.6s ease-out forwards',
        'fade-in-right':  'fade-in-right 0.6s ease-out forwards',
        'scale-in':       'scale-in 0.4s ease-out forwards',
        'scale-in-center':'scale-in-center 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'shimmer':        'shimmer 2s linear infinite',
        'pulse-gold':     'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':          'float 4s ease-in-out infinite',
        'underline-expand':'underline-expand 0.3s ease-out forwards',
        'slide-up':       'slide-up 0.4s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        'count-up':       'count-up 0.5s ease-out forwards',

        // Delayed variants (add more as needed via style prop)
        'fade-in-up-slow':  'fade-in-up 0.9s ease-out forwards',
        'fade-in-up-fast':  'fade-in-up 0.4s ease-out forwards',
      },

      // ─── Transitions ─────────────────────────────────────────────────────────
      transitionDuration: {
        '0':   '0ms',
        '75':  '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000':'1000ms',
      },
      transitionTimingFunction: {
        'in-expo':    'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo':   'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo':'cubic-bezier(0.87, 0, 0.13, 1)',
        'luxury':     'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':     'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ─── Z-Index Scale ────────────────────────────────────────────────────────
      zIndex: {
        'behind':   '-1',
        '0':        '0',
        '10':       '10',
        '20':       '20',
        '30':       '30',
        '40':       '40',
        '50':       '50',
        'sticky':   '100',
        'dropdown': '200',
        'overlay':  '300',
        'modal':    '400',
        'toast':    '500',
        'tooltip':  '600',
        'max':      '9999',
      },

      // ─── Sizes ───────────────────────────────────────────────────────────────
      maxWidth: {
        'prose':    '65ch',
        'prose-lg': '75ch',
        'site':     '1440px',
        'wide':     '1600px',
        'content':  '1200px',
        'narrow':   '800px',
        'card':     '420px',
      },

      // ─── Aspect Ratios ────────────────────────────────────────────────────────
      aspectRatio: {
        'auto':    'auto',
        'square':  '1 / 1',
        'video':   '16 / 9',
        'room':    '4 / 3',
        'portrait':'3 / 4',
        'wide':    '21 / 9',
        'hero':    '16 / 7',
        'card':    '5 / 4',
      },

      // ─── Background Image ─────────────────────────────────────────────────────
      backgroundImage: {
        'gradient-gold':    'linear-gradient(135deg, #c9a227 0%, #e9ce62 50%, #c9a227 100%)',
        'gradient-dark':    'linear-gradient(180deg, #111111 0%, #2a2a2a 100%)',
        'gradient-cream':   'linear-gradient(180deg, #faf8f3 0%, #f4efe4 100%)',
        'gradient-radial':  'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise':            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        'hero-overlay':     'linear-gradient(to bottom, rgb(0 0 0 / 0.3) 0%, rgb(0 0 0 / 0.6) 100%)',
        'card-overlay':     'linear-gradient(to top, rgb(0 0 0 / 0.7) 0%, transparent 60%)',
      },
    },
  },

  plugins: [
    // Add @tailwindcss/typography if needed for blog
    // require('@tailwindcss/typography'),
  ],
}

export default config
