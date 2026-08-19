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
  // JPEG quality for the hero still. The still is the LCP candidate behind
  // the fold-height hero, so bytes here move the mobile score directly.
  quality: process.env.JOA_JPEG_Q ?? '62',
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

/**
 * Atmosphere, not a photograph. Each treatment is drawn from the
 * direction's own vocabulary rather than borrowed from a stock library —
 * we are not putting people we have never met on a page that says two
 * people built it. Replaced by real footage in each fork when it exists
 * (docs/fill-ins.md #26).
 */
const A = DIRECTION.accent
const I = DIRECTION.ink
const P = DIRECTION.paper

const stages = {
  // A — drafting table: a ruled surface with a compass sweep and dimension marks
  ruled: `
    <div class="stage" style="background:${P}">
      <div style="position:absolute;inset:0;
        background-image:
          linear-gradient(${I}0f 1px, transparent 1px),
          linear-gradient(90deg, ${I}0f 1px, transparent 1px),
          linear-gradient(${I}1c 1px, transparent 1px),
          linear-gradient(90deg, ${I}1c 1px, transparent 1px);
        background-size: 40px 40px, 40px 40px, 200px 200px, 200px 200px;"></div>

      <svg viewBox="0 0 1600 1000" style="position:absolute;inset:0;width:100%;height:100%">
        <g fill="none" stroke="${A}" stroke-width="2">
          <circle cx="1180" cy="500" r="430" opacity="0.5"/>
          <circle cx="1180" cy="500" r="300" opacity="0.28"/>
          <path d="M1180 70 L1180 930" opacity="0.22"/>
          <path d="M750 500 L1610 500" opacity="0.22"/>
        </g>
        <g fill="none" stroke="${I}" stroke-width="1.5" opacity="0.5">
          <path d="M200 760 L640 300"/>
          <path d="M200 300 L640 760"/>
          <path d="M200 300 L640 300 L640 760 L200 760 Z"/>
        </g>
        <g fill="none" stroke="${I}" stroke-width="1.5" opacity="0.65">
          <path d="M200 840 L640 840"/>
          <path d="M200 828 L200 852"/>
          <path d="M640 828 L640 852"/>
          <path d="M120 300 L120 760"/>
          <path d="M108 300 L132 300"/>
          <path d="M108 760 L132 760"/>
        </g>
        <g fill="none" stroke="${I}" stroke-width="2" opacity="0.8">
          <path d="M60 60 L60 130 M60 60 L130 60"/>
          <path d="M1540 940 L1540 870 M1540 940 L1470 940"/>
        </g>
        <g fill="${A}" opacity="0.9">
          <circle cx="1180" cy="500" r="7"/>
          <circle cx="200" cy="300" r="5"/>
          <circle cx="640" cy="760" r="5"/>
        </g>
      </svg>
    </div>`,

  // B — signal: our own work being scrolled, abstracted to bars and one acid moment
  scan: `
    <div class="stage" style="background:${P}">
      <svg viewBox="0 0 1600 1000" style="position:absolute;inset:0;width:100%;height:100%">
        <g fill="${I}">
          <rect x="180" y="120" width="520" height="34"/>
          <rect x="180" y="196" width="880" height="34"/>
          <rect x="180" y="272" width="640" height="34"/>
          <rect x="180" y="420" width="300" height="220"/>
          <rect x="520" y="420" width="300" height="220"/>
          <rect x="180" y="700" width="410" height="20"/>
          <rect x="180" y="748" width="640" height="20"/>
          <rect x="180" y="796" width="290" height="20"/>
        </g>
        <g fill="${A}">
          <rect x="860" y="420" width="300" height="220"/>
          <rect x="180" y="880" width="180" height="20"/>
        </g>
        <g fill="none" stroke="${A}" stroke-width="4">
          <path d="M0 660 L1600 660"/>
        </g>
        <g fill="${I}" opacity="0.18">
          <rect x="1240" y="120" width="180" height="34"/>
          <rect x="1240" y="196" width="240" height="34"/>
        </g>
      </svg>
      <div style="position:absolute;inset:0;
        background-image: repeating-linear-gradient(180deg, ${I}12 0 2px, transparent 2px 9px);"></div>
    </div>`,

  // C — long shadow: slabs with real weight
  depth: `
    <div class="stage" style="background:${P}">
      <div style="position:absolute;left:9%;top:14%;width:44%;height:64%;background:${A};
        box-shadow:0 90px 140px -50px ${I}66, 0 20px 40px -20px ${I}33;"></div>
      <div style="position:absolute;left:44%;top:32%;width:30%;height:48%;background:#FFFFFF;
        box-shadow:0 70px 110px -40px ${I}59, 0 14px 30px -16px ${I}2b;"></div>
      <div style="position:absolute;left:70%;top:20%;width:22%;height:34%;background:${I};
        box-shadow:0 60px 100px -40px ${I}59;"></div>
      <div style="position:absolute;left:66%;top:66%;width:26%;height:18%;background:#FFFFFF;
        box-shadow:0 40px 70px -30px ${I}4d;"></div>
    </div>`,

  plain: `
    <div class="stage" style="background:${P};
      background-image: radial-gradient(90% 70% at 30% 20%, ${A}2e, transparent 70%);"></div>`,
}

const hero = `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0;width:1600px;height:1000px;overflow:hidden}
  .stage{position:relative;width:1600px;height:1000px;overflow:hidden}
  /* film grain so the still does not read as a flat CSS rectangle */
  .grain{position:absolute;inset:0;opacity:.14;mix-blend-mode:multiply;pointer-events:none;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='0.55'/></svg>");}
  .vig{position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(130% 110% at 50% 38%, transparent 45%, ${I}26 100%)}
</style>
${stages[DIRECTION.hero] ?? stages.plain}
<div class="grain"></div><div class="vig"></div>`

const heroPng = shot(hero, { width: 1600, height: 1000, out: 'hero' })
execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', DIRECTION.quality, heroPng, '--out', 'public/hero-poster.jpg'], {
  stdio: 'ignore',
})

console.log(`assets written for "${DIRECTION.name}": public/og.png, public/hero-poster.jpg`)
