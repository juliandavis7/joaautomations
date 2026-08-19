import type { Config } from 'tailwindcss'

/**
 * Every value here resolves to a CSS variable defined in app/globals.css.
 * A direction fork changes the variables, never this file — that is what
 * keeps the three worktrees structurally identical.
 */
const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        accent: 'var(--accent)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        display: ['var(--t-display)', { lineHeight: 'normal', fontWeight: '400' }],
        body: ['var(--t-body)', { lineHeight: '1.45', fontWeight: '400' }],
        mono: ['var(--t-mono)', { lineHeight: '1', fontWeight: '400' }],
      },
      spacing: {
        side: 'var(--side)',
        sect: 'var(--sect)',
        'sect-gap': 'var(--sect-gap)',
      },
      maxWidth: {
        ct: 'var(--ct-max)',
      },
    },
  },
  plugins: [],
}
export default config
