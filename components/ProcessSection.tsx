'use client'

const STEPS = [
  { n: '01', title: 'Discovery call', body: '30-minute call to map your current tools, biggest time drains, and automation opportunities. Free, no pressure.' },
  { n: '02', title: 'Custom workflow design', body: 'We design your automation blueprint — triggers, actions, integrations — and walk you through it before we build anything.' },
  { n: '03', title: 'Build & test', body: 'We build in your existing tools. Every workflow is tested end-to-end before going anywhere near live data.' },
  { n: '04', title: 'Go live in days', body: 'Most workflows go live within 5–7 business days. We monitor the first week to catch anything unexpected.' },
  { n: '05', title: 'Ongoing support', body: 'Monthly check-ins, updates when your tools change, and a direct line to our team — not a ticket queue.' },
]

export default function ProcessSection() {
  return (
    <section id="process" style={{ background: '#061B31', padding: '96px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle line texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px)',
        opacity: 0.5,
      }} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9b8ffe', marginBottom: 12,
          }}>
            How it works
          </div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 38, fontWeight: 800,
            color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            Live in under a week
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 28, position: 'relative' }}>
              {/* Line connector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 48, flexShrink: 0 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(83,58,253,0.2)', border: '1px solid rgba(83,58,253,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 500, color: '#9b8ffe' }}>{s.n}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 1, flex: 1, minHeight: 32, background: 'rgba(83,58,253,0.25)', margin: '4px 0' }} />
                )}
              </div>
              <div style={{ paddingBottom: 32, flex: 1 }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="#booking" style={{
            display: 'inline-block',
            background: '#533AFD', color: '#fff',
            fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 600,
            padding: '13px 28px', borderRadius: 4, border: 'none', cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(83,58,253,0.4)', transition: 'all 200ms',
            textDecoration: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3a25e8'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#533AFD'; e.currentTarget.style.transform = 'translateY(0)' }}
          >Start with a free call</a>
        </div>
      </div>
    </section>
  )
}
