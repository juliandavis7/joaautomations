# Brief — JOA repositioning

Aligned with `migration-plan.md` (decisions locked 2026-08-19). That file is the
runbook. This file is the constraints.

## The change

The site is currently positioned as an **AI automation agency**: AI receptionist, CRM
automation, SMS sequences, a stats bar, and a GoHighLevel booking iframe.

**Web design leads.** CRM implementation and SMB automation are real services, listed
second and third — not a hidden upsell in a separate section, and not the thing we
open with.

## Hierarchy

1. **Web design** — design + build. Hero atmosphere, pitch, and the first Work cards.
2. **CRM implementation** and **SMB Automation** — named in the services list; one of
   the three Work cards (Best Interlocks) is an honest automation story.
3. Never in the hero. Never in the nav. Nav is `Work` and `Contact` only.

Wordmark is **`JOA`** (type only). The real studio name is a later project. Domain
stays `joaautomations.com`.

## Page

Nav → hero (no text) → pitch / `<h1>` → **Work (3 cards)** → Services (three words) →
Ethos → Contact → Footer.

Work is one section: Humble Bike Rentals, Holonomy Consulting, Best Interlocks.
Affluent Vacays is out. There is no separate Automation / testimonials block.

## Copy rules

- No metrics, no percentages, no "ROI in 30 days", no urgency language.
- First person, plural, plainspoken.
- **Never invent client outcomes, quotes, revenue figures, or timelines.** Anywhere a
  fact is missing, leave a literal `[FILL IN: what's needed]` marker in the source.
  An empty marker is correct; a plausible invention is not.
- Metadata / OG: **`JOA — two people who build websites`.** None of the old "Custom
  AI workflows for small business" strings survive.

## Technical constraints

- Next.js App Router + Tailwind. No CMS, no new framework.
- Replace the GHL embeds with our own contact form → route handler → **Resend**.
  Fields: name, email, what you're building, budget range. Honeypot + in-memory rate
  limit. If `RESEND_API_KEY` is missing, mock success and list it as a gap.
- Motion: CSS + Intersection Observer. A motion library needs a one-sentence
  justification of its bundle cost.
- Respect `prefers-reduced-motion` everywhere, including not loading hero video.
- Semantic HTML, real heading hierarchy.
- Rewrite the privacy policy this round. Drop the dead Terms link. Do not write
  `/terms`.

## Reference vs. template — hard constraint

[bluefin.studio](https://bluefin.studio/) is the craft reference. It is also a **direct
competitor operating in the same city** (Santa Monica), and it sells "Digital front
desk". Treat it accordingly.

**Extract:** typographic discipline, spatial rhythm, craft level, hero-as-atmosphere,
single responsive tree, tap equivalents for every hover.

**Never carry over:** their ocean/underwater/marine theme or imagery; their palette
verbatim; their wordmark, logo treatment, or type choices; any of their copy,
headlines, or section names, reworded or otherwise; their accordion-row Work list
(ours is **three cards**); their footer video.

If a direction reads as "Bluefin but a different color," it's thrown out.

## Visual bake-off

Do **not** pick A, B, or C up front. Task A builds the shared structure. Task B
forks three worktrees — one per direction in `design-principles.md` §10 — for
review. Do not merge. Do not pick a winner in the agent run.

## Done means

The exit loop in `migration-plan.md` §9. In short: lint, types, build, browser pass
at 390 / 768 / 1280 / 1920, console clean, reduced-motion pass, Lighthouse mobile
≥ 95 performance and accessibility, three reviewable worktrees, `[FILL IN]` list.
Do not invent fill-ins. Do not deploy.
