import React, { createContext, useContext, useState, useEffect } from 'react';
import { LeaderboardEntry, GameSession } from '../types';
import { LocalLeaderboard } from '../lib/localLeaderboard';

interface GameContextType {
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  totalScore: number;
  setTotalScore: (score: number) => void;
  leaderboard: LeaderboardEntry[];
  updateLeaderboard: () => void;
  submitGameSession: (session: Omit<GameSession, 'id' | 'completedAt'>) => void;
  updatePlayerScore: (playerId: string, score: number, level: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const updateLeaderboard = () => {
    try {
      const entries = LocalLeaderboard.getLeaderboard();
      setLeaderboard(entries);
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  };

  const submitGameSession = (session: Omit<GameSession, 'id' | 'completedAt'>) => {
    try {
      // Store game session in localStorage for local tracking
      const sessions = JSON.parse(localStorage.getItem('ai-detective-sessions') || '[]');
      sessions.push({
        ...session,
        id: `session_${Date.now()}`,
        completedAt: new Date()
      });
      localStorage.setItem('ai-detective-sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Error submitting game session:', error);
    }
  };

  const updatePlayerScore = (playerId: string, score: number, level: number) => {
    try {
      LocalLeaderboard.updatePlayerScore(playerId, score, level);
      updateLeaderboard();
    } catch (error) {
      console.error('Error updating player score:', error);
    }
  };

  useEffect(() => {
    updateLeaderboard();
  }, []);

  const value: GameContextType = {
    currentLevel,
    setCurrentLevel,
    totalScore,
    setTotalScore,
    leaderboard,
    updateLeaderboard,
    submitGameSession,
    updatePlayerScore
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
