import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0DC9B8',
          50: '#E6FFFE',
          100: '#CCFFFC',
          200: '#99FFF9',
          300: '#66FFF6',
          400: '#33FFF3',
          500: '#0DC9B8',
          600: '#0AA596',
          700: '#0AA596',
          800: '#087B73',
          900: '#065651',
          950: '#043A38',
        },
        ink: {
          DEFAULT: '#0B1F24',
          50: '#E8EDEF',
          100: '#D1DBDF',
          200: '#A3B7BF',
          300: '#75939F',
          400: '#476F7F',
          500: '#194B5F',
          600: '#143C4C',
          700: '#0F2D39',
          800: '#0A1E26',
          900: '#0B1F24',
          950: '#081A1F',
        },
        background: '#0A0F12',
        foreground: '#FAFAFA',
        muted: {
          DEFAULT: '#0F1A1F',
          foreground: '#94A3B8',
        },
        card: {
          DEFAULT: '#0F1A1F',
          foreground: '#FAFAFA',
        },
        popover: {
          DEFAULT: '#0F1A1F',
          foreground: '#FAFAFA',
        },
        primary: {
          DEFAULT: '#0DC9B8',
          foreground: '#0B1F24',
        },
        secondary: {
          DEFAULT: '#1E293B',
          foreground: '#F1F5F9',
        },
        accent: {
          DEFAULT: '#1E293B',
          foreground: '#F1F5F9',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FAFAFA',
        },
        border: '#1E293B',
        input: '#1E293B',
        ring: '#0DC9B8',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(13, 201, 184, 0.3)',
          },
          '50%': {
            'box-shadow': '0 0 40px rgba(13, 201, 184, 0.6)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #0DC9B8 0%, #0AA596 100%)',
        'hero-gradient':
          'radial-gradient(ellipse at center, rgba(13, 201, 184, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'brand-glow': '0 0 20px rgba(13, 201, 184, 0.3)',
        'brand-glow-lg': '0 0 40px rgba(13, 201, 184, 0.4)',
        'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
