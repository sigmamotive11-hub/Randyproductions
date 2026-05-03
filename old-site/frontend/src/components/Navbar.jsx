export default function Navbar({ onLoginClick, user, onAdminClick, onNavigate }) {
  return (
    <nav className="navbar" style={{ background: 'var(--glass-bg)' }}>
      <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('public'); }} className="nav-logo" style={{ textDecoration: 'none', color: 'white', letterSpacing: '2px' }}>RANDYPRODUCTIONS</a>
      <div className="nav-links">
        <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('beats'); }}>Catalog</a>
        <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('licensing'); }}>Licensing</a>
        <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('pricing'); }}>Pricing</a>
        <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('contact'); }}>Contact</a>
        {user ? (
          <button className="nav-auth-btn" onClick={user.isAdmin ? onAdminClick : null} style={{ color: 'var(--bg-dark)', background: 'var(--accent-gold)' }}>
            {user.isAdmin ? 'Admin Studio' : 'My Account'}
          </button>
        ) : (
          <button className="nav-auth-btn" onClick={onLoginClick}>Sign Up / Login</button>
        )}
      </div>
    </nav>
  );
}
