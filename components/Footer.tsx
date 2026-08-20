'use client'

import { useEffect, useRef } from 'react'
import { site } from '@/content/site'
import { openContactModal } from './ContactModal'

/**
 * The last thing on the page, and it is supposed to land: the wordmark set
 * as large as the column allows, sliding up from its own baseline as the
 * footer enters view. Two pills above it, a quiet legal row below.
 *
 * No footer video and no Terms link — both locked in docs/migration-plan.md.
 */
export default function Footer() {
  const wordmark = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = wordmark.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <footer className="shell footer">
      <div className="max-w-ct mx-auto">
        <div className="footer__pills">
          {/* The address is deliberately not published here — every inbound
              goes through the form (fill-ins Q&A, 2026-08-20). */}
          <button className="pill" type="button" onClick={openContactModal}>
            Start a project
            <span className="arrow ml-2" aria-hidden="true">
              &#8599;
            </span>
          </button>
        </div>

        <p className="footer__wordmark" ref={wordmark}>
          <span>{site.wordmark}</span>
        </p>

        <p className="footer__legal">
          <span>&copy; {new Date().getFullYear()} JOA</span>
          <a href="/privacy-policy">Privacy</a>
        </p>
      </div>
    </footer>
  )
}
