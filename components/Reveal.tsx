'use client'

import { useEffect, useRef } from 'react'

/**
 * CSS transition + IntersectionObserver. This is the whole motion stack —
 * no scroll library (see docs/design-principles.md §5).
 *
 * The hidden state lives inside a `prefers-reduced-motion: no-preference`
 * block in globals.css, so a reduced-motion visitor never has content
 * hidden from them even for a frame.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  /** ms. Use small offsets to stagger siblings; never enough to feel slow. */
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ ['--reveal-delay']: `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
