// BookingSection.jsx — JOA Automations
// GHL calendar embed placeholder + lead capture form

const BookingSection = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name:'', email:'', company:'', service:'', message:'' });
  const [focused, setFocused] = React.useState(null);

  const inputStyle = (name) => ({
    fontFamily:"'DM Sans',sans-serif", fontSize:14, width:'100%',
    border: focused === name ? '1px solid #533AFD' : '1px solid #E8ECF0',
    boxShadow: focused === name ? '0 0 0 3px rgba(83,58,253,0.12)' : 'none',
    borderRadius:8, padding:'10px 13px', color:'#0D1F35', background:'#fff',
    outline:'none', transition:'border-color 150ms, box-shadow 150ms',
  });

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="booking" style={{ background:'#F4F6F8', padding:'96px 40px', borderTop:'1px solid #E8ECF0' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600,
            letterSpacing:'0.1em', textTransform:'uppercase', color:'#533AFD', marginBottom:12 }}>
            Get started
          </div>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:38, fontWeight:800,
            color:'#0D1F35', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:14 }}>
            Book a free strategy call
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:17, color:'#4A5568', maxWidth:480, margin:'0 auto', lineHeight:1.6 }}>
            30 minutes. No pitch, no pressure. We'll map your biggest automation opportunities and give you a clear plan.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'start' }}>
          {/* Calendar embed placeholder */}
          <div style={{
            background:'#fff', border:'1px solid #E8ECF0', borderRadius:12,
            overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              background:'#061B31', padding:'16px 20px',
              display:'flex', alignItems:'center', gap:10,
            }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#533AFD' }}/>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, color:'rgba(255,255,255,0.8)' }}>
                Schedule via GoHighLevel
              </span>
            </div>
            <div style={{
              height:380, display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', gap:16, padding:32, background:'#fafafa',
            }}>
              {/* Calendar grid placeholder */}
              <div style={{ width:'100%' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, fontWeight:700, color:'#0D1F35' }}>May 2026</span>
                  <div style={{ display:'flex', gap:6 }}>
                    <div style={{ width:28, height:28, borderRadius:6, border:'1px solid #E8ECF0', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                      <span style={{ fontSize:12, color:'#4A5568' }}>‹</span>
                    </div>
                    <div style={{ width:28, height:28, borderRadius:6, border:'1px solid #E8ECF0', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                      <span style={{ fontSize:12, color:'#4A5568' }}>›</span>
                    </div>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4, marginBottom:8 }}>
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                    <div key={d} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600,
                      color:'#8896A8', textAlign:'center', padding:'4px 0' }}>{d}</div>
                  ))}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4 }}>
                  {[...Array(5)].map((_,i) => <div key={i}/>)}
                  {[...Array(30)].map((_,i) => {
                    const day = i+1;
                    const available = [5,6,7,12,13,14,19,20,21,26,27,28].includes(day);
                    const selected = day === 14;
                    return (
                      <div key={day} style={{
                        textAlign:'center', padding:'6px 0', borderRadius:6, fontSize:13,
                        fontFamily:"'DM Sans',sans-serif", fontWeight: available ? 500 : 400,
                        cursor: available ? 'pointer' : 'default',
                        background: selected ? '#533AFD' : 'transparent',
                        color: selected ? '#fff' : available ? '#0D1F35' : '#C4CDD6',
                        border: available && !selected ? '1px solid #E8ECF0' : '1px solid transparent',
                      }}>{day}</div>
                    );
                  })}
                </div>
              </div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:'#8896A8', textAlign:'center' }}>
                Powered by GoHighLevel · All times in your local timezone
              </div>
            </div>
          </div>

          {/* Lead capture form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{
              background:'#fff', border:'1px solid #E8ECF0', borderRadius:12,
              padding:'32px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
              display:'flex', flexDirection:'column', gap:16,
            }}>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:18, fontWeight:700, color:'#0D1F35', marginBottom:4 }}>
                Tell us about your business
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div>
                  <label style={{ display:'block', fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, color:'#0D1F35', marginBottom:5 }}>Full name</label>
                  <input style={inputStyle('name')} placeholder="Jane Smith" value={form.name}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    onChange={e => setForm({...form, name:e.target.value})} />
                </div>
                <div>
                  <label style={{ display:'block', fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, color:'#0D1F35', marginBottom:5 }}>Email</label>
                  <input style={inputStyle('email')} placeholder="jane@company.com" value={form.email}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    onChange={e => setForm({...form, email:e.target.value})} />
                </div>
              </div>
              <div>
                <label style={{ display:'block', fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, color:'#0D1F35', marginBottom:5 }}>Company name</label>
                <input style={inputStyle('company')} placeholder="Acme Corp" value={form.company}
                  onFocus={() => setFocused('company')} onBlur={() => setFocused(null)}
                  onChange={e => setForm({...form, company:e.target.value})} />
              </div>
              <div>
                <label style={{ display:'block', fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, color:'#0D1F35', marginBottom:5 }}>What's your biggest time drain?</label>
                <select style={inputStyle('service')}
                  onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}
                  value={form.service} onChange={e => setForm({...form, service:e.target.value})}>
                  <option value="">Select one...</option>
                  <option>Manual lead entry into CRM</option>
                  <option>Following up with leads</option>
                  <option>Scheduling & reminders</option>
                  <option>Reporting & data collection</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, color:'#0D1F35', marginBottom:5 }}>Anything else?</label>
                <textarea style={{ ...inputStyle('message'), resize:'vertical', minHeight:80 }}
                  placeholder="We use HubSpot and struggle with..."
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  value={form.message} onChange={e => setForm({...form, message:e.target.value})} />
              </div>
              <button type="submit" style={{
                background:'#533AFD', color:'#fff', border:'none', borderRadius:4, cursor:'pointer',
                fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:600, padding:'13px',
                boxShadow:'0 4px 16px rgba(83,58,253,0.30)', transition:'all 150ms',
              }}
                onMouseEnter={e => e.currentTarget.style.background='#3a25e8'}
                onMouseLeave={e => e.currentTarget.style.background='#533AFD'}
              >Submit & book call</button>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:'#8896A8', textAlign:'center' }}>
                Your info syncs directly to our CRM. We'll confirm within 1 business day.
              </p>
            </form>
          ) : (
            <div style={{
              background:'#fff', border:'1px solid #E8ECF0', borderRadius:12, padding:'48px 32px',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              gap:16, textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
            }}>
              <div style={{ width:56, height:56, background:'#f3f2ff', borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>✓</div>
              <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:700, color:'#0D1F35' }}>You're on the list!</h3>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#4A5568', lineHeight:1.6, maxWidth:320 }}>
                We've got your info. Expect a confirmation email within a few hours, and a calendar invite once we confirm the time.
              </p>
              <button onClick={() => setSubmitted(false)} style={{
                background:'transparent', border:'1px solid #E8ECF0', borderRadius:4, cursor:'pointer',
                fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, color:'#4A5568', padding:'8px 16px',
              }}>Back to form</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { BookingSection });
