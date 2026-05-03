'use client';

import { useStore, type View } from '@/store/use-store';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems: { label: string; view: View }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Catalog', view: 'beats' },
  { label: 'Pricing', view: 'pricing' },
  { label: 'Licensing', view: 'licensing' },
  { label: 'Contact', view: 'contact' },
];

export default function Navbar() {
  const { view, setView, user, setShowAuth } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (v: View) => {
    setView(v);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-16 py-5 flex justify-between items-center"
      style={{ background: 'rgba(5, 5, 5, 0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212, 175, 55, 0.15)' }}>
      
      <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}
        className="text-white text-xl md:text-2xl font-black tracking-[4px] no-underline"
        style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
        RANDYPRODUCTIONS
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-10">
        {navItems.map((item) => (
          <a key={item.view} href="#" onClick={(e) => { e.preventDefault(); navigate(item.view); }}
            className={`no-underline text-xs font-semibold uppercase tracking-[2px] transition-colors duration-300 ${
              view === item.view ? 'text-[#d4af37]' : 'text-[#888] hover:text-[#d4af37]'
            }`}>
            {item.label}
          </a>
        ))}
        {user ? (
          <button onClick={() => navigate('admin')}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[1px] border border-[#d4af37] bg-[#d4af37] text-[#050505] cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            style={{ boxShadow: 'none' }}>
            Admin Studio
          </button>
        ) : (
          <button onClick={() => setShowAuth(true)}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[1px] border border-[#d4af37] text-[#d4af37] bg-transparent cursor-pointer transition-all duration-300 hover:bg-[#d4af37] hover:text-[#050505]">
            Sign Up / Login
          </button>
        )}
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white bg-transparent border-none cursor-pointer p-2">
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full flex flex-col items-center gap-6 py-8"
          style={{ background: 'rgba(5, 5, 5, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212, 175, 55, 0.15)' }}>
          {navItems.map((item) => (
            <a key={item.view} href="#" onClick={(e) => { e.preventDefault(); navigate(item.view); }}
              className={`no-underline text-sm font-semibold uppercase tracking-[2px] transition-colors duration-300 ${
                view === item.view ? 'text-[#d4af37]' : 'text-[#888] hover:text-[#d4af37]'
              }`}>
              {item.label}
            </a>
          ))}
          {!user && (
            <button onClick={() => { setShowAuth(true); setMobileOpen(false); }}
              className="btn-outline text-xs px-6 py-2.5 rounded-full">
              Sign Up / Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
