export type Screen = 'WELCOME' | 'TABLE_SELECT' | 'QUIZ' | 'RESULTS';

export type Difficulty = 'NOVICE' | 'SMARTY' | 'EXPERT';

export type Question = {
  id: number;
  factorA: number;
  factorB: number;
  correctAnswer: number;
  options: number[]; // Array of 3 numbers
  userAnswer?: number; // Stores the user's choice
  isCorrect?: boolean;
};

export type QuizConfig = {
  difficulty: Difficulty;
  tableNumber?: number; // If difficulty is NOVICE or SMARTY
};

export type QuizResult = {
  questions: Question[];
  score: number;
  total: number;
  timestamp: number;
};
