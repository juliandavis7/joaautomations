# Design principles

Phase 0 output. Everything in §1–§8 was verified against the live reference on
2026-08-19 by pulling `bluefin.studio/index.html`, `styles.css`, `main.js`, and issuing
`HEAD` requests against every media asset. Line references are to their stylesheet.

Aligned with `migration-plan.md` (decisions locked 2026-08-19). §1–§8 remain the
reference study. **Our** page, Work treatment, and bake-off are in §7, §9, and §10.

---

## 1. What the reference actually is

A **hand-written static site** — no framework. `index.html` (35 KB), one `styles.css`
(1,624 lines, 56 KB), one `main.js` (50 KB), plus vendored GSAP (72 KB) and Lenis
(11.6 KB). Deployed on Vercel with Analytics + Speed Insights and GA4.

That matters for us in one specific way: **their craft level does not come from
tooling.** It comes from a small number of decisions applied without exception. We can
match it on Next.js + Tailwind without importing their stack.

---

## 2. The type system — the single biggest lever

This is the finding that most separates the two sites.

**Their entire desktop type scale is three sizes and one weight.**

| Role | Size | Family | Weight | Tracking | Leading |
| --- | --- | --- | --- | --- | --- |
| Display / section headline / project title / service item | `60px` | Saans | `400` | `normal` | `1` – `normal` |
| Lead paragraph / ethos body / CTA | `40px` | Saans | `400` | `normal` | `normal` |
| Eyebrow / metadata / pills / legal | `24px` | Saans SemiMono | `400` | `normal` | `1` |

Verified at `.dive-headline` (L:169), `.project-row__title` (L:352), `.services .item`
(L:426), `.dive-paragraph` (L:191), `.ethos-body` (L:493), `.ethos-cta`, `.eyebrow`
(L:310). Every one of them is `font-weight: 400; letter-spacing: normal;`.

**There is no bold anywhere on the page.** No `600`, no `700`, no `800`. No negative
tracking. Hierarchy is carried entirely by **size, space, and color** — never by weight.

### What we do today

The current JOA site uses **five+ sizes**, weights `400/500/600/700/800`, and negative
tracking (`-0.02em`, `-0.03em`) on every headline. It reads as a SaaS landing page
because that is exactly the vocabulary of one.

### Our rules

1. **Three sizes, one weight (400), tracking `normal`.** A display step, a body step, a
   mono/eyebrow step. If something needs to feel more important, give it more space or
   more size — never more weight.
2. **One exception budget.** Exactly one weight above 400 is allowed on the whole site,
   and only if a chosen direction depends on it. Spend it deliberately or not at all.
3. **A mono face carries all the small text.** Eyebrows, metadata, legal, pills. The
   mono/sans contrast does the work that bold used to do.
4. **`line-height: normal` on display type.** They let the font's own metrics decide.
   Our current `1.15`/`1.3` clamps look tight and deliberate in a bad way at 60px.

---

## 3. Color

```
--paper      #FAFDFF   near-white, very slightly cool — the page ground
--off-white  #FCFCFF   secondary ground
--black      #000      all body and display text, full black
--white      #FFF
--blue       #2200FF   one saturated accent — hover fills, active states, hint labels
```

Plus a nine-step blue ramp (`#005BFE → #0B0054`) used almost entirely for the case
study backgrounds, running light-to-dark down the page as a deliberate "descending"
gradient across the six projects.

The lesson is not the hue. It is the **structure**:

- **One near-white ground, one true black, one saturated accent.** That is the whole
  interface palette. Everything else is imagery.
- **Text is `#000`, not a soft gray.** No `#4A5568` body gray, no `#8896A8` muted gray —
  both of which we currently use heavily. Full black on near-white is the entire reason
  the page reads as editorial rather than as a dashboard.
- **The accent appears in motion, not at rest.** `#2200FF` shows up on hover fills,
  `:active` floods, and the hand-drawn eyebrow underline. It is almost absent from the
  static page.
- **Zero gradients in the UI layer.** Our current hero stacks four radial gradients, two
  animated grids, and a sweeping shimmer. Theirs is a video and nothing else.

### Our rules

