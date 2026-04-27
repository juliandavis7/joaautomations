// NavBar.jsx — JOA Automations
// Sticky nav: transparent on hero, blurred dark on scroll

const NavBar = ({ currentPage, onNav }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['Services', 'How it works', 'About', 'Results'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 64,
      background: scrolled ? 'rgba(6,27,49,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      transition: 'all 400ms cubic-bezier(0.16,1,0.3,1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px',
    }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }} onClick={() => onNav('home')}>
        <div style={{
          width:34, height:34, background:'#533AFD', borderRadius:8,
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
        }}>
          <span style={{ color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:15 }}>J</span>
        </div>
        <div>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:16, color:'#fff', lineHeight:1, letterSpacing:'-0.01em' }}>JOA</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:400, fontSize:10, color:'rgba(255,255,255,0.5)', letterSpacing:'0.05em' }}>Automations</div>
        </div>
      </div>

      {/* Links */}
      <div style={{ display:'flex', gap:32, alignItems:'center' }}>
        {links.map(l => (
          <a key={l} href="#" onClick={e => { e.preventDefault(); onNav(l.toLowerCase().replace(/ /g,'-')); }}
            style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500,
              color: currentPage === l.toLowerCase().replace(/ /g,'-') ? '#fff' : 'rgba(255,255,255,0.65)',
              textDecoration:'none', transition:'color 150ms',
            }}
            onMouseEnter={e => e.target.style.color='#fff'}
            onMouseLeave={e => e.target.style.color = currentPage === l.toLowerCase().replace(/ /g,'-') ? '#fff' : 'rgba(255,255,255,0.65)'}
          >{l}</a>
        ))}
      </div>

      {/* CTA */}
      <button onClick={() => onNav('booking')} style={{
        background:'#533AFD', color:'#fff',
        fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600,
        padding:'9px 20px', borderRadius:4, border:'none', cursor:'pointer',
        boxShadow:'0 4px 16px rgba(83,58,253,0.35)',
        transition:'all 150ms',
      }}
        onMouseEnter={e => { e.target.style.background='#3a25e8'; e.target.style.transform='translateY(-1px)'; }}
        onMouseLeave={e => { e.target.style.background='#533AFD'; e.target.style.transform='translateY(0)'; }}
      >Book a free call</button>
    </nav>
  );
};

Object.assign(window, { NavBar });
