import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { GameProvider } from './contexts/GameContext';
import RegistrationScreen from './components/RegistrationScreen';
import MainGame from './components/MainGame';
import { Player } from './types';
import { AuthService } from './lib/authService';
import { User } from 'firebase/auth';

function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = AuthService.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        // User is signed in, create player object
        const player = AuthService.createPlayerFromUser(user);
        
        // Try to load additional player data from localStorage
        const savedPlayer = localStorage.getItem('ai-detective-player');
        if (savedPlayer) {
          try {
            const savedData = JSON.parse(savedPlayer);
            // Merge saved data with user data
            const mergedPlayer = {
              ...player,
              ...savedData,
              id: user.uid, // Always use Firebase UID
              name: savedData.name || player.name
            };
            setPlayer(mergedPlayer);
          } catch (error) {
            console.error('Error parsing saved player data:', error);
            setPlayer(player);
          }
        } else {
          setPlayer(player);
        }
      } else {
        // User is signed out
        setPlayer(null);
        localStorage.removeItem('ai-detective-player');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePlayerRegistration = (playerData: Player) => {
    setPlayer(playerData);
    localStorage.setItem('ai-detective-player', JSON.stringify(playerData));
  };

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      setPlayer(null);
      localStorage.removeItem('ai-detective-player');
    } catch (error) {
      console.error('Logout error:', error);
    }
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
