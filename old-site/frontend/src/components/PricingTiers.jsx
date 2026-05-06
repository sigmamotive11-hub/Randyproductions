export default function PricingTiers() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '60px' }}>
      
      <div className="beat-card" style={{ padding: '30px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
        <h3>Basic Lease</h3>
        <h4 style={{ color: 'var(--accent-gold)', fontSize: '2rem', margin: '10px 0' }}>$29.99</h4>
        <ul style={{ color: 'var(--text-muted)', listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
          <li>✅ MP3 Preview File</li>
          <li>✅ WAV + Stems ZIP (included)</li>
          <li>✅ 50,000 Streams (Spotify/Apple)</li>
          <li>✅ 100,000 YouTube Views</li>
          <li>❌ Monetized YouTube</li>
          <li>❌ Radio Play</li>
        </ul>
      </div>

      <div className="beat-card" style={{ padding: '30px', background: 'var(--bg-card)', border: '1px solid var(--accent-gold)', borderRadius: '8px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-gold)', color: 'black', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>RECOMMENDED</div>
        <h3>Premium Lease</h3>
        <h4 style={{ color: 'var(--accent-gold)', fontSize: '2rem', margin: '10px 0' }}>$49.99</h4>
        <ul style={{ color: 'var(--text-muted)', listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
          <li>✅ WAV + Stems ZIP (included)</li>
          <li>✅ 500,000 Streams</li>
          <li>✅ Monetized YouTube Video</li>
          <li>✅ Live Performances</li>
          <li>❌ Radio Play</li>
        </ul>
      </div>

      <div className="beat-card" style={{ padding: '30px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
        <h3>Unlimited</h3>
        <h4 style={{ color: 'var(--accent-gold)', fontSize: '2rem', margin: '10px 0' }}>$99.99</h4>
        <ul style={{ color: 'var(--text-muted)', listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
          <li>✅ WAV + Stems ZIP (included)</li>
          <li>✅ Unlimited Streams</li>
          <li>✅ Unlimited Music Videos</li>
          <li>✅ Radio Play Allowed</li>
          <li>✅ For Profit Live Shows</li>
        </ul>
      </div>

      <div className="beat-card" style={{ padding: '30px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
        <h3>Exclusive</h3>
        <h4 style={{ color: 'var(--accent-gold)', fontSize: '2rem', margin: '10px 0' }}>Make an Offer</h4>
        <ul style={{ color: 'var(--text-muted)', listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
          <li>✅ WAV + Stems ZIP (included)</li>
          <li>✅ Full Ownership Rights</li>
          <li>✅ Beat Removed From Store</li>
          <li>✅ Unlimited Everything</li>
          <li>✅ Sync Licensing Allowed</li>
          <li>✅ Requires Negotiation</li>
        </ul>
      </div>

    </div>
  );
}
