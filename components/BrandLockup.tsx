'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/** Outer ring (halo); image inset so the fill reads as an anchor on dark backgrounds. */
const LOGO_OUTER_PX = 48
const LOGO_IMAGE_PX = 44

const logoMarkHalo: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: LOGO_OUTER_PX,
  height: LOGO_OUTER_PX,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.08)',
  boxShadow:
    '0 0 0 1px rgba(255,255,255,0.16), 0 2px 14px rgba(0,0,0,0.28), 0 0 28px rgba(110,161,234,0.18)',
}

const wordmarkStyle = (subColor: string): CSSProperties => ({
  fontFamily: "'Plus Jakarta Sans',sans-serif",
  fontWeight: 600,
  fontSize: 17,
  color: subColor,
  lineHeight: 1,
  letterSpacing: '-0.01em',
  alignSelf: 'center',
})

type BrandLockupProps = {
  href?: string
  onNavigate?: () => void
  /** Footer uses slightly muted secondary line; nav uses default. */
  variant?: 'nav' | 'footer'
}

export default function BrandLockup({ href, onNavigate, variant = 'nav' }: BrandLockupProps) {
  const subColor = variant === 'footer' ? 'rgba(255,255,255,0.72)' : '#fff'

  const inner = (
    <>
      <span style={logoMarkHalo}>
        <Image
          src="/logo.png"
          alt=""
          width={LOGO_IMAGE_PX}
          height={LOGO_IMAGE_PX}
          style={{ borderRadius: 999, display: 'block' }}
        />
      </span>
      <span style={wordmarkStyle(subColor)}>Automations</span>
    </>
  )

  const flex = {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 10,
    flexShrink: 0 as const,
    textDecoration: 'none' as const,
  }

  if (href) {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        style={{ ...flex }}
        aria-label="JOA Automations home"
      >
        {inner}
      </Link>
    )
  }

  return (
    <div style={flex} aria-label="JOA Automations">
      {inner}
    </div>
  )
}
