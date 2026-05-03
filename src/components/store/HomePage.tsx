'use client';

import { useStore } from '@/store/use-store';
import ThreeHero from '@/components/store/ThreeHero';
import TrackList from '@/components/store/TrackList';
import type { Beat } from '@/data/beats';

export default function HomePage() {
  const { beats, setCurrentBeat, setShowCheckout, setShowAuth, user, setView } = useStore();

  const trackBeats = beats.filter(b => !b.tags.includes('Loop Kit'));
  const featuredBeats = trackBeats.slice(0, 3);

  const handlePlay = (beat: Beat) => setCurrentBeat(beat);
  const handleBuy = (beat: Beat) => {
    if (!user) { setShowAuth(true); return; }
    setShowCheckout(beat);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-start pl-[5%] md:pl-[8%] relative overflow-hidden">
        <div className="absolute inset-0 z-[-1]"
          style={{
            background: 'linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, #050505 100%), url(https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(60%) contrast(110%)',
          }} />

        <ThreeHero />

        <div className="text-left z-[1] relative max-w-[600px]">
          <span className="text-[#d4af37] text-sm md:text-base font-semibold tracking-[4px] uppercase block mb-4">By Randyy</span>
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black uppercase leading-none mb-3">
            Randyproductions
          </h1>
          <h2 className="text-[#d4af37] text-2xl md:text-4xl uppercase tracking-[4px] mb-6">
            Next Gen Rap
          </h2>
          <p className="text-[#888] text-base md:text-lg mb-10 max-w-[550px] leading-relaxed">
            High Quality beats and loop kits. Perfect for the next generation of Drill, dark trap, or the rising afrobeat style.
          </p>
          <div className="flex gap-5 justify-start flex-wrap">
            <button onClick={() => setView('beats')}
              className="px-8 md:px-10 py-4 bg-[#d4af37] text-[#050505] text-sm md:text-base font-extrabold uppercase tracking-[2px] border-none rounded cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Browse Catalog
            </button>
            <button onClick={() => setShowAuth(true)}
              className="px-8 md:px-10 py-4 bg-transparent text-white text-sm md:text-base font-semibold uppercase tracking-[2px] border border-[rgba(212,175,55,0.15)] rounded cursor-pointer transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37]"
              style={{ backdropFilter: 'blur(10px)' }}>
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* Featured Beats */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="section-title">Featured <span>Beats</span></h2>
          </div>
          <TrackList beats={featuredBeats} onPlay={handlePlay} onBuy={handleBuy} />
        </div>
      </section>

      {/* Full Catalog */}
      <section className="py-24 px-6 md:px-16 border-t border-[rgba(212,175,55,0.15)]" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="section-title">Beats <span>Catalog</span></h2>
            <button onClick={() => setView('beats')} className="btn-outline text-xs px-5 py-2 rounded">
              View All
            </button>
          </div>
          <TrackList beats={trackBeats} onPlay={handlePlay} onBuy={handleBuy} />
        </div>
      </section>

      {/* Loop Kits */}
      <section className="py-24 px-6 md:px-16 border-t border-[rgba(212,175,55,0.15)]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="section-title">Loop <span>Kits</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beats.filter(b => b.tags.includes('Loop Kit')).map(kit => (
              <div key={kit.id}
                className="h-[280px] flex flex-col justify-center items-center rounded-lg p-8"
                style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(0,0,0,0.9))', border: '1px solid rgba(212,175,55,0.15)' }}>
                <h3 className="text-[#d4af37] text-xl font-bold mb-3">{kit.title}</h3>
                <p className="text-[#888] mb-5">${kit.price}</p>
                <button onClick={() => handleBuy(kit)} className="btn-gold w-[80%]">Add to Cart</button>
              </div>
            ))}
            {beats.filter(b => b.tags.includes('Loop Kit')).length === 0 && (
              <p className="text-[#888]">No loop kits available yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
