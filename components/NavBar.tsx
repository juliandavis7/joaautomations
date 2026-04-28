'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#process' },
  { label: 'Results', href: '#results' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
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

  const navBg = scrolled || mobileOpen ? 'rgba(6,27,49,0.92)' : 'transparent'
  const navBorder = scrolled || mobileOpen ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent'
  const navBlur = scrolled || mobileOpen ? 'blur(14px)' : 'none'

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
      {/* Logo */}
      <Link
        href="/"
        onClick={() => setMobileOpen(false)}
        style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
      >
        <div style={{
          width: 34, height: 34, background: '#533AFD', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15 }}>J</span>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: 34,
        }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em' }}>JOA</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', lineHeight: 1.1, marginTop: 1 }}>Automations</div>
        </div>
      </Link>

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
        href="#booking"
        className="hidden md:inline-block"
        style={{
          background: '#533AFD', color: '#fff',
          fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
          padding: '9px 20px', borderRadius: 4, border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(83,58,253,0.35)',
          transition: 'all 150ms', textDecoration: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#3a25e8'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#533AFD'; e.currentTarget.style.transform = 'translateY(0)' }}
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
            background: 'rgba(6,27,49,0.96)',
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
            href="#booking"
            onClick={() => setMobileOpen(false)}
            style={{
              marginTop: 16,
              background: '#533AFD', color: '#fff',
              fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 600,
              padding: '14px 20px', borderRadius: 4,
              boxShadow: '0 4px 16px rgba(83,58,253,0.35)',
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
