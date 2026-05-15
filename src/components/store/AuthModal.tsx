'use client';

import { useStore } from '@/store/use-store';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthModal() {
  const { showAuth, setShowAuth, setUser, setView } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifySent, setVerifySent] = useState(false);

  if (!showAuth) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Admin login via server-side API route
    try {
      const adminRes = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (adminRes.ok) {
        setUser({ email, isAdmin: true });
        setShowAuth(false);
        setView('admin');
        setLoading(false);
        return;
      }
      // Not admin — proceed with Supabase auth
    } catch {
      // Admin route not available, proceed with Supabase
    }

    try {
      if (isLogin) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        setUser({ email: data.user.email || email, isAdmin: false });
        setShowAuth(false);
      } else {
        const { data, error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) throw authError;
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          setError('This email is already registered. Please log in instead.');
        } else {
          setVerifySent(true);
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => { setShowAuth(false); setVerifySent(false); }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {verifySent ? (
          <>
            <h2 className="text-2xl font-bold uppercase mb-6">Check Your Email</h2>
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'rgba(212,175,55,0.15)' }}>
                <span className="text-[#d4af37] text-2xl">{'\u2709'}</span>
              </div>
              <p className="text-[#ccc] mb-2">We sent a verification link to:</p>
              <p className="text-[#d4af37] font-bold mb-6">{email}</p>
              <p className="text-[#888] text-sm mb-8">Click the link in that email to verify your account. Then come back and log in.</p>
              <button className="btn-gold w-full" onClick={() => { setVerifySent(false); setIsLogin(true); }}>
                Back to Login
              </button>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
