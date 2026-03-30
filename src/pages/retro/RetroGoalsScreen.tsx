import { scenario } from '../../data/scenario';

interface RetroGoalsScreenProps {
  onContinue: () => void;
}

export function RetroGoalsScreen({ onContinue }: RetroGoalsScreenProps) {
  return (
    <div className="min-h-full flex flex-col bg-gray-950 relative">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)]" />

      <div className="flex-1 flex flex-col px-4 py-6 max-w-sm mx-auto w-full relative space-y-4">
        <h2
          className="text-base text-center text-yellow-400 tracking-wider"
          style={{ fontFamily: 'monospace' }}
        >
          ═══ LEERDOELEN ═══
        </h2>

        <div className="space-y-2">
          {scenario.learningGoals.map((goal, i) => (
            <div
              key={i}
              className="border border-green-800 bg-gray-900/80 p-3 flex items-start gap-3"
            >
              <span
                className="text-yellow-500 text-sm shrink-0"
                style={{ fontFamily: 'monospace' }}
              >
                [{i + 1}]
              </span>
              <span className="text-[11px] text-green-300" style={{ fontFamily: 'monospace' }}>
                {goal}
              </span>
            </div>
          ))}
        </div>

        <div className="border border-cyan-800 bg-cyan-950/30 p-3">
          <p className="text-[10px] text-cyan-400" style={{ fontFamily: 'monospace' }}>
            TIP: Houd de STRESS laag en bouw VERTROUWEN op. Gebruik korte zinnen en geef keuzes.
          </p>
        </div>
      </div>

      <div className="px-4 pb-6 max-w-sm mx-auto w-full relative">
        <button
          onClick={onContinue}
          className="w-full py-3 bg-green-800 border-2 border-green-400 text-green-100 text-sm tracking-wider hover:bg-green-700 active:bg-green-600 active:scale-[0.97] transition-all"
          style={{ fontFamily: 'monospace' }}
        >
          ▶ BEGREPEN, START
        </button>
      </div>
    </div>
  );
}
