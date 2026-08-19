import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5

/**
 * In-memory rate limit, per the locked decision in docs/migration-plan.md.
 * It resets on deploy and does not span instances — that is understood and
 * accepted for a contact form at this volume.
 */
const hits = new Map<string, number[]>()

function rateLimited(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  return false
}

function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'local'
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages from this connection. Try again later.' },
      { status: 429 }
    )
  }

  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 })
  }

  const str = (key: string) => (typeof payload[key] === 'string' ? (payload[key] as string).trim() : '')

  // Honeypot: a filled "company" field is a bot. Answer 200 so it learns nothing.
  if (str('company')) {
    return NextResponse.json({ ok: true, mocked: false })
  }

  const name = str('name')
  const email = str('email')
  const project = str('project')
  const budget = str('budget')

  const errors: string[] = []
  if (name.length < 2 || name.length > 120) errors.push('a name')
  if (!EMAIL.test(email) || email.length > 200) errors.push('a valid email')
  if (project.length < 10 || project.length > 4000) errors.push('a line about what you are building')
  if (!budget) errors.push('a budget range')

  if (errors.length) {
    return NextResponse.json(
      { ok: false, error: `We need ${errors.join(', ')}.` },
      { status: 400 }
    )
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO ?? 'joaautomations@gmail.com'
  const from = process.env.CONTACT_FROM ?? 'JOA <onboarding@resend.dev>'

  // No key in this environment: mock the success path rather than block the
  // form. Recorded as a gap in docs/fill-ins.md #21-#23.
  if (!key) {
    console.warn('[contact] RESEND_API_KEY is not set — success path mocked, nothing sent.')
    return NextResponse.json({ ok: true, mocked: true })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New inquiry — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Budget: ${budget}`,
        '',
        project,
      ].join('\n'),
    }),
  })

  if (!res.ok) {
    console.error('[contact] Resend rejected the send:', res.status, await res.text())
    return NextResponse.json(
      { ok: false, error: 'That did not send. Email us directly and we will pick it up.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true, mocked: false })
}
