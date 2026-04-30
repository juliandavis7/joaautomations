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
          indigo: '#6EA1EA',
          'indigo-light': '#7AC9DD',
          'indigo-dark': '#4C87DB',
        },
        surface: {
          navy: '#102D4E',
          'navy-scroll': '#1A436E',
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
          'purple-bg': '#E8F4FA',
          'purple-border': '#D7EAF3',
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
