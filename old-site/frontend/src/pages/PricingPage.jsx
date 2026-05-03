import Footer from '../components/Footer';
import PricingTiers from '../components/PricingTiers';

export default function PricingPage({ onBack, onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <div className="section" style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <button onClick={onBack} className="btn-secondary" style={{ marginBottom: '40px', marginTop: '40px' }}>← Back to Store</button>
        <h1 className="section-title" style={{ marginBottom: '20px' }}>Pricing <span>Options</span></h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '50px', fontSize: '1.1rem' }}>Choose the license that fits your budget and career stage.</p>

        <PricingTiers />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: 'var(--text-muted)' }}>Need more detailed legal information on these tiers?</p>
          <button className="btn-secondary" onClick={() => onNavigate('licensing')} style={{ marginTop: '15px' }}>View Full Licensing Rules</button>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
