'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/use-store';
import { supabase } from '@/lib/supabase';
import { fallbackBeats } from '@/data/beats';
import type { Beat } from '@/data/beats';
import {
  LayoutDashboard, Music, Users, Plus, Trash2, ArrowLeft,
  Upload, DollarSign, ShoppingBag, UserCheck, Pencil, X
} from 'lucide-react';

const API = '/api/admin/beats';

type AdminTab = 'dashboard' | 'tracks' | 'customers';

export default function AdminDashboard() {
  const { beats, setBeats, setView, setUser } = useStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [showUpload, setShowUpload] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [uploadType, setUploadType] = useState<'Beat' | 'Loop Kit'>('Beat');
  const [newBeat, setNewBeat] = useState({
    title: '', bpm: '', key: '', price: '29.99',
    coverLink: '', audioLink: '',
  });
  const [editBeat, setEditBeat] = useState({
    id: '', title: '', bpm: '', key: '', price: '',
    coverLink: '', audioLink: '',
  });
  const [uploadProgress, setUploadProgress] = useState('');

  useEffect(() => {
    fetchBeats();
  }, [setBeats]);

  const fetchBeats = async () => {
    try {
      const res = await fetch(API);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      if (json && json.length > 0) {
        const formatted = json.map((b) => ({
          ...b,
          wav_link: b.wav_link || '',
          stems_link: b.stems_link || '',
          image: b.image || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop',
        })) as Beat[];
        setBeats(formatted);
      } else {
        setBeats(fallbackBeats);
      }
    } catch {
      setBeats(fallbackBeats);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBeat.audioLink) {
      alert('Please paste your audio URL.');
      return;
    }
    setIsPublishing(true);
    try {
      setUploadProgress('Saving beat...');

      const imageUrl = newBeat.coverLink || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop';

      const body = {
        title: newBeat.title,
        bpm: uploadType === 'Beat' ? (newBeat.bpm || '-') : '-',
        key: newBeat.key || '-',
        price: parseFloat(newBeat.price),
        image: imageUrl,
        audio: newBeat.audioLink,
        tags: [uploadType],
      };

      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');

      const savedBeat = {
        ...json,
        wav_link: json.wav_link || '',
        stems_link: json.stems_link || '',
      } as Beat;

      setBeats([savedBeat, ...beats]);
      setShowUpload(false);
      resetForm();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      alert('Upload failed: ' + msg);
    } finally {
      setIsPublishing(false);
      setUploadProgress('');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    try {
      setUploadProgress('Updating beat...');

      const body = {
        id: editBeat.id,
        title: editBeat.title,
        bpm: editBeat.bpm || '-',
        key: editBeat.key || '-',
        price: parseFloat(editBeat.price),
        image: editBeat.coverLink || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop',
        audio: editBeat.audioLink,
      };

      const res = await fetch(API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Update failed');

      const updatedBeat = {
        ...json,
        wav_link: json.wav_link || '',
        stems_link: json.stems_link || '',
      } as Beat;

      setBeats(beats.map(b => b.id === updatedBeat.id ? updatedBeat : b));
      setShowEdit(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Update failed';
      alert('Update failed: ' + msg);
    } finally {
      setIsPublishing(false);
      setUploadProgress('');
    }
  };

  const openEdit = (beat: Beat) => {
    setEditBeat({
      id: beat.id,
      title: beat.title,
      bpm: beat.bpm || '',
      key: beat.key || '',
      price: String(beat.price),
      coverLink: beat.image || '',
      audioLink: beat.audio || '',
    });
    setShowEdit(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this track permanently?')) return;
    try {
      const res = await fetch(API + '?id=' + id, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Delete failed');
      setBeats(beats.filter(b => b.id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Delete failed';
      alert('Delete failed: ' + msg);
    }
  };

  const resetForm = () => {
    setNewBeat({ title: '', bpm: '', key: '', price: '29.99', coverLink: '', audioLink: '' });
    setUploadProgress('');
  };

  const sidebarItems: { tab: AdminTab; icon: typeof LayoutDashboard; label: string }[] = [
    { tab: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { tab: 'tracks', icon: Music, label: 'Content' },
    { tab: 'customers', icon: Users, label: 'Audience' },
  ];

  return (
    <div className="flex min-h-screen bg-[#080808] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-[250px] border-r border-[rgba(212,175,55,0.15)] p-5 flex flex-col shrink-0 hidden md:flex"
        style={{ background: 'rgba(255,255,255,0.02)' }}>
        <h2 className="text-[#d4af37] mb-10 text-sm font-bold tracking-[3px] text-center">RANDYPRODUCTIONS</h2>
        <div className="flex flex-col gap-1">
          {sidebarItems.map(({ tab, icon: Icon, label }) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={'flex items-center gap-3 px-4 py-3 text-left border-none rounded cursor-pointer transition-all duration-200 text-sm ' + (
                activeTab === tab
                  ? 'bg-[rgba(212,175,55,0.1)] text-[#d4af37] font-bold border-l-[3px] border-l-[#d4af37]'
                  : 'bg-transparent text-[#888] hover:text-[#d4af37] border-l-[3px] border-l-transparent'
              )}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <button onClick={() => setView('home')}
          className="flex items-center gap-2 px-4 py-3 bg-transparent text-[#888] border border-[rgba(212,175,55,0.15)] rounded cursor-pointer text-sm hover:text-white transition-colors">
          <ArrowLeft size={16} />
          Back to Store
        </button>
      </div>

      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-[#080808] border-b border-[rgba(212,175,55,0.15)] px-4 py-3 flex items-center justify-between">
        <h2 className="text-[#d4af37] text-xs font-bold tracking-[3px]">ADMIN STUDIO</h2>
        <div className="flex gap-2">
          {sidebarItems.map(({ tab, icon: Icon }) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={'p-2 rounded border-none cursor-pointer transition-all ' + (
                activeTab === tab ? 'text-[#d4af37]' : 'text-[#888]'
              )}>
              <Icon size={18} />
            </button>
          ))}
        </div>
        <button onClick={() => setView('home')} className="text-[#888] bg-transparent border-none cursor-pointer">
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto pt-16 md:pt-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="max-w-[1000px] mx-auto">
            <h1 className="text-2xl font-bold mb-8">Store Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {[
                { label: 'Total Sales (28 days)', value: '$0.00', icon: DollarSign, color: '#d4af37' },
                { label: 'Total Units Sold', value: '0', icon: ShoppingBag, color: '#4caf50' },
                { label: 'Email Subscribers', value: '0', icon: UserCheck, color: '#2196f3' },
              ].map(stat => (
                <div key={stat.label} className="glass-card rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <stat.icon size={18} style={{ color: stat.color }} />
                    <h3 className="text-[#888] text-sm">{stat.label}</h3>
                  </div>
                  <p className="text-4xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="glass-card rounded-lg p-6">
              <h3 className="mb-4 font-bold">Recent Activity</h3>
              <p className="text-[#888] text-sm">No recent purchases. Share your store link to get started!</p>
            </div>
          </div>
        )}

        {/* Tracks Tab */}
        {activeTab === 'tracks' && (
          <div className="max-w-[1000px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h1 className="text-2xl font-bold">Store Content</h1>
              <div className="flex gap-3">
                <button onClick={() => { setUploadType('Loop Kit'); setShowUpload(true); }}
                  className="btn-outline text-xs px-4 py-2.5 rounded flex items-center gap-2">
                  <Plus size={14} /> CREATE LOOP KIT
                </button>
                <button onClick={() => { setUploadType('Beat'); setShowUpload(true); }}
                  className="btn-gold text-xs px-4 py-2.5 rounded flex items-center gap-2">
                  <Plus size={14} /> CREATE BEAT
                </button>
              </div>
            </div>

            <div className="glass-card rounded-lg overflow-hidden">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[rgba(212,175,55,0.15)] text-[#888] text-sm">
                      <th className="p-4">Content</th>
                      <th className="p-4">Preview</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beats.map(b => (
                      <tr key={b.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={b.image} className="w-10 h-10 rounded object-cover" alt="" />
                            <span className="font-bold text-sm">{b.title}</span>
                          </div>
                        </td>
                        <td className="p-4 text-xs">
                          {b.audio ? <span className="text-green-400">{'\u2714'} Uploaded</span> : <span className="text-red-400">{'\u2718'} Missing</span>}
                        </td>
                        <td className="p-4 text-sm">{b.tags && b.tags.includes('Loop Kit') ? 'Loop Kit' : 'Beat'}</td>
                        <td className="p-4 text-[#d4af37] font-bold">${b.price}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button onClick={() => openEdit(b)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-transparent text-[#d4af37] border border-[#d4af37] rounded text-xs cursor-pointer hover:bg-[rgba(212,175,55,0.1)] transition-colors">
                              <Pencil size={12} /> Edit
                            </button>
                            <button onClick={() => handleDelete(b.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-transparent text-red-400 border border-red-400 rounded text-xs cursor-pointer hover:bg-red-400/10 transition-colors">
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {beats.length === 0 && (
                      <tr><td colSpan={5} className="p-6 text-center text-[#888]">No tracks uploaded yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden p-4 flex flex-col gap-4">
                {beats.map(b => (
                  <div key={b.id} className="glass-card rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={b.image} className="w-10 h-10 rounded object-cover" alt="" />
                      <div className="flex-1">
                        <p className="font-bold text-sm">{b.title}</p>
                        <p className="text-[#d4af37] text-xs">${b.price} {'\u2022'} {b.tags && b.tags.includes('Loop Kit') ? 'Loop Kit' : 'Beat'}</p>
                      </div>
                      <button onClick={() => openEdit(b)} className="text-[#d4af37] bg-transparent border-none cursor-pointer p-1">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(b.id)} className="text-red-400 bg-transparent border-none cursor-pointer p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="text-center p-2 rounded text-xs" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <p className="text-[#888] mb-1">Preview Audio</p>
                      {b.audio ? <span className="text-green-400">{'\u2714'} Uploaded</span> : <span className="text-red-400">{'\u2718'} Missing</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="max-w-[1000px] mx-auto">
            <h1 className="text-2xl font-bold mb-8">Audience</h1>
            <div className="glass-card rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <Users size={24} className="text-[#888]" />
                <div>
                  <h3 className="font-bold">Customer Relationship List</h3>
                  <p className="text-[#888] text-sm">Ready for backend sync. Your sales are currently at 0.</p>
                </div>
              </div>
              <div className="text-center py-12" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                <p className="text-[#888] text-sm mb-2">No customer data available yet.</p>
                <p className="text-[#555] text-xs">Customer records will populate here after your first sale via PayPal webhook.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="modal-overlay" onClick={() => { setShowUpload(false); resetForm(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold uppercase mb-6 pb-4 border-b border-[rgba(212,175,55,0.15)] flex items-center gap-3">
              <Upload size={20} className="text-[#d4af37]" />
              Upload {uploadType}
            </h2>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label>Title (Required)</label>
                <input type="text" required value={newBeat.title}
                  onChange={e => setNewBeat({ ...newBeat, title: e.target.value })}
                  placeholder={'e.g. ' + (uploadType === 'Beat' ? 'LONDON NIGHTS' : 'DARK MATTER VOL 1')} />
              </div>

              <div className="form-group">
                <label>Cover Art (Image URL)</label>
                <input type="url" value={newBeat.coverLink}
                  onChange={e => setNewBeat({ ...newBeat, coverLink: e.target.value })}
                  placeholder="Paste image URL here (e.g. from Supabase Storage)" />
                <small>Paste a link to your cover art image. Leave blank for default.</small>
              </div>

              <div className="form-group">
                <label>Audio URL (Required)</label>
                <input type="url" required value={newBeat.audioLink}
                  onChange={e => setNewBeat({ ...newBeat, audioLink: e.target.value })}
                  placeholder="Paste audio URL here (e.g. from Supabase Storage)" />
                <small>Paste the link to your MP3 audio file. This will be playable on the public store.</small>
              </div>

              {uploadType === 'Beat' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>BPM</label>
                    <input type="number" value={newBeat.bpm}
                      onChange={e => setNewBeat({ ...newBeat, bpm: e.target.value })} placeholder="140" />
                  </div>
                  <div className="form-group">
                    <label>Key</label>
                    <input type="text" value={newBeat.key}
                      onChange={e => setNewBeat({ ...newBeat, key: e.target.value })} placeholder="C Min" />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Price ($)</label>
                <input type="number" step="0.01" required value={newBeat.price}
                  onChange={e => setNewBeat({ ...newBeat, price: e.target.value })} />
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" className="btn-ghost flex-1 py-3" onClick={() => { setShowUpload(false); resetForm(); }}>Cancel</button>
                <button type="submit" className="btn-gold flex-1" disabled={isPublishing}>
                  {isPublishing ? (uploadProgress || 'Publishing...') : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <div className="modal-overlay" onClick={() => setShowEdit(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold uppercase mb-6 pb-4 border-b border-[rgba(212,175,55,0.15)] flex items-center justify-between">
              <span className="flex items-center gap-3">
                <Pencil size={20} className="text-[#d4af37]" />
                Edit Beat
              </span>
              <button onClick={() => setShowEdit(false)} className="bg-transparent border-none text-[#888] cursor-pointer hover:text-white">
                <X size={20} />
              </button>
            </h2>
            <form onSubmit={handleEdit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" required value={editBeat.title}
                  onChange={e => setEditBeat({ ...editBeat, title: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Cover Art URL</label>
                <input type="url" value={editBeat.coverLink}
                  onChange={e => setEditBeat({ ...editBeat, coverLink: e.target.value })}
                  placeholder="Paste image URL" />
              </div>

              <div className="form-group">
                <label>Audio URL</label>
                <input type="url" value={editBeat.audioLink}
                  onChange={e => setEditBeat({ ...editBeat, audioLink: e.target.value })}
                  placeholder="Paste audio URL" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label>BPM</label>
                  <input type="text" value={editBeat.bpm}
                    onChange={e => setEditBeat({ ...editBeat, bpm: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Key</label>
                  <input type="text" value={editBeat.key}
                    onChange={e => setEditBeat({ ...editBeat, key: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label>Price ($)</label>
                <input type="number" step="0.01" required value={editBeat.price}
                  onChange={e => setEditBeat({ ...editBeat, price: e.target.value })} />
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" className="btn-ghost flex-1 py-3" onClick={() => setShowEdit(false)}>Cancel</button>
                <button type="submit" className="btn-gold flex-1" disabled={isPublishing}>
                  {isPublishing ? (uploadProgress || 'Saving...') : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
