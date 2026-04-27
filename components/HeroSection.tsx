'use client'

import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const animStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <section style={{
      background: '#061B31', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '120px 40px 80px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(83,58,253,0.15) 1px, transparent 1px)',
        backgroundSize: '40px 40px', opacity: 0.6,
      }} />
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(83,58,253,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 760, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div style={{
          ...animStyle(0), display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(83,58,253,0.15)', border: '1px solid rgba(83,58,253,0.3)',
          borderRadius: 999, padding: '5px 14px', marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, background: '#533AFD', borderRadius: '50%', display: 'inline-block' }} />
          <span style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9b8ffe',
          }}>
            AI Workflow Automation
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          ...animStyle(80),
          fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 58, fontWeight: 800,
          color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em',
          marginBottom: 24,
        }}>
          We automate the busywork.{' '}
          <span style={{ color: '#533AFD' }}>You focus on growth.</span>
        </h1>

        {/* Subhead */}
        <p style={{
          ...animStyle(160),
          fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 400,
          color: 'rgba(255,255,255,0.65)', lineHeight: 1.65,
          maxWidth: 560, margin: '0 auto 40px',
        }}>
          Custom AI workflows for small businesses — built, tested, and maintained by our team. Live in under a week.
        </p>

        {/* CTAs */}
        <div style={{ ...animStyle(240), display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#booking" style={{
            display: 'inline-block',
            background: '#533AFD', color: '#fff',
            fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 600,
            padding: '13px 28px', borderRadius: 4, border: 'none', cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(83,58,253,0.40)',
            transition: 'all 200ms', textDecoration: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3a25e8'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#533AFD'; e.currentTarget.style.transform = 'translateY(0)' }}
          >Book a free strategy call</a>
          <a href="#process" style={{
            display: 'inline-block',
            background: 'transparent', color: '#fff',
            fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 500,
            padding: '13px 28px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
            transition: 'all 200ms', textDecoration: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
          >See how it works →</a>
        </div>

        {/* Social proof */}
        <div style={{ ...animStyle(320), marginTop: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {['50+ workflows built', 'Live in 5–7 days', 'No long-term contracts'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#533AFD', fontSize: 14 }}>✓</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