1. One ground, one ink, one accent. Ink is at or near full black.
2. Accent appears on interaction, not at rest.
3. No gradient UI chrome. No glows, no colored drop shadows on buttons.
4. A per-case-study color is allowed as a system (a ramp down the page), not as decoration.

---

## 4. Spatial rhythm

A container system, then very large section padding.

```css
--ct-max:    1240px;
--ct-gutter: 64px;              /* 40px at ≤1068px, ~20px at ≤734px */
--side:      max(var(--ct-gutter), calc((100vw - var(--ct-max)) / 2));
```

Content is capped at 1240px and centered; **extra-large screens get more margin, never
bigger type.** `--side` resolves to the correct gutter at any viewport, so every section
can use one token for its horizontal padding.

Vertical rhythm, desktop (L) tier:

| Element | Value |
| --- | --- |
| Hero | `100svh`, `pointer-events: none` |
| First headline top margin | `300px` |
| Section eyebrow top margin | `300px`, `70px` below to content |
| Section padding | `160px` top, `140–300px` bottom |
| Project row | `70px` top / `22px` bottom padding, `min-height: 152px` |
| Service list gaps | `50px` row / `75px` column |

At the M tier these step down roughly 25–30% (`300 → 220`, `160 → 120`), and mobile
gets its own token set entirely (§6).

**Our current site uses `py-16` / `md:py-24` — that's 64px/96px.** The reference is at
160px+. We are at roughly 40–60% of the whitespace, which is most of why the pages feel
different at a glance even before typography.

### Our rules

1. Adopt the `--ct-max` / `--ct-gutter` / `--side` container system verbatim as a
   technique. It is generic infrastructure, not a design signature.
2. **Section padding starts at `160px` desktop** and steps to `120px` tablet. If the page
   feels too long, cut sections — do not cut air.
3. Cap the content column. Never let type grow past the 1240px measure on wide screens.
4. One horizontal padding token everywhere. No per-section `px-5 sm:px-8 md:px-10`.

---

## 5. Motion, and what it's for

### The hero video

```html
<video class="hero-bg-video" muted autoplay playsinline preload="auto" loop
       poster="assets/hero-poster.jpg" aria-hidden="true">
  <source src="assets/hero-bg.mp4" type="video/mp4" />
</video>
```

`object-fit: cover`, `object-position: 50% 0%` (crops to the brighter top of the frame),
and `opacity: 0` at rest — a scripted "curtain raise" fades it in over white on first
load. Repeat navigations set an `html.bf-repeat-nav` class **before first paint** to skip
the reveal, so a reload doesn't flash a white curtain. That pre-paint inline script is a
genuinely good detail worth stealing as a technique.

The footer video is lazier and more careful: `preload="none"`, `data-lazy-video`,
`<source>` ordered WebM-then-MP4, and a `poster` that is **also the section's CSS
background** — so in iOS Low Power Mode, where autoplay is blocked outright, the still
scene shows in its place with no visible failure.

### The scroll and animation stack

GSAP + Lenis smooth scroll, hooked into a shared ticker. `IntersectionObserver` drives
reveals and lazy media. **Lenis is destroyed on mobile** — native scroll only, because
momentum-sync fights the platform. `prefers-reduced-motion` drops programmatic scrolls
back to instant.

**We are not adopting this.** ~134 KB of JS for smooth scroll and reveals is not a cost
we can justify against a Lighthouse ≥ 95 mobile target. CSS transitions plus
`IntersectionObserver` reproduce the reveals; the scroll-hijack is the part we're
deliberately declining.

### Where they're beatable

`prefers-reduced-motion` is honored in **two small CSS blocks** (`.footer-legal`,
`.m-modal`) and in the scroll helper. The autoplaying hero and footer loops, the
3.6-second wordmark rise, the hover-image spring — none of them are gated. A user with
reduced motion set still gets a full-bleed autoplaying video.

### Our rules

1. `muted autoplay loop playsinline preload="auto"` + a real `poster`, and the poster
   doubles as the section background so blocked autoplay degrades invisibly.
