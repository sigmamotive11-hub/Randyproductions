import { useState, useRef, useEffect } from 'react';
import { Play, Pause, ShoppingCart } from 'lucide-react';

export default function AudioPlayer({ currentBeat, onBuyClick }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentBeat && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentBeat]);

  const PREVIEW_LIMIT = 60; // 1 minute limit

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    if (currentTime >= PREVIEW_LIMIT) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    } else {
      const duration = Math.min(audioRef.current.duration || PREVIEW_LIMIT, PREVIEW_LIMIT);
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleScrub = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const duration = Math.min(audioRef.current.duration || PREVIEW_LIMIT, PREVIEW_LIMIT);
    const newTime = (x / width) * duration;
    audioRef.current.currentTime = newTime;
    setProgress((newTime / duration) * 100);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentBeat) return null;

  return (
    <div className={`audio-player ${currentBeat ? 'active' : ''}`}>
      <audio 
        ref={audioRef} 
        src={currentBeat.audio} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="player-info">
        <img src={currentBeat.image} alt="" className="player-img" />
        <div className="player-details">
          <h4>{currentBeat.title}</h4>
          <p>{currentBeat.bpm} BPM • {currentBeat.key}</p>
        </div>
      </div>

      <div className="player-controls">
        <button className="play-pause-btn" onClick={togglePlay}>
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        </button>
        <div className="progress-container">
          <span>{formatTime(audioRef.current?.currentTime)}</span>
          <div className="progress-bar" onClick={handleScrub} style={{ cursor: 'pointer' }}>
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span>{formatTime(Math.min(audioRef.current?.duration || PREVIEW_LIMIT, PREVIEW_LIMIT))}</span>
        </div>
      </div>

      <div className="player-actions">
        <button className="player-buy-btn" onClick={() => onBuyClick(currentBeat)}>
          <ShoppingCart size={16} style={{marginRight: '8px', verticalAlign: 'middle', display: 'inline-block'}} />
          Buy ${currentBeat.price}
        </button>
      </div>
    </div>
  );
}
