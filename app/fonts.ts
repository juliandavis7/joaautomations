/**
 * Direction C — "Long shadow". A high-contrast display serif against a
 * neutral sans, with mono on the metadata. The serif is the
 * differentiator: it reads editorial and design-literate, and it signals
 * brand and copy as a real service line rather than an add-on.
 *
 * Three faces, all at 400. Instrument Serif ships one weight, which keeps
 * the one-weight rule honest by construction.
 */
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-face-display',
  display: 'swap',
})

const sans = Inter({
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

export const fontClassName = `${serif.variable} ${sans.variable} ${mono.variable}`
