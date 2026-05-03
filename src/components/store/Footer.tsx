'use client';

import { Mail, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/use-store';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/randyproductions?igsh=a2Y4YWdrMjV6ODNx&utm_source=qr',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@prod.Randyy',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@prod.randyy?_r=1&_t=ZN-95ydYMFaeE2',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    ),
  },
];

export default function Footer() {
  const { setView } = useStore();

  return (
    <footer className="border-t border-[rgba(255,255,255,0.05)] pt-20 pb-10 px-6 md:px-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
        style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 100%)', opacity: 0.3 }} />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr] gap-12 md:gap-16 mb-16">
        {/* Brand */}
        <div>
          <h2 className="text-xl tracking-[3px] mb-4 text-white font-bold">RANDYPRODUCTIONS</h2>
          <p className="text-[#888] italic mb-6">Premium beats for serious artists</p>
          <div className="flex gap-4">
            {socialLinks.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" title={s.name}
                className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white no-underline transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:-translate-y-0.5">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-sm uppercase tracking-[1px] font-bold mb-4">Navigation</h3>
          {(['home', 'beats', 'pricing', 'licensing', 'contact'] as const).map(v => (
            <a key={v} href="#" onClick={(e) => { e.preventDefault(); setView(v); }}
              className="text-[#888] no-underline transition-colors duration-300 hover:text-[#d4af37] capitalize text-sm">
              {v === 'beats' ? 'Catalog' : v}
            </a>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white text-sm uppercase tracking-[1px] font-bold mb-4">Stay Updated</h3>
          <p className="text-[#888] text-sm mb-5">Get exclusive beats, loop kits, and discounts.</p>
          <form className="flex mb-5" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required
              className="flex-1 px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white rounded-l rounded-r-none outline-none text-sm focus:border-[#d4af37] transition-colors" />
            <button type="submit" className="px-5 bg-[#d4af37] border-none text-black rounded-r cursor-pointer transition-colors hover:bg-white">
              <ArrowRight size={16} />
            </button>
          </form>
          <a href="mailto:Sigmamotive11@gmail.com" className="inline-flex items-center gap-2 text-[#d4af37] no-underline text-sm">
            <Mail size={14} /> Sigmamotive11@gmail.com
          </a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row justify-between items-center gap-4 text-[#888] text-xs">
        <p>&copy; {new Date().getFullYear()} Randyproductions. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="text-[#888] no-underline hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-[#888] no-underline hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-[#888] no-underline hover:text-white transition-colors">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
