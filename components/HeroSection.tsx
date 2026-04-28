'use client'

import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 80)
  }, [])

  const animStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#061B31] px-5 pt-[120px] pb-20 sm:px-10"
    >
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(83,58,253,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.6,
        }}
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2"
        style={{
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(83,58,253,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Copy block (centered) */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center lg:min-h-[calc(100vh-200px)]"
      >
        <div className="max-w-6xl">
          {/* Headline */}
          <h1
            style={{
              ...animStyle(80),
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 'clamp(2rem, 5vw, 58px)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 24,
            }}
          >
            <span style={{ display: 'block', color: '#fff' }}>We automate the busywork.</span>
            <span style={{ display: 'block', color: '#533AFD', marginTop: '0.04em' }}>You focus on growth.</span>
          </h1>

          {/* Subhead */}
          <p
            style={{
              ...animStyle(160),
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.65,
              maxWidth: 560,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: 40,
            }}
          >
            Custom AI workflows for small businesses: built, tested, and maintained by our team.
            Live in under a week.
          </p>

          {/* CTAs */}
          <div
            style={{
              ...animStyle(240),
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#booking"
              style={{
                display: 'inline-block',
                background: '#533AFD',
                color: '#fff',
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                fontWeight: 600,
                padding: '13px 28px',
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(83,58,253,0.40)',
                transition: 'all 200ms',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3a25e8'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#533AFD'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Book a free strategy call
            </a>
            <a
              href="#process"
              style={{
                display: 'inline-block',
                background: 'transparent',
                color: '#fff',
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                fontWeight: 500,
                padding: '13px 28px',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 200ms',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              }}
            >
              See how it works →
            </a>
          </div>
        </div>
      </div>

      {/* Trust line — in-flow on mobile (under CTAs), absolute ~¾ viewport on lg+ */}
      <div className="relative z-10 mx-auto mt-12 w-full max-w-4xl px-4 lg:absolute lg:left-1/2 lg:top-[75vh] lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <div
          style={{
            ...animStyle(320),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          {['50+ workflows built', 'Live in 5–7 days', 'ROI in the first 30 days'].map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#533AFD', fontSize: 14 }}>✓</span>
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 400,
                }}
              >
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
