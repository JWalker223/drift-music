export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  albumArt?: string;
  url?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year?: number;
  albumArt?: string;
  tracks: Track[];
}

export interface Artist {
  id: string;
  name: string;
  albums: Album[];
  image?: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  createdAt: Date;
  description?: string;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  queue: Track[];
  currentIndex: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
}