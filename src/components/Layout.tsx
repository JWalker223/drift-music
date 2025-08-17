import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { PlayerBar } from '@/components/PlayerBar';
import { NowPlaying } from '@/components/NowPlaying';
import { usePlayerContext } from '@/components/PlayerProvider';

export const Layout: React.FC = () => {
  const { showNowPlaying } = usePlayerContext();
  
  if (showNowPlaying) {
    return <NowPlaying />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <PlayerBar />
    </div>
  );
};