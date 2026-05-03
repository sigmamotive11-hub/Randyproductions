'use client';

import { Mail, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { useStore } from '@/store/use-store';

/* ═══════════════════════════════════════════════
   JAYCACTUS-STYLE FOOTER
   Clean, minimal, dark. Simple columns. No clutter.
   ═══════════════════════════════════════════════ */

const navLinks = [
  { label: 'Home', view: 'home' as const },
  { label: 'Beats', view: 'beats' as const },
  { label: 'Pricing', view: 'pricing' as const },
  { label: 'Licensing', view: 'licensing' as const },
  { label: 'Contact', view: 'contact' as const },
];

const legalLinks = ['Terms of Service', 'Privacy Policy', 'Refund Policy'];

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/randyproductions?igsh=a2Y4YWdrMjV6ODNx&utm_source=qr',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@prod.randyy?_r=1&_t=ZN-95ydYMFaeE2',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { setView } = useStore();
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#0a0a0a' }}>
      {/* ─── Main Content ─── */}
      <div className="max-w-[1100px] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ═══ 1. BRAND ═══ */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-white text-base font-bold tracking-wide uppercase mb-3">
              Randyproductions
            </h3>
            <p className="text-[rgba(255,255,255,0.3)] text-sm leading-relaxed mb-5 max-w-[240px]">
              Premium beats &amp; loop kits for the next generation of artists. Every purchase includes WAV + Stems.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[rgba(255,255,255,0.3)] no-underline transition-colors duration-200 hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ═══ 2. QUICK LINKS ═══ */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[2px] mb-4">
              Quick Links
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {navLinks.map(link => (
                <li key={link.view}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setView(link.view); }}
                    className="text-[rgba(255,255,255,0.3)] no-underline text-sm transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ═══ 3. CONTACT ═══ */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[2px] mb-4">
              Contact
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li>
                <a
                  href="mailto:Sigmamotive11@gmail.com"
                  className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.3)] no-underline text-sm transition-colors duration-200 hover:text-white"
                >
                  <Mail size={13} /> Sigmamotive11@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/randyproductions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.3)] no-underline text-sm transition-colors duration-200 hover:text-white"
                >
                  @randyproductions
                  <ExternalLink size={10} className="opacity-40" />
                </a>
              </li>
            </ul>
          </div>

          {/* ═══ 4. NEWSLETTER ═══ */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[2px] mb-4">
              Stay Updated
            </h4>
            <p className="text-[rgba(255,255,255,0.25)] text-xs mb-3 leading-relaxed">
              Get notified about new beats, kits, and exclusive discounts.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                required
                className="flex-1 min-w-0 px-3 py-2 text-white text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '4px 0 0 4px',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                className="px-3 border-none cursor-pointer transition-colors duration-200"
                style={{
                  background: '#d4af37',
                  borderRadius: '0 4px 4px 0',
                  color: '#050505',
                }}
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="max-w-[1100px] mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-[rgba(255,255,255,0.2)] text-xs">
            &copy; {year} Randyproductions. All rights reserved.
          </p>

          {/* Legal */}
          <div className="flex items-center gap-5">
            {legalLinks.map(link => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[rgba(255,255,255,0.2)] no-underline text-xs transition-colors duration-200 hover:text-[rgba(255,255,255,0.5)]"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2">
            <span className="text-[rgba(255,255,255,0.15)] text-[10px] uppercase tracking-wider mr-1">Secure</span>
            <ShieldCheck size={12} className="text-[rgba(255,255,255,0.2)]" />
            {/* Simple text badges instead of SVGs — cleaner */}
            <span className="text-[rgba(255,255,255,0.2)] text-[10px] font-semibold tracking-wide"
              style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '2px' }}>
              PayPal
            </span>
            <span className="text-[rgba(255,255,255,0.2)] text-[10px] font-bold tracking-wide italic"
              style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '2px' }}>
              VISA
            </span>
            <span className="text-[rgba(255,255,255,0.2)] text-[10px] font-semibold tracking-wide"
              style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '2px' }}>
              MC
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
