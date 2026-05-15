'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/use-store';
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
import PurchasesPage from '@/components/store/PurchasesPage';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function Home() {
  const { view, beats, setBeats, setLoading, loading, user } = useStore();
  const fetchedRef = useRef(false);

  // Load beats — use fallback immediately, then try Supabase in background
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    setBeats(fallbackBeats);
    setLoading(false);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    (async () => {
      try {
        const { data } = await fetch(
          process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/beats?select=*&order=created_at.desc',
          {
            headers: {
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
              Authorization: 'Bearer ' + (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''),
            },
            signal: controller.signal,
          }
        ).then(r => r.json());

        if (data && Array.isArray(data) && data.length > 0) {
          const formatted = data.map((b) => ({
            ...b,
            wav_link: b.wav_link || '',
            stems_link: b.stems_link || '',
            image: b.image || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop',
          }));
          setBeats(formatted);
        }
      } catch {
        // Keep fallback beats
      } finally {
        clearTimeout(timeout);
      }
    })();
  }, [setBeats, setLoading]);

  // Auto-scroll on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [view]);

  // Admin dashboard — only for admin
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
            {view === 'purchases' && <PurchasesPage />}
          </>
        )}
      </main>

      {view !== 'admin' && <Footer />}

      <AudioPlayer />
      <AuthModal />
      <CheckoutModal />
    </div>
  );
}
