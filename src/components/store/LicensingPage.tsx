'use client';

import { useStore } from '@/store/use-store';

const faqs = [
  {
    q: 'Are Spotify Streams allowed?',
    a: 'Yes, all leases allow for Spotify/Apple Music distribution. The stream limit depends on the tier you purchase. Basic leases include up to 50,000 streams, Premium includes 500,000, and Unlimited tier has no stream cap whatsoever.',
  },
  {
    q: 'Can I monetize YouTube videos?',
    a: 'Monetization is only allowed on the Premium and Unlimited tiers. Basic leases cannot be Content ID registered or monetized on YouTube. This ensures proper content management while protecting both the artist and the producer.',
  },
  {
    q: 'Live Performances & Radio?',
    a: 'Paid live performances require Premium or Unlimited tiers. Traditional FM radio play is exclusively reserved for Unlimited or Exclusive buyers. This distinction exists because radio broadcasts carry different publishing and performance royalty implications.',
  },
  {
    q: 'What are the credit requirements?',
    a: 'You must credit "Prod. Randyy" in the title or description of any published work across all platforms. The standard format is: Track Title (Prod. Randyy). This credit must be visible on Spotify, Apple Music, YouTube, SoundCloud, and any other distribution platform.',
  },
  {
    q: 'What happens when I buy Exclusive Rights?',
    a: 'You gain full ownership of the beat. The beat will instantly be tagged as "SOLD" and removed from the public catalog. Previous lease holders may still use the beat up to their license cap, but no new leases can be sold. You receive the WAV file and complete stems ZIP package.',
  },
  {
    q: 'What delivery format do I receive?',
    a: 'Every purchase, regardless of tier, includes a high-quality WAV file and a complete Stems ZIP containing individual trackouts. These files are delivered automatically to your email immediately after payment via secure MEGA download links. No waiting, no manual delivery.',
  },
  {
    q: 'Custom Licensing & Major Labels?',
    a: 'If you are representing a major label, film studio, or require clearance for a large commercial sync deal, please use the Contact page to negotiate a custom agreement. We are open to bespoke licensing arrangements for significant projects.',
  },
];

export default function LicensingPage() {
  const { setView } = useStore();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="section-title mb-3">Licensing <span>&amp; Terms</span></h1>
        <p className="text-[#888] text-lg mb-12">
          Simple, transparent beat licensing for serious artists. Read below to understand your usage rights before purchasing. Every license tier includes WAV + Stems ZIP delivery.
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { tier: 'Basic', price: '$29.99', desc: 'Entry-level licensing for up-and-coming artists. 50K streams cap.' },
            { tier: 'Premium', price: '$49.99', desc: 'Most popular tier. 500K streams, monetized YouTube, live shows.' },
            { tier: 'Unlimited', price: '$99.99', desc: 'No limits. Radio play, unlimited streams, profit live shows.' },
            { tier: 'Exclusive', price: 'Custom', desc: 'Full ownership. Beat removed from store. Sync licensing included.' },
          ].map(t => (
            <div key={t.tier} className="glass-card rounded-lg p-6">
              <h3 className="text-[#d4af37] font-bold text-sm uppercase tracking-wider mb-1">{t.tier}</h3>
              <p className="text-white text-xl font-bold mb-2">{t.price}</p>
              <p className="text-[#888] text-xs leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-[#d4af37] text-2xl font-bold mb-8">Usage Rights &amp; FAQ</h2>
        <div className="glass-card rounded-lg p-8 mb-16">
          {faqs.map((faq, i) => (
            <div key={i} className="mb-8 last:mb-0">
              <p className="text-white font-bold mb-2">{faq.q}</p>
              <p className="text-[#888] text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* License Agreement */}
        <div className="glass-card rounded-lg p-10 text-center">
          <h2 className="text-white text-2xl font-bold mb-3">License Agreement</h2>
          <p className="text-[#888] mb-6">Download the full, plain-English legal PDF before purchasing.</p>
          <button className="btn-gold px-10 py-4 rounded" onClick={() => alert('PDF Download triggered (Placeholder)')}>
            Download Terms PDF
          </button>
        </div>
      </div>
    </div>
  );
}
