'use client';

import { Mail, Instagram } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16">
      <div className="max-w-[800px] mx-auto text-center">
        <h1 className="section-title mb-12">Contact <span>Me</span></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Business Inquiries */}
          <div className="glass-card rounded-lg p-10 flex flex-col items-center justify-between min-h-[320px]">
            <div>
              <div className="w-14 h-14 rounded-full border border-[#d4af37] flex items-center justify-center mx-auto mb-5">
                <Mail size={24} className="text-[#d4af37]" />
              </div>
              <h3 className="text-[#d4af37] text-xl font-bold mb-3">Business Inquiries</h3>
              <p className="text-white text-lg">Sigmamotive11@gmail.com</p>
            </div>
            <a href="mailto:Sigmamotive11@gmail.com"
              className="btn-gold w-full mt-8 text-center no-underline block py-3">
              Email Now
            </a>
          </div>

          {/* Instagram */}
          <div className="glass-card rounded-lg p-10 flex flex-col items-center justify-between min-h-[320px]">
            <div>
              <div className="w-14 h-14 rounded-full border border-[#d4af37] flex items-center justify-center mx-auto mb-5">
                <Instagram size={24} className="text-[#d4af37]" />
              </div>
              <h3 className="text-[#d4af37] text-xl font-bold mb-3">Instagram</h3>
              <p className="text-[#888] text-base">DMs are open for collabs &amp; questions.</p>
            </div>
            <a href="https://www.instagram.com/randyproductions?igsh=a2Y4YWdrMjV6ODNx&utm_source=qr"
              target="_blank" rel="noopener noreferrer"
              className="btn-gold w-full mt-8 text-center no-underline block py-3">
              Send a DM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
