import TrackList from '../components/TrackList';
import Footer from '../components/Footer';

export default function BeatsPage({ beats, onPlay, onBuy, onNavigate }) {
  const loopKits = beats.filter(b => b.tags.includes('Loop Kit'));
  const trackBeats = beats.filter(b => !b.tags.includes('Loop Kit'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <div className="section" style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', paddingTop: '100px' }}>
        <h1 className="section-title" style={{ marginBottom: '20px' }}>Full <span>Catalog</span></h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '50px', fontSize: '1.1rem' }}>Browse the complete collection of premium beats and sound kits.</p>

        <h2 style={{ color: 'white', marginBottom: '30px', fontSize: '2rem' }}>Beats</h2>
        {trackBeats.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No beats available.</p>
        ) : (
          <TrackList beats={trackBeats} onPlay={onPlay} onBuy={onBuy} />
        )}

        <h2 style={{ color: 'white', marginTop: '80px', marginBottom: '30px', fontSize: '2rem' }}>Loop Kits</h2>
        <div className="beats-grid" style={{ marginBottom: '60px' }}>
          {loopKits.length === 0 ? (
             <p style={{ color: 'var(--text-muted)' }}>No loop kits available.</p>
          ) : (
            loopKits.map(kit => (
              <div key={kit.id} className="beat-card" style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(0,0,0,0.9))', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', marginBottom: '10px' }}>{kit.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>${kit.price}</p>
                <button className="btn-primary" style={{ width: '80%', marginTop: '20px' }} onClick={() => onBuy(kit)}>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
