import type { Scene, Choice } from '../data/scenario';
import { StressBar } from '../components/StressBar';
import { TrustBar } from '../components/TrustBar';
import { ScenarioCard } from '../components/ScenarioCard';
import { ButtonChoice } from '../components/ButtonChoice';
import { ProgressBar } from '../components/ProgressBar';

interface SceneScreenProps {
  scene: Scene;
  stress: number;
  trust: number;
  progress: number;
  onChoice: (choice: Choice) => void;
}

export function SceneScreen({
  scene,
  stress,
  trust,
  progress,
  onChoice,
}: SceneScreenProps) {
  const phaseLabels: Record<number, string> = {
    1: 'Fase 1 — Observeren',
    2: 'Fase 2 — Spanningsopbouw',
    3: 'Fase 3 — Escalatiepunt',
    4: 'Fase 4 — Veiligheid & De-escalatie',
    5: 'Fase 5 — Herstel',
  };

  return (
    <div className="min-h-full flex flex-col px-4 py-4">
      <div className="max-w-sm mx-auto w-full space-y-3">
        <ProgressBar value={progress} phase={phaseLabels[scene.phase]} />

        <div className="space-y-2">
          <StressBar value={stress} />
          <TrustBar value={trust} />
        </div>
      </div>

      <div className="flex-1 max-w-sm mx-auto w-full mt-4 space-y-4">
        <ScenarioCard>
          <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
            {scene.narrative}
          </p>
          <div className="mt-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-100 dark:border-red-800">
            <p className="text-xs text-red-500 dark:text-red-400 font-semibold uppercase mb-1">
              Gedrag van Milan
            </p>
            <p className="text-sm text-red-700 dark:text-red-300">
              {scene.clientBehavior}
            </p>
          </div>
        </ScenarioCard>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase text-center">
            Wat doe je?
          </p>
          {scene.choices.map((choice) => (
            <ButtonChoice
              key={choice.id}
              label={choice.label}
              onClick={() => onChoice(choice)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
