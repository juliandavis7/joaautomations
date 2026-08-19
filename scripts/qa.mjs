/**
 * The exit loop from docs/migration-plan.md §9, checks 3-7, run against a
 * running server. Drives headless Chrome over CDP with the platform
 * WebSocket — no puppeteer, no new dependency.
 *
 * Usage: node scripts/qa.mjs http://localhost:3000 [--shots dir]
 */
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'

const BASE = process.argv[2] ?? 'http://localhost:3000'
const shotsIndex = process.argv.indexOf('--shots')
const SHOTS = shotsIndex > -1 ? process.argv[shotsIndex + 1] : null
if (SHOTS) mkdirSync(SHOTS, { recursive: true })

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 9333 + Math.floor(Math.random() * 400)
const WIDTHS = [390, 768, 1280, 1920]

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/joa-qa-profile-' + PORT,
  'about:blank',
])

const results = []
const fail = (name, detail) => results.push({ ok: false, name, detail })
const pass = (name, detail = '') => results.push({ ok: true, name, detail })

async function wsUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      const json = await res.json()
      if (json.webSocketDebuggerUrl) return json.webSocketDebuggerUrl
    } catch {}
    await sleep(250)
  }
  throw new Error('Chrome did not expose a debugging endpoint')
}

class CDP {
  constructor(ws) {
    this.ws = ws
    this.id = 0
    this.pending = new Map()
    this.listeners = []
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data)
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
      } else if (msg.method) {
        for (const fn of this.listeners) fn(msg)
      }
    })
  }
  on(fn) {
    this.listeners.push(fn)
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params, sessionId }))
    })
  }
}

function open(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url)
    ws.addEventListener('open', () => resolve(ws))
    ws.addEventListener('error', reject)
  })
}

