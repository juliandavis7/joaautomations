const STATS = [
  { value: '12h', label: 'Saved per client per week', delta: 'on average' },
  { value: '5 days', label: 'Average time to go live', delta: 'from kickoff call' },
  { value: '98%', label: 'Lead follow-up rate', delta: 'vs ~40% manual' },
  { value: '50+', label: 'Workflows built & maintained', delta: 'across SMB clients' },
]

const TESTIMONIALS = [
  {
    quote:
      'Before this was in place, every signed lease meant 20 minutes of busywork. Updating the CRM, refreshing the installer sheet, sending the welcome packet and payment links, all by hand. Now the second a lease gets signed, all of that fires off on its own. We get hours back every week.',
    name: 'Dan Rowan',
    title: 'Owner',
    company: 'Best Interlocks of California',
    imageSrc: '/logos/best-interlocks.png',
  },
  {
    quote:
      "I was missing calls every summer weekend. Tourists would hit voicemail and rent from the shop down the boardwalk. Now the AI receptionist answers every call and books rentals straight into my calendar. Weekend revenue is up and I'm not the bottleneck anymore.",
    name: 'Karl Watson',
    title: 'Owner',
    company: 'Humble Bike Rentals',
    imageSrc: '/logos/humble-bike-rentals.png',
  },
  {
    quote:
      "Our past guests are the most valuable people in our database, but we never had the bandwidth to stay in touch the right way. Now they get messages that actually reference their last stay, the property, even the dates they were there. We've rebooked guests who hadn't traveled with us in over two years.",
    name: 'Jeffrey Kippax',
    title: 'VP of Sales & Ops',
    company: 'Affluent Vacays',
    imageSrc: '/logos/affluent-vacays.png',
  },
]

export default function StatsSection() {
  return (
    <section id="results" className="px-5 py-16 sm:px-8 md:px-10 md:py-24" style={{ background: '#fff', borderTop: '1px solid #E8ECF0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4C87DB', marginBottom: 12,
          }}>
            Results
          </div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(28px, 6vw, 38px)', fontWeight: 800,
            color: '#0D1F35', lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            The numbers speak for themselves
          </h2>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: '#F4F6F8', borderRadius: 10, padding: '28px 24px',
              border: '1px solid #E8ECF0', textAlign: 'center',
            }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(32px, 8vw, 44px)', fontWeight: 800, color: '#0D1F35', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: '#0D1F35', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#4C87DB', fontWeight: 500 }}>{s.delta}</div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 20,
          marginTop: 48,
          marginBottom: 0,
        }}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name + t.company}
              style={{
                background: '#F2F9FC',
                border: '1px solid #D7EAF3',
                borderRadius: 14,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <p style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 15,
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#0D1F35',
                lineHeight: 1.55,
                margin: '0 0 24px',
                flex: 1,
                textAlign: 'center',
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    flexShrink: 0,
                    border: '1px solid #D7EAF3',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 6,
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={t.imageSrc}
                    alt={`${t.company} logo`}
                    width={120}
                    height={120}
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  />
                </div>
                <div style={{ textAlign: 'left', minWidth: 0 }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#0D1F35' }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#8896A8', lineHeight: 1.4 }}>
                    {t.title}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
