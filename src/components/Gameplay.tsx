import React, { useState, useEffect } from 'react';
import { Player, Hallucination } from '../types';
import { getLevelById } from '../data/levels';
import { AIService } from '../lib/aiService';
import { useGame } from '../contexts/GameContext';
import toast from 'react-hot-toast';
import { Clock, Target, Zap, CheckCircle, XCircle } from 'lucide-react';

interface GameplayProps {
  player: Player;
  levelId: number;
}

const Gameplay: React.FC<GameplayProps> = ({ player, levelId }) => {
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
      const response = await AIService.generateResponse(levelId, playerPrompt);
      setAiResponse(response.content);
      setHallucinations(response.hallucinations);
      setGameState('response');
      setTimeLeft(300);
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast.error('Failed to generate AI response. Please try again.');
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
    
    await updatePlayerScore(player.id, newTotalScore, newLevel);
    
    // Submit game session
    await submitGameSession({
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
              {aiResponse.split(' ').map((word, index) => {
                const hallucinationIndex = hallucinations.findIndex(h => 
                  aiResponse.toLowerCase().includes(h.text.toLowerCase()) && 
                  word.toLowerCase().includes(h.text.toLowerCase())
                );
                
                if (hallucinationIndex !== -1) {
                  const hallucination = hallucinations[hallucinationIndex];
                  return (
                    <span
                      key={index}
                      className={`hallucination-text ${
                        selectedHallucinations.has(hallucinationIndex) 
                          ? 'bg-red-500/30 text-red-300' 
                          : ''
                      }`}
                      onClick={() => handleHallucinationClick(hallucinationIndex)}
                    >
                      {word}{' '}
                    </span>
                  );
                }
                return <span key={index}>{word} </span>;
              })}
            </div>
            
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                💡 Click on suspicious or incorrect information in the AI response above. 
                You have {formatTime(timeLeft)} to find all the errors!
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
            <button
              onClick={() => window.location.reload()}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Next Level
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gameplay;
