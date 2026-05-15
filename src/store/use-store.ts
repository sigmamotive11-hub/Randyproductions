import { create } from 'zustand';
import type { Beat } from '@/data/beats';

export type View = 'home' | 'beats' | 'pricing' | 'licensing' | 'contact' | 'admin' | 'purchases';

interface StoreState {
  // View routing
  view: View;
  setView: (v: View) => void;

  // Beats
  beats: Beat[];
  setBeats: (b: Beat[]) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;

  // Player
  currentBeat: Beat | null;
  setCurrentBeat: (b: Beat | null) => void;

  // Auth
  user: { email: string; isAdmin: boolean } | null;
  setUser: (u: { email: string; isAdmin: boolean } | null) => void;

  // Modals
  showAuth: boolean;
  setShowAuth: (v: boolean) => void;
  showCheckout: Beat | null;
  setShowCheckout: (b: Beat | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  view: 'home',
  setView: (v) => {
    set({ view: v });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  },

  beats: [],
  setBeats: (b) => set({ beats: b }),
  loading: true,
  setLoading: (l) => set({ loading: l }),

  currentBeat: null,
  setCurrentBeat: (b) => set({ currentBeat: b }),

  user: null,
  setUser: (u) => set({ user: u }),

  showAuth: false,
  setShowAuth: (v) => set({ showAuth: v }),
  showCheckout: null,
  setShowCheckout: (b) => set({ showCheckout: b }),
}));
