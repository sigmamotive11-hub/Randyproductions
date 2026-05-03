import { Play, ShoppingCart } from 'lucide-react';

export default function TrackList({ beats, onPlay, onBuy }) {
  return (
    <div className="track-list">
      {beats.map(beat => (
        <div key={beat.id} className="track-row" onClick={() => onPlay(beat)}>
          <button className="track-play-btn" onClick={(e) => { e.stopPropagation(); onPlay(beat); }}>
            <Play size={20} fill="currentColor" />
          </button>
          <img src={beat.image} alt={beat.title} className="track-img" />
          
          <div className="track-info">
            <h3 className="track-title">{beat.title}</h3>
            <div className="track-tags">
              {beat.tags.map(tag => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>

          <div className="track-bpm">{beat.bpm} BPM</div>
          <div className="track-key">{beat.key}</div>
          
          <button className="track-buy" onClick={(e) => { e.stopPropagation(); onBuy(beat); }}>
            <ShoppingCart size={16} style={{marginRight: '8px', verticalAlign: 'middle', display: 'inline-block'}} />
            ${beat.price}
          </button>
        </div>
      ))}
    </div>
  );
}
