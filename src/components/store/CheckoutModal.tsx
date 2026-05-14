'use client';

import { useStore } from '@/store/use-store';
import { useState } from 'react';
import { Star } from 'lucide-react';

const tiers = [
  {
    name: 'Basic Lease',
    price: 29.99,
    features: [
      'MP3 Preview File',
      'WAV + Stems ZIP',
      '50,000 Streams',
      '100,000 YouTube Views',
    ],
    excluded: [
      'Monetized YouTube',
      'Radio Play',
    ],
  },
  {
    name: 'Premium Lease',
    price: 49.99,
    features: [
      'WAV + Stems ZIP',
      '500,000 Streams',
      'Monetized YouTube',
      'Live Performances',
    ],
    excluded: [
      'Radio Play',
    ],
    recommended: true,
  },
  {
    name: 'Unlimited',
    price: 99.99,
    features: [
      'WAV + Stems ZIP',
      'Unlimited Streams',
      'Unlimited Music Videos',
      'Radio Play',
      'For Profit Live Shows',
    ],
    excluded: [],
  },
];

export default function CheckoutModal() {
  const { showCheckout, setShowCheckout, user } = useStore();
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  if (!showCheckout) return null;
  const beat = showCheckout;

  const chosenTier = selectedTier !== null ? tiers[selectedTier] : null;

  const handleCheckout = async () => {
    if (!agreed || !beat || !chosenTier) return;
    setProcessing(true);

    try {
      const res = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beatId: beat.id,
          beatTitle: beat.title + ' (' + chosenTier.name + ')',
          price: chosenTier.price,
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
    <div className="modal-overlay" onClick={() => { setShowCheckout(null); setSelectedTier(null); }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[rgba(212,175,55,0.15)]">
          {beat.image && (
            <img src={beat.image} alt={beat.title} className="w-14 h-14 rounded-lg object-cover" />
          )}
          <div>
            <h2 className="text-xl font-bold uppercase text-white">{beat.title}</h2>
            <p className="text-[#888] text-sm">Select your license tier below</p>
          </div>
        </div>

        {/* Tier selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {tiers.map((tier, idx) => (
            <button key={tier.name}
              type="button"
              onClick={() => setSelectedTier(idx)}
              className={'text-left p-5 rounded-xl transition-all duration-300 cursor-pointer border '
                + (selectedTier === idx
                  ? 'border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  : 'border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.3)]')}
              style={{ background: selectedTier === idx ? 'rgba(212,175,55,0.08)' : 'rgba(255,255,255,0.02)' }}>

              {tier.recommended && (
                <div className="flex items-center gap-1 text-[10px] text-[#d4af37] font-bold uppercase tracking-wider mb-2">
                  <Star size={10} fill="currentColor" /> Recommended
                </div>
              )}

              <p className="text-white font-bold text-sm mb-1">{tier.name}</p>
              <p className="text-[#d4af37] text-2xl font-black mb-3">${tier.price}</p>

              <ul className="list-none p-0 text-xs leading-[2]">
                {tier.features.map((f) => (
                  <li key={f} className="text-[rgba(255,255,255,0.6)]">
                    <span className="text-green-400 mr-1">{'\u2713'}</span>{f}
                  </li>
                ))}
                {tier.excluded.map((f) => (
                  <li key={f} className="text-[rgba(255,255,255,0.2)]">
                    <span className="text-red-400 mr-1">{'\u2717'}</span>{f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* Selected tier summary */}
        {chosenTier && (
          <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.1)' }}>
            <p className="text-sm text-[#888]">
              You selected: <span className="text-white font-bold">{chosenTier.name}</span> for <span className="text-[#d4af37] font-bold">${chosenTier.price}</span>
              {' '} — includes WAV + Stems delivered to <span className="text-[#d4af37]">{user?.email || 'your email'}</span>
            </p>
          </div>
        )}

        {/* Terms */}
        <div className="flex items-start gap-3 mb-3 text-sm text-[#888]">
          <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 accent-[#d4af37]" />
          <label htmlFor="terms">
            I agree to the <span className="text-[#d4af37]">Terms and Conditions</span>. WAV + Stems delivered via email.
          </label>
        </div>

        <div className="flex items-start gap-3 mb-6 text-sm text-[#888]">
          <input type="checkbox" id="news" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)}
            className="mt-1 accent-[#d4af37]" />
          <label htmlFor="news">
            Send me discount codes and updates (Optional).
          </label>
        </div>

        {/* Buttons */}
        <button className="btn-gold w-full" disabled={!agreed || !chosenTier || processing} onClick={handleCheckout}>
          {processing ? 'Redirecting to PayPal...' : 'Proceed to PayPal'}
        </button>
        <button className="btn-ghost w-full mt-3" onClick={() => { setShowCheckout(null); setSelectedTier(null); }}>Cancel</button>
      </div>
    </div>
  );
}
