import { useState } from 'react';
import { reflectionQuestions } from '../../data/scenario';
import type { ReflectionAnswer } from '../../hooks/useGameState';
import { RetroButton } from '../../components/retro/RetroButton';

interface RetroReflectionScreenProps {
  answers: ReflectionAnswer[];
  onAnswer: (questionId: string, answer: string) => void;
  onFinish: () => void;
  onRestart: () => void;
}

export function RetroReflectionScreen({
  answers,
  onAnswer,
  onFinish,
  onRestart,
}: RetroReflectionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const question = reflectionQuestions[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === question.id);
  const isLast = currentIndex === reflectionQuestions.length - 1;

  return (
    <div className="min-h-full flex flex-col bg-gray-950 relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)]" />

      <div className="flex-1 px-4 py-6 max-w-sm mx-auto w-full space-y-4 relative">
        <div className="text-center">
          <h2 className="text-base text-yellow-400 tracking-wider" style={{ fontFamily: 'monospace' }}>
            ═══ REFLECTIE ═══
          </h2>
          <p className="text-[10px] text-green-700 mt-1" style={{ fontFamily: 'monospace' }}>
            VRAAG {currentIndex + 1}/{reflectionQuestions.length}
          </p>
        </div>

        {/* Question */}
        <div className="border-2 border-cyan-700 bg-cyan-950/20 p-4">
          <p className="text-[9px] text-cyan-500 mb-1 tracking-wider" style={{ fontFamily: 'monospace' }}>
            {question.phase.toUpperCase()}
          </p>
          <p className="text-sm text-green-200" style={{ fontFamily: 'monospace' }}>
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-1.5">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => onAnswer(question.id, option)}
              className={`w-full text-left px-3 py-3 text-[11px] transition-all border ${
                currentAnswer?.answer === option
                  ? 'border-green-400 bg-green-900/50 text-green-300'
                  : 'border-green-800 bg-gray-900 text-green-500 hover:bg-green-950 hover:border-green-600'
              }`}
              style={{ fontFamily: 'monospace' }}
            >
              <span className="text-yellow-500 mr-2">
                {currentAnswer?.answer === option ? '●' : '○'}
              </span>
              {option}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-2 pt-2">
          {currentIndex > 0 && (
            <RetroButton
              label="◀ VORIGE"
              onClick={() => setCurrentIndex((i) => i - 1)}
              variant="secondary"
            />
          )}
          <RetroButton
            label={isLast ? 'BEKIJK OVERZICHT ▶' : 'VOLGENDE ▶'}
            onClick={() => isLast ? onFinish() : setCurrentIndex((i) => i + 1)}
            variant="action"
            disabled={!currentAnswer}
          />
        </div>

        <button
          onClick={onRestart}
          className="w-full text-center text-[10px] text-green-800 hover:text-green-500 py-2 transition-colors"
          style={{ fontFamily: 'monospace' }}
        >
          OPNIEUW SPELEN
        </button>
      </div>
    </div>
  );
}
