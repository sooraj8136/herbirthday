/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#08050a',
          800: '#0d0a0f',
          700: '#131019',
          600: '#1a1620',
        },
        wine: {
          900: '#3d151c',
          800: '#4d1a24',
          700: '#5e1f2c',
          600: '#72262f',
          500: '#8b2d3b',
          400: '#a8384a',
          300: '#c44858',
        },
        rose: {
          900: '#7a3a44',
          700: '#9e5560',
          500: '#c77b85',
          300: '#e0a8af',
          200: '#eec9cd',
          100: '#f7e0e3',
        },
        cream: {
          900: '#e8ddd5',
          700: '#f0e8e2',
          500: '#f5ede8',
          300: '#faf4f0',
          100: '#fdfaf7',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.4s ease-out forwards',
        'fade-in-slow': 'fadeIn 2.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 1.2s ease-out forwards',
        'fade-in-up-slow': 'fadeInUp 1.8s ease-out forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'slow-zoom': 'slowZoom 20s ease-out forwards',
        'float-up': 'floatUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px 4px rgba(139,45,59,0.3), 0 0 40px 8px rgba(139,45,59,0.15)' },
          '50%': { boxShadow: '0 0 30px 8px rgba(139,45,59,0.5), 0 0 60px 16px rgba(139,45,59,0.25)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(0) scale(0.5)' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-120px) scale(1.2)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
