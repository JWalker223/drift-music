import React from 'react';
import { AlbumCard } from '@/components/AlbumCard';
import { TrackList } from '@/components/TrackList';
import { mockAlbums, mockTracks } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Play, TrendingUp, Clock } from 'lucide-react';

export const Home: React.FC = () => {
  const recentlyPlayed = mockTracks.slice(0, 3);
  const featuredAlbums = mockAlbums;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-music-primary/20 to-music-secondary/20 rounded-2xl p-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome back to your music
          </h1>
          <p className="text-muted-foreground mb-6">
            Discover your favorite tracks and explore new sounds in your personal music library.
          </p>
          <Button className="bg-music-primary hover:bg-music-primary/90 text-white">
            <Play size={18} className="mr-2" />
            Continue Listening
          </Button>
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <div className="flex items-center space-x-2 mb-4">
          <Clock size={20} className="text-music-primary" />
          <h2 className="text-2xl font-bold text-foreground">Recently Played</h2>
        </div>
        <TrackList tracks={recentlyPlayed} />
      </section>

      {/* Featured Albums */}
      <section>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp size={20} className="text-music-primary" />
          <h2 className="text-2xl font-bold text-foreground">Your Albums</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {featuredAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* All Tracks */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">All Tracks</h2>
        <TrackList tracks={mockTracks} />
      </section>
    </div>
  );
};