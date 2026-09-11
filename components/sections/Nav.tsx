'use client'

import { useEffect, useRef, useState } from 'react'
import BrandMark from '@/components/ui/BrandMark'
import { nav as navCopy, site } from '@/lib/copy'

/**
 * Portal's live homepage nav: a transparent full-bleed bar, not a
 * floating capsule. Brand lockup left, text pills right, no CTA —
 * the hero already carries the action.
 *
 * Desktop matches useportal.net at 1440: 80px tall, 12px / 60px
 * padding, items aligned to the bottom edge. Links are Inter 400 at
 * the body step, Paper White at 75%, and pick up Portal's frosted
 * selected pill on hover (Ink Black at 10% with an 8px backdrop blur).
 *
 * Below md the pills sit behind a toggle. Open is a full-screen
 * takeover on the dusk sky — same lockup and close in the top bar,
 * links in a column. The hero does not reflow.
 */
const pillClass =
  'inline-flex h-36 items-center rounded-full px-16 font-inter text-body leading-body tracking-body font-normal text-paper-white/75 no-underline transition duration-200 hover:bg-ink-black/10 hover:text-paper-white hover:backdrop-blur-sm'

const menuLinkClass =
  'font-perfectly-nineties-regular text-heading leading-heading font-normal text-paper-white no-underline'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const close = () => {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  return (
    <div className="absolute inset-x-0 top-0 z-20">
      <nav
        aria-label="Main"
        className="flex h-80 items-end justify-between px-24 pt-12 md:px-60"
      >
        <a href="#top" className="inline-flex h-45 items-center no-underline">
          <BrandMark label={site.lockup} tone="paper" />
        </a>

        <div className="hidden items-center gap-4 md:flex">
          {navCopy.links.map((link) => (
            <a key={link.href} href={link.href} className={pillClass}>
              {link.label}
            </a>
          ))}
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={navCopy.menuLabel}
          onClick={() => setOpen(true)}
          className="flex h-36 w-36 flex-none items-center justify-center rounded-full text-paper-white md:hidden"
        >
          <svg
            viewBox="0 0 18 18"
            width={16}
            height={16}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="h-16 w-16"
            aria-hidden="true"
          >
            <path d="M3 5.5h12M3 9h12M3 12.5h12" />
          </svg>
        </button>
      </nav>

      {open ? (
        <div
          id="nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label={navCopy.menuLabel}
          className="fixed inset-0 z-30 flex flex-col md:hidden"
          style={{ background: 'var(--gradient-dusk-gradient)' }}
        >
          <div className="flex h-80 items-end justify-between px-24 pt-12">
            <a
              href="#top"
              className="inline-flex h-45 items-center no-underline"
              onClick={() => setOpen(false)}
            >
              <BrandMark label={site.lockup} tone="paper" />
            </a>
            <button
              ref={closeRef}
              type="button"
              aria-label={navCopy.closeMenuLabel}
              onClick={() => {
                setOpen(false)
                toggleRef.current?.focus()
              }}
              className="flex h-36 w-36 flex-none items-center justify-center rounded-full text-paper-white"
            >
              <svg
                viewBox="0 0 18 18"
                width={16}
                height={16}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="h-16 w-16"
                aria-hidden="true"
              >
                <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-24 px-24 pb-80">
            {navCopy.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={menuLinkClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  )
}
