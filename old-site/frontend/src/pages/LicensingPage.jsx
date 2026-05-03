import Footer from '../components/Footer';
import PricingTiers from '../components/PricingTiers';

export default function LicensingPage({ onBack, onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <div className="section" style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <button onClick={onBack} className="btn-secondary" style={{ marginBottom: '40px', marginTop: '40px' }}>← Back to Store</button>
        <h1 className="section-title" style={{ marginBottom: '20px' }}>Licensing <span>& Terms</span></h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '50px', fontSize: '1.1rem' }}>Simple, transparent beat licensing for serious artists. Read below to understand your usage rights before purchasing.</p>

        <h2 style={{ color: 'var(--accent-gold)', marginBottom: '30px' }}>License Breakdown</h2>
        
        <PricingTiers />

        <h2 style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>Usage Rights & FAQ</h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '30px' }}>
          <p style={{ color: 'white', marginBottom: '10px' }}><strong>Are Spotify Streams allowed?</strong></p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Yes, all leases allow for Spotify/Apple Music distribution. The stream limit depends on the tier you purchase.</p>

          <p style={{ color: 'white', marginBottom: '10px' }}><strong>Can I monetize YouTube videos?</strong></p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Monetization is only allowed on the Premium and Unlimited tiers. Basic leases cannot be Content ID registered or monetized.</p>

          <p style={{ color: 'white', marginBottom: '10px' }}><strong>Live Performances & Radio?</strong></p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Paid live performances require Premium or Unlimited. Traditional FM radio play is exclusively reserved for Unlimited or Exclusive buyers.</p>

          <p style={{ color: 'white', marginBottom: '10px' }}><strong>What are the credit requirements?</strong></p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>You must credit "Prod. Randyy" in the title or description of any published work across all platforms (e.g., Title - (Prod. Randyy)).</p>

          <p style={{ color: 'white', marginBottom: '10px' }}><strong>What happens when I buy Exclusive Rights?</strong></p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>You gain full ownership. The beat will instantly be tagged as "SOLD" and removed from the public catalog. Previous lease holders may still use the beat up to their cap, but no new leases can be sold.</p>

          <p style={{ color: 'white', marginBottom: '10px' }}><strong>Custom Licensing & Major Labels?</strong></p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0' }}>If you are representing a major label, film studio, or require clearance for a large commercial sync deal, please use the Contact page to negotiate a custom agreement.</p>
        </div>

        <div style={{ marginTop: '50px', textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '40px' }}>
          <h2 style={{ color: 'white', marginBottom: '20px' }}>License Agreement</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Download the full, plain-English legal PDF before purchasing.</p>
          <button className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '15px 40px' }} onClick={() => alert("PDF Download triggered (Placeholder)")}>Download Terms PDF</button>
        </div>

      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
