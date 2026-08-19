/**
 * Generates the two images the page needs from the direction's own tokens:
 *
 *   public/og.png          1200x630, the wordmark + the tagline
 *   public/hero-poster.jpg the hero still (also the section's CSS background)
 *
 * Rendered with headless Chrome so the type is the real face, not an
 * approximation. The hero still is a placeholder composition until real
 * footage exists (docs/fill-ins.md #26) — it is deliberately abstract
 * rather than stock photography of people we have never met.
 *
 * Usage: node scripts/make-assets.mjs
 * Tuned by the DIRECTION block at the top.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const DIRECTION = {
  name: process.env.JOA_DIRECTION ?? 'shared base',
  paper: process.env.JOA_PAPER ?? '#FAFAF8',
  ink: process.env.JOA_INK ?? '#111110',
  accent: process.env.JOA_ACCENT ?? '#3A3A37',
  // Google Fonts family used for the wordmark on the OG card.
  font: process.env.JOA_FONT ?? 'Inter Tight',
  mono: process.env.JOA_MONO ?? 'JetBrains Mono',
  // Hero still treatment: 'ruled' (A) | 'scan' (B) | 'depth' (C) | 'plain'
  hero: process.env.JOA_HERO ?? 'plain',
}

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
if (!existsSync(CHROME)) {
  console.error('Chrome not found at', CHROME)
  process.exit(1)
}

const tmp = mkdtempSync(join(tmpdir(), 'joa-assets-'))

function shot(html, { width, height, out }) {
  const page = join(tmp, `${out}.html`)
  writeFileSync(page, html)
  execFileSync(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${width},${height}`,
      `--screenshot=${join(tmp, `${out}.png`)}`,
      '--virtual-time-budget=4000',
      `file://${page}`,
    ],
    { stdio: 'ignore' }
  )
  return join(tmp, `${out}.png`)
}

const fontLink = (families) =>
  `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${families
    .map((f) => `family=${f.replace(/ /g, '+')}:wght@400`)
    .join('&')}&display=block">`

/* ---------------- OG card ---------------- */

const og = `<!doctype html><meta charset="utf-8">${fontLink([DIRECTION.font, DIRECTION.mono])}
<style>
  html,body{margin:0;padding:0;width:1200px;height:630px;background:${DIRECTION.paper};color:${DIRECTION.ink}}
  .wrap{width:1200px;height:630px;box-sizing:border-box;padding:88px;display:flex;flex-direction:column;justify-content:space-between}
  .mark{font-family:'${DIRECTION.font}',sans-serif;font-weight:400;font-size:140px;line-height:1}
  .line{font-family:'${DIRECTION.font}',sans-serif;font-weight:400;font-size:56px;line-height:1.15;max-width:20ch}
  .rule{height:2px;width:180px;background:${DIRECTION.accent}}
  .foot{font-family:'${DIRECTION.mono}',monospace;font-size:24px;opacity:.55}
</style>
<div class="wrap">
  <div><div class="mark">JOA</div><div class="rule" style="margin-top:28px"></div></div>
  <div class="line">two people who build websites</div>
  <div class="foot">joaautomations.com</div>
</div>`

copyFileSync(shot(og, { width: 1200, height: 630, out: 'og' }), 'public/og.png')

/* ---------------- hero still ---------------- */

const heroTreatments = {
  // A — drafting table: warm paper, ruled grid, a pencil-weight diagonal
  ruled: `
    background:${DIRECTION.paper};
    background-image:
      linear-gradient(${DIRECTION.ink}12 1px, transparent 1px),
      linear-gradient(90deg, ${DIRECTION.ink}12 1px, transparent 1px),
      radial-gradient(120% 90% at 22% 18%, ${DIRECTION.accent}26, transparent 62%);
    background-size: 46px 46px, 46px 46px, 100% 100%;`,
  // B — signal: white ground, hard horizontal scan bands, one acid moment
  scan: `
    background:${DIRECTION.paper};
    background-image:
      repeating-linear-gradient(180deg, ${DIRECTION.ink}0d 0 2px, transparent 2px 12px),
      linear-gradient(100deg, transparent 46%, ${DIRECTION.accent}5c 46%, ${DIRECTION.accent}5c 49%, transparent 49%);`,
  // C — long shadow: soft depth, one large slab casting a real shadow
  depth: `
    background:${DIRECTION.paper};`,
  plain: `
    background:${DIRECTION.paper};
    background-image: radial-gradient(90% 70% at 30% 20%, ${DIRECTION.accent}2e, transparent 70%);`,
}

const slab =
  DIRECTION.hero === 'depth'
    ? `<div style="position:absolute;left:14%;top:16%;width:46%;height:62%;background:${DIRECTION.accent};box-shadow:0 80px 120px -40px ${DIRECTION.ink}59;"></div>
       <div style="position:absolute;left:52%;top:38%;width:34%;height:44%;background:${DIRECTION.paper};box-shadow:0 60px 100px -30px ${DIRECTION.ink}45;"></div>`
    : ''

const hero = `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0;width:1600px;height:1000px;overflow:hidden}
  .stage{position:relative;width:1600px;height:1000px;${heroTreatments[DIRECTION.hero] ?? heroTreatments.plain}}
  /* film grain so the still does not read as a flat CSS rectangle */
  .grain{position:absolute;inset:0;opacity:.16;mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='0.55'/></svg>");}
  .vig{position:absolute;inset:0;background:radial-gradient(120% 100% at 50% 40%, transparent 40%, ${DIRECTION.ink}3d 100%)}
</style>
<div class="stage">${slab}<div class="grain"></div><div class="vig"></div></div>`

const heroPng = shot(hero, { width: 1600, height: 1000, out: 'hero' })
execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '72', heroPng, '--out', 'public/hero-poster.jpg'], {
  stdio: 'ignore',
})

console.log(`assets written for "${DIRECTION.name}": public/og.png, public/hero-poster.jpg`)
