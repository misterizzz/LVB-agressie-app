import { useEffect, useState } from 'react';
import { PixelAvatar, type AvatarState } from './PixelAvatar';

interface RetroSceneProps {
  stressLevel: number;
  phase: number;
}

// Phase-specific scene configurations
interface PhaseConfig {
  wall: string;
  floor: string;
  label: string;
  begeleiderState: AvatarState;
  milanState: AvatarState;
  begeleiderX: string;     // CSS left position
  milanX: string;          // CSS right position
  showCouch: boolean;
  showTable: boolean;
  showThrownObject: boolean;
  showExclamation: boolean;
  showSweat: boolean;
  overlay?: string;
}

function getPhaseConfig(phase: number, stress: number): PhaseConfig {
  switch (phase) {
    case 1: // Observeren: Milan zit, begeleider op afstand
      return {
        wall: '#3d2a10', floor: '#5a3d1a', label: 'WOONKAMER',
        begeleiderState: 'observing',
        milanState: 'fidgeting',
        begeleiderX: 'left-2',     // ver weg
        milanX: 'right-4',         // bij de bank
        showCouch: true, showTable: false,
        showThrownObject: false, showExclamation: false,
        showSweat: stress > 50,
      };
    case 2: // Spanningsopbouw: begeleider dichterbij, Milan weigert
      return {
        wall: '#3d2a10', floor: '#5a3d1a', label: 'WOONKAMER',
        begeleiderState: 'approaching',
        milanState: 'refusing',
        begeleiderX: 'left-10',    // dichterbij
        milanX: 'right-6',
        showCouch: false, showTable: true,
        showThrownObject: false, showExclamation: true,
        showSweat: true,
      };
    case 3: // Escalatie: Milan schreeuwt, begeleider wijkt
      return {
        wall: '#4a1515', floor: '#3d1a1a', label: '⚠ ESCALATIE',
        begeleiderState: 'backing-off',
        milanState: 'screaming',
        begeleiderX: 'left-4',     // terug
        milanX: 'right-8',
        showCouch: false, showTable: true,
        showThrownObject: false, showExclamation: true,
        showSweat: true,
        overlay: 'bg-red-900/10',
      };
    case 4: // Crisis: Milan gooit, begeleider op afstand
      return {
        wall: '#4a1515', floor: '#2d0a0a', label: '⚠ CRISIS',
        begeleiderState: 'backing-off',
        milanState: 'throwing',
        begeleiderX: 'left-1',     // ver weg
        milanX: 'right-6',
        showCouch: false, showTable: false,
        showThrownObject: true, showExclamation: true,
        showSweat: true,
        overlay: 'bg-red-900/20',
      };
    case 5: // Herstel: meer afstand, Milan kalmeert
      return {
        wall: '#1a3020', floor: '#2a4030', label: 'HERSTEL',
        begeleiderState: 'observing',
        milanState: 'calming',
        begeleiderX: 'left-3',
        milanX: 'right-6',
        showCouch: false, showTable: false,
        showThrownObject: false, showExclamation: false,
        showSweat: false,
      };
    default:
      return {
        wall: '#3d2a10', floor: '#5a3d1a', label: 'WOONKAMER',
        begeleiderState: 'idle',
        milanState: 'fidgeting',
        begeleiderX: 'left-4',
        milanX: 'right-6',
        showCouch: true, showTable: false,
        showThrownObject: false, showExclamation: false,
        showSweat: false,
      };
  }
}

// Flying cup animation
function ThrownObject() {
  const [pos, setPos] = useState({ x: 70, y: 40 });
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      // Arc trajectory
      const x = 70 - frame * 4;
      const y = 40 - Math.sin(frame * 0.5) * 15 + frame * 2;
      setPos({ x: Math.max(10, x), y: Math.min(80, y) });
      if (frame > 12) frame = 0;
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      className="absolute"
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, imageRendering: 'pixelated' }}
      width="16" height="16" viewBox="0 0 8 8"
    >
      <rect x="1" y="1" width="6" height="5" fill="#9ca3af" />
      <rect x="2" y="0" width="4" height="1" fill="#9ca3af" />
      <rect x="0" y="2" width="1" height="3" fill="#6b7280" />
    </svg>
  );
}

