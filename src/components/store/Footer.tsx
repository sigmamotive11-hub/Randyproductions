'use client';

import { Mail, ExternalLink } from 'lucide-react';
import { useStore } from '@/store/use-store';

/* ═══════════════════════════════════════════════
   JAYCACTUS-INSPIRED FOOTER
   Two-zone layout: main content + legal bar.
   No divider lines — pure negative space.
   Left: brand + socials. Right: nav columns.
   ═══════════════════════════════════════════════ */

const storeLinks = [
  { label: 'Home', view: 'home' as const },
  { label: 'Beats', view: 'beats' as const },
  { label: 'Loop Kits', view: 'beats' as const },
  { label: 'Pricing', view: 'pricing' as const },
];

const infoLinks = [
  { label: 'Licensing', view: 'licensing' as const },
  { label: 'Contact', view: 'contact' as const },
  { label: 'FAQ', view: 'licensing' as const },
];

const legalLinks = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Refund Policy', href: '#' },
];

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/randyproductions?igsh=a2Y4YWdrMjV6ODNx&utm_source=qr',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@prod.randyy?_r=1&_t=ZN-95ydYMFaeE2',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

/* ─── Payment badge SVGs ─── */
function PaypalBadge() {
  return (
    <svg width="38" height="14" viewBox="0 0 38 14" fill="none">
      <rect width="38" height="14" rx="2" fill="rgba(255,255,255,0.04)" />
      <text x="19" y="10.5" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">PayPal</text>
    </svg>
  );
}

function VisaBadge() {
  return (
    <svg width="32" height="14" viewBox="0 0 32 14" fill="none">
      <rect width="32" height="14" rx="2" fill="rgba(255,255,255,0.04)" />
      <text x="16" y="10.5" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif" fontStyle="italic">VISA</text>
    </svg>
  );
}

function McBadge() {
  return (
    <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
      <rect width="28" height="14" rx="2" fill="rgba(255,255,255,0.04)" />
      <text x="14" y="10.5" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontWeight="700" fontFamily="system-ui, sans-serif">MC</text>
    </svg>
  );
}

export default function Footer() {
  const { setView } = useStore();
  const year = new Date().getFullYear();

  return (
    <>
      {/* ═══════════════════════════════════════
          ZONE 1 — MAIN FOOTER CONTENT
          ═══════════════════════════════════════ */}
      <footer style={{ background: '#080808' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-14 md:py-16">
          <div className="flex flex-col md:flex-row gap-12 md:gap-12">

            {/* ── LEFT: Brand + Socials ── */}
            <div className="md:max-w-[300px] shrink-0">
              {/* Brand name */}
              <h2 className="text-white text-lg font-bold tracking-wide uppercase mb-2">
                Randy<span className="text-[#d4af37]">productions</span>
              </h2>
              <p className="text-[rgba(255,255,255,0.35)] text-[15px] leading-relaxed mb-6">
                Premium beats &amp; loop kits for the next generation of artists. WAV + Stems included with every purchase.
              </p>

              {/* Social icons — JayCactus style: stroke icons, accent hover fill */}
              <div className="flex items-center gap-2.5">
                {socials.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    className="w-9 h-9 rounded-[6px] flex items-center justify-center text-[#d4af37] no-underline transition-all duration-150 hover:bg-[rgba(212,175,55,0.15)]"
                    style={{ background: 'transparent' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Navigation Columns ── */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-6 md:justify-items-start">

              {/* Store */}
              <div>
                <h4 className="text-[#d4af37] text-base font-medium tracking-wide mb-4">
                  Store
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  {storeLinks.map(link => (
                    <li key={link.label}>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setView(link.view); }}
                        className="text-[rgba(255,255,255,0.4)] no-underline text-[15px] leading-6 transition-colors duration-100 hover:text-[rgb(240,240,240)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info */}
              <div>
                <h4 className="text-[#d4af37] text-base font-medium tracking-wide mb-4">
                  Info
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  {infoLinks.map(link => (
                    <li key={link.label}>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setView(link.view); }}
                        className="text-[rgba(255,255,255,0.4)] no-underline text-[15px] leading-6 transition-colors duration-100 hover:text-[rgb(240,240,240)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-[#d4af37] text-base font-medium tracking-wide mb-4">
                  Contact
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  <li>
                    <a
                      href="mailto:Sigmamotive11@gmail.com"
                      className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.4)] no-underline text-[15px] leading-6 transition-colors duration-100 hover:text-[rgb(240,240,240)]"
                    >
                      <Mail size={14} className="shrink-0 opacity-60" />
                      Sigmamotive11@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/randyproductions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[rgba(255,255,255,0.4)] no-underline text-[15px] leading-6 transition-colors duration-100 hover:text-[rgb(240,240,240)]"
                    >
                      @randyproductions
                      <ExternalLink size={11} className="opacity-30" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@prod.Randyy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[rgba(255,255,255,0.4)] no-underline text-[15px] leading-6 transition-colors duration-100 hover:text-[rgb(240,240,240)]"
                    >
                      @prod.Randyy
                      <ExternalLink size={11} className="opacity-30" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════
          ZONE 2 — LEGAL / COPYRIGHT BAR
          Separate from footer, no divider line.
          ═══════════════════════════════════════ */}
      <div style={{ background: '#080808' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-5 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            {/* Left: Legal links */}
            <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
              {legalLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => e.preventDefault()}
                  className="text-[rgba(255,255,255,0.3)] no-underline text-[13px] transition-colors duration-100 hover:text-[rgba(255,255,255,0.55)]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Center: Payment badges */}
            <div className="flex items-center gap-2">
              <PaypalBadge />
              <VisaBadge />
              <McBadge />
            </div>

            {/* Right: Copyright */}
            <p className="text-[rgba(255,255,255,0.25)] text-[13px] whitespace-nowrap">
              &copy; {year} Randyproductions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
