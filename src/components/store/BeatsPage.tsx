'use client';

import { useStore } from '@/store/use-store';
import { useState, useMemo } from 'react';
import { Search, Play, Pause, ShoppingCart, X } from 'lucide-react';
import type { Beat } from '@/data/beats';

export default function BeatsPage() {
  const { beats, currentBeat, setCurrentBeat, setShowCheckout, setShowAuth, user } = useStore();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Beat' | 'Loop Kit'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = beats;
    if (filterType === 'Beat') result = result.filter(b => !b.tags.includes('Loop Kit'));
    if (filterType === 'Loop Kit') result = result.filter(b => b.tags.includes('Loop Kit'));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q)));
    }
    return result;
  }, [beats, search, filterType]);

  const trackBeats = filtered.filter(b => !b.tags.includes('Loop Kit'));
  const loopKits = filtered.filter(b => b.tags.includes('Loop Kit'));

  const handlePlay = (beat: Beat) => {
    if (playingId === beat.id) {
      setPlayingId(null);
      setCurrentBeat(null);
    } else {
      setPlayingId(beat.id);
      setCurrentBeat(beat);
    }
  };

  const handleBuy = (beat: Beat) => {
    if (!user) { setShowAuth(true); return; }
    setShowCheckout(beat);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#d4af37] text-xs font-semibold uppercase tracking-[4px] mb-3">Explore</p>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-3">
            Full <span className="text-[#d4af37]">Catalog</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.4)] text-base">Browse the complete collection of premium beats and sound kits.</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14">
          <div className="relative flex-1 group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.2)] group-focus-within:text-[#d4af37] transition-colors" />
            <input
              type="text"
              placeholder="Search by name, tag, or style..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-white rounded-xl outline-none text-sm focus:border-[#d4af37] transition-all duration-300 placeholder:text-[rgba(255,255,255,0.15)]"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.2)] hover:text-white bg-transparent border-none cursor-pointer">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {(['all', 'Beat', 'Loop Kit'] as const).map(type => (
              <button key={type} onClick={() => setFilterType(type)}
                className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                  filterType === type
                    ? 'bg-[#d4af37] text-[#050505] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-transparent text-[rgba(255,255,255,0.3)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(212,175,55,0.3)] hover:text-[rgba(255,255,255,0.6)]'
                }`}>
                {type === 'all' ? 'All' : type === 'Beat' ? 'Beats' : 'Kits'}
              </button>
            ))}
          </div>
        </div>

        {/* Beats List */}
        {filterType !== 'Loop Kit' && (
          <div className="mb-20">
            <h2 className="text-white text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[#d4af37]" />
              Beats
              <span className="text-[rgba(255,255,255,0.15)] font-normal text-sm normal-case">({trackBeats.length})</span>
            </h2>

            {trackBeats.length === 0 ? (
              <p className="text-[rgba(255,255,255,0.2)] py-12 text-center">No beats match your search.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {trackBeats.map((beat, idx) => (
                  <div key={beat.id}
                    onClick={() => handlePlay(beat)}
                    className="group flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] border border-transparent hover:border-[rgba(255,255,255,0.05)]">
                    {/* Track number / Play */}
                    <div className="w-10 text-center shrink-0">
                      <span className={`text-sm font-bold transition-all ${playingId === beat.id ? 'text-[#d4af37]' : 'text-[rgba(255,255,255,0.15)] group-hover:hidden'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className={`hidden group-hover:flex items-center justify-center ${playingId === beat.id ? '!flex' : ''}`}>
                        {playingId === beat.id ? (
                          <Pause size={14} className="text-[#d4af37]" fill="currentColor" />
                        ) : (
                          <Play size={14} className="text-[#d4af37]" fill="currentColor" />
                        )}
                      </div>
                    </div>

                    {/* Image */}
                    <img src={beat.image} alt={beat.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />

                    {/* Title + Tags */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-bold uppercase tracking-wider truncate">{beat.title}</h3>
                      <div className="flex gap-2 mt-0.5">
                        {beat.tags.map(tag => (
                          <span key={tag} className="text-[10px] text-[rgba(255,255,255,0.25)] uppercase tracking-wider">#{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* BPM + Key */}
                    <div className="hidden md:flex items-center gap-6 shrink-0">
                      <span className="text-xs text-[rgba(255,255,255,0.2)] font-mono">{beat.bpm} BPM</span>
                      <span className="text-xs text-[rgba(255,255,255,0.2)] font-mono">{beat.key}</span>
                    </div>

                    {/* Price + Buy */}
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-[#d4af37] text-sm font-bold">${beat.price}</span>
                      <button onClick={(e) => { e.stopPropagation(); handleBuy(beat); }}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[rgba(212,175,55,0.08)] text-[#d4af37] border border-[rgba(212,175,55,0.15)] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#d4af37] hover:text-[#050505] transition-all duration-300">
                        <ShoppingCart size={12} />
                        License
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Loop Kits */}
        {filterType !== 'Beat' && (
          <div>
            <h2 className="text-white text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[#d4af37]" />
              Loop Kits
              <span className="text-[rgba(255,255,255,0.15)] font-normal text-sm normal-case">({loopKits.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {loopKits.length === 0 ? (
                <p className="text-[rgba(255,255,255,0.2)] py-12 text-center col-span-full">No loop kits available.</p>
              ) : (
                loopKits.map(kit => (
                  <div key={kit.id}
                    className="group rounded-xl p-8 flex flex-col items-center justify-center min-h-[240px] cursor-pointer transition-all duration-500 hover:scale-[1.01]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.04), rgba(10,10,10,0.9))',
                      border: '1px solid rgba(212,175,55,0.08)',
                    }}>
                    <h3 className="text-white text-lg font-bold uppercase tracking-wider mb-1">{kit.title}</h3>
                    <p className="text-[rgba(255,255,255,0.2)] text-xs uppercase tracking-wider mb-5">{kit.tags.filter(t => t !== 'Loop Kit').join(' / ')}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-[#d4af37] text-lg font-black">${kit.price}</span>
                      <button onClick={() => handleBuy(kit)} className="btn-gold text-xs px-5 py-2.5 rounded-lg">
                        Get Kit
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[rgba(255,255,255,0.2)] text-lg mb-2">No results found</p>
            <p className="text-[rgba(255,255,255,0.1)] text-sm">Try a different search term or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
