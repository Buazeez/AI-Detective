import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award, Crown, Star } from 'lucide-react';
import { Player, LeaderboardEntry } from '../types';
import { useGame } from '../contexts/GameContext';

interface LeaderboardProps {
  player: Player;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ player }) => {
  const { leaderboard, updateLeaderboard } = useGame();
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'all'>('today');

  useEffect(() => {
    updateLeaderboard();
  }, [updateLeaderboard]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-300" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Star className="h-4 w-4 text-white/40" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-gray-300';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-white/80';
    }
  };

  const filteredLeaderboard = leaderboard.slice(0, 50); // Top 50

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="detective-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-detective-500 mr-3" />
            <h2 className="text-2xl font-bold text-white">Global Leaderboard</h2>
          </div>
          <div className="text-right">
            <p className="text-white/80">Your Rank</p>
            <p className="text-2xl font-bold text-detective-300">
              #{leaderboard.findIndex(entry => entry.id === player.id) + 1 || 'Unranked'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
          {[
            { id: 'today', label: 'Today', icon: '🌟' },
            { id: 'week', label: 'This Week', icon: '⚡' },
            { id: 'all', label: 'All Time', icon: '👑' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-detective-500 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="detective-card">
        <h3 className="text-lg font-semibold text-white mb-4">
          {activeTab === 'today' && '🌟 TODAY\'S CHAMPIONS'}
          {activeTab === 'week' && '⚡ THIS WEEK'}
          {activeTab === 'all' && '👑 ALL TIME LEGENDS'}
        </h3>

        {filteredLeaderboard.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/60">No players yet. Be the first to join!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLeaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className={`leaderboard-entry ${
                  entry.id === player.id ? 'ring-2 ring-detective-500 bg-detective-500/10' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${getRankColor(entry.rank)}`}>
                        {entry.name}
                      </span>
                      {entry.id === player.id && (
                        <span className="text-xs bg-detective-500 text-white px-2 py-1 rounded-full">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <span>Level {entry.level}</span>
                      <span>{entry.country}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {entry.score.toLocaleString()}
                    </div>
                    <div className="text-xs text-white/60">points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Player Stats */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <h4 className="text-lg font-semibold text-white mb-4">Your Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-detective-300">{player.totalScore}</div>
              <div className="text-sm text-white/60">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-detective-300">{player.currentLevel}</div>
              <div className="text-sm text-white/60">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-detective-300">{player.badges.length}</div>
              <div className="text-sm text-white/60">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-detective-300">
                {leaderboard.findIndex(entry => entry.id === player.id) + 1 || 'Unranked'}
              </div>
              <div className="text-sm text-white/60">Global Rank</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
