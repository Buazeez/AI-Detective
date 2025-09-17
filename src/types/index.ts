export interface Player {
  id: string;
  name: string;
  school?: string;
  ageRange: '11-13' | '14-16' | '17+' | 'teacher';
  country: string;
  totalScore: number;
  currentLevel: number;
  badges: string[];
  createdAt: Date;
  lastPlayed: Date;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  level: number;
  country: string;
  rank: number;
  isCurrentPlayer?: boolean;
}

export interface Level {
  id: number;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  taskBrief: string;
  expectedPrompt: string;
  aiPrompt: string;
  maxScore: number;
  timeLimit?: number;
}

export interface Hallucination {
  text: string;
  points: number;
  explanation: string;
  isCorrect: boolean;
}

export interface GameSession {
  id: string;
  playerId: string;
  levelId: number;
  playerPrompt: string;
  aiResponse: string;
  hallucinations: Hallucination[];
  score: number;
  timeSpent: number;
  completedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: string;
}

export interface AIResponse {
  content: string;
  hallucinations: Hallucination[];
  level: number;
}
