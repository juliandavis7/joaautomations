# Migration plan

Phase 0 output. Inventory verified against the working tree on 2026-08-19; runtime
findings verified against a local dev server.

**Decisions locked 2026-08-19** in a Q&A pass. This file is the runbook. Where it
conflicts with `brief.md` or `fill-ins.md`, this file wins for structure; leftover
copy facts still go in `[FILL IN]` markers.

---

## 0. Locked decisions

| Call | Decision |
| --- | --- |
| Visual direction | Do **not** pick one. Shared structure first, then three worktrees — A, B, and C from `design-principles.md` §10 — for review. Do not merge. Do not pick a winner. |
| Wordmark | `JOA` (type only). Real studio name is a later project. |
| Domain | Stay on `joaautomations.com`. |
| Page order | Nav → hero video/poster (no text) → pitch / `<h1>` below the fold → **Work (3 cards)** → Services → Ethos → Contact → Footer |
| Work | One section. Three **cards** (not accordion rows, not a second proof block): Humble, Holonomy, Best Interlocks. |
| Best Interlocks | Honest automation case study in Work. Dan Rowan's quote belongs on that card. |
| Humble quote | No separate design testimonial required. Karl's receptionist quote may sit on the Humble card (the section is mixed case-study / testimonial). Do not invent a site quote. |
| Affluent Vacays | **Dropped.** |
| Automation section | **None.** No `AutomationSection`. Proof lives on the three Work cards. |
| Services list | **Web design / CRM implementation / SMB Automation.** Web design leads. |
| Automation product name | Still `[FILL IN]` if a label is needed on a card; there is no dedicated section to name. |
| Nav | Wordmark left, `Work` + `Contact` right. No CTA. Hide on scroll down, show on scroll up. No mobile drawer. |
| Footer | No video. Wordmark, email, legal row. **Drop the Terms link.** |
| Privacy | **Rewrite** the legal copy this round (it currently describes an automation agency). |
| BrandLockup | **Delete.** No halo ring. |
| Hero media | Task A: poster/still only. Task B: each worktree gets its own loop (A hands/work, B site scroll, C TBD). |
| OG / metadata | `JOA — two people who build websites`. None of the old "Custom AI workflows…" strings survive. |
| Contact form | Name, email, what you're building, budget range. Resend + honeypot + **in-memory** rate limit. |
| Resend | If `RESEND_API_KEY` is missing, mock the success path and list it as a gap. Do not block the run. |
| Copy | Never invent client outcomes, quotes, figures, or timelines. Unknowns stay as `[FILL IN]`. |

---

## 1. Inventory — what exists today

**7 components, 2 routes, 1,078 lines.**

| File | Lines | What it is | Fate |
| --- | --- | --- | --- |
| `app/page.tsx` | 21 | Composes 7 sections in order | **Rewrite** |
| `app/layout.tsx` | 69 | 3 Google fonts, metadata, OG/Twitter | **Rewrite** |
| `app/globals.css` | 47 | Reset, `#102D4E` navy ground, custom scrollbar | **Rewrite** |
| `app/privacy-policy/page.tsx` | 99 | Standalone legal page | **Rewrite** copy + restyle |
| `components/NavBar.tsx` | 160 | Fixed bar, 3 links, CTA button, mobile drawer | **Rewrite** |
| `components/HeroSection.tsx` | 144 | Gradient/grid/shimmer hero, framer-motion, checkmark badges | **Delete** — replace |
| `components/ServicesSection.tsx` | 83 | 6 icon cards, automation-led | **Rewrite** |
| `components/ProcessSection.tsx` | 76 | 5-step numbered timeline | **Delete** |
| `components/StatsSection.tsx` | 141 | 4 stat tiles + 3 testimonials | **Delete** — quotes that survive move onto Work cards |
| `components/BookingSection.tsx` | 72 | Two GoHighLevel iframes | **Delete** |
| `components/Footer.tsx` | 104 | 4-col link grid, service names | **Rewrite** |
| `components/BrandLockup.tsx` | 62 | Logo in a halo ring | **Delete** |

**Assets:** `public/logo.png` (286 KB — oversized for a 48px render), three client logos
as both `.png` and `.svg`, and an `email-signature/` icon set unrelated to the site.
Use client logos on Work cards if they earn the space; do not build a logo wall.

### Two defects to fix on the way through

1. **The site renders in system sans, not its webfonts.** `layout.tsx` loads Plus Jakarta
   Sans, DM Sans, and JetBrains Mono via `next/font/google`, which registers them under
   generated names (`__DM_Sans_e64f39`, `__Plus_Jakarta_Sans_a11773`,
   `__JetBrains_Mono_6d24ac`) and exposes them as CSS variables. Every component instead
   hardcodes `font-family: 'DM Sans', sans-serif` — a family name that was never
   registered — so all **87** such declarations fall through to the generic `sans-serif`.
   We download three families and use none of them. Verified against the built
   `app/layout.css` on a running dev server. New fonts go through CSS variables and
   Tailwind tokens only.
2. **`/og.png` returns 404.** Referenced by both `openGraph.images` and `twitter.images`
   in `layout.tsx`; the file is not in `public/`. Ship a real `og.png`. Copy is
   `JOA — two people who build websites`.

### Two structural problems

- **Tailwind is configured but largely unused.** `tailwind.config.ts` defines a full
  token set (`brand.*`, `surface.*`, `content.*`, `border.*`) and the components ignore it,
  writing hex literals inside `style={{}}` objects. Tailwind is doing layout only
  (`grid`, `px-5`, `md:py-24`); all color, type, and treatment is inline. This is why the
  design has drifted — there is no single place a decision lives.
- **Hover states are hand-wired in JS.** `onMouseEnter`/`onMouseLeave` handlers mutating
  `e.currentTarget.style` appear in NavBar, ProcessSection, Footer, and ServicesSection.
  These have no touch equivalent at all, which is the mobile problem from
  `design-principles.md` §6 in its most literal form.

---

## 2. Delete outright

- **The stats bar** — `12h saved`, `5 days`, `98% lead follow-up`, `50+ workflows built`.
- **The hero checkmark badges** — `50+ workflows built`, `Live in 5-7 days`,
  `ROI in the first 30 days`.
- **"AI Receptionist"** as a headline service card.
- **The five-step "How it works" section.**
- **Both GoHighLevel embeds** and `link.msgsndr.com/js/form_embed.js`.
- **The entire hero visual layer** — four radial gradients, two animated grid planes, a
  sweeping shimmer, and 6 keyframe animations. Replaced by poster (Task A) then
  per-direction video (Task B).
- **`framer-motion`.**
- **`BrandLockup`** and the halo treatment.
- **Affluent Vacays** — quote and logo are out.
- **A separate Automation / testimonials section.**
- **The dead Terms link** (`href="#"` + `preventDefault`). Do not write `/terms`.
- **`#process` and `#results` anchors**, the nav CTA button, the mobile drawer, and
  every `onMouseEnter` style-mutation handler.

---

## 3. Rewrite

### `app/layout.tsx`
Font stack is per-direction (set on the shared base as tokens; each worktree swaps
the faces). Referenced through CSS variables and Tailwind theme tokens only. Metadata
title/description/OG/Twitter: **`JOA — two people who build websites`**. Add
`viewport-fit=cover`. Add JSON-LD (`ProfessionalService` + `Organization`); name is
`JOA` until the rename. Ship the pre-paint navigation-type script
(`design-principles.md` §8).

### `app/globals.css` + `tailwind.config.ts`
Replace the navy ground with the direction's near-white paper. Collapse the palette to
ground / ink / accent. Define the type scale as **three sizes at weight 400**. Add the
container tokens `--ct-max: 1240px`, `--ct-gutter`, `--side`. Delete the custom scrollbar.
**All color and type moves into the Tailwind theme; components stop carrying hex.**
Each worktree may change the three palette values and the two faces; the token
*structure* stays shared.

### `NavBar.tsx`
Type-only **JOA** left, `Work` and `Contact` right. No CTA. No mobile drawer. Hide on
scroll down, fade back on scroll up. `viewport-fit=cover` + `env(safe-area-inset-*)`.

### `ServicesSection.tsx`
Three plain words at display size, no cards, no icons, no grid: **Web design / CRM
implementation / SMB Automation**, web design first. This is where the one playful
interactive moment lives (§5).

### `Footer.tsx`
Wordmark (`JOA`), email, one legal row (privacy only). No Terms. No footer video. No
four-column link grid.

### `app/privacy-policy/page.tsx`
Rewrite the copy so it describes the current offer (websites, CRM, automation), not
an AI automation agency. Restyle to the direction.

---

## 4. Build new

### `components/Hero.tsx`
Full-bleed `100svh`, `pointer-events: none`, **no text**. Task A: poster as section
background. Task B: muted autoplay loop + poster-as-background fallback;
`prefers-reduced-motion` must not request the video at all. Separately encoded mobile
crop, ≤ 500 KB, when video exists.

Directly below the fold: the pitch block with the page's one `<h1>`. Copy may be
`[FILL IN]` until ethos/positioning facts arrive.

### `components/WorkSection.tsx` + `components/WorkCard.tsx`
The center of gravity. **Three cards** in one section — case studies and testimonials
together. Not a bordered accordion list. One component tree; mobile and desktop are
expressions of the same props (`design-principles.md` §6).

Per card, as facts allow: outcome headline (`<h2>`) → client name (`<h3>`) → 2–4
sentence story → optional quote → `<dl>` of Services / Industry / Location → live
link with `↗` when a URL exists.

Content lives in typed `content/work.ts`, not inline JSX.

**Card 1 — Humble Bike Rentals.** Custom Next.js build; Google Calendar–backed
booking so rentals land on the owner's calendar; Resend for confirmations and
reminders. Framed as **design and build**. Karl Watson's existing quote is about the
AI receptionist; it may sit on this card as a testimonial, or the card ships without
a quote. Do not rewrite it into a design outcome.

**Card 2 — Holonomy Consulting.** Custom site build with Resend on the contact flow
so inquiries arrive as real email. No existing quote.

**Card 3 — Best Interlocks of California.** Honest **automation** case study (lease
signed → CRM / installer sheet / welcome packet / payment links). Dan Rowan's quote
belongs here. Do not dress it as a website we built unless a `[FILL IN]` says we did.

Unknown headlines, URLs, locations, services lines: `[FILL IN]`. See `fill-ins.md`.

### `components/EthosSection.tsx`
Two short paragraphs, first person, no credentials, no logo wall. Names, city, and
"why" stay `[FILL IN]` until provided.

### `components/ContactForm.tsx` + `app/api/contact/route.ts`
Replaces both GHL iframes. Fields: **name, email, what you're building, budget
range.** Route handler → Resend. Server-side validation, honeypot, **in-memory rate
limiting**, real success/error states. `RESEND_API_KEY` in Vercel env; if absent,
mock success and record the gap.

### `components/Eyebrow.tsx`
The one repeated ornament — mono label plus the direction's rule. Used by every
section. Ornament itself differs per worktree (A ruled line, B brackets, C pill).

### Assets
Task A: hero poster (also the section CSS background), real `og.png`, type-only
wordmark (no PNG halo). Task B: per-direction hero loops, mobile encodes ≤ 500 KB.

---

## 5. The playful interactive moment

The services list. On desktop, hovering a service reveals a cursor-following image of
that work; on touch, tapping springs the same image in near the tapped word with a
slight random tilt, and the prompt label itself reads "tap me" rather than "hover me".
Same mechanism, two designed expressions — not a fallback.

Deliberately **not** Bluefin's: no left-to-right wipe fill, no `attr(data-label)`
duplicate-text trick. Ours reveals the work; theirs recolors the word.

With only three service words, the interaction still belongs here. If there is no
image yet, use a `[FILL IN]` poster — do not skip the tap/hover design.

---

## 6. Order of work

**Task A — shared structure (once, on `main` or a shared branch):**

1. **Foundation** — Tailwind token structure, globals, container tokens, `Eyebrow`
   shell. A temporary paper/ink/accent is fine; worktrees will swap values.
2. **Structure** — layout metadata, NavBar (hide-on-scroll), Hero poster + pitch,
   Footer.
3. **Work** — `content/work.ts` with `[FILL IN]` markers, then three `WorkCard`s.
4. **Supporting** — Services (three words + interactive moment), Ethos, Contact form
   + route, privacy rewrite.
5. **Verify the shared base** against §9 (poster-only; skip per-direction video).

**Task B — three visual forks:**

6. Create git worktrees `direction-a`, `direction-b`, `direction-c` from the shared
   base. Apply `design-principles.md` §10 to each (palette, type, ornament, motion,
   hero treatment). Do not share leftover navy/SaaS chrome.
7. **Verify each fork** against §9, including Lighthouse. Fix bugs in a loop.
8. Stop. Write a short note per variant (fonts, palette, hero, known gaps) and the
   surviving `[FILL IN]` list. Do not merge. Do not pick a winner.

Copy fill-ins are **not** a gate. Ship markers. Resend credentials are **not** a gate.

---

## 7. Dependency changes

| Package | Change |
| --- | --- |
| `framer-motion` | **Remove** — replaced by CSS + `IntersectionObserver` |
| `lucide-react` | **Remove if possible** — nav hamburger and service icons are going |
| `resend` | **Add** — required by the contact route |
| No scroll library | GSAP/Lenis explicitly declined; ~134 KB against a ≥95 mobile budget |

Net: likely a smaller dependency tree than today.

---

## 8. Open risks

- **Best Interlocks in Work is automation, not a site.** That is intentional. The
  card must read honestly or the repositioning is a lie.
- **Services now include CRM and SMB Automation**, so the page is not a pure web
  studio. Web design still leads; do not let the other two words take the hero or
  the nav.
- **Hero video is deferred to Task B.** Task A will look unfinished without it;
  that is expected. Each direction wants different footage.
- **`prefers-reduced-motion` + Lighthouse.** A full-bleed hero video is the main
  risk to ≥95 mobile performance. Poster-as-background and gating video load on
  reduced motion are what make the target viable. Do not drop the target.
- **Ethos copy and case-study headlines** will look thin until fill-ins arrive.
  Markers are correct; invented warmth is not.

---

## 9. Exit conditions (agent run)

**Deliverable:** three isolated worktrees / branches (`direction-a`, `direction-b`,
`direction-c`) on top of one shared structure. Do not merge them. Do not pick a
winner. Leave a short note per variant: fonts, palette, hero treatment, known gaps.

**A variant is done only when all of these pass, in order. On failure: fix, then
restart the list. Cap 3 retries per check; if still red, record it and continue —
do not silently drop the check.**

1. `npm run lint` and `npx tsc --noEmit` clean.
2. `npm run build` clean (no type errors, no build warnings).
3. Dev server up. Browser pass on `/` and `/privacy-policy` at **390, 768, 1280,
   1920**:
   - no overlay/overlap, no horizontal scroll
   - nav hide-on-scroll works; Work and Contact anchors land correctly
   - Work has **3 cards**; services are the three agreed words
   - form shows success and error states
   - footer has no Terms link
4. Browser console: no errors, no missing assets (`og.png` must 200).
5. `prefers-reduced-motion: reduce`: no video request, no spring/hover motion,
   poster still shows.
6. No `onMouseEnter` style mutation; every hover has a tap equivalent (services
   prompt reads "tap me" on touch).
7. Copy: no invented facts; every unknown is a visible `[FILL IN: …]`. No leftover
   "Custom AI workflows…", no "AI Receptionist", no GHL iframes, no stats bar.
   Wordmark is `JOA`. Affluent Vacays is gone.
8. Lighthouse mobile, production build: **≥ 95 performance and accessibility**.
   If video is what fails, gate it behind reduced-motion / poster-first and retry.
   Do not drop the target.
9. Contact POST: validation + honeypot + in-memory rate limit work. If
   `RESEND_API_KEY` is missing, success path is mocked and listed as a gap — do
   not block the whole run.

**Stop when:** all three variants pass 1–8 (9 recorded if Resend isn’t set), a
`[FILL IN]` inventory is written, and each worktree can `npm run dev` for review.

**Do not:** invent client outcomes, add a fourth direction, wait on fill-ins,
rename the domain, or deploy.

---

## 10. Still open (copy facts, not plan)

These stay in `fill-ins.md` and as `[FILL IN]` in source. They do not block Task A
or the three forks.

- Humble / Holonomy / Best Interlocks: outcome headlines, locations, live URLs,
  services lines, industry, Holonomy context
- Ethos: the two names, city, why
- Resend: API key (env only), verified sending domain, destination inbox
- Hero pitch / `<h1>` wording
- Service hover images
- Direction C hero footage (A and B are specified; C is TBD)
