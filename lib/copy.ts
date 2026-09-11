/**
 * Every string the page renders. Section components take content as
 * props and hold no literals of their own.
 *
 * Copy is the final draft. Sentence case throughout, no em dashes in
 * body copy, no superlatives, no stack names. Josh and Julian by
 * first name.
 */

export const site = {
  wordmark: 'JoJu',
  shortWordmark: 'JoJu',
  lockup: 'Websites',
  tabTitle: 'JoJu Websites',
  title: 'JoJu — Websites for local businesses',
  description:
    'Designed and written by hand, one business at a time. You own the site outright. Josh and Julian, Santa Monica.',
  url: 'https://jojuwebsites.com',
  email: 'hello@joju.com',
  locality: 'Santa Monica, CA',
  region: 'California',
} as const

export const nav = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
  menuLabel: 'Menu',
  closeMenuLabel: 'Close menu',
} as const

export const hero = {
  heading: 'Websites for local businesses, built by hand.',
  sub:
    "Designed and written for one business at a time. You own the site outright and there's nobody in between. After launch, you text us and we answer.",
  cta: { label: 'Tell us about your business', href: '#contact' },
} as const

export const about = {
  heading: 'JoJu is Josh and Julian.',
  body:
    "Two friends in Santa Monica. JoJu started with a bike shop down the street, then a coworker's consulting practice, then an interlocks business a family friend needed help with. Word got around, and now we build websites for local businesses well past our own block.",
  founders: [
    {
      name: 'Josh',
      src: '/about-josh-2.png',
      alt: 'Pastel silhouette of Josh in profile.',
    },
    {
      name: 'Julian',
      src: '/about-julian-2.png',
      alt: 'Pastel silhouette of Julian in profile.',
    },
  ],
} as const

export const work = {
  heading: 'Recent work',
  openLabel: 'Read the detail',
  closeLabel: 'Close',
  visitLabel: 'See it in action',
  factLabels: {
    industry: 'Industry',
    location: 'Location',
  },
} as const

export const services = {
  chapters: [
    {
      claim: 'We map the site, then we build it.',
      items: [
        {
          name: 'Website design and build',
          description:
            'We map out every page before we build any of them, so wherever someone lands, the next step is obvious.',
        },
        {
          name: 'Mobile optimization',
          description: 'It loads fast on a phone and works the way people expect it to.',
        },
        {
          name: 'Brand and styling',
          description: 'Your logo, your colors, your actual shop. The site should look like the place people walk into.',
        },
      ],
    },
    {
      claim: 'Written so people nearby land on you.',
      items: [
        {
          name: 'Local SEO',
          description: "Being online isn't the same as being found. Set up so people searching nearby land on you.",
        },
        {
          name: 'Copywriting',
          description:
            'The page has about six seconds to answer what you do and why you. We write it so it answers.',
        },
      ],
    },
    {
      claim: 'After launch, you text us.',
      items: [
        {
          name: 'Support after launch',
          description: 'New prices, new photos, new hours: send them over and we make the change.',
        },
      ],
    },
  ],
  page: {
    url: 'yourshop.com',
    name: 'Your shop name',
    sub: 'One line about what you do, and where.',
    phoneSub: 'One line about what you do.',
    cta: 'Get in touch',
    hours: 'Open today until 6pm',
  },
  search: {
    query: 'your trade near me',
    you: { name: 'Your shop name', meta: 'Open until 6pm · 0.4 miles' },
    other: { name: 'Someone else nearby', meta: 'Open until 5pm · 1.1 miles' },
  },
  mail: {
    inbound: 'New winter hours, 8 to 4. Can you swap them?',
    reply: 'Done, they are live.',
    stamp: 'Same day',
  },
} as const

export const contact = {
  heading: 'Tell us about your business',
  fields: {
    name: { label: 'Name', placeholder: 'Your name' },
    email: { label: 'Email', placeholder: 'you@yourbusiness.com' },
    project: { label: 'About the business', placeholder: 'The shop, the practice, what you need.' },
  },
  submit: 'Send',
  sending: 'Sending',
  success: 'Thanks. It went to both of us.',
  error: 'That did not send. Try again in a moment.',
  errors: {
    name: 'We need a name.',
    email: 'We need an email.',
    emailFormat: 'That email does not look right.',
    project: 'A sentence about the shop is enough.',
  },
} as const

export const footer = {
  locality: 'Santa Monica, CA',
  rights: 'JoJu',
} as const
