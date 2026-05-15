'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/use-store';

interface Purchase {
  id: string;
  beat_id: string;
  beat_title: string;
  beat_image: string;
  buyer_email: string;
  amount: number;
  currency: string;
  paypal_order_id: string;
  created_at: string;
}

export default function PurchasesPage() {
  const { user } = useStore();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    fetch('/api/purchases?email=' + encodeURIComponent(user.email))
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPurchases(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-[#888] text-lg mb-4">You need to be logged in to view purchases.</p>
          <button onClick={() => useStore.getState().setShowAuth(true)}
            className="btn-gold px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-16 max-w-[900px] mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Purchases</h1>
      <p className="text-[#888] text-sm mb-10">All orders linked to {user.email}</p>

      {purchases.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <h3 className="text-xl font-bold mb-2">No purchases yet</h3>
          <p className="text-[#888] text-sm mb-6">When you buy a beat, it will show up here with your order details.</p>
          <button onClick={() => useStore.getState().setView('beats')}
            className="btn-gold px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider">
            Browse Catalog
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {purchases.map(p => (
            <div key={p.id} className="glass-card rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img src={p.beat_image} className="w-16 h-16 rounded object-cover shrink-0" alt="" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{p.beat_title}</h3>
                <p className="text-[#888] text-xs mt-1">
                  {new Date(p.created_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </p>
                <p className="text-[#555] text-xs mt-0.5">Order: {p.paypal_order_id.slice(0, 12)}...</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[#d4af37] font-bold text-lg">${p.amount}</p>
                <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Purchased</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
