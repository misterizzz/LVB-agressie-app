import type { Choice } from '../data/scenario';
import { StressBar } from '../components/StressBar';
import { TrustBar } from '../components/TrustBar';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { ProgressBar } from '../components/ProgressBar';

interface FeedbackScreenProps {
  choice: Choice;
  stress: number;
  trust: number;
  progress: number;
  onContinue: () => void;
}

export function FeedbackScreen({
  choice,
  stress,
  trust,
  progress,
  onContinue,
}: FeedbackScreenProps) {
  return (
    <div className="min-h-full flex flex-col px-4 py-4">
      <div className="max-w-sm mx-auto w-full space-y-3">
        <ProgressBar value={progress} />

        <div className="space-y-2">
          <StressBar value={stress} />
          <TrustBar value={trust} />
        </div>
      </div>

      <div className="flex-1 max-w-sm mx-auto w-full mt-4">
        <FeedbackPanel choice={choice} onContinue={onContinue} />
      </div>
    </div>
  );
}
