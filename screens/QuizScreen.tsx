import React, { useState } from 'react';
import { Question } from '../types';
import Button from '../components/Button';

interface QuizScreenProps {
  questions: Question[];
  onComplete: (answeredQuestions: Question[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>(questions);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = answeredQuestions[currentIndex];

  const handleAnswer = (answer: number) => {
    if (selectedOption !== null) return; // Prevent double clicking

    setSelectedOption(answer);
    
    // Delay to show feedback (button color change) before moving next
    setTimeout(() => {
      const updatedQuestions = [...answeredQuestions];
      updatedQuestions[currentIndex] = {
        ...currentQuestion,
        userAnswer: answer,
        isCorrect: answer === currentQuestion.correctAnswer
      };
      setAnsweredQuestions(updatedQuestions);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        onComplete(updatedQuestions);
      }
    }, 1000); // Slightly longer delay for children to see the result
  };

  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto p-6 bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-card border-4 border-white min-h-[550px] justify-between relative">
      
      {/* Header / Progress */}
      <div className="w-full space-y-4">
        <div className="flex justify-between items-center text-gray-400 font-black text-lg uppercase tracking-wide">
          <span>Вопрос {currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-100 inner-shadow">
          <div 
            className="h-full bg-secondary transition-all duration-500 ease-out rounded-full relative overflow-hidden"
            style={{ width: `${Math.max(5, progress)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col items-center justify-center w-full my-8">
        <div className="flex items-center justify-center space-x-2 md:space-x-4 text-7xl md:text-8xl font-black text-gray-800 bg-white p-8 rounded-[2rem] shadow-soft border-4 border-gray-50 transform hover:scale-105 transition-transform duration-300">
          <span className="text-primary">{currentQuestion.factorA}</span>
          <span className="text-gray-300 text-6xl">×</span>
          <span className="text-accent">{currentQuestion.factorB}</span>
          <span className="text-gray-300 text-6xl">=</span>
          <span className="text-secondary w-20 text-center">?</span>
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {currentQuestion.options.map((option, idx) => {
          let btnVariant: 'outline' | 'secondary' | 'danger' = 'outline';
          
          if (selectedOption !== null) {
            if (option === currentQuestion.correctAnswer) {
              // Always show correct answer in green after selection
              btnVariant = 'secondary'; 
            } else if (option === selectedOption) {
              // Show selected wrong answer in red
              btnVariant = 'danger';
            }
          }

          return (
            <Button
              key={idx}
              variant={btnVariant}
              size="xl"
              onClick={() => handleAnswer(option)}
              disabled={selectedOption !== null}
              className={`h-24 md:h-32 text-4xl shadow-button hover:shadow-button-hover active:shadow-button-active ${selectedOption !== null && option !== selectedOption && option !== currentQuestion.correctAnswer ? 'opacity-30 scale-95' : ''}`}
            >
              {option}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizScreen;