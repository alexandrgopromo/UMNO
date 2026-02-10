import React, { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import TableSelectScreen from './screens/TableSelectScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import { Screen, Question, QuizConfig, Difficulty } from './types';
import { generateQuiz } from './services/mathHelpers';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('WELCOME');
  const [userName, setUserName] = useState('');
  const [config, setConfig] = useState<QuizConfig>({ difficulty: 'EXPERT' });
  const [currentQuiz, setCurrentQuiz] = useState<Question[]>([]);
  const [quizResults, setQuizResults] = useState<Question[]>([]);
  // We need to store difficulty temporarily if we go to table selection
  const [pendingDifficulty, setPendingDifficulty] = useState<Difficulty | null>(null);

  const handleStart = (name: string, difficulty: Difficulty) => {
    setUserName(name);
    
    if (difficulty === 'EXPERT') {
      // Expert mode goes straight to quiz
      setConfig({ difficulty });
      const questions = generateQuiz({ difficulty });
      setCurrentQuiz(questions);
      setScreen('QUIZ');
    } else {
      // Novice and Smarty need table selection
      setPendingDifficulty(difficulty);
      setScreen('TABLE_SELECT');
    }
  };

  const handleTableSelect = (number: number) => {
    if (!pendingDifficulty) return;
    
    setConfig({ difficulty: pendingDifficulty, tableNumber: number });
    const questions = generateQuiz({ difficulty: pendingDifficulty, tableNumber: number });
    setCurrentQuiz(questions);
    setScreen('QUIZ');
  };

  const handleQuizComplete = (results: Question[]) => {
    setQuizResults(results);
    setScreen('RESULTS');
  };

  const handleRetry = () => {
    const questions = generateQuiz(config);
    setCurrentQuiz(questions);
    setQuizResults([]);
    setScreen('QUIZ');
  };

  const handleHome = () => {
    setScreen('WELCOME');
    // Keep username, just return to welcome screen (user will see difficulty selection again if name is confirmed)
    // Actually, in WelcomeScreen we are not persisting "isNameConfirmed" via props, so it resets.
    // That's acceptable for "No user data persistence".
    setConfig({ difficulty: 'EXPERT' });
    setPendingDifficulty(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-gray-900 overflow-x-hidden">
      {/* Background decoration elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/15 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-primary/15 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-grow flex flex-col items-center py-6 md:py-10 z-10 px-4">
        {screen === 'WELCOME' && (
          <WelcomeScreen onStart={handleStart} />
        )}

        {screen === 'TABLE_SELECT' && (
          <TableSelectScreen 
            onSelectTable={handleTableSelect} 
            onBack={() => setScreen('WELCOME')}
            userName={userName}
          />
        )}

        {screen === 'QUIZ' && (
          <QuizScreen 
            questions={currentQuiz} 
            onComplete={handleQuizComplete} 
          />
        )}

        {screen === 'RESULTS' && (
          <ResultScreen 
            results={quizResults} 
            userName={userName}
            onRetry={handleRetry}
            onHome={handleHome}
            difficulty={config.difficulty}
            selectedTable={config.tableNumber}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-400 text-sm font-bold tracking-wide z-10 uppercase">
        2026
      </footer>
    </div>
  );
};

export default App;