import React, { useState, useEffect } from 'react';
import { Player, Hallucination } from '../types';
import { getLevelById } from '../data/levels';
import { useGame } from '../contexts/GameContext';
import toast from 'react-hot-toast';
import { Clock, Target, CheckCircle, XCircle } from 'lucide-react';

// Import preloaded levels data
import preloadedLevelsData from '../data/preloadedLevels.json';

const getPreloadedResponse = (levelId: number, playerPrompt: string) => {
  const nameMatch = playerPrompt.match(/(?:my name is|i'm|i am|call me)\s+([a-zA-Z]+)/i);
  const playerName = nameMatch ? nameMatch[1] : 'there';
  
  const levelData = preloadedLevelsData.levels[levelId.toString() as keyof typeof preloadedLevelsData.levels];
  
  if (!levelData) {
    return {
      content: `Hi ${playerName}! This level is not available yet.`,
      hallucinations: []
    };
  }

  // Replace {name} placeholder with actual player name
  const content = levelData.content.replace(/{name}/g, playerName);
  
  return {
    content,
    hallucinations: levelData.hallucinations
  };
};

interface GameplayProps {
  player: Player;
  levelId: number;
  onPlayerUpdate: (player: Player) => void;
  onNextLevel?: () => void;
}

const Gameplay: React.FC<GameplayProps> = ({ player, levelId, onPlayerUpdate, onNextLevel }) => {
  const { updatePlayerScore, submitGameSession } = useGame();
  const [level, setLevel] = useState(getLevelById(levelId));
  const [playerPrompt, setPlayerPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [hallucinations, setHallucinations] = useState<Hallucination[]>([]);
  const [selectedHallucinations, setSelectedHallucinations] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [gameState, setGameState] = useState<'prompt' | 'response' | 'completed'>('prompt');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newLevel = getLevelById(levelId);
    setLevel(newLevel);
    setPlayerPrompt('');
    setAiResponse('');
    setHallucinations([]);
    setSelectedHallucinations(new Set());
    setScore(0);
    setTimeLeft(300);
    setGameState('prompt');
  }, [levelId]);

  useEffect(() => {
    if (gameState === 'response' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'response') {
      handleSubmit();
    }
  }, [timeLeft, gameState]);

  const handleGenerateResponse = async () => {
    if (!playerPrompt.trim()) {
      toast.error('Please enter a prompt first!');
      return;
    }

    setIsLoading(true);
    try {
      // Use preloaded content instead of AI service
      const response = getPreloadedResponse(levelId, playerPrompt);
      setAiResponse(response.content);
      setHallucinations(response.hallucinations);
      setGameState('response');
      setTimeLeft(300);
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHallucinationClick = (index: number) => {
    if (gameState !== 'response') return;
    
    const newSelected = new Set(selectedHallucinations);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedHallucinations(newSelected);
  };

  const handleUnitClick = (unit: {
    text: string;
    isHallucination: boolean;
    hallucinationIndex: number;
    isSelected: boolean;
  }) => {
    if (gameState !== 'response') return;

    if (unit.isHallucination) {
      handleHallucinationClick(unit.hallucinationIndex);
      toast.success(`Correct! You found: "${unit.text.trim()}"`);
    } else {
      // Check if this word is part of any hallucination
      const hallucinationMatch = hallucinations.find((hallucination) => {
        // Handle both literal text and regex patterns
        let pattern = hallucination.text;
        if (!pattern.includes('.*') && !pattern.includes('\\')) {
          // If it's not already a regex pattern, escape special characters
          pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        const regex = new RegExp(`\\b${unit.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        return regex.test(pattern);
      });

      if (hallucinationMatch) {
        // This word is part of a hallucination, so select the whole hallucination
        const hallucinationIndex = hallucinations.findIndex(h => h === hallucinationMatch);
        handleHallucinationClick(hallucinationIndex);
        toast.success(`Correct! You found: "${hallucinationMatch.text}"`);
      } else {
        // Show pop-up for wrong selection
        toast.error(`Wrong! Try again. Look for factual errors or impossible claims.`);
      }
    }
  };

  const handleSubmit = async () => {
    if (gameState !== 'response') return;

    let totalScore = 0;
    let correctSelections = 0;
    let incorrectSelections = 0;

    // Calculate score
    selectedHallucinations.forEach(index => {
      const hallucination = hallucinations[index];
      if (hallucination && !hallucination.isCorrect) {
        totalScore += hallucination.points;
        correctSelections++;
      } else {
        incorrectSelections++;
      }
    });

    // Check for missed hallucinations
    hallucinations.forEach((hallucination, index) => {
      if (!hallucination.isCorrect && !selectedHallucinations.has(index)) {
        // Penalty for missing a hallucination
        totalScore -= Math.floor(hallucination.points * 0.1);
      }
    });

    setScore(Math.max(0, totalScore));
    setGameState('completed');

    // Update player score
    const newTotalScore = player.totalScore + totalScore;
    const newLevel = Math.max(player.currentLevel, levelId + 1);
    
    // Update player state
    const updatedPlayer = {
      ...player,
      totalScore: newTotalScore,
      currentLevel: newLevel
    };
    onPlayerUpdate(updatedPlayer);
    
    updatePlayerScore(player.id, newTotalScore, newLevel);
    
    // Submit game session
    submitGameSession({
      playerId: player.id,
      levelId,
      playerPrompt,
      aiResponse,
      hallucinations: hallucinations.map((h, i) => ({
        ...h,
        isCorrect: selectedHallucinations.has(i)
      })),
      score: totalScore,
      timeSpent: 300 - timeLeft
    });

    if (totalScore > 0) {
      toast.success(`Great job! You scored ${totalScore} points!`);
    } else {
      toast.error('Try again! Look more carefully for errors.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!level) {
    return (
      <div className="text-center text-white">
        <p>Level not found!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Level Header */}
      <div className="detective-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{level.title}</h2>
            <span className={`level-badge level-${level.difficulty}`}>
              {level.difficulty.toUpperCase()}
            </span>
          </div>
          {gameState === 'response' && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-white">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-lg font-mono">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center text-white">
                <Target className="h-5 w-5 mr-2" />
                <span className="text-lg font-semibold">{score} pts</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="font-semibold text-white mb-2">📋 Task Brief:</h3>
          <p className="text-white/90">{level.taskBrief}</p>
        </div>
      </div>

      {/* Game Content */}
      {gameState === 'prompt' && (
        <div className="detective-card">
          <h3 className="text-xl font-semibold text-white mb-4">✍️ Write Your Prompt</h3>
          <p className="text-white/80 mb-4">
            Based on the task brief above, write a prompt to ask the AI about the topic. 
            Be specific and clear in your request.
          </p>
          
          <div className="space-y-4">
            <textarea
              value={playerPrompt}
              onChange={(e) => setPlayerPrompt(e.target.value)}
              className="detective-input w-full h-32 resize-none"
              placeholder="Enter your prompt here..."
              maxLength={500}
            />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">
                {playerPrompt.length}/500 characters
              </span>
              <button
                onClick={handleGenerateResponse}
                disabled={!playerPrompt.trim() || isLoading}
                className="detective-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Generating...' : 'Generate AI Response'}
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'response' && (
        <div className="space-y-6">
          {/* AI Response */}
          <div className="detective-card">
            <h3 className="text-xl font-semibold text-white mb-4">🤖 AI Response</h3>
            <div className="bg-slate-800 rounded-lg p-4 text-white/90 leading-relaxed">
              {(() => {
                let result: React.ReactNode[] = [];
                let text = aiResponse;
                let lastIndex = 0;
                
                // Find all hallucination matches in the text
                const matches: Array<{
                  start: number;
                  end: number;
                  hallucinationIndex: number;
                  text: string;
                  hallucination: Hallucination;
                }> = [];
                
                hallucinations.forEach((hallucination, index) => {
                  // Handle both literal text and regex patterns
                  let pattern = hallucination.text;
                  if (!pattern.includes('.*') && !pattern.includes('\\')) {
                    // If it's not already a regex pattern, escape special characters
                    pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                  }
                  const regex = new RegExp(`(${pattern})`, 'gi');
                  let match;
                  while ((match = regex.exec(text)) !== null) {
                    matches.push({
                      start: match.index,
                      end: match.index + match[0].length,
                      hallucinationIndex: index,
                      text: match[0],
                      hallucination: hallucination
                    });
                  }
                });
                
                // Sort matches by start position
                matches.sort((a, b) => a.start - b.start);
                
                // Build the result with separate hallucination units
                matches.forEach((match, matchIndex) => {
                  // Add text before this match
                  if (match.start > lastIndex) {
                    const beforeText = text.slice(lastIndex, match.start);
                    // Split non-hallucination text into clickable chunks
                    const words = beforeText.split(/(\s+)/);
                    words.forEach((word, wordIndex) => {
                      if (word.trim() === '') {
                        result.push(word);
                      } else {
                        result.push(
                          <span
                            key={`text-${matchIndex}-${wordIndex}`}
                            className="cursor-pointer rounded px-1 py-0.5"
                            onClick={() => handleUnitClick({
                              text: word,
                              isHallucination: false,
                              hallucinationIndex: -1,
                              isSelected: false
                            })}
                          >
                            {word}
                          </span>
                        );
                      }
                    });
                  }
                  
                  // Add the separate hallucination
                  result.push(
                    <span
                      key={`hallucination-${matchIndex}`}
                      className={`cursor-pointer rounded px-1 py-0.5 ${
                        selectedHallucinations.has(match.hallucinationIndex) 
                          ? 'bg-red-500/30 text-red-300' 
                          : ''
                      }`}
                      onClick={() => handleUnitClick({
                        text: match.text,
                        isHallucination: true,
                        hallucinationIndex: match.hallucinationIndex,
                        isSelected: selectedHallucinations.has(match.hallucinationIndex)
                      })}
                    >
                      {match.text}
                    </span>
                  );
                  
                  lastIndex = match.end;
                });
                
                // Add remaining text
                if (lastIndex < text.length) {
                  const remainingText = text.slice(lastIndex);
                  const words = remainingText.split(/(\s+)/);
                  words.forEach((word, wordIndex) => {
                    if (word.trim() === '') {
                      result.push(word);
                    } else {
                      result.push(
                        <span
                          key={`text-end-${wordIndex}`}
                          className="cursor-pointer rounded px-1 py-0.5"
                          onClick={() => handleUnitClick({
                            text: word,
                            isHallucination: false,
                            hallucinationIndex: -1,
                            isSelected: false
                          })}
                        >
                          {word}
                        </span>
                      );
                    }
                  });
                }
                
                return result;
              })()}
            </div>
            
             <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
               <p className="text-blue-300 text-sm">
                 💡 Read the AI response carefully and click on any sentences or phrases that contain errors or incorrect information. 
                 Each highlighted section is clickable. Use your knowledge to identify what's wrong! You have {formatTime(timeLeft)} to complete the task!
               </p>
             </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="detective-button text-lg px-8 py-3"
            >
              Submit Detection
            </button>
          </div>
        </div>
      )}

      {gameState === 'completed' && (
        <div className="detective-card text-center">
          <div className="mb-6">
            {score > 0 ? (
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            )}
            <h3 className="text-2xl font-bold text-white mb-2">
              {score > 0 ? 'Great Detective Work!' : 'Keep Practicing!'}
            </h3>
            <p className="text-xl text-detective-300 mb-4">
              You scored {score} points!
            </p>
          </div>

          {/* Hallucination Explanations */}
          <div className="space-y-3 mb-6">
            {hallucinations.map((hallucination, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  selectedHallucinations.has(index)
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-red-500/20 border border-red-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">
                    "{hallucination.text}"
                  </span>
                  <span className={`text-sm font-semibold ${
                    selectedHallucinations.has(index) ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {selectedHallucinations.has(index) ? `+${hallucination.points} pts` : 'Missed'}
                  </span>
                </div>
                <p className="text-white/80 text-sm mt-1">
                  {hallucination.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setGameState('prompt');
                setPlayerPrompt('');
                setAiResponse('');
                setHallucinations([]);
                setSelectedHallucinations(new Set());
                setScore(0);
                setTimeLeft(300);
              }}
              className="detective-button"
            >
              Play Again
            </button>
            {levelId < 10 ? (
              <button
                onClick={() => onNextLevel ? onNextLevel() : window.location.reload()}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Next Level
              </button>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-300 font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-green-500/30"
              >
                🎉 All Levels Complete! View All Levels
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gameplay;
