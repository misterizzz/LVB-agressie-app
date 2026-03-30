import type { Choice } from '../../data/scenario';
import { RetroStressBar } from '../../components/retro/RetroStressBar';
import { RetroTrustBar } from '../../components/retro/RetroTrustBar';
import { RetroDialog } from '../../components/retro/RetroDialog';
import { RetroButton } from '../../components/retro/RetroButton';

interface RetroFeedbackScreenProps {
  choice: Choice;
  stress: number;
  trust: number;
  onContinue: () => void;
}

export function RetroFeedbackScreen({
  choice,
  stress,
  trust,
  onContinue,
}: RetroFeedbackScreenProps) {
  const isPositive = choice.stressDelta <= 0 && choice.trustDelta >= 0;
  const isNegative = choice.stressDelta > 10 || choice.trustDelta < -10;

  return (
    <div className="min-h-full flex flex-col bg-gray-950 relative">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)]" />

      <div className="relative px-3 pt-3 pb-2 max-w-sm mx-auto w-full">
        <div className="grid grid-cols-2 gap-3">
          <RetroStressBar value={stress} />
          <RetroTrustBar value={trust} />
        </div>
      </div>

      <div className="flex-1 px-3 pt-3 pb-4 max-w-sm mx-auto w-full space-y-3 relative">
        {/* Result banner */}
        <div
          className={`text-center py-2 border-2 ${
            isPositive
              ? 'border-green-500 bg-green-950/50 text-green-400'
              : isNegative
                ? 'border-red-500 bg-red-950/50 text-red-400'
                : 'border-yellow-500 bg-yellow-950/50 text-yellow-400'
          }`}
          style={{ fontFamily: 'monospace' }}
        >
          <span className="text-sm tracking-wider">
            {isPositive ? '★ GOED GEDAAN ★' : isNegative ? '✗ NIET IDEAAL ✗' : '~ NEUTRAAL ~'}
          </span>
        </div>

        {/* What you did */}
        <div className="border border-gray-700 bg-gray-900/80 p-3">
          <p className="text-[10px] text-gray-500 mb-1" style={{ fontFamily: 'monospace' }}>
            JIJ ZEGT:
          </p>
          <p className="text-[11px] text-gray-300 italic" style={{ fontFamily: 'monospace' }}>
            "{choice.responseText}"
          </p>
        </div>

        {/* Feedback */}
        <RetroDialog text={choice.feedback} speaker="FEEDBACK" speed={20} />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div
            className={`p-2 text-center border ${
              choice.stressDelta > 0
                ? 'border-red-700 bg-red-950/40 text-red-400'
                : 'border-green-700 bg-green-950/40 text-green-400'
            }`}
            style={{ fontFamily: 'monospace' }}
          >
            <div className="text-[9px] opacity-70">STRESS</div>
            <div className="text-sm font-bold">
              {choice.stressDelta > 0 ? '+' : ''}{choice.stressDelta}
            </div>
          </div>
          <div
            className={`p-2 text-center border ${
              choice.trustDelta < 0
                ? 'border-red-700 bg-red-950/40 text-red-400'
                : 'border-cyan-700 bg-cyan-950/40 text-cyan-400'
            }`}
            style={{ fontFamily: 'monospace' }}
          >
            <div className="text-[9px] opacity-70">VERTROUWEN</div>
            <div className="text-sm font-bold">
              {choice.trustDelta > 0 ? '+' : ''}{choice.trustDelta}
            </div>
          </div>
        </div>

        <RetroButton label="VERDER ▶" onClick={onContinue} variant="action" />
      </div>
    </div>
  );
}
