import { useState, useCallback, useRef, useEffect } from 'react';
import { Track, PlayerState } from '@/types/music';

export const usePlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 1,
    currentTime: 0,
    queue: [],
    currentIndex: -1,
    shuffle: false,
    repeat: 'none',
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = useCallback((track: Track, queue: Track[] = [track], startIndex = 0) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      queue,
      currentIndex: startIndex,
      isPlaying: true,
    }));
  }, []);

  const togglePlayPause = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }, []);

  const nextTrack = useCallback(() => {
    setPlayerState(prev => {
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex < prev.queue.length) {
        return {
          ...prev,
          currentIndex: nextIndex,
          currentTrack: prev.queue[nextIndex],
        };
      }
      return prev;
    });
  }, []);

  const previousTrack = useCallback(() => {
    setPlayerState(prev => {
      const prevIndex = prev.currentIndex - 1;
      if (prevIndex >= 0) {
        return {
          ...prev,
          currentIndex: prevIndex,
          currentTrack: prev.queue[prevIndex],
        };
      }
      return prev;
    });
  }, []);

  const setVolume = useCallback((volume: number) => {
    setPlayerState(prev => ({
      ...prev,
      volume: Math.max(0, Math.min(1, volume)),
    }));
  }, []);

  const seekTo = useCallback((time: number) => {
    setPlayerState(prev => ({
      ...prev,
      currentTime: time,
    }));
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Simulate audio playback for demo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (playerState.isPlaying && playerState.currentTrack) {
      interval = setInterval(() => {
        setPlayerState(prev => {
          const newTime = prev.currentTime + 1;
          if (newTime >= (prev.currentTrack?.duration || 0)) {
            // Auto-play next track
            const nextIndex = prev.currentIndex + 1;
            if (nextIndex < prev.queue.length) {
              return {
                ...prev,
                currentIndex: nextIndex,
                currentTrack: prev.queue[nextIndex],
                currentTime: 0,
              };
            } else {
              return {
                ...prev,
                isPlaying: false,
                currentTime: 0,
              };
            }
          }
          return {
            ...prev,
            currentTime: newTime,
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playerState.isPlaying, playerState.currentTrack]);

  return {
    playerState,
    playTrack,
    togglePlayPause,
    nextTrack,
    previousTrack,
    setVolume,
    seekTo,
    formatTime,
  };
};