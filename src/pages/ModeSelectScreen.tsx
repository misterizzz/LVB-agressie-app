import type { GameMode } from '../hooks/useGameState';
import { Disclaimer } from '../components/Disclaimer';

interface ModeSelectScreenProps {
  onSelect: (mode: GameMode) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function ModeSelectScreen({ onSelect, darkMode, onToggleDarkMode }: ModeSelectScreenProps) {
  return (
    <div className="min-h-full flex flex-col justify-between px-4 py-8">
      <div className="flex justify-end">
        <button
          onClick={onToggleDarkMode}
          className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-2 py-1"
        >
          {darkMode ? '☀ Licht' : '☾ Donker'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 max-w-sm mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
            Contact onder spanning
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Kies een speelstijl
          </p>
        </div>

        {/* Classic mode */}
        <button
          onClick={() => onSelect('classic')}
          className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 text-left transition-all hover:border-care-400 hover:shadow-lg active:scale-[0.98] space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-care-100 dark:bg-care-800 flex items-center justify-center text-2xl">
              🤝
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Klassiek
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Professionele zorg-stijl
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Rustige interface met kaarten en meters. Gericht op leren en reflectie.
          </p>
        </button>

        {/* Retro 8-bit mode */}
        <button
          onClick={() => onSelect('retro')}
          className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-900 p-5 text-left transition-all hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 active:scale-[0.98] space-y-3 relative overflow-hidden"
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />

          <div className="flex items-center gap-3 relative">
            <div className="w-12 h-12 rounded-xl bg-green-900 flex items-center justify-center">
              {/* Tiny pixel character */}
              <svg viewBox="0 0 16 16" className="w-8 h-8" style={{ imageRendering: 'pixelated' }}>
                <rect x="5" y="1" width="6" height="5" fill="#fbbf24" />
                <rect x="6" y="2" width="1" height="1" fill="#1a1a2e" />
                <rect x="9" y="2" width="1" height="1" fill="#1a1a2e" />
                <rect x="7" y="4" width="2" height="1" fill="#ef4444" />
                <rect x="4" y="6" width="8" height="6" fill="#3b82f6" />
                <rect x="3" y="6" width="1" height="4" fill="#fbbf24" />
                <rect x="12" y="6" width="1" height="4" fill="#fbbf24" />
                <rect x="5" y="12" width="2" height="3" fill="#1e3a5f" />
                <rect x="9" y="12" width="2" height="3" fill="#1e3a5f" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-green-400" style={{ fontFamily: 'monospace' }}>
                8-BIT RETRO
              </h2>
              <p className="text-xs text-green-600">
                Pixel art game-stijl
              </p>
            </div>
          </div>
          <p className="text-sm text-green-300 relative" style={{ fontFamily: 'monospace' }}>
            Pixel avatars, animaties en retro game feel. Zelfde scenario, andere beleving.
          </p>

          {/* Blinking cursor */}
          <span className="inline-block w-2 h-3 bg-green-400 animate-pulse ml-1 relative" />
        </button>
      </div>

      <Disclaimer />
    </div>
  );
}
