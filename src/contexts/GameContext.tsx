import React, { createContext, useContext, useState, useEffect } from 'react';
import { Player, LeaderboardEntry, GameSession } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy, limit } from 'firebase/firestore';

interface GameContextType {
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  totalScore: number;
  setTotalScore: (score: number) => void;
  leaderboard: LeaderboardEntry[];
  updateLeaderboard: () => Promise<void>;
  submitGameSession: (session: Omit<GameSession, 'id' | 'completedAt'>) => Promise<void>;
  updatePlayerScore: (playerId: string, score: number, level: number) => Promise<void>;
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

  const updateLeaderboard = async () => {
    try {
      const q = query(
        collection(db, 'players'),
        orderBy('totalScore', 'desc'),
        limit(100)
      );
      
      const querySnapshot = await getDocs(q);
      const entries: LeaderboardEntry[] = [];
      
      querySnapshot.forEach((doc, index) => {
        const data = doc.data();
        entries.push({
          id: doc.id,
          name: data.name,
          score: data.totalScore,
          level: data.currentLevel,
          country: data.country,
          rank: index + 1
        });
      });
      
      setLeaderboard(entries);
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  };

  const submitGameSession = async (session: Omit<GameSession, 'id' | 'completedAt'>) => {
    try {
      await addDoc(collection(db, 'gameSessions'), {
        ...session,
        completedAt: new Date()
      });
    } catch (error) {
      console.error('Error submitting game session:', error);
    }
  };

  const updatePlayerScore = async (playerId: string, score: number, level: number) => {
    try {
      const playerRef = doc(db, 'players', playerId);
      await updateDoc(playerRef, {
        totalScore: score,
        currentLevel: level,
        lastPlayed: new Date()
      });
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
