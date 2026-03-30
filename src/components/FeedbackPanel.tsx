import type { Choice } from '../data/scenario';

interface FeedbackPanelProps {
  choice: Choice;
  onContinue: () => void;
}

export function FeedbackPanel({ choice, onContinue }: FeedbackPanelProps) {
  const isPositive = choice.stressDelta <= 0 && choice.trustDelta >= 0;
  const isNegative = choice.stressDelta > 10 || choice.trustDelta < -10;

  return (
    <div className="space-y-4">
      <div
        className={`rounded-xl p-4 ${
          isPositive
            ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700'
            : isNegative
              ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
        }`}
      >
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xl">
            {isPositive ? '✓' : isNegative ? '✗' : '~'}
          </span>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 italic">
            "{choice.responseText}"
          </p>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-200 mt-2">
          {choice.feedback}
        </p>
      </div>

      <div className="flex gap-3 text-sm">
        <div
          className={`flex-1 rounded-lg p-2 text-center font-semibold ${
            choice.stressDelta > 0
              ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
              : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
          }`}
        >
          Stress {choice.stressDelta > 0 ? '+' : ''}
          {choice.stressDelta}
        </div>
        <div
          className={`flex-1 rounded-lg p-2 text-center font-semibold ${
            choice.trustDelta < 0
              ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
              : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
          }`}
        >
          Vertrouwen {choice.trustDelta > 0 ? '+' : ''}
          {choice.trustDelta}
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-3 px-4 bg-care-500 hover:bg-care-600 active:bg-care-700 text-white font-semibold rounded-xl transition-colors duration-200 active:scale-[0.98] shadow-md"
      >
        Verder
      </button>
    </div>
  );
}
