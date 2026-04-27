// ServicesSection.jsx — JOA Automations
// Light section: 3-col feature cards

const SERVICES = [
  { eyebrow:'Lead Generation', title:'Capture & qualify leads automatically', body:'Every form submission, ad click, or chatbot interaction flows straight into your CRM — enriched, tagged, and ready for follow-up.' },
  { eyebrow:'CRM Automation', title:'Your pipeline runs itself', body:'Auto-create contacts, assign owners, trigger follow-up sequences, and update deal stages — all without manual data entry.' },
  { eyebrow:'Calendar & Scheduling', title:'Booking that actually books', body:'Embed your GHL calendar anywhere. Reminders, confirmations, and no-show follow-ups go out automatically.' },
  { eyebrow:'Email & SMS Sequences', title:'Follow up while you sleep', body:'Multi-step nurture sequences triggered by behavior — new lead, no-show, closed deal — delivered at the right time.' },
  { eyebrow:'Reporting & Alerts', title:'Know what\'s working instantly', body:'Automated weekly reports and real-time Slack/email alerts when leads go cold, deals stall, or workflows fail.' },
  { eyebrow:'Custom Integrations', title:'Connect any stack you use', body:'GHL, HubSpot, Zapier, Make, Airtable, Google Sheets, Slack — we wire it all together and maintain it for you.' },
];

const ServiceCard = ({ eyebrow, title, body, index }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background:'#fff', border:'1px solid #E8ECF0', borderRadius:10, padding:'28px 24px',
      boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.05)',
      transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      transition:'all 220ms cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{
        width:40, height:40, background: hovered ? '#533AFD' : '#f3f2ff',
        borderRadius:10, marginBottom:16, transition:'background 220ms',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <div style={{ width:18, height:18, background: hovered ? 'rgba(255,255,255,0.9)' : '#533AFD', borderRadius:4, transition:'background 220ms' }}/>
      </div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600,
        letterSpacing:'0.09em', textTransform:'uppercase', color:'#533AFD', marginBottom:8 }}>
        {eyebrow}
      </div>
      <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:16, fontWeight:700,
        color:'#0D1F35', lineHeight:1.3, marginBottom:10 }}>{title}</h3>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#4A5568', lineHeight:1.6 }}>{body}</p>
    </div>
  );
};

const ServicesSection = () => (
  <section style={{ background:'#F4F6F8', padding:'96px 40px' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:56 }}>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600,
          letterSpacing:'0.1em', textTransform:'uppercase', color:'#533AFD', marginBottom:12 }}>
          What we do
        </div>
        <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:38, fontWeight:800,
          color:'#0D1F35', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:16 }}>
          Everything automated. Nothing missed.
        </h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:17, color:'#4A5568', maxWidth:520, margin:'0 auto', lineHeight:1.6 }}>
          We build and maintain the workflows so your team can focus on the work that actually matters.
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
        {SERVICES.map((s, i) => <ServiceCard key={i} {...s} index={i} />)}
      </div>
    </div>
  </section>
);

Object.assign(window, { ServicesSection });
