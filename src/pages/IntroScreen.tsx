import { scenario } from '../data/scenario';
import { ScenarioCard } from '../components/ScenarioCard';

interface IntroScreenProps {
  onContinue: () => void;
}

export function IntroScreen({ onContinue }: IntroScreenProps) {
  return (
    <div className="min-h-full flex flex-col px-4 py-6">
      <div className="flex-1 max-w-sm mx-auto w-full space-y-5 flex flex-col justify-center">
        <ScenarioCard>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-4xl">🏠</span>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-2">
                De situatie
              </h2>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              {scenario.context}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">
                Over {scenario.clientName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {scenario.clientDescription}
              </p>
            </div>
          </div>
        </ScenarioCard>
      </div>

      <div className="max-w-sm mx-auto w-full mt-6">
        <button
          onClick={onContinue}
          className="w-full py-3 px-4 bg-care-500 hover:bg-care-600 active:bg-care-700 text-white font-semibold rounded-xl transition-colors shadow-md active:scale-[0.98]"
        >
          Ik ga de kamer in
        </button>
      </div>
    </div>
  );
}
