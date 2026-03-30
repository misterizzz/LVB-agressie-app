import type { Ending } from '../../data/scenario';
import type { ChoiceRecord } from '../../hooks/useGameState';
import { PixelAvatar } from '../../components/retro/PixelAvatar';
import { RetroButton } from '../../components/retro/RetroButton';

interface RetroResultScreenProps {
  ending: Ending;
  percentage: number;
  stress: number;
  trust: number;
  choices: ChoiceRecord[];
  onReflection: () => void;
  onRestart: () => void;
}

export function RetroResultScreen({
  ending,
  percentage,
  stress,
  trust,
  choices,
  onReflection,
  onRestart,
}: RetroResultScreenProps) {
  const typeConfig = {
    good: { border: 'border-green-500', text: 'text-green-400', bg: 'bg-green-950/30', icon: '★★★', avatarState: 'calm' as const },
    mixed: { border: 'border-yellow-500', text: 'text-yellow-400', bg: 'bg-yellow-950/30', icon: '★★☆', avatarState: 'calming' as const },
    bad: { border: 'border-red-500', text: 'text-red-400', bg: 'bg-red-950/30', icon: '★☆☆', avatarState: 'screaming' as const },
  };
  const config = typeConfig[ending.type];

  return (
    <div className="min-h-full flex flex-col bg-gray-950 relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)]" />

      <div className="flex-1 px-4 py-6 max-w-sm mx-auto w-full space-y-4 relative">
        {/* Title */}
        <div className="text-center space-y-2">
          <p className="text-[10px] text-green-600 tracking-[0.4em]" style={{ fontFamily: 'monospace' }}>
            ── MISSIE VOLTOOID ──
          </p>
          <div className={`text-2xl ${config.text}`}>{config.icon}</div>
          <h2 className={`text-lg ${config.text} tracking-wider`} style={{ fontFamily: 'monospace' }}>
            {ending.title.toUpperCase()}
          </h2>
        </div>

        {/* Avatar result */}
        <div className="flex justify-center">
          <PixelAvatar character="milan" state={config.avatarState} size={64} />
        </div>

        {/* Description */}
        <div className={`border-2 ${config.border} ${config.bg} p-3`}>
          <p className="text-[11px] text-green-200 leading-relaxed" style={{ fontFamily: 'monospace' }}>
            {ending.description}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="border border-green-800 bg-gray-900 p-2 text-center">
            <div className="text-lg font-bold text-green-400" style={{ fontFamily: 'monospace' }}>{percentage}%</div>
            <div className="text-[8px] text-green-600" style={{ fontFamily: 'monospace' }}>DE-ESCAL</div>
          </div>
          <div className="border border-red-800 bg-gray-900 p-2 text-center">
            <div className="text-lg font-bold text-red-400" style={{ fontFamily: 'monospace' }}>{stress}</div>
            <div className="text-[8px] text-red-600" style={{ fontFamily: 'monospace' }}>STRESS</div>
          </div>
          <div className="border border-cyan-800 bg-gray-900 p-2 text-center">
            <div className="text-lg font-bold text-cyan-400" style={{ fontFamily: 'monospace' }}>{trust}</div>
            <div className="text-[8px] text-cyan-600" style={{ fontFamily: 'monospace' }}>TRUST</div>
          </div>
        </div>

        {/* Choices log */}
        <div className="border border-green-800 bg-gray-900/80 p-3 space-y-1">
          <p className="text-[9px] text-yellow-500 tracking-wider" style={{ fontFamily: 'monospace' }}>
            KEUZE LOG:
          </p>
          {choices.map((record, i) => {
            const isGood = record.choice.tags.includes('de-escalatie');
            return (
              <div key={record.choiceId} className="flex items-start gap-2">
                <span className={`text-[10px] ${isGood ? 'text-green-500' : 'text-red-500'}`} style={{ fontFamily: 'monospace' }}>
                  {isGood ? '✓' : '✗'}
                </span>
                <span className="text-[10px] text-gray-400" style={{ fontFamily: 'monospace' }}>
                  F{i + 1}: {record.choice.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Advice */}
        <div className="border border-cyan-800 bg-cyan-950/20 p-3">
          <p className="text-[9px] text-cyan-500 mb-1" style={{ fontFamily: 'monospace' }}>ADVIES:</p>
          <p className="text-[11px] text-cyan-300 leading-relaxed" style={{ fontFamily: 'monospace' }}>
            {ending.advice}
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <RetroButton label="REFLECTIE ▶" onClick={onReflection} variant="action" />
          <RetroButton label="OPNIEUW SPELEN" onClick={onRestart} variant="secondary" />
        </div>
      </div>

      <div className="text-[8px] text-green-900 text-center py-3" style={{ fontFamily: 'monospace' }}>
        FICTIEVE EDUCATIEVE CASUS
      </div>
    </div>
  );
}
