interface RetroProgressBarProps {
  value: number;
  phase?: string;
}

export function RetroProgressBar({ value, phase }: RetroProgressBarProps) {
  const blocks = 20;
  const filled = Math.round((value / 100) * blocks);

  return (
    <div>
      {phase && (
        <div className="text-[10px] text-yellow-400 text-center mb-1 uppercase tracking-wider" style={{ fontFamily: 'monospace' }}>
          {phase}
        </div>
      )}
      <div className="text-center text-green-600 text-[10px]" style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>
        [{Array.from({ length: blocks }).map((_, i) => (i < filled ? '█' : '░')).join('')}]
      </div>
    </div>
  );
}
