import { scenario } from '../data/scenario';
import { Disclaimer } from '../components/Disclaimer';

interface StartScreenProps {
  onStart: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function StartScreen({ onStart, darkMode, onToggleDarkMode }: StartScreenProps) {
  return (
    <div className="min-h-full flex flex-col justify-between px-4 py-8">
      <div className="flex justify-end">
        <button
          onClick={onToggleDarkMode}
          className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-2 py-1"
          aria-label={darkMode ? 'Lichte modus' : 'Donkere modus'}
        >
          {darkMode ? '☀ Licht' : '☾ Donker'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-care-100 dark:bg-care-800 flex items-center justify-center">
          <span className="text-3xl">🤝</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
            {scenario.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {scenario.subtitle}
          </p>
        </div>

        <div className="bg-warm-50 dark:bg-gray-800 rounded-xl p-4 text-left w-full border border-warm-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-gray-800 dark:text-gray-100">Cliënt:</span>{' '}
            {scenario.clientName}, {scenario.clientAge} jaar
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {scenario.clientDescription}
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 px-6 bg-care-500 hover:bg-care-600 active:bg-care-700 text-white text-lg font-semibold rounded-xl transition-colors duration-200 shadow-lg active:scale-[0.98]"
        >
          Start het scenario
        </button>
      </div>

      <Disclaimer />
    </div>
  );
}
