'use client'

import { useState } from 'react'
import { budgetRanges } from '@/content/site'
import Eyebrow from './Eyebrow'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Replaces both GoHighLevel iframes. Name, email, what you're building,
 * budget range. Validation and rate limiting are enforced server side in
 * app/api/contact/route.ts; the honeypot lives here.
 *
 * The same fields serve the in-page section and the modal, so there is one
 * form to maintain and one set of states to get right.
 */
export function ContactFields({ autoFocus = false }: { autoFocus?: boolean }) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('sending')
    setMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !body.ok) {
        setStatus('error')
        setMessage(body.error ?? 'That did not send. Try again, or email us directly.')
        return
      }
      setStatus('sent')
      setMessage('Got it. We read every one of these and will write back.')
      form.reset()
    } catch {
      setStatus('error')
      setMessage('That did not send. Try again, or email us directly.')
    }
  }

  const id = (name: string) => (autoFocus ? `modal-${name}` : name)

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__pair">
        <div className="form__row">
          <label className="mono" htmlFor={id('name')}>
            Name
          </label>
          <input
            id={id('name')}
            name="name"
            type="text"
            required
            autoComplete="name"
            autoFocus={autoFocus}
            placeholder="Your name"
          />
        </div>

        <div className="form__row">
          <label className="mono" htmlFor={id('email')}>
            Email
          </label>
          <input
            id={id('email')}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="form__row">
        <label className="mono" htmlFor={id('project')}>
          What you&rsquo;re building
        </label>
        <textarea
          id={id('project')}
          name="project"
          rows={4}
          required
          placeholder="A sentence or two is plenty."
        />
      </div>

      <div className="form__row form__select">
        <label className="mono" htmlFor={id('budget')}>
          Budget range
        </label>
        <select id={id('budget')} name="budget" required defaultValue="">
          <option value="" disabled>
            Pick one
          </option>
          {budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      {/* honeypot — real people never see or fill this */}
      <div className="form__honeypot" aria-hidden="true">
        <label htmlFor={id('company')}>Company</label>
        <input id={id('company')} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="form__submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending' : 'Send it'}
        <span className="arrow" aria-hidden="true">
          &#8599;
        </span>
      </button>

      <p className="form__status" data-state={status} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="shell section" aria-label="Contact">
      <div className="max-w-ct mx-auto">
        <Eyebrow>Contact</Eyebrow>
        <ContactFields />
      </div>
    </section>
  )
}
