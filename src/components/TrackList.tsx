import React from 'react';
import { Play, Pause, MoreHorizontal } from 'lucide-react';
import { Track } from '@/types/music';
import { Button } from '@/components/ui/button';
import { usePlayerContext } from '@/components/PlayerProvider';

interface TrackListProps {
  tracks: Track[];
  showArtist?: boolean;
  showAlbum?: boolean;
}

export const TrackList: React.FC<TrackListProps> = ({ 
  tracks, 
  showArtist = true, 
  showAlbum = true 
}) => {
  const { playerState, playTrack, togglePlayPause, formatTime } = usePlayerContext();

  const handleTrackClick = (track: Track, index: number) => {
    if (playerState.currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      playTrack(track, tracks, index);
    }
  };

  return (
    <div className="space-y-1">
      {tracks.map((track, index) => {
        const isCurrentTrack = playerState.currentTrack?.id === track.id;
        const isPlaying = isCurrentTrack && playerState.isPlaying;

        return (
          <div
            key={track.id}
            className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-music-hover transition-colors cursor-pointer"
            onClick={() => handleTrackClick(track, index)}
          >
            {/* Track Number / Play Button */}
            <div className="w-8 flex items-center justify-center">
              {isPlaying ? (
                <Pause size={14} className="text-music-primary" />
              ) : (
                <>
                  <span className="text-sm text-muted-foreground group-hover:hidden">
                    {index + 1}
                  </span>
                  <Play size={14} className="text-foreground hidden group-hover:block" />
                </>
              )}
            </div>

            {/* Album Art */}
            <img 
              src={track.albumArt} 
              alt={track.album}
              className="w-10 h-10 rounded object-cover"
            />

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium truncate ${
                    isCurrentTrack ? 'text-music-primary' : 'text-foreground'
                  }`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {showArtist && track.artist}
                    {showArtist && showAlbum && ' • '}
                    {showAlbum && track.album}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(track.duration)}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle track options
                    }}
                  >
                    <MoreHorizontal size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};