2. Ship a pre-paint inline script for the repeat-navigation case.
3. CSS transitions + `IntersectionObserver` for everything. No scroll-jacking library.
4. **Under `prefers-reduced-motion`, the hero renders the poster and the video never
   loads at all.** Not paused — not requested. This is a place we can be straightforwardly
   better than the reference, and it costs us bandwidth rather than spending it.

---

## 6. Mobile — the two-tree question

**Confirmed: two complete DOM trees, both shipped in the same static document,
toggled by CSS `display`.**

```css
/* default */
#page-mobile  { display: none; }   /* L:999  */
.m-nav-header { display: none; }   /* L:1000 */

@media (max-width: 734px) {
  #page, .nav   { display: none !important; }   /* L:1004 */
  #page-mobile  { display: block; }             /* L:1043 */
  .m-nav-header { display: flex; }              /* L:1044 */
}
```

So it is **not** a conditional render and **not** two documents. Every visitor downloads
both trees. There are two `<header>`s (`.nav` / `.m-nav-header`), two `<main>`s
(`.page` / `.page-mobile`), two `<h1>`s (`.dive-headline` / `.m-about__heading`), and
duplicated anchors (`#work` / `#m-work`, `#contact` / `#m-contact`) — the duplicate
anchors exist precisely because a given ID can only live in one tree.

Breakpoints: **734/735px** (mobile ↔ tablet) and **1068/1069px** (tablet ↔ desktop) —
Apple's S/M/L tiering.

Mobile gets its own token set rather than inherited desktop values:

```css
--m-display: clamp(32px, 9.2vw, 46px);   /* 36 @ 390 */
--m-sub:     clamp(26px, 7.7vw, 38px);
--m-body-lg: clamp(21px, 6.2vw, 31px);
--m-mono:    clamp(14px, 4.4vw, 18px);
--m-gutter:  clamp(18px, 5.1vw, 30px);   /* 20 @ 390 */
--m-sect:    clamp(130px, 38.5vw, 210px);
```

Every clamp is annotated with its computed value at 390px. They designed at 390 and
derived the fluid range from it, rather than picking clamps by feel.

### Separately encoded mobile video — confirmed, with numbers

| Asset | Desktop | Mobile | Ratio |
| --- | --- | --- | --- |
| Hero loop | `hero-bg.mp4` — **5.44 MB** | `hero-bg-mobile.mp4` — **415 KB** | **13×** |
| Footer loop | `footer-underwater.mp4` — **9.56 MB** | `footer2-mobile.webm` **206 KB** / `.mp4` **646 KB** | **46×** |
| Poster | `hero-poster.jpg` — 68 KB | `hero-mobile-poster.jpg` — 20 KB | 3.4× |

The mobile hero is a portrait crop (498×1080), `faststart`-muxed. Their own source
comment records why: the 5.4 MB desktop file *"stalled on the poster over cellular."*

That is the non-negotiable takeaway. A desktop-weight hero video on a phone is not a
performance nit — it is the difference between a hero that plays and one that doesn't.

### Recommendation: **single responsive tree.** Do not copy the two-tree approach.

| | Two trees | Single tree |
| --- | --- | --- |
| Payload | Both trees ship to every visitor, always | One tree |
| Duplicate content | Two `<h1>`s, two `<main>`s, every heading twice in the served HTML | Clean |
| Anchors | Must be duplicated and prefixed (`#work` / `#m-work`) | One set |
| Divergence risk | Every copy edit must be made twice or the trees drift | Single source |
| Truly distinct mobile layouts | Trivially easy | Needs deliberate component design |

**Why single tree for us:**

- **SEO.** Their served HTML contains every heading twice and two `<h1>` elements. It
  evidently isn't sinking them, but we're a two-person studio starting a repositioning —
  shipping knowingly duplicated content is a self-inflicted risk with no upside.
- **Maintenance.** With two people and a growing case-study list, every Work entry would
  be authored twice. This is exactly where a drifted headline or a stale metadata triplet
  gets shipped.
- **We have a tool they don't.** They're on static HTML, where the two-tree approach is
  the *only* way to get genuinely different mobile structure. We have React. A
  `<WorkCard>` that stacks on mobile and sits in a three-up layout at desktop from one
  set of props gets us structural freedom at none of the duplication cost.

