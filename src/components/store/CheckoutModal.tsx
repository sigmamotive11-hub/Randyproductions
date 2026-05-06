'use client';

import { useStore } from '@/store/use-store';
import { useState } from 'react';

export default function CheckoutModal() {
  const { showCheckout, setShowCheckout, user } = useStore();
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (!showCheckout) return null;
  const beat = showCheckout;

  const handleCheckout = async () => {
    if (!agreed || !beat) return;
    setProcessing(true);

    try {
      // Create PayPal order via our API route
      const res = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beatId: beat.id,
          beatTitle: beat.title,
          price: beat.price,
          buyerEmail: user?.email || '',
        }),
      });

      const data = await res.json();
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        alert('PayPal checkout failed. Please try again.');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowCheckout(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold uppercase mb-2">Checkout</h2>
        <p className="text-[#888] mb-1">
          <span className="text-white font-bold">{beat.title}</span>
        </p>
        <p className="text-[#d4af37] text-xl font-bold mb-6">WAV + Stems License &bull; ${beat.price}</p>

        <div className="flex items-start gap-3 mb-4 text-sm text-[#888]">
          <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 accent-[#d4af37]" />
          <label htmlFor="terms">
            I agree to the <a href="#" onClick={(e) => { e.preventDefault(); }} className="text-[#d4af37] no-underline">Terms and Conditions</a>. 
            All purchases include WAV file + Stems ZIP delivered via email.
          </label>
        </div>

        <div className="flex items-start gap-3 mb-6 text-sm text-[#888]">
          <input type="checkbox" id="news" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)}
            className="mt-1 accent-[#d4af37]" />
          <label htmlFor="news">
            Send me discount codes and updates from Randyproductions (Optional).
          </label>
        </div>

        <p className="text-xs text-[#888] mb-6">
          Your <strong className="text-white">WAV file + Stems ZIP</strong> will be securely emailed to <strong className="text-[#d4af37]">{user?.email || 'your email'}</strong> instantly after payment.
        </p>

        <button className="btn-gold w-full" disabled={!agreed || processing} onClick={handleCheckout}>
          {processing ? 'Redirecting to PayPal...' : 'Proceed to PayPal'}
        </button>
        <button className="btn-ghost w-full mt-3" onClick={() => setShowCheckout(null)}>Cancel</button>
      </div>
    </div>
  );
}
