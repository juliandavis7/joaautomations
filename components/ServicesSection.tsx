'use client'

import { useState, type ComponentType, type SVGProps } from 'react'
import { Filter, GitBranch, CalendarDays, Mail, PhoneCall, Plug } from 'lucide-react'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

const SERVICES: { eyebrow: string; title: string; body: string; Icon: IconType }[] = [
  { eyebrow: 'AI Receptionist', title: 'Never miss a call again', body: '24/7 AI voice agent that answers, qualifies, books appointments, and routes urgent calls to your team. Sounds human, works while you sleep.', Icon: PhoneCall },
  { eyebrow: 'Calendar & Scheduling', title: 'Booking that actually books', body: 'Embed your GHL calendar anywhere. Reminders, confirmations, and no-show follow-ups go out automatically.', Icon: CalendarDays },
  { eyebrow: 'CRM Automation', title: 'Your pipeline runs itself', body: 'Auto-create contacts, assign owners, trigger follow-up sequences, and update deal stages, all without manual data entry.', Icon: GitBranch },
  { eyebrow: 'Email & SMS Sequences', title: 'Follow up while you sleep', body: 'Multi-step nurture sequences triggered by behavior like a new lead, a no-show, or a closed deal, delivered at the right time.', Icon: Mail },
  { eyebrow: 'Lead Generation', title: 'Capture & qualify leads automatically', body: 'Every form submission, ad click, or chatbot interaction flows straight into your CRM, enriched, tagged, and ready for follow-up.', Icon: Filter },
  { eyebrow: 'Custom Integrations', title: 'Connect any stack you use', body: 'GHL, HubSpot, Zapier, Make, Airtable, Google Sheets, Slack: we wire it all together and maintain it for you.', Icon: Plug },
]

function ServiceCard({ eyebrow, title, body, Icon }: { eyebrow: string; title: string; body: string; Icon: IconType }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', border: '1px solid #E8ECF0', borderRadius: 10, padding: '28px 24px',
        boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.05)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 220ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div style={{
        width: 40, height: 40, background: hovered ? '#533AFD' : '#f3f2ff',
        borderRadius: 10, marginBottom: 16, transition: 'background 220ms',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon
          width={20}
          height={20}
          strokeWidth={2}
          color={hovered ? '#ffffff' : '#533AFD'}
          style={{ transition: 'color 220ms' }}
          aria-hidden="true"
        />
      </div>
      <div style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
        letterSpacing: '0.09em', textTransform: 'uppercase', color: '#533AFD', marginBottom: 8,
      }}>
        {eyebrow}
      </div>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: '#0D1F35', lineHeight: 1.3, marginBottom: 10 }}>{title}</h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#4A5568', lineHeight: 1.6 }}>{body}</p>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" style={{ background: '#F4F6F8', padding: '96px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#533AFD', marginBottom: 12,
          }}>
            What we do
          </div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 38, fontWeight: 800,
            color: '#0D1F35', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16,
          }}>
            Everything automated. Nothing missed.
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: '#4A5568', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
            We build and maintain the workflows so your team can focus on the work that actually matters.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {SERVICES.map((s) => <ServiceCard key={s.eyebrow} {...s} />)}
        </div>
      </div>
    </section>
  )
}