**Where they're right and we should follow:**

- Their spotlight component (`.cs-*`) is already **shared across all three tiers** —
  it's the `.m-*` markup reused at `≥1069px`, restyled from stacked column to 62.5/37.5
  split. So even they only maintain one case-study body. That's the single-tree pattern,
  and it's the part of their architecture worth copying.
- Distinct mobile **tokens**, not inherited desktop values. Adopt this.
- **Design at 390px first**, then derive the clamp range. Adopt this, including
  annotating each clamp with its computed 390px value.
- Separately encoded, separately cropped mobile video. Adopt this without compromise.

### Touch equivalence

Every hover has a designed tap counterpart, not a fallback:

- **Desktop:** service items get a blue wipe-fill left-to-right (a `::before` pseudo
  carrying `attr(data-label)` animating `width: 0 → 100%` over 600ms) plus a
  cursor-following 360×270 image.
- **Touch:** the image springs in with `scale(0.6) rotate(-6deg) → scale(1) rotate(var(--tilt))`
  on a `cubic-bezier(.34, 1.56, .64, 1)` overshoot, positioned near the tapped word.
- The prompt label itself swaps: `.hover-hint` text is zeroed to `font-size: 0` at
  ≤1068px and a `::after` supplies "tap me!" in its place.
- Project rows flood with their project color on `:active`, mirroring desktop `:hover`.
- `-webkit-tap-highlight-color: transparent` on every interactive element.

The nav also differs structurally, not just in size: desktop is a fading bar, mobile is a
floating frosted pill group at `top: calc(20px + env(safe-area-inset-top))`.

### Our rules

1. Single responsive tree. One `<h1>`, one anchor set, one copy source.
2. Mobile-specific token set. Design at 390px, derive clamps from it, annotate them.
3. Separately encoded and cropped mobile video, `<source media>`-switched. Target
   **≤ 500 KB** for the mobile hero.
4. Every hover gets a designed tap equivalent, and the *prompt copy itself* changes
   ("hover" → "tap"). A hint that says "hover me!" on a phone is a bug.
5. `viewport-fit=cover` + `env(safe-area-inset-*)` on fixed chrome.
6. `-webkit-tap-highlight-color: transparent` plus a real designed `:active` state.

---

## 7. Structure and components

### What the reference does

Their page is six moves: nav, textless hero, accordion Work rows, eight service
words, ethos, footer-with-video. That is their signature. We extract the *discipline*
(hero as atmosphere, two nav links, services as words, ethos as two paragraphs) and
not the objects.

### What we ship

Seven moves, in order (`migration-plan.md` §0):

1. **Nav** — type-only **JOA** left, **exactly two links** right (`Work`, `Contact`).
   No CTA, no dropdown, no phone. Hides on scroll-down, fades back on scroll-up.
2. **Hero** — full-bleed `100svh`, `pointer-events: none`, **no text**. Task A is a
   poster. Task B is a per-direction loop. The headline lives *below* the fold.
3. **Work** — **three cards** (Humble, Holonomy, Best Interlocks). Case studies and
   testimonials in one section. Not their bordered accordion list. Not a second proof
   block. Affluent Vacays is out.
4. **Services** — three plain words at display size, not cards, not icons, not a
   grid: **Web design / CRM implementation / SMB Automation**. One hover/tap moment.
