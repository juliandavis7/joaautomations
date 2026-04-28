import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://joaautomations.com'),
  title: 'JOA Automations: Custom AI workflows for small business',
  description:
    'Boutique AI automation agency. Custom workflows and websites that handle your busywork, fully built, tested, and maintained.',
  openGraph: {
    title: 'JOA Automations: Custom AI workflows for small business',
    description:
      'Boutique AI automation agency. Custom workflows and websites that handle your busywork, fully built, tested, and maintained.',
    url: 'https://joaautomations.com',
    siteName: 'JOA Automations',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'JOA Automations',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JOA Automations: Custom AI workflows for small business',
    description:
      'Boutique AI automation agency. Custom workflows and websites that handle your busywork, fully built, tested, and maintained.',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
