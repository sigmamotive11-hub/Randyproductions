'use client';

import { useRef, useEffect, useState } from 'react';
import { Play, Pause, ShoppingCart, SkipBack, SkipForward } from 'lucide-react';
import { useStore } from '@/store/use-store';
import type { Beat } from '@/data/beats';

function formatTime(time: number) {
  if (!time || isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export default function AudioPlayer() {
  const { currentBeat, setCurrentBeat, beats, setShowCheckout, showAuth, setShowAuth, user } = useStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!currentBeat) return;
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    const audio = new Audio(currentBeat.audio);
    audioRef.current = audio;
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
    setProgress(0);
    setCurrentTime(0);
  }, [currentBeat]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const t = audio.currentTime;
      const dur = audio.duration || 0;
      if (dur > 0) {
        setProgress((t / dur) * 100);
      }
      setCurrentTime(t);
    };

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentBeat]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const dur = audioRef.current.duration || 0;
    if (dur <= 0) return;
    const newTime = (x / width) * dur;
    audioRef.current.currentTime = newTime;
    setProgress((newTime / dur) * 100);
    setCurrentTime(newTime);
  };

  const playNext = () => {
    if (!currentBeat) return;
    const trackBeats = beats.filter(b => !b.tags.includes('Loop Kit') && b.audio);
    const idx = trackBeats.findIndex(b => b.id === currentBeat.id);
    if (idx < trackBeats.length - 1) setCurrentBeat(trackBeats[idx + 1]);
    else if (trackBeats.length > 0) setCurrentBeat(trackBeats[0]);
  };

  const playPrev = () => {
    if (!currentBeat) return;
    const trackBeats = beats.filter(b => !b.tags.includes('Loop Kit') && b.audio);
    const idx = trackBeats.findIndex(b => b.id === currentBeat.id);
    if (idx > 0) setCurrentBeat(trackBeats[idx - 1]);
    else if (trackBeats.length > 0) setCurrentBeat(trackBeats[trackBeats.length - 1]);
  };

  const handleBuy = () => {
    if (!currentBeat) return;
    if (!user) { setShowAuth(true); return; }
    setShowCheckout(currentBeat);
  };

  if (!currentBeat) return null;

  return (
    <div className={'audio-player-bar ' + (currentBeat ? 'active' : '')}>
      <div className="flex items-center gap-4 w-[200px] md:w-[300px] min-w-0 shrink-0">
        <img src={currentBeat.image} alt="" className="w-12 h-12 rounded object-cover shrink-0" />
        <div className="min-w-0">
          <h4 className="text-sm font-bold truncate">{currentBeat.title}</h4>
          <p className="text-xs text-[#888]">{currentBeat.bpm} BPM {'\u2022'} {currentBeat.key}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-1 max-w-[600px] mx-4">
        <button onClick={playPrev} className="text-[#888] hover:text-white bg-transparent border-none cursor-pointer transition-colors hidden md:block">
          <SkipBack size={16} />
        </button>
        <button onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-[#d4af37] text-[#050505] flex items-center justify-center border-none cursor-pointer transition-transform duration-200 hover:scale-110 shrink-0">
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>
        <button onClick={playNext} className="text-[#888] hover:text-white bg-transparent border-none cursor-pointer transition-colors hidden md:block">
          <SkipForward size={16} />
        </button>
        <div className="flex items-center gap-2 flex-1 text-xs text-[#888]">
          <span className="shrink-0 w-8 text-right">{formatTime(currentTime)}</span>
          <div className="progress-bar" onClick={handleScrub}>
            <div className="progress-fill" style={{ width: progress + '%' }} />
          </div>
          <span className="shrink-0 w-8">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="w-[200px] md:w-[300px] flex justify-end shrink-0">
        <button onClick={handleBuy}
          className="btn-gold text-xs px-4 py-2 flex items-center gap-2">
          <ShoppingCart size={14} />
          Buy ${currentBeat.price}
        </button>
      </div>
    </div>
  );
}
