import { Track, Album, Artist, Playlist } from '@/types/music';
import album1 from '@/assets/album1.jpg';
import album2 from '@/assets/album2.jpg';
import album3 from '@/assets/album3.jpg';

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Reverie',
    artist: 'The Velvet Dreams',
    album: 'Nocturnal Echoes',
    duration: 245,
    albumArt: album1,
  },
  {
    id: '2',
    title: 'Electric Pulse',
    artist: 'Neon Cascade',
    album: 'Digital Horizons',
    duration: 198,
    albumArt: album2,
  },
  {
    id: '3',
    title: 'Smooth Operator',
    artist: 'Blue Note Collective',
    album: 'Urban Jazz Sessions',
    duration: 287,
    albumArt: album3,
  },
  {
    id: '4',
    title: 'Crystal Waters',
    artist: 'The Velvet Dreams',
    album: 'Nocturnal Echoes',
    duration: 223,
    albumArt: album1,
  },
  {
    id: '5',
    title: 'Neon Nights',
    artist: 'Neon Cascade',
    album: 'Digital Horizons',
    duration: 156,
    albumArt: album2,
  },
  {
    id: '6',
    title: 'Late Night Drive',
    artist: 'Blue Note Collective',
    album: 'Urban Jazz Sessions',
    duration: 312,
    albumArt: album3,
  },
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Nocturnal Echoes',
    artist: 'The Velvet Dreams',
    year: 2023,
    albumArt: album1,
    tracks: mockTracks.filter(track => track.album === 'Nocturnal Echoes'),
  },
  {
    id: '2',
    title: 'Digital Horizons',
    artist: 'Neon Cascade',
    year: 2024,
    albumArt: album2,
    tracks: mockTracks.filter(track => track.album === 'Digital Horizons'),
  },
  {
    id: '3',
    title: 'Urban Jazz Sessions',
    artist: 'Blue Note Collective',
    year: 2022,
    albumArt: album3,
    tracks: mockTracks.filter(track => track.album === 'Urban Jazz Sessions'),
  },
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'The Velvet Dreams',
    albums: mockAlbums.filter(album => album.artist === 'The Velvet Dreams'),
    image: album1,
  },
  {
    id: '2',
    name: 'Neon Cascade',
    albums: mockAlbums.filter(album => album.artist === 'Neon Cascade'),
    image: album2,
  },
  {
    id: '3',
    name: 'Blue Note Collective',
    albums: mockAlbums.filter(album => album.artist === 'Blue Note Collective'),
    image: album3,
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    tracks: [mockTracks[0], mockTracks[2], mockTracks[5]],
    createdAt: new Date(),
    description: 'Perfect for relaxing evenings',
  },
  {
    id: '2',
    name: 'Workout Mix',
    tracks: [mockTracks[1], mockTracks[4]],
    createdAt: new Date(),
    description: 'High energy tracks for the gym',
  },
];