'use client'

import { useEffect, useState } from 'react'

/**
 * Atmosphere, not a headline. Full-bleed 100svh, pointer-events: none, no
 * text at all — the pitch and the page's one <h1> sit below it.
 *
 * Three things make this read as a designed opening rather than a picture
 * with a page under it:
 *
 *  1. a curtain raise — the still dissolves up out of the dark ground
 *     instead of snapping in (skipped on a repeat navigation, never run
 *     under reduced motion),
 *  2. a quiet scroll cue that leaves the moment you scroll,
 *  3. the band below, which dissolves the dark hero into the paper body so
 *     the two grounds do not meet on a hard line.
 *
 * The still is applied as the section's CSS background, which is also the
 * fallback a Task B video degrades to when autoplay is blocked.
 */
export default function Hero() {
  const [raised, setRaised] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRaised(true))
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="hero-wrap">
      <div className={`hero${raised ? ' is-raised' : ''}`} aria-hidden="true">
        <div className="hero-cue" data-gone={scrolled}>
          <span>SCROLL</span>
          <span className="hero-cue__rule" />
        </div>
      </div>
      <div className="hero-band" aria-hidden="true" />
    </div>
  )
}
