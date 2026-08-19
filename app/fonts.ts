/**
 * Direction B — "Signal". One face doing everything: IBM Plex Sans at 400
 * for display and body, and its own mono cut for the small text. The
 * discipline is the point — with a single family and no ornament, any
 * sloppy spacing is nakedly visible.
 *
 * Exposed as CSS variables only. Components never name a family.
 */
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-face-display',
  display: 'swap',
})

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-face-body',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-face-mono',
  display: 'swap',
})

export const fontClassName = `${sans.variable} ${body.variable} ${mono.variable}`
