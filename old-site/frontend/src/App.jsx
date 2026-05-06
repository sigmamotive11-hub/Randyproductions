import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import PublicSite from './components/PublicSite';
import AdminStudio from './components/AdminStudio';
import ContactPage from './pages/ContactPage';
import LicensingPage from './pages/LicensingPage';
import PricingPage from './pages/PricingPage';
import BeatsPage from './pages/BeatsPage';
import { supabase } from './lib/supabase';
import { beats as initialBeats } from './assets/beats';

function App() {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBeat, setCurrentBeat] = useState(null);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(null);
  const [view, setView] = useState('public'); // 'public' | 'admin' | 'contact' | 'licensing' | 'pricing'

  useEffect(() => {
    fetchBeats();
  }, []);

  const fetchBeats = async () => {
    try {
      const { data, error } = await supabase
        .from('beats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map database snake_case names to camelCase for the frontend
      const formattedBeats = data.map(b => ({
        ...b,
        wavLink: b.wav_link,
        stemsLink: b.stems_link,
        // Fallback for image if null
        image: b.image || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop'
      }));

      setBeats(formattedBeats.length > 0 ? formattedBeats : initialBeats);
    } catch (err) {
      console.error('Error fetching beats:', err);
      setBeats(initialBeats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  const handlePlayBeat = (beat) => setCurrentBeat(beat);

  const handleBuyClick = (beat) => {
    if (!user) setShowAuth(true);
    else setShowCheckout(beat);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
    if (userData.isAdmin) setView('admin');
  };

  const handleCheckoutSubmit = () => {
    alert('Redirecting to PayPal... Webhook will deliver beat to ' + user.email);
    setShowCheckout(null);
  };

  if (view === 'admin' && user?.isAdmin) {
    return <AdminStudio user={user} beats={beats} setBeats={setBeats} onExit={() => setView('public')} />;
  }

  return (
    <div className="app-container">
      <Navbar onLoginClick={() => setShowAuth(true)} user={user} onAdminClick={() => setView('admin')} onNavigate={setView} />
      
      {view === 'public' && <PublicSite beats={beats} onPlay={handlePlayBeat} onBuy={handleBuyClick} onLoginClick={() => setShowAuth(true)} onNavigate={setView} />}
      {view === 'beats' && <BeatsPage beats={beats} onPlay={handlePlayBeat} onBuy={handleBuyClick} onNavigate={setView} />}
      {view === 'contact' && <ContactPage onBack={() => setView('public')} onNavigate={setView} />}
      {view === 'licensing' && <LicensingPage onBack={() => setView('public')} onNavigate={setView} />}
      {view === 'pricing' && <PricingPage onBack={() => setView('public')} onNavigate={setView} />}

      <AudioPlayer currentBeat={currentBeat} onBuyClick={handleBuyClick} />

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} />}
      {showCheckout && <CheckoutModal beat={showCheckout} user={user} onClose={() => setShowCheckout(null)} onCheckout={handleCheckoutSubmit} />}
    </div>
  );
}

export default App;
