'use client';

import { Mail, ArrowRight, MapPin, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { useStore } from '@/store/use-store';

/* ═══════════════════════════════════════════════
   SOCIAL LINKS DATA
   ═══════════════════════════════════════════════ */
const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/randyproductions?igsh=a2Y4YWdrMjV6ODNx&utm_source=qr',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@prod.Randyy',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@prod.randyy?_r=1&_t=ZN-95ydYMFaeE2',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════
   STORE NAVIGATION LINKS
   ═══════════════════════════════════════════════ */
const storeLinks = [
  { label: 'Catalog', view: 'beats' as const },
  { label: 'Pricing', view: 'pricing' as const },
  { label: 'Licensing', view: 'licensing' as const },
  { label: 'Contact', view: 'contact' as const },
];

/* ═══════════════════════════════════════════════
   PAYMENT BADGE SVGs (inline, no external deps)
   ═══════════════════════════════════════════════ */
function PaypalBadge() {
  return (
    <svg width="64" height="20" viewBox="0 0 64 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="20" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      <text x="32" y="14" textAnchor="middle" fill="#009CDE" fontSize="9" fontWeight="700" fontFamily="Arial, sans-serif">PayPal</text>
    </svg>
  );
}

function VisaBadge() {
  return (
    <svg width="42" height="20" viewBox="0 0 42 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="42" height="20" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      <text x="21" y="14.5" textAnchor="middle" fill="#1A1F71" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif" fontStyle="italic">VISA</text>
    </svg>
  );
}

function MastercardBadge() {
  return (
    <svg width="54" height="20" viewBox="0 0 54 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="54" height="20" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      <circle cx="20" cy="10" r="7" fill="#EB001B" opacity="0.7" />
      <circle cx="28" cy="10" r="7" fill="#F79E1B" opacity="0.7" />
      <text x="40" y="13" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="4" fontFamily="Arial">MC</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER COMPONENT
   ═══════════════════════════════════════════════ */
export default function Footer() {
  const { setView } = useStore();

  const navigate = (view: 'home' | 'beats' | 'pricing' | 'licensing' | 'contact') => {
    setView(view);
  };

  return (
    <footer className="border-t border-[rgba(255,255,255,0.05)] relative overflow-hidden">
      {/* ─── Top Gold Accent Line ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
        style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 100%)', opacity: 0.4 }} />

      {/* ─── Main Footer Grid ─── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* ═══ BRAND COLUMN (span 4) ═══ */}
          <div className="lg:col-span-4">
            {/* Logo / Name */}
            <h2 className="text-xl md:text-2xl tracking-[3px] mb-3 text-white font-black uppercase">
              Randy<span className="text-[#d4af37]">productions</span>
            </h2>
            <p className="text-[#d4af37] text-xs font-semibold uppercase tracking-[2px] mb-5 opacity-70">
              Premium Beats &amp; Loop Kits
            </p>
            <p className="text-[rgba(255,255,255,0.35)] text-sm leading-relaxed mb-6 max-w-[280px]">
              High-quality beats crafted for the next generation of Drill, dark trap, and afrobeat artists. Every purchase includes WAV + Stems.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[rgba(255,255,255,0.5)] no-underline transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-0.5"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ═══ STORE LINKS (span 2) ═══ */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs uppercase tracking-[2px] font-bold mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#d4af37]" />
              Store
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {storeLinks.map(link => (
                <li key={link.view}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); navigate(link.view); }}
                    className="text-[rgba(255,255,255,0.4)] no-underline text-sm transition-all duration-300 hover:text-[#d4af37] hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate('home'); }}
                  className="text-[rgba(255,255,255,0.4)] no-underline text-sm transition-all duration-300 hover:text-[#d4af37] hover:translate-x-1 inline-block"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>

          {/* ═══ LICENSE INFO (span 2) ═══ */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs uppercase tracking-[2px] font-bold mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#d4af37]" />
              Licensing
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate('pricing'); }}
                  className="text-[rgba(255,255,255,0.4)] no-underline text-sm transition-all duration-300 hover:text-[#d4af37] hover:translate-x-1 inline-block"
                >
                  Pricing Tiers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate('licensing'); }}
                  className="text-[rgba(255,255,255,0.4)] no-underline text-sm transition-all duration-300 hover:text-[#d4af37] hover:translate-x-1 inline-block"
                >
                  License Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate('licensing'); }}
                  className="text-[rgba(255,255,255,0.4)] no-underline text-sm transition-all duration-300 hover:text-[#d4af37] hover:translate-x-1 inline-block"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* ═══ CONTACT (span 4) ═══ */}
          <div className="lg:col-span-4">
            <h3 className="text-white text-xs uppercase tracking-[2px] font-bold mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#d4af37]" />
              Contact
            </h3>

            {/* Email */}
            <a
              href="mailto:Sigmamotive11@gmail.com"
              className="inline-flex items-center gap-2.5 text-[rgba(255,255,255,0.4)] no-underline text-sm mb-4 transition-colors duration-300 hover:text-[#d4af37]"
            >
              <Mail size={14} className="text-[#d4af37] opacity-60" />
              Sigmamotive11@gmail.com
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/randyproductions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[rgba(255,255,255,0.4)] no-underline text-sm mb-4 transition-colors duration-300 hover:text-[#d4af37]"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[#d4af37] opacity-60">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @randyproductions
              <ExternalLink size={10} className="opacity-30" />
            </a>

            {/* Contact Page CTA */}
            <div className="mt-5">
              <button
                onClick={() => navigate('contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-[rgba(212,175,55,0.2)] text-[#d4af37] bg-[rgba(212,175,55,0.05)] hover:bg-[#d4af37] hover:text-[#050505] hover:border-[#d4af37]"
              >
                <Mail size={13} />
                Contact Page
              </button>
            </div>

            {/* Newsletter */}
            <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)]">
              <p className="text-[rgba(255,255,255,0.3)] text-xs uppercase tracking-wider mb-3">Stay Updated</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white rounded-l-lg rounded-r-none outline-none text-sm focus:border-[#d4af37] transition-colors placeholder:text-[rgba(255,255,255,0.2)]"
                />
                <button
                  type="submit"
                  className="px-4 bg-[#d4af37] border-none text-[#050505] rounded-r-lg cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                >
                  <ArrowRight size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ═══ PAYMENT SECTION ═══ */}
        <div className="border-t border-[rgba(255,255,255,0.05)] pt-10 pb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Secure Checkout */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.15)] flex items-center justify-center">
                <ShieldCheck size={16} className="text-[#d4af37]" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Secure Checkout</p>
                <p className="text-[rgba(255,255,255,0.3)] text-xs">256-bit SSL encryption. Your payment is safe.</p>
              </div>
            </div>

            {/* Payment Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <PaypalBadge />
              <VisaBadge />
              <MastercardBadge />
            </div>
          </div>
        </div>

        {/* ═══ LEGAL STRIP ═══ */}
        <div className="border-t border-[rgba(255,255,255,0.05)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-[rgba(255,255,255,0.25)] text-xs">
              &copy; {new Date().getFullYear()} Randyproductions. All rights reserved. Unauthorized use or reproduction is strictly prohibited.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {['Terms of Service', 'Privacy Policy', 'Refund Policy'].map(link => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[rgba(255,255,255,0.25)] no-underline text-xs transition-colors duration-300 hover:text-[#d4af37]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
