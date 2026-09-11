'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * The single reveal primitive: fade and a short rise as the element
 * enters the viewport, driven by IntersectionObserver and a CSS
 * transition.
 *
 * This started on the motion library. LazyMotion + domAnimation still
 * landed a 41 kB gzip chunk on the route, which alone exceeded the
 * first-load budget, so the same two properties are animated directly.
 *
 * The server renders the resting state, so the content is present and
 * visible with JavaScript disabled. The hidden state is applied in a
 * layout effect, which runs before the browser paints, so there is no
 * flash of content that then disappears.
 *
 * prefers-reduced-motion skips the whole mechanism: no transform, no
 * opacity animation, no transition.
 */

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type Phase = 'resting' | 'hidden' | 'shown'

export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('resting')

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setPhase('hidden')
  }, [])

  useEffect(() => {
    if (phase !== 'hidden') return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase('shown')
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -64px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [phase])

  const Tag = as as 'div'
  const style =
    phase === 'hidden'
      ? { opacity: 0, transform: 'translateY(12px)' }
      : phase === 'shown'
        ? {
            opacity: 1,
            transform: 'none',
            transition: `opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
          }
        : undefined

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}
