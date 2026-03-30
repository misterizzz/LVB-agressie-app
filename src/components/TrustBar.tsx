interface TrustBarProps {
  value: number;
  animate?: boolean;
}

export function TrustBar({ value, animate = true }: TrustBarProps) {
  const color =
    value >= 60
      ? 'bg-trust-high'
      : value >= 30
        ? 'bg-trust-blue'
        : 'bg-stress-orange';

  const label = value >= 60 ? 'Goed' : value >= 30 ? 'Matig' : 'Laag';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
          Vertrouwen
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
