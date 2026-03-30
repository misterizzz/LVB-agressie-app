import { PixelAvatar } from './PixelAvatar';

interface RetroSceneProps {
  stressLevel: number;
  phase: number;
}

// Background scene based on phase
const PHASE_BG: Record<number, { floor: string; wall: string; label: string }> = {
  1: { floor: '#3b2507', wall: '#2d1b06', label: 'WOONKAMER' },
  2: { floor: '#3b2507', wall: '#2d1b06', label: 'WOONKAMER' },
  3: { floor: '#3b2507', wall: '#4a1010', label: '⚠ ESCALATIE' },
  4: { floor: '#1a0505', wall: '#4a1010', label: '⚠ CRISIS' },
  5: { floor: '#0a2a1a', wall: '#1a3a2a', label: 'HERSTEL' },
};

function getMilanState(stressLevel: number, phase: number) {
  if (phase >= 3 && stressLevel > 60) return 'angry' as const;
  if (phase >= 3 || stressLevel > 50) return 'stressed' as const;
  if (stressLevel < 30) return 'calm' as const;
  return 'idle' as const;
}

export function RetroScene({ stressLevel, phase }: RetroSceneProps) {
  const bg = PHASE_BG[phase] || PHASE_BG[1];
  const milanState = getMilanState(stressLevel, phase);

  return (
    <div
      className="relative w-full h-44 overflow-hidden border-2 border-green-800"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Wall */}
      <div className="absolute inset-0" style={{ backgroundColor: bg.wall }}>
        {/* Brick pattern */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 6 }).map((_, row) => (
            <div key={row} className="flex" style={{ height: '16.67%' }}>
              {Array.from({ length: 8 }).map((_, col) => (
                <div
                  key={col}
                  className="border-b border-r border-gray-600"
                  style={{
                    width: '12.5%',
                    marginLeft: row % 2 === 0 ? '0' : '6.25%',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{ backgroundColor: bg.floor }}
      >
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(0,0,0,0.3)_20px,rgba(0,0,0,0.3)_21px)]" />
      </div>

      {/* Room label */}
      <div className="absolute top-2 left-2 text-[8px] text-green-600 opacity-60" style={{ fontFamily: 'monospace' }}>
        {bg.label}
      </div>

      {/* Furniture - simple pixel table */}
      <svg className="absolute bottom-14 left-1/2 -translate-x-1/2 opacity-40" width="60" height="20" viewBox="0 0 15 5" style={{ imageRendering: 'pixelated' }}>
        <rect x="0" y="0" width="15" height="2" fill="#8B4513" />
        <rect x="1" y="2" width="2" height="3" fill="#6B3410" />
        <rect x="12" y="2" width="2" height="3" fill="#6B3410" />
      </svg>

      {/* Begeleider (player) */}
      <div className="absolute bottom-4 left-6">
        <PixelAvatar character="begeleider" state="idle" size={64} />
      </div>

      {/* Milan */}
      <div className="absolute bottom-4 right-6">
        <PixelAvatar character="milan" state={milanState} size={64} />
      </div>

      {/* Stress overlay */}
      {stressLevel > 70 && (
        <div className="absolute inset-0 bg-red-900/20 animate-pulse pointer-events-none" />
      )}

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.4)_2px,rgba(0,0,0,0.4)_4px)]" />
    </div>
  );
}
