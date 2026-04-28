# JOA Automations website UI kit

## Overview
High-fidelity recreation of the JOA Automations marketing website. Built as a clickable prototype in React/Babel. Demonstrates the dark hero + light content section pattern with embedded GHL booking flow.

## Screens
1. **Homepage**: dark hero, services grid, how it works, social proof stats, booking CTA, footer
2. **Services detail** (accessible via nav click)
3. **Booking flow**: GHL calendar embed placeholder with lead form

## Components
- **NavBar.jsx**: sticky nav with scroll behavior
- **HeroSection.jsx**: dark hero with animated headline + dual CTAs
- **ServicesSection.jsx**: light section, 3-column feature cards
- **ProcessSection.jsx**: dark section, numbered steps
- **StatsSection.jsx**: light section, big numbers
- **BookingSection.jsx**: GHL calendar embed + lead capture form
- **Footer.jsx**: dark footer with nav links

## Design notes
- Nav transitions from transparent to blurred dark on scroll
- All section widths: max 1200px centered
- Font substitutions: DM Sans (Sohne), Plus Jakarta Sans (SF Pro Display)
- Icons: Lucide (CDN)
