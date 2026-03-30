interface RetroButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'choice' | 'action' | 'secondary';
  disabled?: boolean;
}

export function RetroButton({ label, onClick, variant = 'choice', disabled = false }: RetroButtonProps) {
  const variants = {
    choice:
      'bg-gray-900 border-2 border-green-700 text-green-300 hover:bg-green-900 hover:border-green-400 active:bg-green-800',
    action:
      'bg-green-800 border-2 border-green-400 text-green-100 hover:bg-green-700 active:bg-green-600',
    secondary:
      'bg-gray-800 border-2 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-gray-300 active:bg-gray-600',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-4 py-3 text-sm transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]}`}
      style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
    >
      <span className="text-green-500 mr-2">▸</span>
      {label}
    </button>
  );
}
