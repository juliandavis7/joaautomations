/**
 * The three Work cards. Case studies and testimonials in one section.
 *
 * Rules (docs/brief.md): no invented outcomes, quotes, figures, or
 * timelines. Facts here were confirmed in the fill-ins Q&A (2026-08-20).
 *
 * Both testimonials were deliberately dropped in that pass:
 *  - Karl Watson's described an AI phone receptionist, which is not what was
 *    built for Humble (website + Google Calendar booking). Keeping it would
 *    have claimed a product that never shipped.
 *  - Dan Rowan's matched its story but was dropped alongside it.
 * The WorkQuote type stays so a real, confirmed quote can be added later.
 */

export type WorkQuote = {
  text: string
  name: string
  title: string
}

export type WorkCardData = {
  /** Tier 1 — an outcome phrase at display size, never the client name. */
  headline: string
  /** Tier 2 — the client name, plainly. */
  client: string
  /** 2-4 sentences. Only beats we can stand behind. */
  story: string
  quote?: WorkQuote
  meta: {
    services: string
    industry: string
    location: string
  }
  /** Live URL, or null — the ↗ only renders when there is one. */
  href: string | null
}

export const work: WorkCardData[] = [
  {
    headline: 'Every booking lands in the calendar he already had open.',
    client: 'Humble Bike Rentals',
    story:
      'A custom build, designed by hand, with Google Calendar and email wired in behind it. A rental books straight onto the calendar the owner was already using, and the confirmation and reminder go out on their own.',
    meta: {
      services: 'Website + Booking + SEO/GEO',
      industry: 'Bike Rentals',
      location: 'Santa Monica, CA',
    },
    href: 'https://www.humblebikerentals.com',
  },
  {
    headline: 'The AI work finally had somewhere to live.',
    client: 'Holonomy Consulting',
    story:
      'Holonomy helps K-12 school systems navigate AI — strategy and policy through instructional integration and back-office operations — for district and school leaders. They had a site for the core consulting practice but nothing representing the AI Schools work, a second and growing line with no real home. The rebuild brought both under one site with clear separation between them, so a visitor lands in the right place and understands what Holonomy actually offers.',
    meta: {
      services: 'Website + SEO/GEO',
      industry: 'Education Consulting (K-12)',
      location: 'Alhambra, CA',
    },
    href: 'https://www.holonomyconsulting.com/',
  },
  {
    headline: 'Nothing gets retyped anymore.',
    client: 'Best Interlocks of California',
    story:
      'This one is automation, not a website. A signed lease now saves to the CRM, triggers the welcome packet, and sends the payment links automatically, instead of being handled by hand at every step.',
    meta: {
      services: 'SMB Automation + CRM',
      industry: 'Ignition Interlock Services',
      location: 'Santa Monica, CA',
    },
    href: 'https://bestinterlocksofcalifornia.com/',
  },
]
