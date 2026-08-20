# Bake-off — three directions, one shared base

Task A + Task B of `migration-plan.md`, run 2026-08-19. **Nothing is merged
and no winner is picked** — that call is yours after comparing these.

## Review them side by side

| | Direction | Local URL | Worktree |
| --- | --- | --- | --- |
| A | Drafting table | http://localhost:3001 | `/Users/juliandavis/dev/joaautomations-direction-a` |
| B | Signal | http://localhost:3002 | `/Users/juliandavis/dev/joaautomations-direction-b` |
| C | Long shadow | http://localhost:3003 | `/Users/juliandavis/dev/joaautomations-direction-c` |

Each is a **production** build (`next build` + `next start`), not a dev server.
To bring them back up after a reboot:

```bash
for pair in a:3001 b:3002 c:3003; do
  d=${pair%%:*}; p=${pair##*:}
  (cd /Users/juliandavis/dev/joaautomations-direction-$d && PORT=$p npm run start &)
done
```

Port 3000 belongs to a pre-existing dev server that is not part of this run.

Worth clicking on every one: the service words (hover on desktop, tap on a
phone — the prompt copy changes with the pointer), the nav on scroll down
then up, and the contact form. `/privacy-policy` is rewritten in all three.

## What is identical across all three

The page, the markup, the copy, the component tree, the container and spacing
system, and the exit-bar results. Structure was built once on
`task-a/shared-base` and forked. Each fork owns exactly **two source files** —
`app/direction.css` and `app/fonts.ts` — plus its two generated images.
`app/globals.css` and every component are byte-identical across the three
worktrees (verified, not assumed).

That is the point of the exercise: **you are comparing look, not layout.**

## The craft pass (second run)

The first pass shipped one flat ground from top to bottom, which is why it read
as a styled document rather than a designed site. This pass took the structural
lessons off the reference — not its theme — and rebuilt the atmosphere.

- **Three grounds, not one.** Dark full-bleed hero → a band that dissolves dark
  into paper → the paper body → a single dark block carrying Contact and the
  footer together. The alternation is doing most of the work.
- **A curtain raise.** The hero still dissolves up out of the ground rather than
  snapping in. Skipped on a repeat navigation (a pre-paint flag in `layout.tsx`),
  never run under reduced motion. A quiet scroll cue leaves on first scroll.
- **The nav is an object.** Links sit in a frosted cluster with real inset light
  modelling. Over the dark hero the same object becomes dark glass — done with a
  data attribute rather than `mix-blend-mode`, so both states can be contrast
  checked. It hides on an accumulator, so trackpad jitter cannot flicker it.
- **Work cards carry the ramp.** Each card has a colour plate running the full
  height of the card, descending the page, with its index and client name on it.
  A system (`design-principles.md` §3 allows exactly this), not decoration — and
  it invents no imagery we do not have.
- **The contact form is a real form.** Rounded fields, a focus ring, our own
  select chevron instead of OS chrome, and a pill submit that fills and lifts.
- **A contact modal**, sharing the same fields, opened from the ethos CTA and the
  footer pill. Escape and the overlay close it, focus is trapped and restored to
  whatever opened it, the page behind is locked, and it is `inert` when closed.
- **The footer lands.** The wordmark set to fill the column, sliding up from its
  own baseline as it enters, over two pills and a quiet legal row.

**A real bug fell out of this.** Our layout class was named `.container`, which
collides with Tailwind's `container` core utility. Every section on every variant
was silently pinned to 1280px, which is why the page read narrow with a dead
right-hand column. Renamed to `.shell`.

### What was deliberately not taken from the reference

Their ocean/underwater theme and imagery, their palette, their wordmark and type,
their copy and section names, their accordion Work list, and their 9.56 MB footer
video. `docs/brief.md` rules all of those out, and none of them are what made the
page work.

## The three

### A — Drafting table  (`direction-a`, :3001)

- **Palette** warm paper `#FBFAF7`, ink `#0F0F0E`, burnt orange `#D6421F`.
  The orange is only ever a hover fill or a rule; text uses a darker cut
  (`#A82F10`) because the raw orange only reaches 4.0:1 on that paper.
- **Type** Inter Tight 400 for display and body, JetBrains Mono for the
  small text.
- **Ornament** a ruled pencil mark — a hairline that overshoots its own end
  and sits a quarter-degree off true. The page itself carries a faint ruled
  grid.
- **Hero** a drafting surface: compass sweeps in orange, a construction
  square, dimension marks with ticks, registration corners.
- **Motion** content rises 12px and fades in.
- **Read** the safest craft read. Warm and made-by-hand without a single
  handmade cliché. Furthest from both the reference and the old SaaS blue.

### B — Signal  (`direction-b`, :3002)

- **Palette** true white, true black, acid green `#00E05A`. The green is
  spent in exactly two places (the service word's fill, the submit rule) and
  never on text — it cannot clear 4.5:1 on white.
- **Type** IBM Plex Sans 400 doing display *and* body, with its own mono cut
  for small text. One family, total.
- **Ground alternation** the dark is pure black, and the ramp is signal
  strength rather than hue: the plates darken down the page while the scanline
  over them tightens. Green stays budgeted to its two moments.
- **Corners** nothing rounds, anywhere — not the nav cluster, not the pills, not
  the modal. The moment a corner eases it stops being B.
- **Ornament** brackets, `[ Work ]`, and no graphic at all.
- **Hero** our own work abstracted to bars and one green block, under a hard
  scanline — standing in for the screen recording the direction calls for.
- **Motion** a hard cut: a 120ms `clip-path` wipe in four steps. It reads as
  a switch thrown, not something easing in.
- **Read** the most confident of the three and the cheapest to execute
  perfectly. Also the least forgiving: with one face and no ornament, any
  spacing that drifts is nakedly visible.

### C — Long shadow  (`direction-c`, :3003)

- **Palette** near-white `#F7F7F5`, ink `#141414`, deep ink blue `#1B2ECC`
  (8.6:1, so it is safe on text as well as rules), plus a soft large real
  shadow as the signature.
- **Type** Instrument Serif for display, Inter for body, JetBrains Mono for
  metadata. Instrument Serif ships one weight, which keeps the one-weight
  rule honest by construction.
- **Ground alternation** the dark is a deep ink night, and C is the one
  direction where the ramp is literally a colour ramp: the blue descends from
  surface to depth across the three cards, each plate lit from above.
- **Ornament** the eyebrow label in a hairline pill.
- **Hero** weighted slabs throwing real shadows.
- **Motion** media scales `1.04 → 1.0` on entry; card shadows deepen on hover.
- **Read** the only one where Work cards are objects rather than regions of
  the ground. The serif signals brand and copy as a real service line — and
  is the thing most likely to date.

## Exit bar (`migration-plan.md` §9)

| Check | A | B | C |
| --- | --- | --- | --- |
| `npm run lint` | clean | clean | clean |
| `npx tsc --noEmit` | clean | clean | clean |
| `npm run build` | clean, 0 warnings | clean, 0 warnings | clean, 0 warnings |
| Contact modal: focus trap, inert, scroll lock, Esc + overlay | pass | pass | pass |
| Browser pass 390 / 768 / 1280 / 1920, both routes | pass | pass | pass |
| Console errors / failed requests / `og.png` 200 | pass | pass | pass |
| `prefers-reduced-motion` | pass | pass | pass |
| Tap equivalent for every hover | pass | pass | pass |
| Copy — no invented facts, no leftovers | pass | pass | pass |
| Lighthouse mobile, production build | **perf 98 / a11y 100** | **perf 97 / a11y 100** | **perf 98 / a11y 100** |
| Contact validation + honeypot + rate limit | pass (Resend mocked) | pass (Resend mocked) | pass (Resend mocked) |

45 automated checks per variant, all green. `scripts/qa.mjs <url>` re-runs
them; **restart the server first**, because the rate limit is in-memory with
a one-hour window and a previous run will otherwise poison the next one.

## Known gaps, all three

1. **Hero is a still, not a loop.** `design-principles.md` §10 allows this
   ("Task A ships a poster in every variant until footage exists"). No
   footage exists for A or B either, and C's is `fill-ins.md` #26. The
   stills are drawn compositions rather than stock photography — we are not
   putting people we have never met on a page that says two people built it.
   Each still doubles as the section's CSS background, so a video dropped in
   later degrades to exactly what you see now.
2. **`RESEND_API_KEY` is not set**, so a valid submission returns
   `{ ok: true, mocked: true }` and logs a warning rather than sending. The
   route is finished; it needs the key, a verified sending domain, and a
   destination address (`fill-ins.md` #21–#23).
3. **Service hover/tap stills do not exist** (`fill-ins.md` #25), so the peek
   panel shows its marker. The interaction itself is built and designed
   twice — cursor-following on a mouse, sprung with a tilt on touch, with
   the prompt copy swapping from "hover me" to "tap me".

## Deliberate deviation from the plan

`migration-plan.md` §7 lists `resend` as a dependency to add. The route talks
to the Resend REST API with `fetch` instead. One HTTP POST does not earn a
package against a ≥95 mobile budget, and it is the same call either way.
Everything else in §7 was followed: `framer-motion` and `lucide-react` are
gone, and no scroll library was added.

## Surviving `[FILL IN]` inventory

17 markers render on the page. All of them are copy or media facts; none
blocked the build. Numbers refer to `fill-ins.md`.

**Pitch / `<h1>`** — the heading and its two or three sentences (#24). This
is the largest visible gap: it is the first thing under the hero.

**Work — Humble Bike Rentals**: outcome headline (#1), services line (#4),
industry (#5), city/state (#2). Live URL (#3) is still absent, so the card
renders without its `↗`. Karl Watson's quote is on the card verbatim, as
decided — it is about the receptionist, not the design, and was not rewritten.

**Work — Holonomy Consulting**: outcome headline (#7), two sentences of plain
context on what they actually do (#12), services line (#10), industry (#11),
city/state (#8). No URL (#9), so no `↗`. No quote exists, so the card ships
without one.

**Work — Best Interlocks of California**: outcome headline about the workflow
(#13), services line (#16), industry (#17), city/state (#14). No URL (#15).
Dan Rowan's quote is on the card verbatim. The card says plainly that this one
is automation and not a website.

**Ethos**: the two names (#18), where you are based (#19), why you do this
(#20). Both paragraphs are markers.

**Services**: one still per service word (#25), ×3.

Nothing was invented to fill any of these.

---

## The copy pass (2026-08-20)

The three variants no longer ship placeholder copy. `docs/fill-ins.md` #1–#20,
#24 and #27 are answered and written into `content/work.ts` and
`content/site.ts`. Copy lives in the shared layer, so all three directions
carry identical words — the bake-off still compares look, not content.

**Both testimonials came off.** Karl Watson's described an AI phone
receptionist; what was built for Humble is a website with Google Calendar
booking. The quote would have claimed a product that never shipped. Dan
Rowan's matched its story and was dropped by choice alongside it. The
`WorkQuote` type and the card's quote rendering both remain, so a confirmed
quote drops in without touching the component.

**All three cards now link out.** Humble, Holonomy and Best Interlocks each
have a live URL, so the `↗` renders on every card — previously on none.

**The footer no longer publishes an address.** Every inbound routes through
the form and the modal. The address stays in `content/site.ts` for the privacy
policy, where a reachable contact is expected, and for JSON-LD.

### What is still a marker

Three service stills (`fill-ins.md` #25), by choice. They render as image
sources, so nothing leaks into visible copy.

### The one launch blocker

`RESEND_API_KEY` and its sending domain and destination (#21–#23) are
deferred. Until the key is set, `app/api/contact/route.ts` returns
`{ ok: true, mocked: true }` and logs a warning — the form looks like it works
and no mail is sent. This must be closed before the winning direction goes
anywhere public.

### Re-verified after the copy pass

45/45 QA checks, clean lint, clean types, and a zero-warning production build
on all three worktrees.
