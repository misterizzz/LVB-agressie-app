interface StressBarProps {
  value: number;
  animate?: boolean;
}

export function StressBar({ value, animate = true }: StressBarProps) {
  const color =
    value <= 30
      ? 'bg-stress-green'
      : value <= 70
        ? 'bg-stress-orange'
        : 'bg-stress-red';

  const label = value <= 30 ? 'Laag' : value <= 70 ? 'Verhoogd' : 'Hoog';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
          Stress
        </span>
        <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
          {label} ({value})
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} ${animate ? 'transition-all duration-700 ease-out' : ''}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
