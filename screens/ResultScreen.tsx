import React from 'react';
import { Question, Difficulty } from '../types';
import Button from '../components/Button';
import { Star, RotateCw, Menu, CheckCircle, XCircle, AlertCircle, BookOpen } from 'lucide-react';

interface ResultScreenProps {
  results: Question[];
  userName: string;
  onRetry: () => void;
  onHome: () => void;
  difficulty: Difficulty;
  selectedTable?: number;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ results, userName, onRetry, onHome, difficulty, selectedTable }) => {
  const correctCount = results.filter(q => q.isCorrect).length;
  const totalCount = results.length;
  const isPerfect = correctCount === totalCount;
  
  // Identify which tables caused trouble
  const mistakes = results.filter(q => !q.isCorrect);
  const mistakeTables = Array.from(new Set(mistakes.flatMap(q => [q.factorA, q.factorB])));
  
  // Decide what reference material to show
  // If specific mode (Novice/Smarty): show that table
  // If Expert mode: show tables involved in mistakes, or just a summary grid if too many
  const tablesToShow = (difficulty === 'NOVICE' || difficulty === 'SMARTY') && selectedTable 
    ? [selectedTable] 
    : (mistakeTables.length > 0 ? mistakeTables.sort((a: number, b: number) => a - b) : []);

  // Limit "Expert" mode hints to first 2 tables to avoid UI clutter
  const displayTables = tablesToShow.slice(0, 2); 

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6 space-y-8 animate-fade-in pb-12">
      
      {/* Header Card */}
      <div className={`w-full p-8 rounded-[2.5rem] shadow-card text-center border-4 border-white ${isPerfect ? 'bg-gradient-to-br from-yellow-50 to-orange-50' : 'bg-white/95 backdrop-blur'}`}>
        
        {isPerfect ? (
          <>
            <div className="flex justify-center space-x-2 mb-6">
              <Star className="text-accent fill-accent animate-bounce" size={64} strokeWidth={1.5} />
              <Star className="text-accent fill-accent animate-bounce delay-100" size={80} strokeWidth={1.5} />
              <Star className="text-accent fill-accent animate-bounce delay-200" size={64} strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-3">
              Молодец, {userName}!
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-bold">
              Ты ответил правильно на все вопросы!
            </p>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
               <div className="bg-red-50 p-6 rounded-full shadow-inner border-4 border-red-100">
                 <AlertCircle className="text-danger" size={64} />
               </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-3">
              Хорошая попытка, {userName}!
            </h1>
            <p className="text-2xl text-gray-600 mb-8 font-medium">
              Результат: <span className="text-secondary font-black text-3xl">{correctCount}</span> / <span className="font-black text-3xl">{totalCount}</span>
            </p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRetry} variant="secondary" size="lg" className="flex items-center justify-center gap-3 shadow-lg">
            <RotateCw size={28} strokeWidth={3} />
            {isPerfect ? 'Ещё раз' : 'Исправить ошибки'}
          </Button>
          <Button onClick={onHome} variant="outline" size="lg" className="flex items-center justify-center gap-3 shadow-lg">
            <Menu size={28} strokeWidth={3} />
            Меню
          </Button>
        </div>
      </div>

      {/* Review Section (only if mistakes exist) */}
      {!isPerfect && (
        <div className="w-full grid md:grid-cols-2 gap-8">
          
          {/* Question Summary */}
          <div className="bg-white/90 backdrop-blur rounded-[2.5rem] p-6 shadow-soft border-2 border-white">
            <h3 className="text-xl font-black text-gray-700 mb-6 flex items-center gap-3 uppercase tracking-wider">
              <RotateCw size={24} className="text-primary" />
              Твои ответы
            </h3>
            <div className="space-y-3">
              {results.map((q) => (
                <div key={q.id} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                  <div className="font-mono text-xl font-bold text-gray-600">
                    {q.factorA} × {q.factorB} = ?
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-bold text-xl ${q.isCorrect ? 'text-secondary' : 'text-danger line-through opacity-60'}`}>
                      {q.userAnswer}
                    </span>
                    {!q.isCorrect && (
                      <span className="font-bold text-xl text-secondary">
                        {q.correctAnswer}
                      </span>
                    )}
                    {q.isCorrect ? (
                      <CheckCircle size={28} className="text-secondary" />
                    ) : (
                      <XCircle size={28} className="text-danger" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reference Tables */}
          {displayTables.length > 0 && (
             <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary font-black text-2xl px-2">
                  <BookOpen size={32} />
                  <h2>Повтори сейчас</h2>
                </div>

               {displayTables.map(tableNum => (
                 <div key={tableNum} className="bg-white/90 backdrop-blur rounded-[2.5rem] p-6 shadow-soft border-l-[16px] border-primary relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                    <h3 className="text-2xl font-black text-gray-700 mb-4 relative z-10">
                      Таблица на {tableNum}
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 relative z-10">
                      {Array.from({length: 9}).map((_, i) => {
                        const multiplier = i + 2; 
                        return (
                          <div key={multiplier} className={`text-lg p-2 rounded-xl transition-colors ${mistakes.some(m => (m.factorA === tableNum && m.factorB === multiplier) || (m.factorB === tableNum && m.factorA === multiplier)) ? 'bg-red-50 text-danger font-bold border-2 border-red-100 shadow-sm' : 'text-gray-500 font-bold'}`}>
                            {tableNum} × {multiplier} = {tableNum * multiplier}
                          </div>
                        )
                      })}
                       <div className="text-lg p-2 text-gray-300 font-medium opacity-50">
                         {tableNum} × 10 = {tableNum * 10}
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultScreen;