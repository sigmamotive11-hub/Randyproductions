'use client';

import { useStore } from '@/store/use-store';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'prod.randy1@gmail.com';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'ZnRnLyh7JuBYDXk';

export default function AuthModal() {
  const { showAuth, setShowAuth, setUser, setView } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!showAuth) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Admin shortcut
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ email, isAdmin: true });
      setShowAuth(false);
      setView('admin');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        setUser({ email: data.user.email, isAdmin: false });
      } else {
        const { data, error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) throw authError;
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          setError('This email is already registered. Please log in instead.');
        } else {
          setUser({ email: data.user?.email || email, isAdmin: false });
        }
      }
      setShowAuth(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowAuth(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold uppercase mb-8">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && (
          <p className="text-[#ff5555] mb-4 text-sm bg-[rgba(255,85,85,0.1)] p-3 rounded">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" />
          </div>
          <button type="submit" className="btn-gold w-full" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <button className="btn-ghost w-full mt-4 text-sm" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}
