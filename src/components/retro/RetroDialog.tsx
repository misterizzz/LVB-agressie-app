import { useEffect, useState, type ReactNode } from 'react';

interface RetroDialogProps {
  text: string;
  speaker?: string;
  children?: ReactNode;
  speed?: number;
}

export function RetroDialog({ text, speaker, children, speed = 30 }: RetroDialogProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= text.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(interval);
      } else {
        setDisplayed(text.slice(0, i));
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className="border-2 border-green-600 bg-gray-900/95 p-4 relative">
      {/* Corner decorations */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-400" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400" />

      {speaker && (
        <div className="text-[10px] text-yellow-400 uppercase tracking-widest mb-2" style={{ fontFamily: 'monospace' }}>
          [{speaker}]
        </div>
      )}
      <p className="text-sm text-green-200 leading-relaxed" style={{ fontFamily: 'monospace' }}>
        {displayed}
        {!done && <span className="inline-block w-2 h-3 bg-green-400 animate-pulse ml-0.5" />}
      </p>
      {done && children}
    </div>
  );
}
