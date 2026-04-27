import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#533AFD',
          'indigo-light': '#9b8ffe',
          'indigo-dark': '#3a25e8',
        },
        surface: {
          navy: '#061B31',
          'navy-scroll': '#0d2e4f',
          white: '#ffffff',
          'gray-light': '#F4F6F8',
        },
        content: {
          dark: '#0D1F35',
          gray: '#4A5568',
          muted: '#8896A8',
        },
        border: {
          light: '#E8ECF0',
          dark: 'rgba(255,255,255,0.08)',
        },
        accent: {
          'purple-bg': '#f3f2ff',
          'purple-border': '#e8e5ff',
        },
      },
      fontFamily: {
        jakarta: ['var(--font-plus-jakarta)', 'sans-serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
