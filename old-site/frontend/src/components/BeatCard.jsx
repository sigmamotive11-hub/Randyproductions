export default function BeatCard({ beat, onPlay, onBuy }) {
  return (
    <div className="beat-card">
      <div className="beat-image-container">
        <img src={beat.image} alt={beat.title} className="beat-image" />
        <div className="play-overlay" onClick={() => onPlay(beat)}>
          ▶
        </div>
      </div>
      <div className="beat-info">
        <h3 className="beat-title">{beat.title}</h3>
        <div className="beat-meta">
          <span>{beat.bpm} BPM</span>
          <span>{beat.key}</span>
        </div>
        <div className="beat-price">${beat.price}</div>
        <button className="buy-btn" onClick={(e) => { e.stopPropagation(); onBuy(beat); }}>Buy WAV</button>
      </div>
    </div>
  );
}
