import { reflectionQuestions } from '../data/scenario';
import type { ReflectionAnswer } from '../hooks/useGameState';
import { Disclaimer } from '../components/Disclaimer';

interface ReviewScreenProps {
  answers: ReflectionAnswer[];
  onRestart: () => void;
}

export function ReviewScreen({ answers, onRestart }: ReviewScreenProps) {
  return (
    <div className="min-h-full flex flex-col px-4 py-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Reflectie-overzicht
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Jouw antwoorden op de reflectievragen
        </p>
      </div>

      <div className="flex-1 max-w-sm mx-auto w-full space-y-3">
        {reflectionQuestions.map((q) => {
          const answer = answers.find((a) => a.questionId === q.id);
          return (
            <div
              key={q.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <p className="text-xs text-care-600 dark:text-care-400 font-semibold uppercase mb-1">
                {q.phase}
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                {q.question}
              </p>
              <p className="text-sm text-care-700 dark:text-care-300 bg-care-50 dark:bg-care-900/20 rounded-lg p-2">
                {answer?.answer || 'Niet beantwoord'}
              </p>
            </div>
          );
        })}

        <div className="bg-warm-50 dark:bg-gray-800 rounded-xl p-4 border border-warm-200 dark:border-gray-700">
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-2">
            Leerpunten om te onthouden
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Observeer eerst, handel dan</li>
            <li>• Gebruik korte, concrete zinnen</li>
            <li>• Geef keuze uit maximaal twee opties</li>
            <li>• Benoem emoties, corrigeer niet</li>
            <li>• Houd afstand en verlaag prikkels</li>
            <li>• Eerst regulatie, dan pas actie</li>
          </ul>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={onRestart}
            className="w-full py-3 px-4 bg-care-500 hover:bg-care-600 active:bg-care-700 text-white font-semibold rounded-xl transition-colors shadow-md active:scale-[0.98]"
          >
            Opnieuw spelen met andere keuzes
          </button>
        </div>
      </div>

      <Disclaimer />
    </div>
  );
}