// Exclamation / speech indicators
function ExclamationBubble({ x, color }: { x: string; color: string }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setVisible((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);
  if (!visible) return null;
  return (
    <div
      className={`absolute top-2 text-xs font-bold ${x}`}
      style={{ fontFamily: 'monospace', color, textShadow: `0 0 4px ${color}` }}
    >
      !!
    </div>
  );
}

// Sweat drops
function SweatDrops({ x }: { x: string }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => (f + 1) % 3), 400);
    return () => clearInterval(interval);
  }, []);
  const offsets = [0, -2, -4];
  return (
    <div className={`absolute top-6 ${x}`} style={{ fontFamily: 'monospace' }}>
      <span
        className="text-[8px] text-cyan-400 inline-block"
        style={{ transform: `translateY(${offsets[frame]}px)`, transition: 'transform 0.3s' }}
      >
        💧
      </span>
    </div>
  );
}

export function RetroScene({ stressLevel, phase }: RetroSceneProps) {
  const config = getPhaseConfig(phase, stressLevel);

  return (
    <div
      className="relative w-full h-48 overflow-hidden border-2 border-green-800"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Wall */}
      <div className="absolute inset-0" style={{ backgroundColor: config.wall }}>
        {/* Brick pattern */}
        <div className="absolute inset-0 opacity-15">
          {Array.from({ length: 5 }).map((_, row) => (
            <div key={row} className="flex" style={{ height: '20%' }}>
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
        style={{ backgroundColor: config.floor }}
      >
        <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(0,0,0,0.3)_24px,rgba(0,0,0,0.3)_25px)]" />
      </div>

      {/* Room label */}
      <div className="absolute top-1.5 left-2 text-[7px] text-green-600 opacity-50" style={{ fontFamily: 'monospace' }}>
        {config.label}
      </div>

      {/* Couch (fase 1) */}
      {config.showCouch && (
        <svg className="absolute bottom-14 right-4" width="70" height="30" viewBox="0 0 18 8" style={{ imageRendering: 'pixelated' }}>
          {/* Back */}
          <rect x="0" y="0" width="18" height="5" fill="#6b4423" />
          {/* Seat */}
          <rect x="1" y="3" width="16" height="3" fill="#8b5e3c" />
          {/* Armrests */}
          <rect x="0" y="2" width="2" height="5" fill="#5a3a1a" />
          <rect x="16" y="2" width="2" height="5" fill="#5a3a1a" />
          {/* Legs */}
          <rect x="2" y="7" width="2" height="1" fill="#4a2a10" />
          <rect x="14" y="7" width="2" height="1" fill="#4a2a10" />
        </svg>
      )}

      {/* Table */}
      {config.showTable && (
        <svg className="absolute bottom-14 left-1/2 -translate-x-1/2 opacity-50" width="50" height="20" viewBox="0 0 14 6" style={{ imageRendering: 'pixelated' }}>
          <rect x="0" y="0" width="14" height="2" fill="#8B4513" />
          <rect x="1" y="2" width="2" height="4" fill="#6B3410" />
          <rect x="11" y="2" width="2" height="4" fill="#6B3410" />
        </svg>
      )}

      {/* Thrown object */}
      {config.showThrownObject && <ThrownObject />}

      {/* Begeleider */}
      <div className={`absolute bottom-5 ${config.begeleiderX}`}>
        <PixelAvatar
          character="begeleider"
          state={config.begeleiderState}
          size={56}
        />
      </div>

      {/* Milan */}
      <div className={`absolute bottom-5 ${config.milanX}`}>
        {config.showSweat && <SweatDrops x="left-1" />}
        <PixelAvatar
          character="milan"
          state={config.milanState}
          size={56}
          mirrored={phase >= 2 && phase <= 4}
        />
      </div>

      {/* Exclamation marks above Milan */}
      {config.showExclamation && (
        <ExclamationBubble
          x={config.milanX}
          color={phase >= 3 ? '#ef4444' : '#fbbf24'}
        />
      )}

      {/* Stress overlay */}
      {config.overlay && (
        <div className={`absolute inset-0 ${config.overlay} animate-pulse pointer-events-none`} />
      )}

      {/* High stress: screen shake effect via subtle border flash */}
      {stressLevel > 80 && (
        <div className="absolute inset-0 border-2 border-red-500 animate-pulse pointer-events-none" />
      )}

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.4)_2px,rgba(0,0,0,0.4)_4px)]" />
    </div>
  );
}
