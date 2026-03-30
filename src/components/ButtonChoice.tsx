interface ButtonChoiceProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
}

export function ButtonChoice({
  label,
  onClick,
  disabled = false,
  variant = 'default',
}: ButtonChoiceProps) {
  const base =
    'w-full text-left px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    default:
      'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-care-400 hover:bg-care-50 dark:hover:bg-gray-700 active:bg-care-100 shadow-sm',
    primary:
      'bg-care-500 text-white border-2 border-care-600 hover:bg-care-600 active:bg-care-700 shadow-md',
    secondary:
      'bg-warm-100 dark:bg-gray-700 text-warm-800 dark:text-gray-200 border-2 border-warm-200 dark:border-gray-600 hover:bg-warm-200 active:bg-warm-300',
  };

  return (
    <button
      className={`${base} ${variants[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
