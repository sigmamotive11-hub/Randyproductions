import { Link } from 'react-router-dom';
import ThreeHero from '../components/ThreeHero';
import TrackList from '../components/TrackList';
import { beats } from '../assets/beats';

export default function Home({ onPlay, onBuy, onLoginClick }) {
  return (
    <>
      <section className="hero" style={{ justifyContent: 'flex-start', paddingLeft: '8%' }}>
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
            <Link to="/beats" className="btn-primary-large" style={{ textDecoration: 'none' }}>
              Browse Catalog
            </Link>
            <button className="btn-secondary-large" onClick={onLoginClick}>
              Sign Up
            </button>
          </div>
        </div>
      </section>

      <main className="section">
        <div className="section-header">
          <h2 className="section-title">Featured <span>Beats</span></h2>
          <Link to="/beats" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 'bold' }}>Browse Catalog</Link>
        </div>
        <TrackList beats={beats.slice(0, 4)} onPlay={onPlay} onBuy={onBuy} />
      </main>
    </>
  );
}
