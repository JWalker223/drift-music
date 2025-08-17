import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Library, ListMusic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-card border-b border-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
            Sonique
          </h1>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/library" 
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-music-hover text-music-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-music-hover'
                }`
              }
            >
              <Library size={18} />
              <span>Library</span>
            </NavLink>
            
            <NavLink 
              to="/playlists" 
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-music-hover text-music-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-music-hover'
                }`
              }
            >
              <ListMusic size={18} />
              <span>Playlists</span>
            </NavLink>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search for songs, artists, albums..." 
              className="pl-10 w-64 bg-secondary border-border"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};