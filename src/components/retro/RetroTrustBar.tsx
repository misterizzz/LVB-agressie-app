interface RetroTrustBarProps {
  value: number;
}

export function RetroTrustBar({ value }: RetroTrustBarProps) {
  const hearts = 5;
  const filled = Math.round((value / 100) * hearts);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-cyan-400 uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>
          VERTROUWEN
        </span>
        <span className="text-[10px] text-cyan-300" style={{ fontFamily: 'monospace' }}>
          {value}/100
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: hearts }).map((_, i) => (
          <span
            key={i}
            className={`text-lg transition-all duration-300 ${
              i < filled ? 'text-cyan-400 scale-100' : 'text-gray-700 scale-90'
            }`}
            style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
          >
            {i < filled ? '♥' : '♡'}
          </span>
        ))}
      </div>
    </div>
  );
}
