import { type ReactNode } from 'react';

interface ScenarioCardProps {
  children: ReactNode;
  className?: string;
}

export function ScenarioCard({ children, className = '' }: ScenarioCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 mx-auto max-w-lg w-full ${className}`}
    >
      {children}
    </div>
  );
}
