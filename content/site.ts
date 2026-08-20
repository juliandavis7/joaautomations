/**
 * Site-level copy. Anything we do not have a real fact for is a literal
 * [FILL IN: …] marker — see docs/fill-ins.md. Never replace a marker with
 * a plausible invention.
 */

export const site = {
  wordmark: 'JOA',
  domain: 'joaautomations.com',
  url: 'https://joaautomations.com',
  tagline: 'JOA — two people who build websites',
  /**
   * Not surfaced in the footer — the page routes everything through the
   * contact form (fill-ins Q&A, 2026-08-20). Still used by the privacy
   * policy, where a reachable address is expected, and by JSON-LD.
   */
  email: 'joaautomations@gmail.com',
} as const

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const

/** The page's one <h1>, sitting below the hero. */
export const pitch = {
  heading: 'Websites built by hand, with the systems behind them',
  body:
    'Every site is designed by hand. When the business needs the site to work, not just look right, we build the systems that make it work.',
} as const

export const services = [
  {
    name: 'Web design',
    image: '[FILL IN: service still — fill-ins.md #25]',
  },
  {
    name: 'CRM implementation',
    image: '[FILL IN: service still — fill-ins.md #25]',
  },
  {
    name: 'SMB Automation',
    image: '[FILL IN: service still — fill-ins.md #25]',
  },
] as const

export const ethos = {
  paragraphs: [
    'Josh and Julian, two engineers in Santa Monica who got tired of watching good businesses buy websites nobody had really worked on.',
    'So we build them properly. Designed by hand, with real systems behind them when the business needs it — booking, email, and the rest. A site that looks handmade earns more trust, and trust is what converts.',
  ],
} as const

export const budgetRanges = [
  'Under $5k',
  '$5k - $10k',
  '$10k - $25k',
  '$25k+',
  'Not sure yet',
] as const
