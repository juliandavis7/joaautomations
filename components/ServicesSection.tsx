'use client'

import { useRef, useState } from 'react'
import { services } from '@/content/site'
import Eyebrow from './Eyebrow'
import { isMarker } from './FillIn'

type Peek = { index: number; x: number; y: number; tilt: number } | null

/**
 * Three plain words at display size. No cards, no icons, no grid.
 *
 * This is the page's one playful moment, and it is designed twice rather
 * than once with a fallback (docs/design-principles.md §6):
 *
 *  - pointer: fine  — the still follows the cursor while a word is hovered
 *  - pointer: coarse — the still springs in near the tapped word with a
 *    slight random tilt, and the prompt copy itself reads "tap me"
 *
 * Deliberately not the reference's wipe-fill/attr(data-label) trick: ours
 * reveals the work, theirs recolors the word.
 */
export default function ServicesSection() {
  const [peek, setPeek] = useState<Peek>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const place = (index: number, clientX: number, clientY: number, tilt: number) => {
    const box = listRef.current?.getBoundingClientRect()
    if (!box) return
    setPeek({ index, x: clientX - box.left, y: clientY - box.top, tilt })
  }

  return (
    <section id="services" className="container section" aria-label="Services">
      <div className="max-w-ct mx-auto">
        <Eyebrow>Services</Eyebrow>

        <div className="services">
          <ul className="services__list" ref={listRef}>
            {services.map((service, index) => (
              <li key={service.name}>
                <button
                  type="button"
                  className="services__word display"
                  aria-expanded={peek?.index === index}
                  onPointerMove={(e) => {
                    if (e.pointerType !== 'mouse') return
                    place(index, e.clientX, e.clientY, 0)
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType !== 'mouse') return
                    setPeek(null)
                  }}
                  onClick={(e) => {
                    if (peek?.index === index) {
                      setPeek(null)
                      return
                    }
                    const r = e.currentTarget.getBoundingClientRect()
                    place(index, r.left + r.width * 0.5, r.top + r.height, (index % 2 ? 1 : -1) * (3 + index))
                  }}
                >
                  {service.name}
                </button>
              </li>
            ))}
          </ul>

          {peek !== null ? (
            <div
              className="services__peek"
              style={{
                left: peek.x,
                top: peek.y,
                ['--tilt' as string]: `${peek.tilt}deg`,
              }}
              aria-hidden="true"
            >
              {isMarker(services[peek.index].image) ? (
                <span className="services__peek-marker mono">{services[peek.index].image}</span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={services[peek.index].image} alt="" width={360} height={270} />
              )}
            </div>
          ) : null}

          <p className="services__hint mono" aria-hidden="true">
            <span className="services__hint-hover">hover me</span>
          </p>
        </div>
      </div>
    </section>
  )
}
