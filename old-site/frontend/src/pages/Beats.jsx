import TrackList from '../components/TrackList';
import { beats } from '../assets/beats';

export default function Beats({ onPlay, onBuy }) {
  return (
    <div className="section" style={{ paddingTop: '150px' }}>
      <div className="section-header">
        <h2 className="section-title">Full <span>Catalog</span></h2>
      </div>
      <TrackList beats={beats} onPlay={onPlay} onBuy={onBuy} />
      <TrackList beats={beats} onPlay={onPlay} onBuy={onBuy} /> {/* Duplicate for demo length */}
    </div>
  );
}
