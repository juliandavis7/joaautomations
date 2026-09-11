'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/motion/Reveal'
import type { PortfolioEntry } from '@/lib/portfolio'
import { work as workCopy } from '@/lib/copy'

/**
 * Portfolio rows, closed by default. The whole card is the trigger.
 *
 * Open behaviour, per the detail board: a Paper White panel at the card
 * radius on an Ink Black veil, Escape closes, focus is trapped while
 * open and returns to the row that opened it.
 *
 * Photos live in the open panel only. The closed row is title, meta,
 * and the plus control.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

export default function Work({ entries }: { entries: PortfolioEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const entry = entries.find((e) => e.id === openId) ?? null

  const close = useCallback(() => {
    const id = openId
    setOpenId(null)
    if (id) requestAnimationFrame(() => triggerRefs.current[id]?.focus())
  }, [openId])

  useEffect(() => {
    if (!openId) return

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return

      const root = panelRef.current
      if (!root) return
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null
      )
      if (nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || !root.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openId, close])

  useEffect(() => {
    if (!openId) return
    const root = panelRef.current
    const node = root?.querySelector<HTMLElement>(FOCUSABLE)
    node?.focus()

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [openId])

  return (
    <Section id="work" labelledBy="work-heading" topPadding>
      <Container>
        <div className="mx-auto w-full max-w-feature">
          <Reveal>
            <div className="mb-40 lg:mb-60">
              <h2
                id="work-heading"
                className="m-0 font-perfectly-nineties-regular text-heading leading-heading font-normal text-ink-black"
              >
                {workCopy.heading}
              </h2>
            </div>
          </Reveal>

          <ul className="m-0 flex list-none flex-col gap-20 p-0">
            {entries.map((e, i) => (
              <Reveal as="li" key={e.id} delay={i * 0.06}>
                <button
                  ref={(node) => {
                    triggerRefs.current[e.id] = node
                  }}
                  type="button"
                  onClick={() => setOpenId(e.id)}
                  aria-expanded={openId === e.id}
                  className="group flex w-full cursor-pointer items-center justify-between gap-24 rounded-3xl bg-paper-white p-24 text-left shadow-subtle transition duration-200 sm:p-36"
                >
                  <span className="block min-w-0">
                    <span className="block font-perfectly-nineties-regular text-heading-card leading-heading-card font-normal text-ink-black underline decoration-transparent decoration-1 underline-offset-8 transition duration-200 group-hover:decoration-smoke">
                      {e.title}
                    </span>
                    <span className="mt-8 block font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-smoke">
                      <span className="block sm:inline">{e.industry}</span>
                      <span className="hidden sm:inline"> &middot; </span>
                      <span className="block sm:inline">{e.location}</span>
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="flex h-45 w-45 flex-none items-center justify-center rounded-full bg-ash-mist text-ink-black transition duration-200 group-hover:bg-signal-blue group-hover:text-paper-white"
                  >
                    <svg
                      viewBox="0 0 18 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="h-16 w-16"
                    >
                      <path d="M9 3.5v11M3.5 9h11" />
                    </svg>
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>

      {entry ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-24"
          role="presentation"
        >
          <div
            className="fixed inset-0"
            style={{ background: 'var(--veil-ink)' }}
            onClick={close}
            aria-hidden="true"
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`panel-${entry.id}`}
            className="relative z-10 w-full max-w-reading rounded-t-3xl bg-paper-white p-24 shadow-subtle sm:rounded-3xl sm:p-40"
          >
            <div className="flex items-start justify-between gap-24 sm:gap-40">
              <div>
                <h3
                  id={`panel-${entry.id}`}
                  className="m-0 mb-16 font-perfectly-nineties-regular text-heading leading-heading font-normal text-ink-black"
                >
                  {entry.panelTitle}
                </h3>
                <p className="m-0 font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-smoke">
                  {entry.industry} &middot; {entry.location}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={workCopy.closeLabel}
                className="flex h-45 w-45 flex-none items-center justify-center rounded-full bg-ash-mist text-ink-black transition-opacity duration-200 hover:opacity-60"
              >
                <svg
                  viewBox="0 0 18 18"
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

            <div className="relative mt-24 aspect-[16/10] w-full overflow-hidden rounded-3xl-2 shadow-subtle sm:mt-36">
              <Image
                src={entry.card.src}
                alt={entry.shot.alt}
                fill
                sizes="(min-width: 640px) 640px, 100vw"
                className="object-cover object-top"
              />
            </div>

            {entry.body ? (
              <p className="mt-24 font-inter text-body leading-body tracking-body text-graphite sm:mt-36">
                {entry.body}
              </p>
            ) : null}

            <dl className="mt-24 flex flex-col gap-20 border-t border-ash-mist pt-24 sm:mt-36 sm:flex-row sm:gap-45">
              {(
                [
                  [workCopy.factLabels.industry, entry.industry],
                  [workCopy.factLabels.location, entry.location],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <dt className="m-0 mb-6 font-inter text-caption leading-caption tracking-caption font-medium text-smoke">
                    {label}
                  </dt>
                  <dd className="m-0 font-inter text-body-sm leading-body-sm tracking-body-sm font-medium text-ink-black">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {entry.href ? (
              <div className="mt-36">
                <Button href={entry.href} external className="w-full sm:w-auto">
                  {workCopy.visitLabel}
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-16 w-16 flex-none"
                    aria-hidden="true"
                  >
                    <path d="M6 10l5-5M6.5 5H11v4.5" />
                  </svg>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </Section>
  )
}
