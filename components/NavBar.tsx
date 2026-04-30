'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import BrandLockup from '@/components/BrandLockup'

const LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'How it works', href: '/#process' },
  { label: 'Results', href: '/#results' },
]

export default function NavBar() {
  /** True when the hero fully paints the 64px band under the fixed nav (no light section peeking through). */
  /** Start false → solid nav until geometry is measured (avoids white-on-gray when scroll restores mid-page). */
  const [heroCoversNavStripe, setHeroCoversNavStripe] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('site-hero')
    if (!hero) return

    const updateHeroUnderNav = () => {
      const r = hero.getBoundingClientRect()
      const overlap = Math.min(r.bottom, 64) - Math.max(r.top, 0)
      setHeroCoversNavStripe(overlap >= 63.5)
    }

    updateHeroUnderNav()
    window.addEventListener('scroll', updateHeroUnderNav, { passive: true })
    window.addEventListener('resize', updateHeroUnderNav)
    return () => {
      window.removeEventListener('scroll', updateHeroUnderNav)
      window.removeEventListener('resize', updateHeroUnderNav)
    }
  }, [])

  // Lock body scroll while mobile panel is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [mobileOpen])

  const solidBar = mobileOpen || !heroCoversNavStripe
  const navBg = solidBar ? 'rgba(16,45,78,0.94)' : 'rgba(16,45,78,0.72)'
  const navBorder = solidBar ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.06)'
  const navBlur = 'blur(14px)'

  return (
    <nav
      className="px-5 md:px-10"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        background: navBg,
        backdropFilter: navBlur,
        WebkitBackdropFilter: navBlur,
        borderBottom: navBorder,
        transition: 'all 400ms cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <BrandLockup href="/" onNavigate={() => setMobileOpen(false)} />

      {/* Desktop links */}
      <div className="hidden md:flex" style={{ gap: 32, alignItems: 'center' }}>
        {LINKS.map(({ label, href }) => (
          <a key={label} href={href}
            style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500,
              color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 150ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >{label}</a>
        ))}
      </div>

      {/* Desktop CTA */}
      <a
        href="/#booking"
        className="hidden md:inline-block"
        style={{
          background: '#6EA1EA', color: '#fff',
          fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
          padding: '9px 20px', borderRadius: 4, border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(110,161,234,0.35)',
          transition: 'all 150ms', textDecoration: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#4C87DB'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#6EA1EA'; e.currentTarget.style.transform = 'translateY(0)' }}
      >Book a free call</a>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(o => !o)}
        className="flex items-center justify-center md:hidden"
        style={{
          background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer',
          padding: 8,
          marginRight: -8,
        }}
      >
        {mobileOpen ? <X width={24} height={24} strokeWidth={2} /> : <Menu width={24} height={24} strokeWidth={2} />}
      </button>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div
          className="flex flex-col gap-1 md:hidden"
          style={{
            position: 'absolute', top: 64, left: 0, right: 0,
            background: 'rgba(16,45,78,0.96)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 20px 24px',
          }}
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 500,
                color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
                padding: '14px 4px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="/#booking"
            onClick={() => setMobileOpen(false)}
            style={{
              marginTop: 16,
              background: '#6EA1EA', color: '#fff',
              fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 600,
              padding: '14px 20px', borderRadius: 4,
              boxShadow: '0 4px 16px rgba(110,161,234,0.35)',
              textDecoration: 'none', textAlign: 'center',
            }}
          >
            Book a free call
          </a>
        </div>
      )}
    </nav>
  )
}
