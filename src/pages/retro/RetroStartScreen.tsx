import { useState, useEffect } from 'react';
import { scenario } from '../../data/scenario';
import { PixelAvatar } from '../../components/retro/PixelAvatar';

interface RetroStartScreenProps {
  onStart: () => void;
  onBack: () => void;
}

export function RetroStartScreen({ onStart, onBack }: RetroStartScreenProps) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-full flex flex-col bg-gray-950 relative overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)]" />

      <div className="flex justify-start p-3">
        <button
          onClick={onBack}
          className="text-[10px] text-green-700 hover:text-green-400 transition-colors"
          style={{ fontFamily: 'monospace' }}
        >
          ← TERUG
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-4 max-w-sm mx-auto relative">
        {/* Title with glow */}
        <div className="space-y-2">
          <h1
            className="text-xl font-bold text-green-400 leading-tight tracking-wider"
            style={{
              fontFamily: 'monospace',
              textShadow: '0 0 10px rgba(74,222,128,0.5), 0 0 20px rgba(74,222,128,0.3)',
            }}
          >
            CONTACT ONDER
            <br />
            SPANNING
          </h1>
          <p className="text-[10px] text-green-600 tracking-[0.3em] uppercase" style={{ fontFamily: 'monospace' }}>
            ── 8-BIT EDITIE ──
          </p>
        </div>

        {/* Pixel avatars facing each other */}
        <div className="flex items-end justify-center gap-8 py-4">
          <div className="text-center">
            <PixelAvatar character="begeleider" state="observing" size={72} />
            <p className="text-[9px] text-blue-400 mt-1" style={{ fontFamily: 'monospace' }}>
              JIJ
            </p>
          </div>
          <div className="text-[10px] text-green-700" style={{ fontFamily: 'monospace' }}>
            VS
          </div>
          <div className="text-center">
            <PixelAvatar character="milan" state="fidgeting" size={72} />
            <p className="text-[9px] text-red-400 mt-1" style={{ fontFamily: 'monospace' }}>
              MILAN
            </p>
          </div>
        </div>

        {/* Info box */}
        <div className="border border-green-800 bg-gray-900/80 p-3 text-left w-full">
          <p className="text-[10px] text-yellow-400 mb-1" style={{ fontFamily: 'monospace' }}>
            MISSIE BRIEFING:
          </p>
          <p className="text-[11px] text-green-300 leading-relaxed" style={{ fontFamily: 'monospace' }}>
            {scenario.clientName}, {scenario.clientAge} jaar. LVB. Emotioneel niveau 2-3 jaar.
            Jouw doel: de-escaleren tijdens het contactmoment.
          </p>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="w-full py-4 bg-green-800 border-2 border-green-400 text-green-100 text-base tracking-wider hover:bg-green-700 active:bg-green-600 active:scale-[0.97] transition-all"
          style={{
            fontFamily: 'monospace',
            textShadow: '0 0 5px rgba(74,222,128,0.5)',
          }}
        >
          {blink ? '▶ START GAME ◀' : '▸ START GAME ◂'}
        </button>

        <p className="text-[9px] text-green-800" style={{ fontFamily: 'monospace' }}>
          DRUK OM TE BEGINNEN
        </p>
      </div>

      {/* Footer disclaimer */}
      <div className="text-[8px] text-green-900 text-center py-3 px-4 space-y-0.5" style={{ fontFamily: 'monospace' }}>
        <p>FICTIEVE EDUCATIEVE CASUS</p>
        <p>GEEN MEDISCH OF JURIDISCH ADVIES</p>
      </div>
    </div>
  );
}
