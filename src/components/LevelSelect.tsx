import React from 'react';
import { Lock, CheckCircle, Star, Target, Zap } from 'lucide-react';
import { Player } from '../types';
import { levels } from '../data/levels';

interface LevelSelectProps {
  player: Player;
  onLevelSelect: (levelId: number) => void;
  currentLevel: number;
}

const LevelSelect: React.FC<LevelSelectProps> = ({ player, onLevelSelect, currentLevel }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'level-beginner';
      case 'intermediate':
        return 'level-intermediate';
      case 'advanced':
        return 'level-advanced';
      default:
        return 'level-beginner';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Target className="h-4 w-4" />;
      case 'intermediate':
        return <Zap className="h-4 w-4" />;
      case 'advanced':
        return <Star className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const isLevelUnlocked = (levelId: number) => {
    return levelId <= player.currentLevel;
  };

  const isLevelCompleted = (levelId: number) => {
    // This would be determined by checking if the player has completed this level
    // For now, we'll assume levels are completed if they're below the current level
    return levelId < player.currentLevel;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="detective-card mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Level Selection</h2>
            <p className="text-white/80">Choose your next detective mission</p>
          </div>
          <div className="text-right">
            <p className="text-white/80">Current Level</p>
            <p className="text-2xl font-bold text-detective-300">{player.currentLevel}</p>
          </div>
        </div>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level) => {
          const unlocked = isLevelUnlocked(level.id);
          const completed = isLevelCompleted(level.id);
          const isCurrent = level.id === currentLevel;

          return (
            <div
              key={level.id}
              className={`detective-card transition-all duration-200 ${
                unlocked
                  ? 'hover:scale-105 cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              } ${
                isCurrent ? 'ring-2 ring-detective-500 bg-detective-500/10' : ''
              }`}
              onClick={() => unlocked && onLevelSelect(level.id)}
            >
              {/* Level Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {unlocked ? (
                    completed ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-detective-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{level.id}</span>
                      </div>
                    )
                  ) : (
                    <Lock className="h-5 w-5 text-white/40" />
                  )}
                  <h3 className="text-lg font-semibold text-white">{level.title}</h3>
                </div>
                <span className={`level-badge ${getDifficultyColor(level.difficulty)}`}>
                  {getDifficultyIcon(level.difficulty)}
                  <span className="ml-1">{level.difficulty.toUpperCase()}</span>
                </span>
              </div>

              {/* Level Description */}
              <div className="mb-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  {level.taskBrief.length > 120 
                    ? `${level.taskBrief.substring(0, 120)}...` 
                    : level.taskBrief
                  }
                </p>
              </div>

              {/* Level Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-white/60">
                  <Target className="h-4 w-4 mr-1" />
                  <span>Max {level.maxScore} pts</span>
                </div>
                <div className="flex items-center text-white/60">
                  <Star className="h-4 w-4 mr-1" />
                  <span>Level {level.id}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                {unlocked ? (
                  <button
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      isCurrent
                        ? 'bg-detective-500 text-white'
                        : completed
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLevelSelect(level.id);
                    }}
                  >
                    {isCurrent ? 'Current Level' : completed ? 'Play Again' : 'Start Level'}
                  </button>
                ) : (
                  <div className="w-full py-2 px-4 rounded-lg text-sm font-medium text-white/40 bg-white/5 text-center">
                    Complete Level {level.id - 1} to unlock
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="detective-card mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {levels.filter(level => isLevelCompleted(level.id)).length}
            </div>
            <div className="text-sm text-white/60">Levels Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-detective-300">
              {levels.filter(level => level.difficulty === 'beginner' && isLevelCompleted(level.id)).length}/8
            </div>
            <div className="text-sm text-white/60">Beginner Levels</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {levels.filter(level => level.difficulty === 'intermediate' && isLevelCompleted(level.id)).length}/8
            </div>
            <div className="text-sm text-white/60">Intermediate Levels</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
