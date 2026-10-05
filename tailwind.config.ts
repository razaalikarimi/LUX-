import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        foreground: '#f8fafc',
        card: {
          DEFAULT: 'rgba(18, 18, 26, 0.75)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        luxe: {
          gold: '#d4af37',
          'gold-light': '#f5e6a8',
          'gold-dark': '#997b15',
          black: '#0a0a0f',
          surface: '#12121a',
          muted: '#94a3b8',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 10px 40px -10px rgba(0, 0, 0, 0.7)',
        gold: '0 0 25px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
