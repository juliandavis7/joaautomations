# Agent run — handoff state

Live scratch file for the Task A / Task B run against `migration-plan.md`.
Update it as things land. If the run is picked up cold, read this first,
then `migration-plan.md` §9.

**Repo is `/Users/juliandavis/dev/joaautomations`** (the request came from the
`joju-dev` session, but `docs/migration-plan.md` lives here).

## Branches and worktrees

| Branch | Path | Port | State |
| --- | --- | --- | --- |
| `task-a/shared-base` | `/Users/juliandavis/dev/joaautomations` | 4100 (QA only) | Done, 45/45 |
| `direction-a` | `/Users/juliandavis/dev/joaautomations-direction-a` | 3001 | **Done** — 45/45, LH 98/100 |
| `direction-b` | `/Users/juliandavis/dev/joaautomations-direction-b` | 3002 | **Done** — 45/45, LH 97/100 |
| `direction-c` | `/Users/juliandavis/dev/joaautomations-direction-c` | 3003 | **Done** — 45/45, LH 98/100 |

The run is complete. `docs/bake-off.md` is the deliverable write-up.

Port 3000 is occupied by a pre-existing dev server that is **not** part of
this run — leave it alone.

Do not merge the direction branches. Do not pick a winner. Do not deploy.

## What Task A built

`d1be054` + `99fde0d` on `task-a/shared-base`. Page is Nav -> hero (poster,
no text) -> pitch/`<h1>` -> Work (3 cards) -> Services (3 words) -> Ethos ->
Contact -> Footer. Deleted the stats bar, process timeline, GHL iframes,
BrandLockup, Affluent Vacays, framer-motion, lucide-react. Colour and type
live in Tailwind theme tokens backed by CSS variables.

Two plan-called-out defects fixed: the 87 dead `font-family: 'DM Sans'`
declarations, and the 404ing `/og.png`.

**A direction fork owns exactly two source files:** `app/direction.css` and
`app/fonts.ts`, plus its two generated images. `app/globals.css` and every
component are byte-identical across the three worktrees — check with
`diff -rq components ../joaautomations-direction-X/components`. Never edit a
component in a fork; put it on `task-a/shared-base` and merge.

A second pass (the craft pass) rebuilt the page's atmosphere: three grounds
with a dissolving band, a frosted nav cluster, ramp plates on the Work cards,
a designed contact form, a contact modal, and a giant footer wordmark. See
`docs/bake-off.md`.

## Tooling written for this run

- `scripts/qa.mjs <baseUrl> [--shots dir]` — the §9 browser checks (45 of
  them, including the modal's focus/inert/scroll-lock/close paths) driven over CDP with the platform WebSocket. No puppeteer.
  **Restart the server before each run** — the contact rate limit is
  in-memory with a 1h window and will otherwise poison the next run.
- `scripts/make-assets.mjs` — renders `public/og.png` and
  `public/hero-poster.jpg` from the direction's own tokens via headless
  Chrome. Driven by `JOA_PAPER` / `JOA_INK` / `JOA_ACCENT` / `JOA_FONT` /
  `JOA_MONO` / `JOA_HERO` env vars.

## Per-variant loop

```
cd /Users/juliandavis/dev/joaautomations-direction-X
JOA_PAPER=… JOA_INK=… JOA_ACCENT=… JOA_FONT=… JOA_MONO=… JOA_HERO=… node scripts/make-assets.mjs
npm run lint && npx tsc --noEmit && npm run build
lsof -ti tcp:300X | xargs -r kill; (PORT=300X npm run start &)
node scripts/qa.mjs http://localhost:300X --shots <scratch>/shots-X
```

## Known deviations from the plan (deliberate, flag at the end)

1. **No `resend` dependency.** The contact route POSTs to the Resend REST
   API with `fetch`. One HTTP call does not earn a package against a >=95
   mobile budget. Plan §7 listed the SDK as an add.
2. **Hero video is a still in all three variants.** `design-principles.md`
   §10 explicitly allows this ("Task A ships a poster in every variant until
   footage exists"); no footage exists for A or B either, and C is
   `fill-ins.md` #26.

## Remaining

- [x] direction-b, direction-c: tokens, assets, §9 loop
- [x] Lighthouse mobile >=95 perf + a11y on each production build
- [x] Per-variant note (fonts, palette, hero, gaps) — `docs/bake-off.md`
- [x] Surviving `[FILL IN]` inventory (17 markers) — `docs/bake-off.md`
- [x] Leave all three servers running on 3001/3002/3003 for review

Nothing is merged, no winner is picked, nothing is deployed — as instructed.

If you pick a winner later: merge that direction into `main`, delete the
other two worktrees with `git worktree remove`, and the fill-ins in
`docs/bake-off.md` become the next round of work.
