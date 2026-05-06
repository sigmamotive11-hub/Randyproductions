'use client';

import { useStore } from '@/store/use-store';
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
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#050505]" />
          <div className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 70% 50%, rgba(212,175,55,0.15) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(212,175,55,0.08) 0%, transparent 50%)',
            }} />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }} />
        </div>

        {/* Hero content — text left, logo right */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 w-full flex flex-col lg:flex-row items-center min-h-screen lg:items-center gap-8 lg:gap-0">
          {/* Left: Text content */}
          <div className="flex-1 min-w-0 pt-16 pb-8 lg:pt-24 lg:pb-20 text-center lg:text-left order-2 lg:order-1">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(212,175,55,0.25)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-[#d4af37] text-xs font-semibold uppercase tracking-[3px]">By Randyy</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] mb-4 tracking-tight">
              Randy
              <br />
              <span className="text-[#d4af37]">productions</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[rgba(255,255,255,0.4)] font-light uppercase tracking-[6px] mb-8">
              Next Gen Sound
            </p>

            {/* Description */}
            <p className="text-[rgba(255,255,255,0.5)] text-base md:text-lg leading-relaxed mb-10 max-w-[480px]">
              Premium beats and loop kits crafted for the next generation of Drill, dark trap, and afrobeat. Every purchase includes WAV + Stems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setView('beats')}
                className="group relative px-8 py-4 bg-[#d4af37] text-[#050505] text-sm font-extrabold uppercase tracking-[2px] rounded overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                <span className="relative z-10">Browse Catalog</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              <button onClick={() => setView('pricing')}
                className="px-8 py-4 bg-transparent text-white text-sm font-semibold uppercase tracking-[2px] rounded border border-[rgba(255,255,255,0.1)] hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300">
                View Pricing
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex gap-10 mt-14 pt-8 border-t border-[rgba(255,255,255,0.05)]">
              {[
                { num: `${beats.filter(b => !b.tags.includes('Loop Kit')).length}+`, label: 'Beats' },
                { num: `${beats.filter(b => b.tags.includes('Loop Kit')).length}+`, label: 'Loop Kits' },
                { num: '24h', label: 'Delivery' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-white text-2xl font-black">{s.num}</p>
                  <p className="text-[rgba(255,255,255,0.3)] text-xs uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 2D Logo with gold glow */}
          <div className="flex flex-1 items-center justify-center relative order-1 lg:order-2 w-full lg:h-screen lg:w-auto">
            <div className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] flex items-center justify-center">
              {/* Gold glow behind logo */}
              <div
                className="absolute inset-0 rounded-full opacity-25 blur-[60px] lg:blur-[80px]"
                style={{
                  background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)',
                }}
              />
              {/* Orbit ring 1 */}
              <div className="hero-orbit-ring absolute inset-[-15%] rounded-full border border-[rgba(212,175,55,0.15)]" />
              {/* Orbit ring 2 */}
              <div className="hero-orbit-ring-reverse absolute inset-[-30%] rounded-full border border-dashed border-[rgba(212,175,55,0.08)]" />
              {/* Orbit ring 3 — solid thin */}
              <div className="hero-orbit-ring absolute inset-[-8%] rounded-full border border-[rgba(212,175,55,0.1)]" style={{ animationDuration: '12s' }} />
              {/* Orbiting dot */}
              <div className="absolute inset-[-15%] animate-[orbit-spin_8s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
              </div>
              {/* Second orbiting dot (opposite side, slower) */}
              <div className="absolute inset-[-30%] animate-[orbit-spin_14s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37] opacity-60 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
              </div>
              {/* Pulse ring */}
              <div className="hero-pulse-ring absolute inset-0 rounded-full border border-[rgba(212,175,55,0.2)]" />
              {/* Logo image with float animation */}
              <img
                src="/logo-hero.png"
                alt="Randyproductions"
                className="relative w-[65%] h-auto max-h-[70vh] object-contain animate-[float_6s_ease-in-out_infinite] z-10"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.3)) drop-shadow(0 0 60px rgba(212,175,55,0.15))',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED BEATS ===== */}
      <section className="py-24 px-6 md:px-16 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#d4af37] text-xs font-semibold uppercase tracking-[4px] mb-3">Handpicked</p>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                Featured <span className="text-[#d4af37]">Beats</span>
              </h2>
            </div>
            <button onClick={() => setView('beats')}
              className="hidden md:flex items-center gap-2 text-[#888] text-sm hover:text-[#d4af37] transition-colors uppercase tracking-wider">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredBeats.map((beat, idx) => (
              <div key={beat.id}
                onClick={() => handlePlay(beat)}
                className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(10,10,10,0.95))', border: '1px solid rgba(255,255,255,0.05)' }}>
                {/* Number */}
                <div className="absolute top-4 left-5 text-6xl font-black text-[rgba(255,255,255,0.03)] leading-none">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={beat.image} alt={beat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#d4af37] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#050505"><polygon points="6,3 20,12 6,21" /></svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-white text-lg font-bold uppercase tracking-wider mb-2">{beat.title}</h3>
                  <div className="flex items-center gap-3 mb-5">
                    {beat.tags.map(tag => (
                      <span key={tag} className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-wider">#{tag}</span>
                    ))}
                    <span className="text-xs text-[rgba(255,255,255,0.15)]">•</span>
                    <span className="text-xs text-[rgba(255,255,255,0.3)]">{beat.bpm} BPM</span>
                    <span className="text-xs text-[rgba(255,255,255,0.15)]">•</span>
                    <span className="text-xs text-[rgba(255,255,255,0.3)]">{beat.key}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#d4af37] text-xl font-black">${beat.price}</span>
                    <button onClick={(e) => { e.stopPropagation(); handleBuy(beat); }}
                      className="px-5 py-2.5 bg-[rgba(212,175,55,0.1)] text-[#d4af37] border border-[rgba(212,175,55,0.2)] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#d4af37] hover:text-[#050505] transition-all duration-300">
                      License
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden text-center mt-8">
            <button onClick={() => setView('beats')} className="btn-outline text-sm px-6 py-3 rounded-lg">
              View All Beats →
            </button>
          </div>
        </div>
      </section>

      {/* ===== LOOP KITS ===== */}
      <section className="py-24 px-6 md:px-16 relative" style={{ background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.02), transparent)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#d4af37] text-xs font-semibold uppercase tracking-[4px] mb-3">Production Tools</p>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                Loop <span className="text-[#d4af37]">Kits</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beats.filter(b => b.tags.includes('Loop Kit')).map(kit => (
              <div key={kit.id}
                className="group relative rounded-xl p-8 flex flex-col items-center justify-center min-h-[280px] cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(10,10,10,0.9))',
                  border: '1px solid rgba(212,175,55,0.1)',
                }}>
                <div className="w-16 h-16 rounded-full border border-[rgba(212,175,55,0.2)] flex items-center justify-center mb-6 group-hover:border-[#d4af37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5">
                    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold uppercase tracking-wider mb-2">{kit.title}</h3>
                <p className="text-[rgba(255,255,255,0.3)] text-sm mb-6">Melodies, loops & one-shots</p>
                <div className="flex items-center gap-4">
                  <span className="text-[#d4af37] text-lg font-black">${kit.price}</span>
                  <button onClick={() => handleBuy(kit)} className="btn-gold text-xs px-5 py-2.5 rounded-lg">
                    Get Kit
                  </button>
                </div>
              </div>
            ))}
            {beats.filter(b => b.tags.includes('Loop Kit')).length === 0 && (
              <p className="text-[rgba(255,255,255,0.3)] col-span-full text-center py-12">Loop kits coming soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-[#d4af37]">Level Up</span>?
          </h2>
          <p className="text-[rgba(255,255,255,0.4)] text-lg mb-10 max-w-[500px] mx-auto">
            Every beat includes high-quality WAV + Stems ZIP. Instant delivery after purchase.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setView('beats')} className="btn-gold px-10 py-4 rounded-lg text-sm">
              Browse Beats
            </button>
            <button onClick={() => setView('contact')} className="btn-outline px-10 py-4 rounded-lg text-sm">
              Contact Me
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
