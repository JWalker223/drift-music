import React from 'react';
import { Plus, ListMusic, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrackList } from '@/components/TrackList';
import { mockPlaylists } from '@/data/mockData';
import { usePlayerContext } from '@/components/PlayerProvider';

export const Playlists: React.FC = () => {
  const { playTrack } = usePlayerContext();

  const handlePlayPlaylist = (playlist: any) => {
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0], playlist.tracks, 0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Your Playlists</h1>
        <Button className="bg-music-primary hover:bg-music-primary/90 text-white">
          <Plus size={18} className="mr-2" />
          Create Playlist
        </Button>
      </div>

      <div className="grid gap-6">
        {mockPlaylists.map((playlist) => (
          <Card key={playlist.id} className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-music-primary/20 p-3 rounded-lg">
                    <ListMusic size={24} className="text-music-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">{playlist.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {playlist.tracks.length} song{playlist.tracks.length !== 1 ? 's' : ''}
                      {playlist.description && ` • ${playlist.description}`}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handlePlayPlaylist(playlist)}
                  className="bg-music-primary hover:bg-music-primary/90 text-white rounded-full w-12 h-12 p-0"
                >
                  <Play size={18} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <TrackList tracks={playlist.tracks} />
            </CardContent>
          </Card>
        ))}

        {/* Create New Playlist Card */}
        <Card className="bg-card border-border border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="bg-music-primary/20 p-4 rounded-full mb-4">
              <Plus size={32} className="text-music-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Create Your First Playlist</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start building your perfect collection of songs
            </p>
            <Button className="bg-music-primary hover:bg-music-primary/90 text-white">
              Create Playlist
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};