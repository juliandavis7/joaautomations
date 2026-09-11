/**
 * Portfolio entries. Three real clients, no invented rows.
 *
 * Copy is the locked draft: row title, panel headline, story,
 * industry, and location. The open panel uses the 16:10 hero crop
 * at reading width.
 */

export type ShotFrame = 'phone' | 'laptop'

export type PortfolioEntry = {
  id: string
  /** The board headline. Serif, display size, the row's click target. */
  title: string
  /** Headline inside the open panel, where the column is narrower. */
  panelTitle: string
  client: string
  services: string
  industry: string
  location: string
  /** The story. Null when we do not have the real one yet. */
  body: string | null
  /** Live URL. Null until confirmed; the button is omitted rather than faked. */
  href: string | null
  /** 16:10 hero crop on the closed row. */
  card: { src: string; alt: string }
  /** Alt text for the open-panel crop. `src` matches the card. */
  shot: { src: string; alt: string; frame: ShotFrame }
}

export const portfolio: PortfolioEntry[] = [
  {
    id: 'humble-bike-rentals',
    client: 'Humble Bike Rentals',
    title: 'Bikes on the beach path',
    panelTitle: 'Humble Bike Rentals',
    services: 'Website + Booking + SEO',
    industry: 'Bike rentals',
    location: 'Santa Monica, CA',
    body:
      'Karl rents bikes near the beach and runs the whole thing off one calendar. So that\'s where the bookings go. Someone reserves on the site, it lands on the calendar he already has open, and the confirmation and the reminder send themselves.',
    href: 'https://www.humblebikerentals.com/',
    card: {
      src: '/work/humble-hero.jpg',
      alt: '',
    },
    shot: {
      src: '/work/humble-hero.jpg',
      alt: 'Humble Bike Rentals homepage hero: dusk at the Santa Monica Pier behind the booking headline.',
      frame: 'phone',
    },
  },
  {
    id: 'holonomy',
    client: 'Holonomy Consulting',
    title: 'Two practices, one front door',
    panelTitle: 'Holonomy Consulting',
    services: 'Website + SEO',
    industry: 'Education consulting',
    location: 'Alhambra, CA',
    body:
      'Holonomy helps K-12 schools figure out what to do about AI. They had a site for the consulting side and nothing for the AI Schools side, which kept growing anyway. Now both live on one site, and whoever lands there can tell right away which one they need.',
    href: 'https://www.holonomyconsulting.com/',
    card: {
      src: '/work/holonomy-card.jpg',
      alt: '',
    },
    shot: {
      src: '/work/holonomy-card.jpg',
      alt: 'Holonomy Consulting homepage hero: gold Leaders headline on a navy conference-room photo.',
      frame: 'laptop',
    },
  },
  {
    id: 'best-interlocks',
    client: 'Best Interlocks of California',
    title: 'Best Interlocks of California',
    panelTitle: 'Best Interlocks of California',
    services: 'Automation + CRM',
    industry: 'Ignition interlock services',
    location: 'Santa Monica, CA',
    body:
      'Best Interlocks installs ignition interlock devices across California. Most of their calls come from someone in a hurry, on a phone, with two bars. So the site is one page that answers what those callers want to know: do you cover my county, how soon can you see me, what does it cost. The call button is under your thumb anywhere on the page.',
    href: 'https://bestinterlocksofcalifornia.com/',
    card: {
      src: '/work/best-interlocks-card.jpg',
      alt: '',
    },
    shot: {
      src: '/work/best-interlocks-card.jpg',
      alt: 'Best Interlocks of California homepage: woman holding a car key beside purple type with Fast circled in yellow.',
      frame: 'phone',
    },
  },
]
