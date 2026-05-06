import { Mail, ArrowRight } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer section">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2 className="footer-logo">RANDYPRODUCTIONS</h2>
          <p className="footer-tagline">Premium beats for serious artists</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/randyproductions?igsh=a2Y4YWdrMjV6ODNx&utm_source=qr" target="_blank" rel="noopener noreferrer" title="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.youtube.com/@prod.Randyy" target="_blank" rel="noopener noreferrer" title="YouTube">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@prod.randyy?_r=1&_t=ZN-95ydYMFaeE2" target="_blank" rel="noopener noreferrer" title="TikTok">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <h3>Navigation</h3>
          <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('public'); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('beats'); }}>Beats</a>
          <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('licensing'); }}>Licensing</a>
          <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('pricing'); }}>Pricing</a>
          <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('contact'); }}>Contact</a>
        </div>

        <div className="footer-newsletter">
          <h3>Stay Updated</h3>
          <p>Get exclusive beats, loop kits, and discounts.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit"><ArrowRight size={18} /></button>
          </form>
          <a href="mailto:Sigmamotive11@gmail.com" className="footer-contact-link"><Mail size={16} /> Sigmamotive11@gmail.com</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Randyproductions. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
