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
    '0 0 0 1px rgba(255,255,255,0.12), 0 1px 8px rgba(0,0,0,0.18), 0 0 20px rgba(110,161,234,0.10)',
}

type BrandLockupProps = {
  href?: string
  onNavigate?: () => void
}

export default function BrandLockup({ href, onNavigate }: BrandLockupProps) {
  const inner = (
    <span style={logoMarkHalo}>
      <Image
        src="/logo.png"
        alt=""
        width={LOGO_IMAGE_PX}
        height={LOGO_IMAGE_PX}
        style={{ borderRadius: 999, display: 'block' }}
      />
    </span>
  )

  const flexClass = 'flex shrink-0 items-center no-underline'

  if (href) {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        className={flexClass}
        aria-label="JOA Automations home"
      >
        {inner}
      </Link>
    )
  }

  return (
    <div className={flexClass} aria-label="JOA Automations">
      {inner}
    </div>
  )
}
