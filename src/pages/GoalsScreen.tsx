import { scenario } from '../data/scenario';

interface GoalsScreenProps {
  onContinue: () => void;
}

export function GoalsScreen({ onContinue }: GoalsScreenProps) {
  return (
    <div className="min-h-full flex flex-col px-4 py-6">
      <div className="flex-1 max-w-sm mx-auto w-full space-y-5">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Leerdoelen
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            In dit scenario oefen je met:
          </p>
        </div>

        <div className="space-y-3">
          {scenario.learningGoals.map((goal, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-care-100 dark:bg-care-800 text-care-600 dark:text-care-300 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-200 pt-0.5">{goal}</span>
            </div>
          ))}
        </div>

        <div className="bg-warm-50 dark:bg-gray-800 rounded-xl p-4 border border-warm-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Tip:</span> Let op de stressmeter en
            de vertrouwensmeter. Probeer de stress laag te houden en het
            vertrouwen op te bouwen.
          </p>
        </div>
      </div>

      <div className="max-w-sm mx-auto w-full mt-6">
        <button
          onClick={onContinue}
          className="w-full py-3 px-4 bg-care-500 hover:bg-care-600 active:bg-care-700 text-white font-semibold rounded-xl transition-colors shadow-md active:scale-[0.98]"
        >
          Begrepen, start het scenario
        </button>
      </div>
    </div>
  );
}
