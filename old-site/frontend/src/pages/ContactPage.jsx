import Footer from '../components/Footer';

export default function ContactPage({ onBack, onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <div className="section" style={{ flex: 1, maxWidth: '800px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
        <button onClick={onBack} className="btn-secondary" style={{ marginBottom: '40px', marginTop: '40px' }}>← Back to Store</button>
        <h1 className="section-title" style={{ marginBottom: '50px' }}>Contact <span>Me</span></h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div className="beat-card" style={{ padding: '40px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', marginBottom: '15px' }}>Business Inquiries</h3>
            <p style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0', flex: 1 }}>Sigmamotive11@gmail.com</p>
            <a href="mailto:Sigmamotive11@gmail.com" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '10px 30px', marginTop: '25px', width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>Email Now</a>
          </div>

          <div className="beat-card" style={{ padding: '40px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', marginBottom: '15px' }}>Instagram</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0', flex: 1 }}>DMs are open for collabs & questions.</p>
            <a href="https://www.instagram.com/randyproductions?igsh=a2Y4YWdrMjV6ODNx&utm_source=qr" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '10px 30px', marginTop: '25px', width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>Send a DM</a>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
