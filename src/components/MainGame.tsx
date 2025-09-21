import React, { useState, useEffect } from 'react';
import { LogOut, Trophy, User } from 'lucide-react';
import { Player } from '../types';
import Leaderboard from './Leaderboard';
import Gameplay from './Gameplay';
import LevelSelect from './LevelSelect';

interface MainGameProps {
  player: Player;
  onLogout: () => void;
  onPlayerUpdate: (player: Player) => void;
}

type View = 'gameplay' | 'leaderboard' | 'levels';

const MainGame: React.FC<MainGameProps> = ({ player, onLogout, onPlayerUpdate }) => {
  const [currentView, setCurrentView] = useState<View>('gameplay');
  const [selectedLevel, setSelectedLevel] = useState(player.currentLevel);

  const handleLevelSelect = (levelId: number) => {
    setSelectedLevel(levelId);
    setCurrentView('gameplay');
  };

  const handleNextLevel = () => {
    const nextLevel = selectedLevel + 1;
    if (nextLevel <= 10) { // Assuming we have 10 levels
      setSelectedLevel(nextLevel);
      setCurrentView('gameplay');
    } else {
      // All levels completed, go to level selection
      setCurrentView('levels');
    }
  };

  // Only update selected level on initial load, not when player progresses
  useEffect(() => {
    setSelectedLevel(player.currentLevel);
  }, []); // Empty dependency array - only run once on mount

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">🕵️ AI Detective</h1>
            </div>

            {/* Player Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-white/80">Welcome back,</p>
                <p className="font-semibold text-white">{player.name}</p>
                <p className="text-xs text-detective-300">Score: {player.totalScore} pts</p>
              </div>
              <div className="w-10 h-10 bg-detective-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentView('gameplay')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'gameplay'
                    ? 'bg-detective-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Play
              </button>
              <button
                onClick={() => setCurrentView('levels')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'levels'
                    ? 'bg-detective-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Levels
              </button>
              <button
                onClick={() => setCurrentView('leaderboard')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'leaderboard'
                    ? 'bg-detective-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Trophy className="h-4 w-4" />
              </button>
              <button
                onClick={onLogout}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'gameplay' && (
          <Gameplay 
            player={player} 
            levelId={selectedLevel} 
            onPlayerUpdate={onPlayerUpdate} 
            onNextLevel={handleNextLevel}
          />
        )}
        {currentView === 'levels' && (
          <LevelSelect 
            player={player} 
            onLevelSelect={handleLevelSelect}
            currentLevel={selectedLevel}
          />
        )}
        {currentView === 'leaderboard' && (
          <Leaderboard player={player} />
        )}
      </main>
    </div>
  );
};

export default MainGame;
