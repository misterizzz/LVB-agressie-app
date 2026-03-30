import type { Scene, Choice } from '../../data/scenario';
import { RetroStressBar } from '../../components/retro/RetroStressBar';
import { RetroTrustBar } from '../../components/retro/RetroTrustBar';
import { RetroProgressBar } from '../../components/retro/RetroProgressBar';
import { RetroScene } from '../../components/retro/RetroScene';
import { RetroDialog } from '../../components/retro/RetroDialog';
import { RetroButton } from '../../components/retro/RetroButton';

interface RetroSceneScreenProps {
  scene: Scene;
  stress: number;
  trust: number;
  progress: number;
  onChoice: (choice: Choice) => void;
}

const phaseLabels: Record<number, string> = {
  1: 'FASE 1 - OBSERVEREN',
  2: 'FASE 2 - SPANNING',
  3: 'FASE 3 - ESCALATIE',
  4: 'FASE 4 - DE-ESCALATIE',
  5: 'FASE 5 - HERSTEL',
};

export function RetroSceneScreen({
  scene,
  stress,
  trust,
  progress,
  onChoice,
}: RetroSceneScreenProps) {
  return (
    <div className="min-h-full flex flex-col bg-gray-950 relative">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)]" />

      <div className="relative px-3 pt-3 pb-2 max-w-sm mx-auto w-full space-y-2">
        <RetroProgressBar value={progress} phase={phaseLabels[scene.phase]} />
        <div className="grid grid-cols-2 gap-3">
          <RetroStressBar value={stress} />
          <RetroTrustBar value={trust} />
        </div>
      </div>

      {/* Scene visualization */}
      <div className="px-3 max-w-sm mx-auto w-full relative">
        <RetroScene stressLevel={stress} phase={scene.phase} />
      </div>

      <div className="flex-1 px-3 pt-3 pb-4 max-w-sm mx-auto w-full space-y-3 relative">
        {/* Narrative */}
        <RetroDialog text={scene.narrative} speaker="NARRATOR">
          <div className="mt-2 border-t border-green-900 pt-2">
            <p className="text-[10px] text-red-400" style={{ fontFamily: 'monospace' }}>
              ⚠ MILAN: {scene.clientBehavior}
            </p>
          </div>
        </RetroDialog>

        {/* Choices */}
        <div className="space-y-1.5">
          <p className="text-[9px] text-yellow-500 text-center tracking-widest" style={{ fontFamily: 'monospace' }}>
            ── WAT DOE JE? ──
          </p>
          {scene.choices.map((choice) => (
            <RetroButton
              key={choice.id}
              label={choice.label}
              onClick={() => onChoice(choice)}
              variant="choice"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
