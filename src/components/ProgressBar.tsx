interface ProgressBarProps {
  value: number;
  phase?: string;
}

export function ProgressBar({ value, phase }: ProgressBarProps) {
  return (
    <div className="w-full">
      {phase && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-center font-medium">
          {phase}
        </div>
      )}
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-care-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
