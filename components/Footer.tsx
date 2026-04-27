'use client'

const COLS = [
  { heading: 'Services', links: ['Lead automation', 'CRM sync', 'Scheduling', 'Email sequences', 'Integrations'] },
  { heading: 'Company', links: ['About', 'How it works', 'Results', 'Blog'] },
  { heading: 'Contact', links: ['Book a call', 'hello@joaautomations.com'] },
]

export default function Footer() {
  return (
    <footer style={{ background: '#061B31', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '56px 40px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, background: '#533AFD', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 14 }}>J</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15, color: '#fff', lineHeight: 1 }}>JOA</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>Automations</div>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: 240 }}>
              AI workflow automation for small and mid-size businesses. Done-for-you, live in days, maintained for you.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.heading}>
              <div style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14,
              }}>
                {col.heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <a key={l} href="#" onClick={e => e.preventDefault()} style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none', transition: 'color 150ms',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >{l}</a>
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
              <a key={l} href="#" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
