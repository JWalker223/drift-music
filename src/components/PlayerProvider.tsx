import React, { createContext, useContext, useState } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import { Track, PlayerState } from '@/types/music';

interface PlayerContextType {
  playerState: PlayerState;
  playTrack: (track: Track, queue?: Track[], startIndex?: number) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  formatTime: (seconds: number) => string;
  showNowPlaying: boolean;
  setShowNowPlaying: (show: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const player = usePlayer();
  const [showNowPlaying, setShowNowPlaying] = useState(false);

  return (
    <PlayerContext.Provider value={{ ...player, showNowPlaying, setShowNowPlaying }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};