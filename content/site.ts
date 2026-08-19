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
  email: 'joaautomations@gmail.com',
} as const

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const

/** The page's one <h1>, sitting below the hero. */
export const pitch = {
  heading: '[FILL IN: pitch / <h1> wording — fill-ins.md #24]',
  body: '[FILL IN: the two or three sentences under the pitch — fill-ins.md #24]',
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
    '[FILL IN: who we are — the two names, first person, no credentials — fill-ins.md #18]',
    '[FILL IN: where we are based and why we do this, 2-3 sentences in your own words — fill-ins.md #19, #20]',
  ],
} as const

export const budgetRanges = [
  'Under $5k',
  '$5k - $10k',
  '$10k - $25k',
  '$25k+',
  'Not sure yet',
] as const
