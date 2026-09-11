'use client'

/**
 * Wraps a list so its children reveal in sequence. Holds no animation of
 * its own — it hands each child an increasing delay and lets Reveal do
 * the work, which keeps one motion implementation in the app.
 */
import { Children, isValidElement, cloneElement } from 'react'
import type { ReactElement } from 'react'

export default function Stagger({
  children,
  step = 0.06,
  as = 'div',
  className = '',
}: {
  children: React.ReactNode
  step?: number
  as?: 'div' | 'ul'
  className?: string
}) {
  const Tag = as
  return (
    <Tag className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child
        return cloneElement(child as ReactElement<{ delay?: number }>, {
          delay: i * step,
        })
      })}
    </Tag>
  )
}
