import React, { useState } from 'react';
import { User, Calculator, Check, GraduationCap, Zap, Brain } from 'lucide-react';
import Button from '../components/Button';
import { Difficulty } from '../types';

interface WelcomeScreenProps {
  onStart: (name: string, difficulty: Difficulty) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);

  const handleConfirmName = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    setIsNameConfirmed(true);
  };

  const handleStart = (difficulty: Difficulty) => {
    onStart(name.trim(), difficulty);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-lg mx-auto p-8 bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-card border-4 border-white relative overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header Section */}
      <div className="text-center space-y-3 z-10 relative">
        <div className="bg-white p-4 rounded-3xl w-28 h-28 flex items-center justify-center mx-auto mb-2 shadow-soft animate-float border-4 border-primary/10">
          <Calculator size={56} className="text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight">
          УМНОжайка
        </h1>
        <p className="text-xl text-gray-600 font-bold">
          {isNameConfirmed ? `Привет, ${name}!` : "Привет! Давай учить таблицу умножения!"}
        </p>
      </div>

      {/* Step 1: Name Input */}
      {!isNameConfirmed && (
        <div className="w-full space-y-6 z-10 animate-fade-in">
          <div className="space-y-2">
            <label className="block text-left text-lg font-black text-gray-700 ml-4">
              Как тебя зовут?
            </label>
            <div className="relative group">
              <User className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleConfirmName()}
                placeholder="Введи свое имя"
                className={`w-full pl-16 pr-6 py-5 text-xl font-bold rounded-2xl border-4 outline-none transition-all shadow-inner ${
                  error 
                    ? 'border-danger bg-red-50 text-danger placeholder-danger/50' 
                    : 'border-gray-100 bg-gray-50 focus:border-primary focus:bg-white focus:shadow-soft text-gray-800'
                }`}
              />
            </div>
            {error && <p className="text-danger font-bold ml-4 animate-pulse">Пожалуйста, введи имя!</p>}
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            fullWidth 
            onClick={handleConfirmName}
            className="flex items-center justify-center gap-3 py-5"
          >
            Я готов <Check size={28} strokeWidth={3} />
          </Button>
        </div>
      )}

      {/* Step 2: Difficulty Selection */}
      {isNameConfirmed && (
        <div className="w-full grid gap-4 z-10 animate-fade-in">
          <p className="text-center text-gray-500 font-bold mb-2">Выбери уровень сложности:</p>
          
          <Button 
            variant="secondary" 
            size="lg" 
            fullWidth 
            onClick={() => handleStart('NOVICE')}
            className="text-left px-6 py-5 flex items-center gap-4 group hover:bg-green-500"
          >
            <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-colors">
              <GraduationCap size={32} className="text-white" />
            </div>
            <div>
              <span className="block text-xl font-black">Новичок</span>
              <span className="block text-sm font-medium opacity-90">Выбрать таблицу (по порядку)</span>
            </div>
          </Button>

          <Button 
            variant="accent" 
            size="lg" 
            fullWidth 
            onClick={() => handleStart('SMARTY')}
            className="text-left px-6 py-5 flex items-center gap-4 group hover:bg-orange-500"
          >
            <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-colors">
              <Brain size={32} className="text-white" />
            </div>
            <div>
              <span className="block text-xl font-black">Ботаник</span>
              <span className="block text-sm font-medium opacity-90">Выбрать таблицу (вразброс)</span>
            </div>
          </Button>

          <Button 
            variant="primary" 
            size="lg" 
            fullWidth 
            onClick={() => handleStart('EXPERT')}
            className="text-left px-6 py-5 flex items-center gap-4 group hover:bg-purple-600"
          >
             <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-colors">
              <Zap size={32} className="text-white" />
            </div>
            <div>
              <span className="block text-xl font-black">Я всё знаю!</span>
              <span className="block text-sm font-medium opacity-90">Все таблицы сразу</span>
            </div>
          </Button>
          
          <button 
            onClick={() => setIsNameConfirmed(false)}
            className="mt-4 text-gray-400 font-bold hover:text-primary transition-colors text-sm py-2"
          >
            ← Изменить имя
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;