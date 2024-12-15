import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface ModeToggleProps {
  mode: 'parse' | 'construct';
  onModeChange: (mode: 'parse' | 'construct') => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <button
        className={`px-4 py-2 rounded-l-lg ${
          mode === 'parse'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onModeChange('parse')}
      >
        Parse
      </button>
      <ArrowLeftRight className="w-5 h-5 text-gray-400" />
      <button
        className={`px-4 py-2 rounded-r-lg ${
          mode === 'construct'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onModeChange('construct')}
      >
        Construct
      </button>
    </div>
  );
}