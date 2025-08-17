import React from 'react';
import { Play } from 'lucide-react';
import { Album } from '@/types/music';
import { Button } from '@/components/ui/button';
import { usePlayerContext } from '@/components/PlayerProvider';

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const { playTrack } = usePlayerContext();

  const handlePlay = () => {
    if (album.tracks.length > 0) {
      playTrack(album.tracks[0], album.tracks, 0);
    }
  };

  return (
    <div className="group relative bg-card hover:bg-music-hover transition-all duration-300 rounded-xl p-4 cursor-pointer">
      <div className="relative">
        <img 
          src={album.albumArt} 
          alt={album.title}
          className="w-full aspect-square object-cover rounded-lg mb-3 shadow-lg"
        />
        <Button
          variant="default"
          size="sm"
          onClick={handlePlay}
          className="absolute bottom-2 right-2 bg-music-primary hover:bg-music-primary/90 text-white rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        >
          <Play size={16} className="ml-0.5" />
        </Button>
      </div>
      
      <div>
        <h3 className="font-semibold text-foreground text-sm mb-1 truncate">
          {album.title}
        </h3>
        <p className="text-muted-foreground text-xs truncate">
          {album.artist} • {album.year}
        </p>
      </div>
    </div>
  );
};