'use client';

import { useStore } from '@/store/use-store';
import { Star } from 'lucide-react';

const tiers = [
  {
    name: 'Basic Lease',
    price: '$29.99',
    features: [
      { text: 'MP3 Preview File', included: true },
      { text: 'WAV + Stems ZIP (included)', included: true },
      { text: '50,000 Streams (Spotify/Apple)', included: true },
      { text: '100,000 YouTube Views', included: true },
      { text: 'Monetized YouTube', included: false },
      { text: 'Radio Play', included: false },
    ],
    recommended: false,
  },
  {
    name: 'Premium Lease',
    price: '$49.99',
    features: [
      { text: 'WAV + Stems ZIP (included)', included: true },
      { text: '500,000 Streams', included: true },
      { text: 'Monetized YouTube Video', included: true },
      { text: 'Live Performances', included: true },
      { text: 'Radio Play', included: false },
    ],
    recommended: true,
  },
  {
    name: 'Unlimited',
    price: '$99.99',
    features: [
      { text: 'WAV + Stems ZIP (included)', included: true },
      { text: 'Unlimited Streams', included: true },
      { text: 'Unlimited Music Videos', included: true },
      { text: 'Radio Play Allowed', included: true },
      { text: 'For Profit Live Shows', included: true },
    ],
    recommended: false,
  },
  {
    name: 'Exclusive',
    price: 'Make an Offer',
    features: [
      { text: 'WAV + Stems ZIP (included)', included: true },
      { text: 'Full Ownership Rights', included: true },
      { text: 'Beat Removed From Store', included: true },
      { text: 'Unlimited Everything', included: true },
      { text: 'Sync Licensing Allowed', included: true },
      { text: 'Requires Negotiation', included: true },
    ],
    recommended: false,
  },
];

export default function PricingPage() {
  const { setView } = useStore();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="section-title mb-3">Pricing <span>Options</span></h1>
        <p className="text-[#888] text-lg mb-12">Choose the license that fits your budget and career stage. Every tier includes WAV + Stems ZIP.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {tiers.map((tier) => (
            <div key={tier.name}
              className={`p-8 rounded-lg transition-all duration-300 relative ${
                tier.recommended
                  ? 'border border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                  : 'border border-[rgba(212,175,55,0.15)]'
              }`}
              style={{ background: 'rgba(20, 20, 20, 0.6)' }}>
              
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> RECOMMENDED
                </div>
              )}

              <h3 className="text-white font-bold text-lg mb-2">{tier.name}</h3>
              <h4 className="text-[#d4af37] text-3xl font-bold mb-6">{tier.price}</h4>

              <ul className="list-none p-0 text-sm leading-[2.2]">
                {tier.features.map((f) => (
                  <li key={f.text} className="text-[#888] flex items-start gap-2">
                    <span className={f.included ? 'text-green-400' : 'text-red-400'}>{f.included ? '\u2713' : '\u2717'}</span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[#888] mb-4">Need more detailed legal information on these tiers?</p>
          <button onClick={() => setView('licensing')} className="btn-outline text-sm px-6 py-3 rounded-lg">
            View Full Licensing Rules
          </button>
        </div>
      </div>
    </div>
  );
}
