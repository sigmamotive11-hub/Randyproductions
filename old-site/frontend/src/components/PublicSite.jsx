import ThreeHero from './ThreeHero';
import TrackList from './TrackList';
import Footer from './Footer';

export default function PublicSite({ beats, onPlay, onBuy, onLoginClick, onNavigate }) {
  const loopKits = beats.filter(b => b.tags.includes('Loop Kit'));
  const trackBeats = beats.filter(b => !b.tags.includes('Loop Kit'));

  return (
    <div className="public-scroll-container">
      <section id="hero" className="hero" style={{ justifyContent: 'flex-start', paddingLeft: '8%' }}>
        <div className="hero-bg" style={{ background: 'var(--bg-dark)' }}></div>
        <ThreeHero />
        
        <div className="hero-content" style={{ textAlign: 'left', zIndex: 1, position: 'relative' }}>
          <span className="hero-subtitle" style={{ color: 'white', letterSpacing: '2px', fontSize: '1rem' }}>By Randyy</span>
          <h1 className="hero-title" style={{ fontSize: '4.5rem', marginBottom: '10px' }}>
            Randyproductions
          </h1>
          <h2 style={{ color: 'var(--accent-gold)', fontSize: '2.5rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '4px' }}>
            Next Gen Rap
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '550px', lineHeight: '1.6' }}>
            High Quality beats and loop kits. Perfect for the next generation of Drill, dark trap, or the rising afrobeat style.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'flex-start' }}>
            <button className="btn-primary-large" onClick={() => onNavigate('beats')}>
              Browse Catalog
            </button>
            <button className="btn-secondary-large" onClick={onLoginClick}>
              Sign Up
            </button>
          </div>
        </div>
      </section>

      <main className="section" id="featured-beats">
        <div className="section-header">
          <h2 className="section-title">Featured <span>Beats</span></h2>
        </div>
        <TrackList beats={trackBeats.slice(0, 3)} onPlay={onPlay} onBuy={onBuy} />
      </main>

      <main className="section" id="beats-catalog" style={{ borderTop: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="section-header">
          <h2 className="section-title">Beats <span>Catalog</span></h2>
        </div>
        {trackBeats.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No beats available in the catalog.</p>
        ) : (
          <TrackList beats={trackBeats} onPlay={onPlay} onBuy={onBuy} />
        )}
      </main>

      <main className="section" id="loops-catalog" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="section-header">
          <h2 className="section-title">Loop <span>Kits</span></h2>
        </div>
        <div className="beats-grid">
          {loopKits.length === 0 ? (
             <p style={{ color: 'var(--text-muted)' }}>No loop kits available yet.</p>
          ) : (
            loopKits.map(kit => (
              <div key={kit.id} className="beat-card" style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(0,0,0,0.9))' }}>
                <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', marginBottom: '10px' }}>{kit.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>${kit.price}</p>
                <button className="btn-primary" style={{ width: '80%', marginTop: '20px' }} onClick={() => onBuy(kit)}>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
