# Fill-ins — facts still needed

Per the brief: **no invented client outcomes, quotes, figures, or timelines.** Each
item appears in source as a literal `[FILL IN: …]` until answered. Surviving markers
get listed at the end of the run.

**None of this blocks Task A or the three visual forks.** Ship the markers.
`migration-plan.md` is the runbook.

---

## Already decided (do not re-ask)

| Item | Decision |
| --- | --- |
| Wordmark | `JOA`, type only. No halo lockup. |
| Domain | `joaautomations.com` |
| OG / metadata | `JOA — two people who build websites` |
| Services list | Web design / CRM implementation / SMB Automation |
| Work section | Three cards: Humble, Holonomy, Best Interlocks. No accordion. No second proof block. |
| Affluent Vacays | Dropped |
| Terms | Drop the link. Do not write `/terms`. |
| Form fields | Name, email, what you're building, budget range |
| Rate limit | In-memory in the route handler |
| Hero Task A | Poster / still only |
| Hero Task B | Per worktree: A = hands/work, B = site scroll, C = TBD |
| Karl Watson quote | May sit on the Humble card. Do not invent a design quote. |
| Dan Rowan quote | Sits on the Best Interlocks card |

---

## Still needed — Work cards

### Humble Bike Rentals

Story beats we have: custom Next.js, Google Calendar–backed booking, Resend for
confirmations and reminders. Framed as design and build.

| # | Need | Notes |
| --- | --- | --- |
| 1 | **Outcome headline** | Editorial tier-1 line. Direction was boardwalk / never missing a summer rental — give the line, or 2–3 words and we'll draft options. |
| 2 | **Location** | City, state |
| 3 | **Live URL** | For the `↗` link |
| 4 | **Services line** | Draft `Website + Booking System`. Confirm — did we also do brand? |
| 5 | **Industry** | Draft `Bike Rentals`. Confirm. |
| 6 | **Karl's quote on the card?** | Yes (receptionist quote as-is) or ship the card without a quote. Do not rewrite it. |

### Holonomy Consulting

Story beat we have: custom site, Resend on the contact flow so inquiries arrive as
email.

| # | Need | Notes |
| --- | --- | --- |
| 7 | **Outcome headline** | What changed for them? |
| 8 | **Location** | City, state |
| 9 | **Live URL** | For the `↗` link |
| 10 | **Services line** | Brief had `Website + [FILL IN]` |
| 11 | **Industry** | Draft `Consulting`. More specific? |
| 12 | **What they actually do** | Two sentences of plain context |

### Best Interlocks of California

Honest **automation** card. Story beat we have: lease signed → CRM, installer sheet,
welcome packet, payment links. Dan Rowan's quote belongs here.

| # | Need | Notes |
| --- | --- | --- |
| 13 | **Outcome headline** | About the workflow, not a website we didn't build |
| 14 | **Location** | City, state |
| 15 | **Live URL** | If they have a site to point at; otherwise omit the `↗` |
| 16 | **Services line** | Draft `SMB Automation + CRM`. Confirm |
| 17 | **Industry** | Draft `Ignition interlock`. Confirm |

---

## Still needed — Ethos

| # | Need | Notes |
| --- | --- | --- |
| 18 | **Your two names** | First person, plural, no credentials, no logo wall |
| 19 | **Where you're based** | If it's Santa Monica, say it differently from Bluefin or not at all |
| 20 | **Why you do this** | 2–3 sentences in your own words. We'll shape them; the substance has to be yours. |

---

## Still needed — contact send path

Do not paste secrets in this file or in chat.

| # | Need | Notes |
| --- | --- | --- |
| 21 | **`RESEND_API_KEY`** | Vercel env. If missing, the run mocks success and lists the gap. |
| 22 | **Verified sending domain** | `joaautomations.com`? |
| 23 | **Destination address** | Footer currently uses `joaautomations@gmail.com` |

---

## Still needed — media and pitch

