import { useState } from 'react';
import { reflectionQuestions } from '../data/scenario';
import type { ReflectionAnswer } from '../hooks/useGameState';
import { Disclaimer } from '../components/Disclaimer';

interface ReflectionScreenProps {
  answers: ReflectionAnswer[];
  onAnswer: (questionId: string, answer: string) => void;
  onFinish: () => void;
  onRestart: () => void;
}

export function ReflectionScreen({
  answers,
  onAnswer,
  onFinish,
  onRestart,
}: ReflectionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const question = reflectionQuestions[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === question.id);
  const isLast = currentIndex === reflectionQuestions.length - 1;

  const handleSelect = (option: string) => {
    onAnswer(question.id, option);
  };

  const handleNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  return (
    <div className="min-h-full flex flex-col px-4 py-6">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Reflectie</h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Vraag {currentIndex + 1} van {reflectionQuestions.length}
        </p>
      </div>

      <div className="flex-1 max-w-sm mx-auto w-full space-y-4">
        <div className="bg-care-50 dark:bg-care-900/20 rounded-xl p-4 border border-care-200 dark:border-care-700">
          <p className="text-xs text-care-600 dark:text-care-300 font-semibold uppercase mb-1">
            {question.phase}
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {question.question}
          </p>
        </div>

        <div className="space-y-2">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 active:scale-[0.98] border-2 ${
                currentAnswer?.answer === option
                  ? 'bg-care-100 dark:bg-care-800 border-care-400 dark:border-care-500 text-care-800 dark:text-care-200 font-medium'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-care-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          {currentIndex > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-colors active:scale-[0.98]"
            >
              Vorige
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="flex-1 py-3 px-4 bg-care-500 hover:bg-care-600 active:bg-care-700 text-white font-semibold rounded-xl transition-colors shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLast ? 'Bekijk overzicht' : 'Volgende'}
          </button>
        </div>
      </div>

      <div className="max-w-sm mx-auto w-full mt-4">
        <button
          onClick={onRestart}
          className="w-full py-2 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          Opnieuw spelen
        </button>
      </div>

      <Disclaimer />
    </div>
  );
}
