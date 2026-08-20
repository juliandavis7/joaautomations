'use client'

import { useEffect, useRef, useState } from 'react'
import { nav, site } from '@/content/site'

/**
 * Wordmark left, two links right. No CTA, no drawer, no phone.
 *
 * The links sit in a frosted cluster rather than naked on the page: the
 * inset highlights in globals.css are what make it read as a physical
 * object catching light. Over the dark hero the same object turns to dark
 * glass, which is deterministic — unlike mix-blend-mode, we can contrast
 * check both states.
 *
 * Hides on scroll down, comes back on scroll up, on an accumulator rather
 * than raw delta so a trackpad jitter cannot flicker it.
 */
const HIDE_ACCUM = 36
const SHOW_ACCUM = 24

export default function NavBar({ overHero = false }: { overHero?: boolean }) {
  const [hidden, setHidden] = useState(false)
  const [isOverHero, setIsOverHero] = useState(overHero)
  const lastY = useRef(0)
  const accum = useRef(0)

  useEffect(() => {
    let scheduled = false

    const tick = () => {
      scheduled = false
      const y = window.scrollY
      const dy = y - lastY.current

      if (dy !== 0) {
        if (dy > 0 !== accum.current > 0) accum.current = 0
        accum.current += dy
      }

      if (y <= 80) {
        setHidden(false)
        accum.current = 0
      } else if (accum.current > HIDE_ACCUM) {
        setHidden(true)
      } else if (accum.current < -SHOW_ACCUM) {
        setHidden(false)
      }

      setIsOverHero(overHero && y < window.innerHeight - 120)
      lastY.current = y
    }

    const onScroll = () => {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [overHero])

  return (
    <header className="nav" data-hidden={hidden} data-over-hero={isOverHero}>
      <a className="nav__wordmark" href="#top">
        {site.wordmark}
      </a>
      <nav aria-label="Primary">
        <ul className="nav__cluster">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
