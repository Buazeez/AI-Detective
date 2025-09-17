import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { GameProvider } from './contexts/GameContext';
import RegistrationScreen from './components/RegistrationScreen';
import MainGame from './components/MainGame';
import { Player } from './types';

function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing player in localStorage
    const savedPlayer = localStorage.getItem('ai-detective-player');
    if (savedPlayer) {
      try {
        const playerData = JSON.parse(savedPlayer);
        setPlayer(playerData);
      } catch (error) {
        console.error('Error parsing saved player data:', error);
        localStorage.removeItem('ai-detective-player');
      }
    }
    setIsLoading(false);
  }, []);

  const handlePlayerRegistration = (playerData: Player) => {
    setPlayer(playerData);
    localStorage.setItem('ai-detective-player', JSON.stringify(playerData));
  };

  const handleLogout = () => {
    setPlayer(null);
    localStorage.removeItem('ai-detective-player');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-detective-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white">Loading AI Detective...</h2>
        </div>
      </div>
    );
  }

  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
          }}
        />
        
        {!player ? (
          <RegistrationScreen onRegistration={handlePlayerRegistration} />
        ) : (
          <MainGame player={player} onLogout={handleLogout} />
        )}
      </div>
    </GameProvider>
  );
}

export default App;
