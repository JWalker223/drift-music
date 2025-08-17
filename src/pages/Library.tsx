import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlbumCard } from '@/components/AlbumCard';
import { TrackList } from '@/components/TrackList';
import { mockAlbums, mockArtists, mockTracks } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { usePlayerContext } from '@/components/PlayerProvider';

export const Library: React.FC = () => {
  const { playTrack } = usePlayerContext();
  const [activeTab, setActiveTab] = useState('albums');

  const handlePlayAll = () => {
    if (mockTracks.length > 0) {
      playTrack(mockTracks[0], mockTracks, 0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Your Library</h1>
        <Button onClick={handlePlayAll} className="bg-music-primary hover:bg-music-primary/90 text-white">
          <Play size={18} className="mr-2" />
          Play All
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="tracks">Tracks</TabsTrigger>
        </TabsList>

        <TabsContent value="albums" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mockAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mockArtists.map((artist) => (
              <div
                key={artist.id}
                className="group bg-card hover:bg-music-hover transition-all duration-300 rounded-xl p-4 cursor-pointer text-center"
              >
                <div className="relative mb-3">
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-full aspect-square object-cover rounded-full shadow-lg"
                  />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 truncate">
                  {artist.name}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {artist.albums.length} album{artist.albums.length !== 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tracks" className="space-y-6">
          <TrackList tracks={mockTracks} />
        </TabsContent>
      </Tabs>
    </div>
  );
};