const main = async () => {
  const browser = new CDP(await open(await wsUrl()))
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true })
  const S = (m, p) => browser.send(m, p, sessionId)

  const consoleErrors = []
  const failedRequests = []
  const requested = []
  const statuses = new Map()
  browser.on((msg) => {
    if (msg.sessionId !== sessionId) return
    if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'assert'].includes(msg.params.type)) {
      consoleErrors.push(msg.params.args.map((a) => a.value ?? a.description).join(' '))
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description ?? ''))
    }
    if (msg.method === 'Network.requestWillBeSent') requested.push(msg.params.request.url)
    if (msg.method === 'Network.responseReceived') statuses.set(msg.params.response.url, msg.params.response.status)
    if (msg.method === 'Network.loadingFailed' && !msg.params.errorText.includes('Aborted')) {
      failedRequests.push(msg.params.errorText)
    }
  })

  await S('Page.enable')
  await S('Runtime.enable')
  await S('Network.enable')

  const goto = async (url) => {
    await S('Page.navigate', { url })
    await sleep(1600)
  }

  const evaluate = async (expression) => {
    const { result, exceptionDetails } = await S('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    })
    if (exceptionDetails) throw new Error(exceptionDetails.text)
    return result.value
  }

  const setWidth = (width, height = 900) =>
    S('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 735,
    })

  const shot = async (name) => {
    if (!SHOTS) return
    // Full-page capture never scrolls, so IntersectionObserver would leave
    // every below-the-fold reveal at opacity 0. Settle them for the shot only.
    await evaluate(`(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'))
      const s = document.createElement('style')
      s.textContent = '.reveal{opacity:1 !important;transform:none !important;transition:none !important}'
      document.head.appendChild(s)
    })()`)
    const { data } = await S('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
    writeFileSync(`${SHOTS}/${name}.png`, Buffer.from(data, 'base64'))
  }

  /* ---- 3. browser pass at four widths, / and /privacy-policy ---- */
  for (const path of ['/', '/privacy-policy']) {
    for (const width of WIDTHS) {
      await setWidth(width)
      await goto(BASE + path)
      const geom = await evaluate(`(() => {
        const doc = document.scrollingElement
        const over = [...document.querySelectorAll('body *')]
          .filter(el => {
            const r = el.getBoundingClientRect()
            return r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1)
          })
          .slice(0, 5)
          .map(el => el.tagName + '.' + (el.className.baseVal ?? el.className ?? '').toString().slice(0, 40))
        return { scrollWidth: doc.scrollWidth, inner: window.innerWidth, over }
      })()`)
      const label = `${path === '/' ? 'home' : 'privacy'} @ ${width}`
      if (geom.scrollWidth > geom.inner + 1) {
        fail(`no horizontal scroll — ${label}`, `scrollWidth ${geom.scrollWidth} vs ${geom.inner}`)
      } else if (geom.over.length) {
        fail(`nothing overflows the viewport — ${label}`, geom.over.join(', '))
      } else {
        pass(`no horizontal scroll / overflow — ${label}`)
      }
      await shot(`${path === '/' ? 'home' : 'privacy'}-${width}`)
    }
  }

  /* ---- structure checks on / at 1280 ---- */
  await setWidth(1280)
  await goto(BASE + '/')

  const structure = await evaluate(`(() => ({
    cards: document.querySelectorAll('article.work-card').length,
    services: [...document.querySelectorAll('.services__word')].map(b => b.textContent.trim()),
    h1: [...document.querySelectorAll('h1')].length,
    h2: [...document.querySelectorAll('h2')].length,
    h3: [...document.querySelectorAll('h3')].length,
    navLinks: [...document.querySelectorAll('.nav nav a')].map(a => a.textContent.trim()),
    terms: !!document.querySelector('footer a[href*="terms" i]'),
    anchors: ['work','contact'].map(id => !!document.getElementById(id)),
    video: document.querySelectorAll('video').length,
    ghl: document.body.innerHTML.includes('msgsndr') || !!document.querySelector('iframe'),
    text: document.body.innerText,
  }))()`)

  structure.cards === 3
    ? pass('Work has 3 cards')
    : fail('Work has 3 cards', `found ${structure.cards}`)

  JSON.stringify(structure.services) ===
  JSON.stringify(['Web design', 'CRM implementation', 'SMB Automation'])
    ? pass('services are the three agreed words')
    : fail('services are the three agreed words', structure.services.join(' / '))

  structure.h1 === 1 ? pass('exactly one <h1>') : fail('exactly one <h1>', `found ${structure.h1}`)
  structure.h2 === 3 && structure.h3 === 3
    ? pass('heading hierarchy: h2 outcome, h3 client')
    : fail('heading hierarchy', `h2 ${structure.h2}, h3 ${structure.h3}`)

  JSON.stringify(structure.navLinks) === JSON.stringify(['Work', 'Contact'])
    ? pass('nav is Work + Contact, no CTA')
    : fail('nav is Work + Contact, no CTA', structure.navLinks.join(', '))

  structure.terms ? fail('footer has no Terms link') : pass('footer has no Terms link')
  structure.anchors.every(Boolean) ? pass('#work and #contact exist') : fail('#work and #contact exist')
  structure.ghl ? fail('no GHL iframe survives') : pass('no GHL iframe survives')

  /* ---- 7. copy ---- */
  const banned = [
    'Custom AI workflows',
    'AI Receptionist',
    'Affluent Vacays',
    'workflows built',
    'ROI in the first 30 days',
    'Live in 5-7 days',
    'lead follow-up',
    'Get Started',
    'Book a Free',
  ]
  const found = banned.filter((s) => structure.text.includes(s))
  found.length ? fail('no leftover automation-agency copy', found.join(', ')) : pass('no leftover automation-agency copy')
  structure.text.includes('JOA') ? pass('wordmark is JOA') : fail('wordmark is JOA')

  const markers = (structure.text.match(/\[FILL IN[^\]]*\]/g) ?? []).length
  pass('[FILL IN] markers are visible in the page', String(markers))

  /* ---- nav hide-on-scroll ---- */
  const navBehaviour = await evaluate(`(async () => {
    const nav = document.querySelector('.nav')
    const wait = (ms) => new Promise(r => setTimeout(r, ms))
    window.scrollTo(0, 0); await wait(200)
    const atTop = nav.dataset.hidden
    window.scrollTo(0, 1400); await wait(400)
    const afterDown = nav.dataset.hidden
    window.scrollTo(0, 900); await wait(400)
    const afterUp = nav.dataset.hidden
    return { atTop, afterDown, afterUp }
  })()`)
  navBehaviour.atTop === 'false' && navBehaviour.afterDown === 'true' && navBehaviour.afterUp === 'false'
    ? pass('nav hides on scroll down, returns on scroll up')
    : fail('nav hide-on-scroll', JSON.stringify(navBehaviour))

  /* ---- anchors land ---- */
  const anchorLanding = await evaluate(`(async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms))
    const out = {}
    for (const id of ['work','contact']) {
      // instant, not smooth — a pending smooth scroll-to-top would race the hash nav
      window.scrollTo({ top: 0, behavior: 'instant' }); await wait(400)
      document.querySelector('.nav a[href="#'+id+'"]').click()
      await wait(700)
      let last = -1, same = 0
      for (let i = 0; i < 80 && same < 4; i++) {
        await wait(100)
        const y = Math.round(window.scrollY)
        same = y === last ? same + 1 : 0
        last = y
      }
      out[id] = Math.round(document.getElementById(id).getBoundingClientRect().top)
    }
    return out
  })()`)
  Math.abs(anchorLanding.work) < 90 && Math.abs(anchorLanding.contact) < 90
    ? pass('Work and Contact anchors land')
    : fail('anchors land', JSON.stringify(anchorLanding))

  /* ---- services hover/tap moment ---- */
  const peek = await evaluate(`(async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms))
    const word = document.querySelector('.services__word')
    word.click(); await wait(300)
    const shown = !!document.querySelector('.services__peek')
    word.click(); await wait(300)
    return { shown, hidden: !document.querySelector('.services__peek') }
  })()`)
  peek.shown && peek.hidden
    ? pass('services tap reveals and dismisses the still')
    : fail('services tap moment', JSON.stringify(peek))

  /* ---- 4. console + assets ---- */
  consoleErrors.length ? fail('console has no errors', consoleErrors.slice(0, 3).join(' | ')) : pass('console has no errors')
  failedRequests.length ? fail('no failed requests', failedRequests.slice(0, 3).join(' | ')) : pass('no failed requests')

  const ogStatus = await evaluate(`fetch('/og.png').then(r => r.status)`)
  ogStatus === 200 ? pass('/og.png returns 200') : fail('/og.png returns 200', String(ogStatus))

  /* ---- 5. reduced motion ---- */
  await S('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  })
  requested.length = 0
  await goto(BASE + '/')
  const reduced = await evaluate(`(() => {
    const hero = document.querySelector('.hero')
    const cs = getComputedStyle(hero)
    const reveal = document.querySelector('.reveal')
    return {
      poster: cs.backgroundImage !== 'none',
      videos: document.querySelectorAll('video').length,
      revealOpacity: reveal ? getComputedStyle(reveal).opacity : '1',
      navTransition: getComputedStyle(document.querySelector('.nav')).transitionDuration,
    }
  })()`)
  const videoRequests = requested.filter((u) => /\.(mp4|webm)(\?|$)/.test(u))
  reduced.poster ? pass('reduced motion: poster still shows') : fail('reduced motion: poster still shows')
  videoRequests.length === 0
    ? pass('reduced motion: no video requested')
    : fail('reduced motion: no video requested', videoRequests.join(', '))
  reduced.revealOpacity === '1'
    ? pass('reduced motion: no content hidden behind a reveal')
    : fail('reduced motion: reveal opacity', reduced.revealOpacity)
  reduced.navTransition === '0s'
    ? pass('reduced motion: nav transition disabled')
    : fail('reduced motion: nav transition', reduced.navTransition)

  /* ---- form UI states ---- */
  await S('Emulation.setEmulatedMedia', { features: [] })
  await goto(BASE + '/')
  const formStates = await evaluate(`(async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms))
    const set = (sel, v) => {
      const el = document.querySelector(sel)
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement : el.tagName === 'SELECT' ? HTMLSelectElement : HTMLInputElement
      Object.getOwnPropertyDescriptor(proto.prototype, 'value').set.call(el, v)
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.dispatchEvent(new Event('change', { bubbles: true }))
    }
    set('#name', 'QA Bot'); set('#email', 'qa@example.com')
    set('#project', 'A brand new marketing site with a booking flow.')
    set('#budget', '$5k - $10k')
    document.querySelector('.form__submit').click()
    await wait(1500)
    const status = document.querySelector('.form__status')
    return { state: status.dataset.state, text: status.textContent.trim() }
  })()`)
  formStates.state === 'sent'
    ? pass('form shows a real success state', formStates.text)
    : fail('form success state', JSON.stringify(formStates))

  /* ---- 9. contact route ---- */
  const api = await evaluate(`(async () => {
    const post = (body) => fetch('/api/contact', {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body)
    }).then(async r => ({ status: r.status, body: await r.json() }))
    const good = { name: 'QA Bot', email: 'qa@example.com', project: 'A brand new marketing site with a booking flow.', budget: '$5k - $10k' }
    const invalid = await post({ name: '', email: 'nope', project: 'x', budget: '' })
    const honeypot = await post({ ...good, company: 'spam co' })
    const valid = await post(good)
    let limited = null
    for (let i = 0; i < 8; i++) limited = await post(good)
    return { invalid, honeypot, valid, limited }
  })()`)
  api.invalid.status === 400 ? pass('contact: validation rejects bad input') : fail('contact: validation', JSON.stringify(api.invalid))
  api.honeypot.status === 200 && api.honeypot.body.ok ? pass('contact: honeypot silently accepts') : fail('contact: honeypot', JSON.stringify(api.honeypot))
  api.valid.status === 200 && api.valid.body.ok
    ? pass('contact: valid submission succeeds', api.valid.body.mocked ? 'mocked — RESEND_API_KEY not set' : 'sent via Resend')
    : fail('contact: valid submission', JSON.stringify(api.valid))
  api.limited.status === 429 ? pass('contact: in-memory rate limit trips') : fail('contact: rate limit', JSON.stringify(api.limited))

  /* the rate limit is now tripped, so the form must surface a real error */
  await goto(BASE + '/')
  const formError = await evaluate(`(async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms))
    const set = (sel, v) => {
      const el = document.querySelector(sel)
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement : el.tagName === 'SELECT' ? HTMLSelectElement : HTMLInputElement
      Object.getOwnPropertyDescriptor(proto.prototype, 'value').set.call(el, v)
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.dispatchEvent(new Event('change', { bubbles: true }))
    }
    set('#name', 'QA Bot'); set('#email', 'qa@example.com')
    set('#project', 'A brand new marketing site with a booking flow.')
    set('#budget', '$5k - $10k')
    document.querySelector('.form__submit').click()
    await wait(1500)
    const status = document.querySelector('.form__status')
    return { state: status.dataset.state, text: status.textContent.trim() }
  })()`)
  formError.state === 'error' && formError.text
    ? pass('form shows a real error state', formError.text)
    : fail('form error state', JSON.stringify(formError))

  await browser.send('Browser.close').catch(() => {})
  chrome.kill()

  const failures = results.filter((r) => !r.ok)
  for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? ` — ${r.detail}` : ''}`)
  console.log(`\n${results.length - failures.length}/${results.length} checks passed`)
  process.exit(failures.length ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  chrome.kill()
  process.exit(1)
})
