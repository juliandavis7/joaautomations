/**
 * The two faces, self-hosted through next/font/google.
 *
 * Portal specifies Perfectly Nineties Regular for display text. It is a
 * licensed face and is not sourced here; Playfair Display is the first
 * substitute Portal's own fallback list names, loaded at weight 400 —
 * the only weight Portal uses it at.
 *
 * Inter carries body, nav, links and labels at 400/500/600, per Portal.
 * Both subset to latin with display: swap.
 */
import { Inter, Playfair_Display } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-face-inter',
  display: 'swap',
})

export const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-face-display',
  display: 'swap',
})

export const fontClassName = `${inter.variable} ${display.variable}`
