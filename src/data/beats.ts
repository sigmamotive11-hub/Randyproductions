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

export const fallbackBeats: Beat[] = [];
