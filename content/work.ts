/**
 * The three Work cards. Case studies and testimonials in one section.
 *
 * Rules (docs/brief.md): no invented outcomes, quotes, figures, or
 * timelines. Quotes here are verbatim from the previous site and are the
 * only two we have. Everything unknown is a literal [FILL IN: …].
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
    headline: '[FILL IN: outcome headline — fill-ins.md #1]',
    client: 'Humble Bike Rentals',
    story:
      'We designed and built the site on Next.js. Booking is backed by Google Calendar, so a rental lands on the calendar the owner already checks. Resend handles the confirmation and the reminder.',
    quote: {
      text: "I was missing calls every summer weekend. Tourists would hit voicemail and rent from the shop down the boardwalk. Now the AI receptionist answers every call and books rentals straight into my calendar. Weekend revenue is up and I'm not the bottleneck anymore.",
      name: 'Karl Watson',
      title: 'Owner, Humble Bike Rentals',
    },
    meta: {
      services: '[FILL IN: services line — fill-ins.md #4]',
      industry: '[FILL IN: industry — fill-ins.md #5]',
      location: '[FILL IN: city, state — fill-ins.md #2]',
    },
    href: null,
  },
  {
    headline: '[FILL IN: outcome headline — fill-ins.md #7]',
    client: 'Holonomy Consulting',
    story:
      'A custom site build, with Resend wired into the contact flow so an inquiry arrives as real email rather than sitting in a form dashboard nobody opens. [FILL IN: two sentences of plain context on what Holonomy actually does — fill-ins.md #12]',
    meta: {
      services: '[FILL IN: services line — fill-ins.md #10]',
      industry: '[FILL IN: industry — fill-ins.md #11]',
      location: '[FILL IN: city, state — fill-ins.md #8]',
    },
    href: null,
  },
  {
    headline: '[FILL IN: outcome headline about the workflow — fill-ins.md #13]',
    client: 'Best Interlocks of California',
    story:
      'This one is automation, not a website. A signed lease now moves through the CRM, the installer sheet, the welcome packet, and the payment links on its own, instead of being retyped four times by hand.',
    quote: {
      text: 'Before this was in place, every signed lease meant 20 minutes of busywork. Updating the CRM, refreshing the installer sheet, sending the welcome packet and payment links, all by hand. Now the second a lease gets signed, all of that fires off on its own. We get hours back every week.',
      name: 'Dan Rowan',
      title: 'Owner, Best Interlocks of California',
    },
    meta: {
      services: '[FILL IN: services line — fill-ins.md #16]',
      industry: '[FILL IN: industry — fill-ins.md #17]',
      location: '[FILL IN: city, state — fill-ins.md #14]',
    },
    href: null,
  },
]
