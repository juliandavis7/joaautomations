'use client'

import { useEffect, useRef, useState } from 'react'
import { nav, site } from '@/content/site'

/**
 * Wordmark left, two links right. No CTA, no drawer, no phone.
 * Hides on scroll down, comes back on scroll up.
 */
export default function NavBar() {
  const [hidden, setHidden] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > lastY.current
      setHidden(goingDown && y > 120)
      setOverHero(y < window.innerHeight - 120)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="nav"
      data-hidden={hidden}
      data-over-hero={overHero}
    >
      <a className="mono" href="#top">
        {site.wordmark}
      </a>
      <nav aria-label="Primary">
        <ul className="m-0 flex list-none gap-6 p-0 md:gap-10">
          {nav.map((item) => (
            <li key={item.href}>
              <a className="mono" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
