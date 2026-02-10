import { Question, QuizConfig } from '../types';

// Valid products for multiplication tables 2 through 9
const VALID_PRODUCTS = Array.from(new Set<number>(
  Array.from({ length: 8 }, (_, i) => i + 2).flatMap(i => 
    Array.from({ length: 8 }, (_, j) => j + 2).map(j => i * j)
  )
)).sort((a, b) => a - b);

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateOptions = (correctAnswer: number): number[] => {
  const options = new Set<number>();
  options.add(correctAnswer);

  while (options.size < 3) {
    // Pick a random product from the valid list
    const randomProduct = VALID_PRODUCTS[getRandomInt(0, VALID_PRODUCTS.length - 1)];
    
    // Ensure distinct from correct answer and not already in options
    if (randomProduct !== correctAnswer) {
      options.add(randomProduct);
    }
  }

  return shuffleArray(Array.from(options));
};

export const generateQuiz = (config: QuizConfig): Question[] => {
  const questions: Question[] = [];
  const TOTAL_QUESTIONS = 8;

  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    let a, b;

    if (config.difficulty === 'EXPERT') {
      // Expert: Random questions from all tables (2-9)
      a = getRandomInt(2, 9);
      b = getRandomInt(2, 9);
    } else if (config.tableNumber) {
      // Specific table selected
      a = config.tableNumber;
      b = getRandomInt(2, 9);

      if (config.difficulty === 'SMARTY') {
        // Smarty: Table number can be first or second factor (random swap)
        if (Math.random() > 0.5) {
          [a, b] = [b, a];
        }
      } 
      // Novice: Table number is ALWAYS the first factor (no swap) to keep consistent order.
      // e.g. 2x3, 2x4, etc.
    } else {
      // Fallback if table number is missing but required
      a = 2;
      b = 2;
    }

    const correctAnswer = a * b;
    
    questions.push({
      id: i,
      factorA: a,
      factorB: b,
      correctAnswer,
      options: generateOptions(correctAnswer),
    });
  }

  return questions;
};

// Returns an array representing a full multiplication table for a number
export const getMultiplicationTable = (number: number) => {
  return Array.from({ length: 9 }, (_, i) => {
    return {
      a: number,
      b: i + 1,
      result: number * (i + 1)
    };
  });
};