5. **Ethos** — two short paragraphs, first person. No credentials, no logo wall.
6. **Contact** — our form (name, email, what you're building, budget).
7. **Footer** — wordmark, email, legal row (privacy only). **No footer video. No
   Terms link.**

### Section eyebrows

Every section opens with the same object: a small mono label plus **one repeated
ornament** — ours, not their hand-drawn blue GIF, and not their section names
("Select Work", "Our Services", "Our Ethos"). The ornament itself is per-direction
(A ruled line, B brackets, C pill). That's what makes otherwise-plain sections
read as a set.

### Two-tier case study headline

- **Tier 1**, on the card, at display size: an *outcome phrase*, never the client name —
  "Building luxury in Los Angeles", "Best dog trainer in Santa Barbara", "See you on the
  moon", "Puppy love".
- **Tier 2**, still on the card: the client name, plainly.

Two of six are cheats — "Donna Berg Interiors" and "Nantucket's oldest art gallery" are
just the client name and a descriptor. The pattern is aspirational, not absolute, which
is useful on three cards when headlines are still `[FILL IN]`.

### Metadata triplet

A real `<dl>`, three rows, mono labels at 16px against 20px values:

```html
<dl class="cs-meta">
  <div class="cs-row"><dt>Services</dt><dd>Website + Brand Design + Copywriting</dd></div>
  <div class="cs-row"><dt>Industry</dt><dd>Luxury Construction</dd></div>
  <div class="cs-row"><dt>Location</dt><dd>Los Angeles, CA</dd></div>
</dl>
```

Pinned to the bottom of the card via `margin-top: auto` at desktop. Copy this structure
exactly — `<dl>/<dt>/<dd>` is the semantically correct element and we get it for free.

### The `↗` affordance

Every outbound link ends in `↗` (`&#8599;`) in a `<span aria-hidden="true">`, which
translates `translateX(3px) translateY(-2px)` on hover. Consistent, cheap, and it does
the job an "external link" icon usually does badly.

### CTA copy

Voice-consistent, never generic. `Let's dive in ↗`, `See it in action ↗`, and a footer
email pill that is just the address — `hello@bluefin.studio`. No "Get Started", no "Book
a Free Strategy Call", no button-shaped urgency anywhere on the page.

### Our rules

1. Nav is **JOA** + two links (`Work`, `Contact`). **No CTA button in the nav.**
   Hide on scroll down, show on scroll up.
2. Hero is atmosphere. The pitch sits below it. Task A is a poster; video is Task B.
3. Every section opens with a mono eyebrow + a consistent ornament — ours, not a
   hand-drawn blue line, not their section names.
4. Work is **three cards**. Outcome headline → client name → story → optional quote
   → `<dl>` → `↗` when a URL exists.
5. Services / Industry / Location as a real `<dl>`, set small and quiet.
6. `↗` on every outbound link, with a hover translate.
7. CTAs in our voice. If a CTA could appear on any agency site, rewrite it.
8. No footer video. No Terms. Privacy copy is rewritten this round.

---

## 8. Craft details worth stealing

- **The pre-paint reload flag.** An inline `<head>` script reads
  `performance.getEntriesByType('navigation')[0].type` and sets a class before the first
  paint, so reloads skip the intro. Cheap, and it fixes a real flash.
- **Poster-as-background.** The video's `poster` is also the section's CSS
  `background-image`, so blocked autoplay degrades to a designed still, not a black box.
- **Annotated clamps.** `clamp(32px, 9.2vw, 46px); /* 36 @ 390 */` — the comment records
  the design intent so the next person doesn't have to reverse-engineer the math.
- **Comments that record decisions, not mechanics.** Their CSS carries dated QA notes
  ("the bottom of the loop is too dark (2026-07-15 QA note)", "it's not even a video").
  This is why the codebase holds together across two people.
- **`overflow-x: clip` over `hidden`** — doesn't create a scroll container, so
  `position: sticky` keeps working.
- **JSON-LD structured data.** `ProfessionalService` + `Organization` with founders,
  `areaServed`, `foundingLocation`. We currently ship none.

## 8b. Where we can be better

Not everything there is exemplary, and these are our openings:

1. **Reduced motion.** Barely handled (§5). We gate everything, including video load.
2. **Heading hierarchy.** Two `<h1>`s, and every project generates two `<h2>`s (the
   outcome line and the client name) with no `<h3>` between them. Ours: one `<h1>`, the
   outcome line as `<h2>`, the client name as `<h3>`.
3. **Payload.** ~134 KB of vendored JS and both DOM trees on every load. We ship one
   tree and no scroll library.
4. **`font-display: block`** on both faces — a hard invisible-text window on slow
   connections. We use `swap` with a metric-matched fallback.
5. **A 9.56 MB footer video** served to desktop. We won't have one. Locked.

---

## 9. The rules, condensed

1. Three type sizes, one weight, tracking `normal`. Hierarchy from size and space.
2. One near-white ground, one near-black ink, one saturated accent. Accent lives in
   motion, not at rest.
3. Section padding starts at 160px desktop. Capped 1240px column, `--side` gutter token.
4. Hero is atmosphere; the pitch is below it. Nav is `JOA` and two links.
5. Mono eyebrow opens every section, with one repeated ornament (per-direction).
6. Work is **three cards**: outcome headline → client name → story → optional quote
   → `<dl>` → `↗` when a URL exists.
7. Single responsive tree. Mobile tokens, designed at 390px.
8. Separately encoded mobile video, ≤ 500 KB, poster-as-background fallback.
9. Every hover has a designed tap equivalent, including the prompt copy.
10. `prefers-reduced-motion` gates everything, and prevents the video from loading.
11. CSS + `IntersectionObserver`. No scroll library.
12. CTAs in our voice, or rewrite them.

---

## 10. Visual directions — **build all three**

Three directions. All three obey §9. None is Bluefin in another color — the test applied
to each was whether it would still make sense if Bluefin didn't exist.

**Do not pick one.** Task A builds the shared structure once. Task B forks worktrees
`direction-a`, `direction-b`, and `direction-c` and applies the matching direction.
Do not merge. Do not pick a winner in the agent run. You compare them after.

### Direction A — "Drafting table"

- **Ground** warm paper `#FBFAF7`. **Ink** `#0F0F0E`. **Accent** a single burnt orange
  `#D6421F`, used only on hover fills and the eyebrow rule.
- **Type** a grotesque with real character for display (Neue Haas / Söhne / **Inter Tight**
  as the free option), and a mono for eyebrows and metadata.
- **Ornament** the eyebrow rule is a thin hand-ruled line with a slight overshoot at the
  end — a pencil mark, not a graphic.
- **Motion** section content rises 12px and fades on `IntersectionObserver`. Hero is a
  slow static-camera loop of hands/work, desaturated.
- **Why** "two people who build good websites" is a craft claim. Warm paper and a drafting
  vocabulary say made-by-hand without saying it. Maximum distance from Bluefin's cool
  paper and electric blue, and maximum distance from our current SaaS-blue.

### Direction B — "Signal"

- **Ground** true `#FFFFFF`. **Ink** `#000000`. **Accent** a single acid green `#00E05A`.
- **Type** one face doing everything — a variable grotesque at 400 for display *and* a
  mono cut for small text. Extreme discipline; the page is black text on white with two
  green moments.
- **Ornament** the eyebrow is bracketed — `[ Select Work ]` — in mono. No graphic at all.
- **Motion** a hard cut rather than a fade: content snaps in with a 120ms clip-path wipe.
  Hero is a full-bleed loop of one of our own sites being scrolled, screen-recorded.
- **Why** the most confident and the cheapest to execute perfectly. Showing our work *as*
  the hero is the strongest possible argument for a web design studio. Highest risk: with
  one face and no ornament, any sloppy spacing is nakedly visible.

### Direction C — "Long shadow"

- **Ground** near-white `#F7F7F5`. **Ink** `#141414`. **Accent** deep ink blue `#1B2ECC`
  — plus a **soft, large, real shadow** as the signature element, giving cards and media
  physical weight on the page.
- **Type** a high-contrast serif for display (**Instrument Serif** / Editorial New) paired
  with a neutral sans for body and mono for metadata. The serif is the differentiator.
- **Ornament** the eyebrow sits in a small pill with a hairline border.
- **Motion** media scales `1.04 → 1.0` as it enters; shadows deepen on hover.
- **Why** the serif reads as editorial and design-literate, and immediately signals
  "brand and copy" as a real service line rather than an add-on. Risk: a display serif is
  a strong flavor and it will date faster than A or B.

A note for *your* review after the bake-off, not a gate for the agent: A is the
safest craft read; B is the most impressive if executed flawlessly; C's serif will
date faster. Build all three to the same exit bar in `migration-plan.md` §9.

Direction C's hero loop is still TBD (`fill-ins.md` #26). A and B are specified
above. Task A ships a poster in every variant until footage exists.
