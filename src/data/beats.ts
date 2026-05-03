export interface Beat {
  id: string;
  title: string;
  price: number;
  bpm: string;
  key: string;
  image: string;
  audio: string;
  tags: string[];
  wav_link?: string;
  stems_link?: string;
  created_at?: string;
}

export const fallbackBeats: Beat[] = [
  {
    id: 'b1',
    title: 'GHOST TOWN',
    price: 49.99,
    bpm: '142',
    key: 'C Min',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    tags: ['UK Drill', 'Dark'],
  },
  {
    id: 'b2',
    title: 'LONDON NIGHTS',
    price: 49.99,
    bpm: '144',
    key: 'D Min',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=500&auto=format&fit=crop',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    tags: ['NY Drill', 'Aggressive'],
  },
  {
    id: 'b3',
    title: 'OPIUM',
    price: 49.99,
    bpm: '155',
    key: 'F Min',
    image: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?q=80&w=500&auto=format&fit=crop',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    tags: ['Trap', 'Rage'],
  },
  {
    id: 'b4',
    title: 'LAGOS BREEZE',
    price: 49.99,
    bpm: '105',
    key: 'A Min',
    image: 'https://images.unsplash.com/photo-1516280440503-60f80874e444?q=80&w=500&auto=format&fit=crop',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    tags: ['Afrobeat', 'Vibe'],
  },
  {
    id: 'l1',
    title: 'DARK MATTER VOL. 1',
    price: 29.99,
    bpm: '-',
    key: '-',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop',
    audio: '',
    tags: ['Loop Kit', 'Drill Melodies'],
  },
];
