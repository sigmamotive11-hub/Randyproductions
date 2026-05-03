'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/use-store';
import { supabase } from '@/lib/supabase';
import { fallbackBeats } from '@/data/beats';

import Navbar from '@/components/store/Navbar';
import Footer from '@/components/store/Footer';
import AudioPlayer from '@/components/store/AudioPlayer';
import AuthModal from '@/components/store/AuthModal';
import CheckoutModal from '@/components/store/CheckoutModal';

import HomePage from '@/components/store/HomePage';
import BeatsPage from '@/components/store/BeatsPage';
import PricingPage from '@/components/store/PricingPage';
import LicensingPage from '@/components/store/LicensingPage';
import ContactPage from '@/components/store/ContactPage';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function Home() {
  const { view, beats, setBeats, setLoading, loading, user } = useStore();

  // Fetch beats from Supabase on mount (only for non-admin views)
  useEffect(() => {
    if (beats.length > 0) return;
    const fetchBeats = async () => {
      try {
        const { data, error } = await supabase
          .from('beats')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          const formatted = data.map((b: Record<string, unknown>) => ({
            ...b,
            wav_link: b.wav_link || '',
            stems_link: b.stems_link || '',
            image: b.image || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop',
          }));
          setBeats(formatted);
        } else {
          setBeats(fallbackBeats);
        }
      } catch {
        setBeats(fallbackBeats);
      } finally {
        setLoading(false);
      }
    };
    fetchBeats();
  }, [beats.length, setBeats, setLoading]);

  // Auto-scroll on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [view]);

  // If logged in as admin and on admin view, show admin dashboard
  if (view === 'admin' && user?.isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#888] text-sm">Loading beats...</p>
            </div>
          </div>
        ) : (
          <>
            {view === 'home' && <HomePage />}
            {view === 'beats' && <BeatsPage />}
            {view === 'pricing' && <PricingPage />}
            {view === 'licensing' && <LicensingPage />}
            {view === 'contact' && <ContactPage />}
          </>
        )}
      </main>

      {/* Only show footer on non-admin, non-home views */}
      {view !== 'home' && view !== 'admin' && <Footer />}

      <AudioPlayer />
      <AuthModal />
      <CheckoutModal />
    </div>
  );
}
