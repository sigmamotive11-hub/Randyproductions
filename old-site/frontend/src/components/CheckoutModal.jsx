import { useState } from 'react';

export default function CheckoutModal({ beat, user, onClose, onCheckout }) {
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Checkout - {beat.title}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
          High Quality WAV License • ${beat.price}
        </p>
        
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="terms" 
            checked={agreed} 
            onChange={(e) => setAgreed(e.target.checked)} 
          />
          <label htmlFor="terms">
            I agree to the <a href="#" style={{ color: 'var(--accent-gold)' }}>Terms and Conditions</a> (AI generated terms apply to license usage).
          </label>
        </div>

        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="news" 
            checked={newsletter} 
            onChange={(e) => setNewsletter(e.target.checked)} 
          />
          <label htmlFor="news">
            Send me discount codes and updates from Randyproductions (Optional).
          </label>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Your <strong>WAV file + Stems ZIP</strong> will be securely emailed to <strong>{user?.email || 'your email'}</strong> instantly after payment.
        </p>

        <button 
          className="btn-primary" 
          disabled={!agreed}
          style={{ opacity: agreed ? 1 : 0.5, cursor: agreed ? 'pointer' : 'not-allowed' }}
          onClick={onCheckout}
        >
          Proceed to PayPal
        </button>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
