import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePlayerContext } from '@/components/PlayerProvider';

export const PlayerBar: React.FC = () => {
  const { playerState, togglePlayPause, nextTrack, previousTrack, setVolume, seekTo, formatTime } = usePlayerContext();
  
  const { currentTrack, isPlaying, currentTime, volume } = playerState;

  if (!currentTrack) {
    return null;
  }

  const progressPercentage = currentTrack.duration > 0 ? (currentTime / currentTrack.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-music-player-bg border-t border-border p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <img 
            src={currentTrack.albumArt} 
            alt={currentTrack.album}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <Heart size={16} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={previousTrack}
              disabled={playerState.currentIndex <= 0}
            >
              <SkipBack size={18} />
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              onClick={togglePlayPause}
              className="bg-music-primary hover:bg-music-primary/90 text-white rounded-full w-10 h-10 p-0"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={nextTrack}
              disabled={playerState.currentIndex >= playerState.queue.length - 1}
            >
              <SkipForward size={18} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-muted-foreground">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[progressPercentage]}
              onValueChange={([value]) => {
                const newTime = (value / 100) * currentTrack.duration;
                seekTo(newTime);
              }}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <Volume2 size={16} className="text-muted-foreground" />
          <Slider
            value={[volume * 100]}
            onValueChange={([value]) => setVolume(value / 100)}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};