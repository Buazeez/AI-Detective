import { LeaderboardEntry, Player } from '../types';

const LEADERBOARD_KEY = 'ai-detective-leaderboard';

export class LocalLeaderboard {
  static getLeaderboard(): LeaderboardEntry[] {
    try {
      const stored = localStorage.getItem(LEADERBOARD_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
    return [];
  }

  static addPlayer(player: Player): void {
    const leaderboard = this.getLeaderboard();
    
    // Check if player already exists
    const existingIndex = leaderboard.findIndex(entry => entry.id === player.id);
    
    const newEntry: LeaderboardEntry = {
      id: player.id,
      name: player.name,
      score: player.totalScore,
      level: player.currentLevel,
      country: player.country,
      rank: 0 // Will be calculated after sorting
    };

    if (existingIndex >= 0) {
      // Update existing player
      leaderboard[existingIndex] = newEntry;
    } else {
      // Add new player
      leaderboard.push(newEntry);
    }

    // Sort by score (descending) and assign ranks
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    // Keep only top 100 players
    const top100 = leaderboard.slice(0, 100);
    
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top100));
    } catch (error) {
      console.error('Error saving leaderboard:', error);
    }
  }

  static updatePlayerScore(playerId: string, score: number, level: number): void {
    const leaderboard = this.getLeaderboard();
    const playerIndex = leaderboard.findIndex(entry => entry.id === playerId);
    
    if (playerIndex >= 0) {
      leaderboard[playerIndex].score = score;
      leaderboard[playerIndex].level = level;
      
      // Re-sort and re-rank
      leaderboard.sort((a, b) => b.score - a.score);
      leaderboard.forEach((entry, index) => {
        entry.rank = index + 1;
      });
      
      try {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
      } catch (error) {
        console.error('Error updating leaderboard:', error);
      }
    }
  }

  static getPlayerRank(playerId: string): number {
    const leaderboard = this.getLeaderboard();
    const player = leaderboard.find(entry => entry.id === playerId);
    return player ? player.rank : leaderboard.length + 1;
  }

  static clearLeaderboard(): void {
    localStorage.removeItem(LEADERBOARD_KEY);
  }

  static getTopPlayers(limit: number = 10): LeaderboardEntry[] {
    return this.getLeaderboard().slice(0, limit);
  }

  static getPlayerStats(playerId: string): { rank: number; totalPlayers: number; percentile: number } {
    const leaderboard = this.getLeaderboard();
    const player = leaderboard.find(entry => entry.id === playerId);
    const rank = player ? player.rank : leaderboard.length + 1;
    const totalPlayers = leaderboard.length;
    const percentile = totalPlayers > 0 ? Math.round(((totalPlayers - rank + 1) / totalPlayers) * 100) : 0;
    
    return { rank, totalPlayers, percentile };
  }
}
