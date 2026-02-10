import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

interface TableSelectScreenProps {
  onSelectTable: (number: number) => void;
  onBack: () => void;
  userName: string;
}

const TableSelectScreen: React.FC<TableSelectScreenProps> = ({ onSelectTable, onBack, userName }) => {
  const tables = [2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4">
      <div className="w-full flex items-center justify-between mb-8 relative">
        <button 
          onClick={onBack}
          className="p-4 bg-white rounded-2xl shadow-button hover:shadow-button-hover active:shadow-button-active transition-all text-gray-500 hover:text-primary border-2 border-transparent hover:border-primary/20"
        >
          <ArrowLeft size={32} strokeWidth={3} />
        </button>
        <h2 className="text-3xl md:text-4xl font-black text-gray-800 absolute left-1/2 transform -translate-x-1/2 w-full text-center pointer-events-none">
          Выбери число
        </h2>
      </div>

      <div className="text-center mb-8 bg-white/60 p-6 rounded-3xl backdrop-blur-sm border-2 border-white shadow-sm">
        <p className="text-xl text-gray-700 font-bold">
          <span className="text-primary">{userName}</span>, какую таблицу будем учить?
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {tables.map((num) => (
          <button
            key={num}
            onClick={() => onSelectTable(num)}
            className="aspect-square bg-white border-b-8 border-gray-200 active:border-b-0 active:translate-y-2 active:mt-2 rounded-[2rem] flex items-center justify-center text-6xl font-black text-gray-700 hover:bg-accent hover:text-white hover:border-orange-600 transition-all shadow-card group"
          >
            <span className="group-hover:scale-110 transition-transform duration-200">{num}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableSelectScreen;