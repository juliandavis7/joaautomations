# Agent run — handoff state

Live scratch file for the Task A / Task B run against `migration-plan.md`.
Update it as things land. If the run is picked up cold, read this first,
then `migration-plan.md` §9.

**Repo is `/Users/juliandavis/dev/joaautomations`** (the request came from the
`joju-dev` session, but `docs/migration-plan.md` lives here).

## Branches and worktrees

| Branch | Path | Port | State |
| --- | --- | --- | --- |
| `task-a/shared-base` | `/Users/juliandavis/dev/joaautomations` | 4100 (QA only) | Done, 35/35 |
| `direction-a` | `/Users/juliandavis/dev/joaautomations-direction-a` | 3001 | Styled, 35/35 |
| `direction-b` | `/Users/juliandavis/dev/joaautomations-direction-b` | 3002 | not started |
| `direction-c` | `/Users/juliandavis/dev/joaautomations-direction-c` | 3003 | not started |

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

**A direction fork only ever changes:** the `:root` token block at the top of
`app/globals.css` (plus a per-direction section appended at the bottom),
`app/fonts.ts`, and the two generated images. Never a component.

## Tooling written for this run

- `scripts/qa.mjs <baseUrl> [--shots dir]` — the §9 browser checks (35 of
  them) driven over CDP with the platform WebSocket. No puppeteer.
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

- [ ] direction-b, direction-c: tokens, assets, §9 loop
- [ ] Lighthouse mobile >=95 perf + a11y on each production build
- [ ] Per-variant note (fonts, palette, hero, gaps)
- [ ] Surviving `[FILL IN]` inventory (17 markers on the shared base)
- [ ] Leave all three servers running on 3001/3002/3003 for review
