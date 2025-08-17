import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { PlayerBar } from '@/components/PlayerBar';

export const Layout: React.FC = () => {
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