import type { Ending } from '../data/scenario';
import type { ChoiceRecord } from '../hooks/useGameState';
import { EndReportCard } from '../components/EndReportCard';
import { Disclaimer } from '../components/Disclaimer';

interface ResultScreenProps {
  ending: Ending;
  percentage: number;
  stress: number;
  trust: number;
  choices: ChoiceRecord[];
  onReflection: () => void;
  onRestart: () => void;
}

export function ResultScreen({
  ending,
  percentage,
  stress,
  trust,
  choices,
  onReflection,
  onRestart,
}: ResultScreenProps) {
  return (
    <div className="min-h-full flex flex-col px-4 py-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Resultaat
        </h2>
      </div>

      <div className="flex-1 max-w-sm mx-auto w-full">
        <EndReportCard
          ending={ending}
          percentage={percentage}
          stress={stress}
          trust={trust}
          choices={choices}
          onReflection={onReflection}
          onRestart={onRestart}
        />
      </div>

      <Disclaimer />
    </div>
  );
}
