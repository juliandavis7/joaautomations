import type { Metadata, Viewport } from 'next'
import { fontClassName } from './fonts'
import { site } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.tagline,
  description: site.tagline,
  openGraph: {
    title: site.tagline,
    description: site.tagline,
    url: site.url,
    siteName: site.wordmark,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: site.tagline }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.tagline,
    description: site.tagline,
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}#org`,
      name: site.wordmark,
      url: site.url,
      email: site.email,
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${site.url}#service`,
      name: site.wordmark,
      url: site.url,
      email: site.email,
      description: site.tagline,
      parentOrganization: { '@id': `${site.url}#org` },
    },
  ],
}

/**
 * Pre-paint navigation-type flag. Reads the navigation entry and stamps a
 * class before the first paint so a reload does not replay the intro.
 * Cheap, and it fixes a real flash (docs/design-principles.md §8).
 */
const prePaint = `(function(){try{var n=performance.getEntriesByType('navigation')[0];if(n&&n.type!=='navigate'){document.documentElement.classList.add('is-repeat-nav')}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClassName}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