| # | Need | Notes |
| --- | --- | --- |
| 24 | **Pitch / `<h1>` below the hero** | The first words after the atmosphere. May ship as `[FILL IN]`. |
| 25 | **Service hover/tap images** | One still per service word. Markers are fine. |
| 26 | **Direction C hero footage** | A and B are specified in the plan. C is TBD. |
| 27 | **Automation label on the Interlocks card** | If a product-style name is needed, not "AI Receptionist" and not Bluefin's "Digital front desk". Otherwise the services line is enough. |

---

## Answered — Q&A of 2026-08-20

Every item below is now real copy in `content/`. Nothing here was drafted for the
user; each is their words, tightened only for rhythm.

### Work cards

| # | Item | Answer |
| --- | --- | --- |
| 1 | Humble headline | "Every booking lands in the calendar he already had open." |
| 2 | Humble location | Santa Monica, CA |
| 3 | Humble URL | `https://www.humblebikerentals.com` |
| 4 | Humble services | `Website + Booking + SEO/GEO` |
| 5 | Humble industry | `Bike Rentals` |
| 6 | Karl Watson quote | **Dropped.** See "Both quotes dropped" below. |
| 7 | Holonomy headline | "The AI work finally had somewhere to live." |
| 8 | Holonomy location | Alhambra, CA |
| 9 | Holonomy URL | `https://www.holonomyconsulting.com/` |
| 10 | Holonomy services | `Website + SEO/GEO` |
| 11 | Holonomy industry | `Education Consulting (K-12)` |
| 12 | What Holonomy does | K-12 school systems navigating AI: strategy and policy through instructional integration and back-office operations, for district and school leaders. |
| 13 | Interlocks headline | "Nothing gets retyped anymore." |
| 14 | Interlocks location | Santa Monica, CA |
| 15 | Interlocks URL | `https://bestinterlocksofcalifornia.com/` |
| 16 | Interlocks services | `SMB Automation + CRM` |
| 17 | Interlocks industry | `Ignition Interlock Services` |

### Both quotes dropped

**Karl Watson's** described an AI phone receptionist answering calls and booking
rentals. What was actually built for Humble is a website with Google Calendar
booking — no receptionist. Shipping the quote would have claimed a product that
never existed, which is exactly what the brief forbids. Dropped.

**Dan Rowan's** matched its story on all four beats and was dropped alongside it
by choice, not by necessity. If it is ever wanted back it is recoverable verbatim
from git history (`git show` an early revision of `content/work.ts`).

The `WorkQuote` type and the card's quote rendering both stay in place, so a real
confirmed quote drops in without a rebuild of the component.

### Ethos, pitch, config

| # | Item | Answer |
| --- | --- | --- |
| 18 | Names | Josh and Julian. First names only. |
| 19 | Based | Santa Monica, stated plainly. |
| 20 | Why | Tired of watching good businesses buy websites nobody had really worked on. Built by hand, with real systems behind them when the business needs it. A site that looks handmade earns more trust, and trust is what converts. |
| 24 | Pitch `<h1>` | "Websites built by hand, with the systems behind them" |
| 27 | Automation product name | None. The services line carries it. |

**Explicitly excluded from the ethos section:** years-of-experience numbers,
tech-stack names, logo wall, credentials. Naming an integration a client actually
touches (Google Calendar, email) is still fine on a Work card — the exclusion is
about how JOA describes itself, not about what was built.

**Footer email removed.** Every inbound now routes through the contact form. The
address survives in `content/site.ts` for the privacy policy, where a reachable
contact is expected, and for JSON-LD.

---

## Summary

**Answered (2026-08-20):** #1–#20, #24, #27. Both testimonials dropped.

**Still open:**

| # | Item | Status |
| --- | --- | --- |
| 21 | `RESEND_API_KEY` | Deferred — **pre-launch blocker.** Until it is set the route mocks success. |
| 22 | Verified sending domain | Deferred with #21. |
| 23 | Destination address | Deferred with #21. |
| 25 | Service stills | Ships as `[FILL IN]` markers by choice. Three of them. |
| 26 | Direction C hero | Stays the generated abstract poster. |

Nothing open blocks the bake-off. #21–#23 block a real launch.
