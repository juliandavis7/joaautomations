const STATS = [
  { value: '12h', label: 'Saved per client per week', delta: 'on average' },
  { value: '5 days', label: 'Average time to go live', delta: 'from kickoff call' },
  { value: '98%', label: 'Lead follow-up rate', delta: 'vs ~40% manual' },
  { value: '50+', label: 'Workflows built & maintained', delta: 'across SMB clients' },
]

export default function StatsSection() {
  return (
    <section id="results" style={{ background: '#fff', padding: '96px 40px', borderTop: '1px solid #E8ECF0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#533AFD', marginBottom: 12,
          }}>
            Results
          </div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 38, fontWeight: 800,
            color: '#0D1F35', lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            The numbers speak for themselves
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 64 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: '#F4F6F8', borderRadius: 10, padding: '28px 24px',
              border: '1px solid #E8ECF0', textAlign: 'center',
            }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 44, fontWeight: 800, color: '#0D1F35', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: '#0D1F35', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#533AFD', fontWeight: 500 }}>{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{
          background: '#f3f2ff', border: '1px solid #e8e5ff', borderRadius: 12,
          padding: '36px 40px', maxWidth: 700, margin: '0 auto', textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 600,
            color: '#0D1F35', lineHeight: 1.5, marginBottom: 20, fontStyle: 'italic',
          }}>
            &ldquo;We went from manually entering 80+ leads a week to zero. JOA had the whole thing running in 4 days.&rdquo;
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: '#533AFD',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700 }}>M</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: '#0D1F35' }}>Maria T.</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#8896A8' }}>Owner, Coastal Realty Group</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
