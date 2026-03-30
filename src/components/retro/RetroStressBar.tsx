interface RetroStressBarProps {
  value: number;
}

export function RetroStressBar({ value }: RetroStressBarProps) {
  const segments = 10;
  const filled = Math.round((value / 100) * segments);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-green-400 uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>
          STRESS
        </span>
        <span className="text-[10px] text-green-300" style={{ fontFamily: 'monospace' }}>
          {value}/100
        </span>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = i < filled;
          const color = i < 3 ? 'bg-green-500' : i < 7 ? 'bg-yellow-500' : 'bg-red-500';
          return (
            <div
              key={i}
              className={`h-4 flex-1 border border-green-800 ${
                isActive ? color : 'bg-gray-900'
              } transition-colors duration-300`}
            />
          );
        })}
      </div>
    </div>
  );
}
