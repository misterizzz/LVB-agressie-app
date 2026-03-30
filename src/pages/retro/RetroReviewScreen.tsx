import { reflectionQuestions } from '../../data/scenario';
import type { ReflectionAnswer } from '../../hooks/useGameState';
import { RetroButton } from '../../components/retro/RetroButton';
import { PixelAvatar } from '../../components/retro/PixelAvatar';

interface RetroReviewScreenProps {
  answers: ReflectionAnswer[];
  onRestart: () => void;
}

export function RetroReviewScreen({ answers, onRestart }: RetroReviewScreenProps) {
  return (
    <div className="min-h-full flex flex-col bg-gray-950 relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)]" />

      <div className="flex-1 px-4 py-6 max-w-sm mx-auto w-full space-y-4 relative">
        <div className="text-center space-y-2">
          <h2 className="text-base text-yellow-400 tracking-wider" style={{ fontFamily: 'monospace' }}>
            ═══ OVERZICHT ═══
          </h2>
          <PixelAvatar character="begeleider" state="idle" size={48} className="mx-auto" />
        </div>

        {/* Answers */}
        {reflectionQuestions.map((q) => {
          const answer = answers.find((a) => a.questionId === q.id);
          return (
            <div key={q.id} className="border border-green-800 bg-gray-900/80 p-3">
              <p className="text-[9px] text-cyan-500 tracking-wider" style={{ fontFamily: 'monospace' }}>
                {q.phase.toUpperCase()}
              </p>
              <p className="text-[11px] text-green-300 mt-1" style={{ fontFamily: 'monospace' }}>
                {q.question}
              </p>
              <p className="text-[11px] text-yellow-400 mt-2 border-t border-green-900 pt-2" style={{ fontFamily: 'monospace' }}>
                → {answer?.answer || 'Niet beantwoord'}
              </p>
            </div>
          );
        })}

        {/* Tips */}
        <div className="border-2 border-cyan-700 bg-cyan-950/20 p-3">
          <p className="text-[9px] text-cyan-500 mb-2 tracking-wider" style={{ fontFamily: 'monospace' }}>
            LEERPUNTEN:
          </p>
          <div className="space-y-1 text-[10px] text-cyan-300" style={{ fontFamily: 'monospace' }}>
            <p>▸ Observeer eerst, handel dan</p>
            <p>▸ Gebruik korte, concrete zinnen</p>
            <p>▸ Geef keuze uit max 2 opties</p>
            <p>▸ Benoem emoties, corrigeer niet</p>
            <p>▸ Houd afstand, verlaag prikkels</p>
            <p>▸ Eerst regulatie, dan pas actie</p>
          </div>
        </div>

        <RetroButton label="OPNIEUW SPELEN MET ANDERE KEUZES" onClick={onRestart} variant="action" />
      </div>

      <div className="text-[8px] text-green-900 text-center py-3" style={{ fontFamily: 'monospace' }}>
        FICTIEVE EDUCATIEVE CASUS
      </div>
    </div>
  );
}
