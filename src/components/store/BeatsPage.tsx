'use client';

import { useStore } from '@/store/use-store';
import TrackList from '@/components/store/TrackList';
import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import type { Beat } from '@/data/beats';

export default function BeatsPage() {
  const { beats, setCurrentBeat, setShowCheckout, setShowAuth, user } = useStore();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Beat' | 'Loop Kit'>('all');

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

  const handlePlay = (beat: Beat) => setCurrentBeat(beat);
  const handleBuy = (beat: Beat) => {
    if (!user) { setShowAuth(true); return; }
    setShowCheckout(beat);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="section-title mb-3">Full <span>Catalog</span></h1>
        <p className="text-[#888] text-lg mb-10">Browse the complete collection of premium beats and sound kits.</p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
            <input
              type="text"
              placeholder="Search beats by name, tag, or style..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(212,175,55,0.15)] text-white rounded-lg outline-none text-sm focus:border-[#d4af37] transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter size={16} className="text-[#888]" />
            {(['all', 'Beat', 'Loop Kit'] as const).map(type => (
              <button key={type} onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                  filterType === type
                    ? 'bg-[#d4af37] text-[#050505] border-[#d4af37]'
                    : 'bg-transparent text-[#888] border-[rgba(212,175,55,0.15)] hover:border-[#d4af37] hover:text-[#d4af37]'
                }`}>
                {type === 'all' ? 'All' : type === 'Beat' ? 'Beats' : 'Loop Kits'}
              </button>
            ))}
          </div>
        </div>

        {/* Beats */}
        {filterType !== 'Loop Kit' && (
          <div className="mb-16">
            <h2 className="text-white text-2xl font-bold mb-6">Beats</h2>
            <TrackList beats={trackBeats} onPlay={handlePlay} onBuy={handleBuy} />
          </div>
        )}

        {/* Loop Kits */}
        {filterType !== 'Beat' && (
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Loop Kits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {loopKits.length === 0 ? (
                <p className="text-[#888]">No loop kits available.</p>
              ) : (
                loopKits.map(kit => (
                  <div key={kit.id}
                    className="h-[280px] flex flex-col justify-center items-center rounded-lg p-8"
                    style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(0,0,0,0.9))', border: '1px solid rgba(212,175,55,0.15)' }}>
                    <h3 className="text-[#d4af37] text-xl font-bold mb-3">{kit.title}</h3>
                    <p className="text-[#888] mb-5">${kit.price}</p>
                    <button onClick={() => handleBuy(kit)} className="btn-gold w-[80%]">Add to Cart</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-[#888] text-center mt-20">No results found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
}
