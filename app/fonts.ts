/**
 * The direction's two-or-three faces, registered through next/font and
 * exposed as CSS variables only. Components never name a family — they
 * use --font-display / --font-body / --font-mono via Tailwind tokens.
 *
 * A direction fork rewrites this file and the token block in globals.css.
 * Nothing else.
 *
 * Shared base: Inter Tight for display and body, JetBrains Mono for the
 * small text. Neutral on purpose.
 */
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'

const display = Inter_Tight({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-face-display',
  display: 'swap',
})

const body = Inter_Tight({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-face-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-face-mono',
  display: 'swap',
})

export const fontClassName = `${display.variable} ${body.variable} ${mono.variable}`
