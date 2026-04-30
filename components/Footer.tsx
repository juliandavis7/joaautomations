'use client'

import BrandLockup from '@/components/BrandLockup'

const SERVICE_NAMES = [
  'AI Receptionist',
  'Calendar & Scheduling',
  'CRM Automation',
  'Email & SMS Sequences',
  'Lead Generation',
  'Custom Integrations',
] as const

const FOOTER_COLS: {
  heading: string
  links: { label: string; href: string }[]
}[] = [
  {
    heading: 'Services',
    links: SERVICE_NAMES.map((label) => ({ label, href: '#services' })),
  },
  {
    heading: 'Navigate',
    links: [
      { label: 'Services', href: '#services' },
      { label: 'How it works', href: '#process' },
      { label: 'Results', href: '#results' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Book a call', href: '#booking' },
      { label: 'joaautomations@gmail.com', href: 'mailto:joaautomations@gmail.com' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="px-5 pt-14 pb-8 sm:px-8 md:px-10" style={{ background: '#102D4E', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div style={{ marginBottom: 16 }}>
              <BrandLockup variant="footer" />
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: 240 }}>
              Custom AI workflows for small businesses, built, tested, and maintained by our team. Live in under a week.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.heading}>
              <div style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14,
              }}>
                {col.heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none', transition: 'color 150ms',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            © 2026 JOA Automations. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms'].map(l => (
              <a
                key={l}
                href="#"
                onClick={e => e.preventDefault()}
                style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', cursor: 'pointer' }}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
