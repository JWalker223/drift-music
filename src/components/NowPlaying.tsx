import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePlayerContext } from '@/components/PlayerProvider';

export const NowPlaying: React.FC = () => {
  const { 
    playerState, 
    togglePlayPause, 
    nextTrack, 
    previousTrack, 
    setVolume, 
    seekTo, 
    formatTime,
    setShowNowPlaying 
  } = usePlayerContext();
  
  const { currentTrack, isPlaying, currentTime, volume } = playerState;

  if (!currentTrack) {
    return null;
  }

  const progressPercentage = currentTrack.duration > 0 ? (currentTime / currentTrack.duration) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Now Playing</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowNowPlaying(false)}
        >
          <X size={20} />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-2xl mx-auto w-full">
        {/* Album Art */}
        <div className="relative mb-8">
          <img 
            src={currentTrack.albumArt} 
            alt={currentTrack.album}
            className="w-80 h-80 md:w-96 md:h-96 rounded-2xl shadow-2xl object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
        </div>

        {/* Track Info */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {currentTrack.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-1">
            {currentTrack.artist}
          </p>
          <p className="text-lg text-muted-foreground">
            {currentTrack.album}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-8">
          <Slider
            value={[progressPercentage]}
            onValueChange={([value]) => {
              const newTime = (value / 100) * currentTrack.duration;
              seekTo(newTime);
            }}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6 mb-8">
          <Button variant="ghost" size="lg">
            <Heart size={24} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg"
            onClick={previousTrack}
            disabled={playerState.currentIndex <= 0}
          >
            <SkipBack size={28} />
          </Button>
          
          <Button 
            variant="default" 
            size="lg"
            onClick={togglePlayPause}
            className="bg-music-primary hover:bg-music-primary/90 text-white rounded-full w-16 h-16 p-0"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg"
            onClick={nextTrack}
            disabled={playerState.currentIndex >= playerState.queue.length - 1}
          >
            <SkipForward size={28} />
          </Button>

          <Button variant="ghost" size="lg">
            <Heart size={24} />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-4 w-full max-w-xs">
          <Volume2 size={20} className="text-muted-foreground" />
          <Slider
            value={[volume * 100]}
            onValueChange={([value]) => setVolume(value / 100)}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};