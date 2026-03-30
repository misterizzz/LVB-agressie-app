import type { Ending } from '../data/scenario';
import type { ChoiceRecord } from '../hooks/useGameState';

interface EndReportCardProps {
  ending: Ending;
  percentage: number;
  stress: number;
  trust: number;
  choices: ChoiceRecord[];
  onReflection: () => void;
  onRestart: () => void;
}

export function EndReportCard({
  ending,
  percentage,
  stress,
  trust,
  choices,
  onReflection,
  onRestart,
}: EndReportCardProps) {
  const typeColors = {
    good: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    mixed: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
    bad: 'border-red-400 bg-red-50 dark:bg-red-900/20',
  };

  const typeIcons = {
    good: '★',
    mixed: '◐',
    bad: '▲',
  };

  return (
    <div className="space-y-4">
      <div className={`rounded-2xl border-2 p-5 ${typeColors[ending.type]}`}>
        <div className="text-center mb-3">
          <span className="text-3xl">{typeIcons[ending.type]}</span>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-2">
            {ending.title}
          </h2>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-200 text-center">
          {ending.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-care-600">{percentage}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">De-escalerend</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-stress-red">{stress}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Stress</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-trust-blue">{trust}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Vertrouwen</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-2">
          Jouw keuzes
        </h3>
        <div className="space-y-2">
          {choices.map((record, i) => {
            const isGood = record.choice.tags.includes('de-escalatie');
            return (
              <div
                key={record.choiceId}
                className={`text-xs p-2 rounded-lg flex items-start gap-2 ${
                  isGood
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                }`}
              >
                <span className="font-bold shrink-0">Fase {i + 1}:</span>
                <span>{record.choice.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-care-50 dark:bg-care-900/20 rounded-xl p-4 border border-care-200 dark:border-care-700">
        <h3 className="font-semibold text-sm text-care-800 dark:text-care-200 mb-1">
          Advies
        </h3>
        <p className="text-sm text-care-700 dark:text-care-300">{ending.advice}</p>
      </div>

      <div className="space-y-2">
        <button
          onClick={onReflection}
          className="w-full py-3 px-4 bg-care-500 hover:bg-care-600 active:bg-care-700 text-white font-semibold rounded-xl transition-colors shadow-md active:scale-[0.98]"
        >
          Naar reflectie
        </button>
        <button
          onClick={onRestart}
          className="w-full py-3 px-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-600 transition-colors active:scale-[0.98]"
        >
          Opnieuw spelen
        </button>
      </div>
    </div>
  );
}
