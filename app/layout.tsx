import type { Metadata, Viewport } from 'next'
import { fontClassName } from './fonts'
import { site } from '@/lib/copy'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.tabTitle,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.wordmark,
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClassName}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
