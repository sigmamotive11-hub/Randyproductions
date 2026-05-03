import { useState } from 'react';
import { beats } from '../assets/beats';

export default function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || !user.isAdmin) {
    return (
      <div className="section" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>You must be an administrator to view this page.</p>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: '150px' }}>
      <div className="section-header">
        <h2 className="section-title">Admin <span>Dashboard</span></h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <button 
          onClick={() => setActiveTab('overview')} 
          style={{ padding: '10px 20px', background: activeTab === 'overview' ? 'var(--accent-gold)' : 'transparent', color: activeTab === 'overview' ? 'var(--bg-dark)' : 'white', border: '1px solid var(--accent-gold)', cursor: 'pointer', fontWeight: 'bold' }}>
          Overview & Sales
        </button>
        <button 
          onClick={() => setActiveTab('beats')} 
          style={{ padding: '10px 20px', background: activeTab === 'beats' ? 'var(--accent-gold)' : 'transparent', color: activeTab === 'beats' ? 'var(--bg-dark)' : 'white', border: '1px solid var(--accent-gold)', cursor: 'pointer', fontWeight: 'bold' }}>
          Manage Beats
        </button>
        <button 
          onClick={() => setActiveTab('customers')} 
          style={{ padding: '10px 20px', background: activeTab === 'customers' ? 'var(--accent-gold)' : 'transparent', color: activeTab === 'customers' ? 'var(--bg-dark)' : 'white', border: '1px solid var(--accent-gold)', cursor: 'pointer', fontWeight: 'bold' }}>
          Customers
        </button>
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div className="beat-card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Total Sales (Month)</h3>
            <p style={{ fontSize: '3rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>$1,249.75</p>
          </div>
          <div className="beat-card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Total Units Sold</h3>
            <p style={{ fontSize: '3rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>25</p>
          </div>
          <div className="beat-card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Email Subscribers</h3>
            <p style={{ fontSize: '3rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>142</p>
          </div>
        </div>
      )}

      {activeTab === 'beats' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>Your Catalog</h3>
            <button className="btn-primary" style={{ width: 'auto', marginTop: 0 }}>+ Upload New Beat</button>
          </div>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '15px' }}>Beat Title</th>
                <th style={{ padding: '15px' }}>Price</th>
                <th style={{ padding: '15px' }}>BPM</th>
                <th style={{ padding: '15px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {beats.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '15px' }}>{b.title}</td>
                  <td style={{ padding: '15px', color: 'var(--accent-gold)' }}>${b.price}</td>
                  <td style={{ padding: '15px' }}>{b.bpm}</td>
                  <td style={{ padding: '15px' }}>
                    <button style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '5px 10px', marginRight: '10px', cursor: 'pointer' }}>Edit Price</button>
                    <button style={{ background: '#ff3333', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'customers' && (
        <div>
          <h3>Buyer Emails</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Export or view customer emails for marketing.</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['dj.producer@gmail.com', 'artist123@yahoo.com', 'beatsbuyer99@hotmail.com'].map(email => (
              <li key={email} style={{ padding: '15px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', marginBottom: '10px', borderRadius: '4px' }}>
                {email} <span style={{ float: 'right', color: 'var(--accent-gold)' }}>Purchased: WAV License</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
