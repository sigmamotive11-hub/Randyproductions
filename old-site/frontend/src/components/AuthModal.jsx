import { useState } from 'react';
import { supabase } from '../lib/supabase';

const ADMIN_EMAIL = 'prod.randy1@gmail.com';
const ADMIN_PASSWORD = 'ZnRnLyh7JuBYDXk';

export default function AuthModal({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Admin shortcut — bypass Supabase for admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      onLogin({ email, isAdmin: true });
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Real Supabase login
        const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        onLogin({ email: data.user.email, isAdmin: false });
      } else {
        // Real Supabase sign-up
        const { data, error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) throw authError;
        // Supabase may require email confirmation — handle both cases
        if (data.user && data.user.identities?.length === 0) {
          setError('This email is already registered. Please log in instead.');
        } else {
          onLogin({ email: data.user?.email || email, isAdmin: false });
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p style={{ color: '#ff5555', marginBottom: '15px', fontSize: '0.9rem', background: 'rgba(255,85,85,0.1)', padding: '10px', borderRadius: '4px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <button className="btn-secondary" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}
