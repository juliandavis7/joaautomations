'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Results', href: '#results' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 64,
      background: scrolled ? 'rgba(6,27,49,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      transition: 'all 400ms cubic-bezier(0.16,1,0.3,1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 34, height: 34, background: '#533AFD', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15 }}>J</span>
        </div>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1, letterSpacing: '-0.01em' }}>JOA</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>Automations</div>
        </div>
      </Link>

      {/* Links */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
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

      {/* CTA */}
      <a href="#booking" style={{
        display: 'inline-block',
        background: '#533AFD', color: '#fff',
        fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
        padding: '9px 20px', borderRadius: 4, border: 'none', cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(83,58,253,0.35)',
        transition: 'all 150ms', textDecoration: 'none',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = '#3a25e8'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#533AFD'; e.currentTarget.style.transform = 'translateY(0)' }}
      >Book a free call</a>
    </nav>
  )
}
