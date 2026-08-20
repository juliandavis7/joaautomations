'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ContactFields } from './ContactForm'

const OPEN_EVENT = 'joa:contact-open'

/**
 * Anything on the page can ask for the modal without prop-drilling a
 * setter through four components.
 */
export function openContactModal() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

/**
 * The contact form on a second surface: a centered card over a dark
 * overlay, opened from the ethos CTA and the footer pill. Same fields, same
 * route, same states as the in-page section.
 *
 * Escape and the overlay both close it, focus is trapped inside while it is
 * open and restored to whatever opened it, the page behind cannot scroll,
 * and the whole thing is `inert` when closed so it is invisible to the
 * keyboard and to a screen reader.
 */
export default function ContactModal() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const returnTo = useRef<HTMLElement | null>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onOpen = () => {
      returnTo.current = document.activeElement as HTMLElement | null
      setOpen(true)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  /* `inert` is set on the element rather than through JSX: React 18 has no
     typed prop for it, and this is the one attribute that has to be right
     for the closed modal to be invisible to the keyboard and to AT. */
  useEffect(() => {
    rootRef.current?.toggleAttribute('inert', !open)
  }, [open])

  useEffect(() => {
    if (!open) {
      returnTo.current?.focus?.()
      return
    }

    document.documentElement.style.overflow = 'hidden'

    /* Move focus in explicitly rather than relying on autoFocus: the card
       animates in, and preventScroll stops the browser scrolling the page
       behind to bring the field into view. */
    const focusTimer = window.setTimeout(() => {
      cardRef.current
        ?.querySelector<HTMLElement>('input:not([tabindex="-1"]), textarea, select')
        ?.focus({ preventScroll: true })
    }, 60)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        return
      }
      if (event.key !== 'Tab') return
      const focusables = cardRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  return (
    <div
      className="modal"
      ref={rootRef}
      data-open={open}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Contact"
    >
      <button className="modal__overlay" type="button" aria-label="Close" onClick={close} />
      <div className="modal__card" ref={cardRef}>
        <button className="modal__close" type="button" onClick={close} aria-label="Close">
          <span />
          <span />
        </button>
        <p className="eyebrow">
          <span className="eyebrow__bracket" aria-hidden="true">
            [
          </span>
          <span className="eyebrow__label">Contact</span>
          <span className="eyebrow__bracket" aria-hidden="true">
            ]
          </span>
          <span className="eyebrow__ornament" aria-hidden="true" />
        </p>
        <p className="modal__headline">Tell us what you&rsquo;re building.</p>
        {open ? <ContactFields autoFocus /> : null}
      </div>
    </div>
  )
}
