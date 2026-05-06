import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminStudio({ user, beats, setBeats, onExit }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUpload, setShowUpload] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [uploadType, setUploadType] = useState('Beat'); // 'Beat' or 'Loop Kit'
  const [newBeat, setNewBeat] = useState({ title: '', bpm: '', key: '', price: '49.99', previewLink: '', wavLink: '', stemsLink: '' });
  const [coverFile, setCoverFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    
    try {
      let imageUrl = 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop';

      // 1. Upload Cover Image if selected
      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('covers')
          .upload(filePath, coverFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('covers')
          .getPublicUrl(filePath);
          
        imageUrl = urlData.publicUrl;
      }

      // 2. Save Beat Data to Database
      const beatData = {
        title: newBeat.title,
        bpm: uploadType === 'Beat' ? (newBeat.bpm || '-') : '-',
        key: newBeat.key || '-',
        price: parseFloat(newBeat.price),
        image: imageUrl,
        audio: newBeat.previewLink,
        wav_link: newBeat.wavLink,
        stems_link: newBeat.stemsLink,
        tags: [uploadType]
      };

      const { data, error } = await supabase
        .from('beats')
        .insert([beatData])
        .select();

      if (error) throw error;

      // Add to local state with correct camelCase mapping for the UI
      const savedBeat = {
        ...data[0],
        wavLink: data[0].wav_link,
        stemsLink: data[0].stems_link
      };

      setBeats([savedBeat, ...beats]);
      setShowUpload(false);
      setNewBeat({ title: '', bpm: '', key: '', price: '49.99', previewLink: '', wavLink: '', stemsLink: '' });
      setCoverFile(null);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed: ' + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this track permanently?')) return;

    try {
      const { error } = await supabase
        .from('beats')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBeats(beats.filter(b => b.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed: ' + err.message);
    }
  };

  const openUploadModal = (type) => {
    setUploadType(type);
    setShowUpload(true);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#080808', color: 'white', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', borderRight: '1px solid var(--glass-border)', padding: '20px', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.02)' }}>
        <h2 style={{ color: 'var(--accent-gold)', marginBottom: '40px', fontSize: '1.2rem', letterSpacing: '2px', textAlign: 'center' }}>RANDYPRODUCTIONS</h2>
        <button onClick={() => setActiveTab('dashboard')} style={getSidebarStyle(activeTab === 'dashboard')}>Dashboard</button>
        <button onClick={() => setActiveTab('tracks')} style={getSidebarStyle(activeTab === 'tracks')}>Content</button>
        <button onClick={() => setActiveTab('customers')} style={getSidebarStyle(activeTab === 'customers')}>Audience</button>
        <div style={{ flex: 1 }}></div>
        <button onClick={onExit} style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--glass-border)', padding: '10px', cursor: 'pointer', borderRadius: '4px' }}>Back to Store</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {activeTab === 'dashboard' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Store Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div style={cardStyle}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>Total Sales (28 days)</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>$0.00</p>
              </div>
              <div style={cardStyle}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>Total Units Sold</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>0</p>
              </div>
              <div style={cardStyle}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>Email Subscribers</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>0</p>
              </div>
            </div>
            
            <div style={{ ...cardStyle, marginTop: '20px' }}>
              <h3 style={{ marginBottom: '15px' }}>Recent Activity</h3>
              <p style={{ color: 'var(--text-muted)' }}>No recent purchases. Share your store link to get started!</p>
            </div>
          </div>
        )}

        {activeTab === 'tracks' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
              <h1 style={{ fontSize: '2rem' }}>Store Content</h1>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={() => openUploadModal('Loop Kit')} style={{ background: 'transparent', color: 'var(--accent-gold)', border: '1px solid var(--accent-gold)', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>+ CREATE LOOP KIT</button>
                <button onClick={() => openUploadModal('Beat')} style={{ background: 'var(--accent-gold)', color: 'black', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>+ CREATE BEAT</button>
              </div>
            </div>
            
            <div style={cardStyle}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '15px 10px' }}>Content</th>
                    <th style={{ padding: '15px 10px' }}>Preview (MP3)</th>
                    <th style={{ padding: '15px 10px' }}>WAV Link</th>
                    <th style={{ padding: '15px 10px' }}>Stems Link</th>
                    <th style={{ padding: '15px 10px' }}>Type</th>
                    <th style={{ padding: '15px 10px' }}>Price</th>
                    <th style={{ padding: '15px 10px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {beats.map(b => (
                    <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '15px 10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src={b.image} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} alt="" />
                        <strong>{b.title}</strong>
                      </td>
                      <td style={{ padding: '15px 10px', color: 'var(--text-muted)', fontSize: '0.75rem', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {b.audio ? <span style={{ color: '#4caf50' }}>✔ Set</span> : <span style={{ color: '#ff5555' }}>✘ Missing</span>}
                      </td>
                      <td style={{ padding: '15px 10px', fontSize: '0.75rem', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {b.wavLink ? <span style={{ color: '#4caf50' }}>✔ Set</span> : <span style={{ color: '#ff5555' }}>✘ Missing</span>}
                      </td>
                      <td style={{ padding: '15px 10px', fontSize: '0.75rem', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {b.stemsLink ? <span style={{ color: '#4caf50' }}>✔ Set</span> : <span style={{ color: '#ff5555' }}>✘ Missing</span>}
                      </td>
                      <td style={{ padding: '15px 10px' }}>{b.tags.includes('Loop Kit') ? 'Loop Kit' : 'Beat'}</td>
                      <td style={{ padding: '15px 10px', color: 'var(--accent-gold)' }}>${b.price}</td>
                      <td style={{ padding: '15px 10px' }}>
                        <button onClick={() => handleDelete(b.id)} style={{ background: 'transparent', color: '#ff3333', border: '1px solid #ff3333', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {beats.length === 0 && (
                    <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No tracks uploaded yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Audience</h1>
            <div style={cardStyle}>
               <p style={{ color: 'var(--text-muted)' }}>No customer data available yet. Your sales are currently at 0.</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="modal-overlay" onClick={() => setShowUpload(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ color: 'white', marginBottom: '20px', fontSize: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
              Upload {uploadType}
            </h2>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label>Title (Required)</label>
                <input type="text" required value={newBeat.title} onChange={e => setNewBeat({...newBeat, title: e.target.value})} placeholder={`e.g. ${uploadType === 'Beat' ? 'LONDON NIGHTS' : 'DARK MATTER VOL 1'}`} />
              </div>
              
              <div className="form-group">
                <label>Cover Art (Local Image Upload)</label>
                <input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files[0])} style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', width: '100%', boxSizing: 'border-box', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }} />
              </div>

              <div className="form-group">
                <label>Preview Link — MP3 (Plays in browser)</label>
                <input type="url" required value={newBeat.previewLink} onChange={e => setNewBeat({...newBeat, previewLink: e.target.value})} placeholder="https://mega.nz/file/...mp3" />
                <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '5px' }}>Low-quality or tagged MP3 used for in-browser audio previews on the public store.</small>
              </div>

              <div className="form-group">
                <label>Purchase Link — WAV (Delivered to buyer)</label>
                <input type="url" required value={newBeat.wavLink} onChange={e => setNewBeat({...newBeat, wavLink: e.target.value})} placeholder="https://mega.nz/file/...wav" />
                <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '5px' }}>High-quality WAV file. This link is emailed to the buyer automatically after payment.</small>
              </div>

              <div className="form-group">
                <label>Stems Link — ZIP (Required, delivered alongside WAV)</label>
                <input type="url" required value={newBeat.stemsLink} onChange={e => setNewBeat({...newBeat, stemsLink: e.target.value})} placeholder="https://mega.nz/file/...zip" />
                <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '5px' }}>Trackout ZIP. Both the WAV and Stems ZIP are emailed to every buyer automatically after payment.</small>
              </div>

              {uploadType === 'Beat' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label>BPM</label>
                    <input type="number" value={newBeat.bpm} onChange={e => setNewBeat({...newBeat, bpm: e.target.value})} placeholder="140" />
                  </div>
                  <div className="form-group">
                    <label>Key</label>
                    <input type="text" value={newBeat.key} onChange={e => setNewBeat({...newBeat, key: e.target.value})} placeholder="C Min" />
                  </div>
                </div>
              )}
              
              <div className="form-group">
                <label>Price ($)</label>
                <input type="number" step="0.01" required value={newBeat.price} onChange={e => setNewBeat({...newBeat, price: e.target.value})} />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowUpload(false)} style={{ margin: 0 }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ margin: 0 }} disabled={isPublishing}>
                  {isPublishing ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const getSidebarStyle = (isActive) => ({
  background: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
  color: isActive ? 'var(--accent-gold)' : 'var(--text-muted)',
  border: 'none',
  textAlign: 'left',
  padding: '15px',
  cursor: 'pointer',
  marginBottom: '5px',
  borderRadius: '4px',
  fontWeight: isActive ? 'bold' : 'normal',
  borderLeft: isActive ? '3px solid var(--accent-gold)' : '3px solid transparent',
  transition: 'all 0.2s ease'
});

const cardStyle = {
  background: 'var(--bg-card)', 
  border: '1px solid var(--glass-border)', 
  padding: '25px', 
  borderRadius: '8px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
};
