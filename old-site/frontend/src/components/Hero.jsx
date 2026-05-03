import { Play, ShoppingCart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <span className="hero-subtitle">Premium Beats</span>
        <h1 className="hero-title">Elevate Your Sound</h1>
        <div className="hero-actions">
          <button className="btn-primary-large" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
            Explore Beats
          </button>
          <button className="btn-secondary-large">
            Sound Kits
          </button>
        </div>
      </div>
    </section>
  );
}
