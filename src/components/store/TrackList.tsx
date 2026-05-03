'use client';

import { Play, ShoppingCart } from 'lucide-react';
import type { Beat } from '@/data/beats';

interface TrackListProps {
  beats: Beat[];
  onPlay: (beat: Beat) => void;
  onBuy: (beat: Beat) => void;
}

export default function TrackList({ beats, onPlay, onBuy }: TrackListProps) {
  if (beats.length === 0) {
    return <p className="text-[#888]">No tracks available.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {beats.map((beat) => (
        <div key={beat.id} className="track-row" onClick={() => onPlay(beat)}>
          <button className="w-12 h-12 rounded-full bg-transparent border border-[#888] text-white flex items-center justify-center mr-5 cursor-pointer transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37] shrink-0"
            onClick={(e) => { e.stopPropagation(); onPlay(beat); }}>
            <Play size={18} fill="currentColor" />
          </button>
          <img src={beat.image} alt={beat.title} className="w-14 h-14 rounded object-cover mr-5 shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold mb-1 truncate">{beat.title}</h3>
            <div className="flex gap-3 text-xs text-[#888] flex-wrap">
              {beat.tags.map(tag => <span key={tag}>#{tag}</span>)}
            </div>
          </div>
          <div className="text-[#888] text-sm w-20 text-center shrink-0 hidden md:block">{beat.bpm} BPM</div>
          <div className="text-[#888] text-sm w-16 text-center shrink-0 hidden md:block">{beat.key}</div>
          <button className="btn-gold text-xs px-5 py-3 flex items-center gap-2 shrink-0"
            onClick={(e) => { e.stopPropagation(); onBuy(beat); }}>
            <ShoppingCart size={14} />
            ${beat.price}
          </button>
        </div>
      ))}
    </div>
  );
}
