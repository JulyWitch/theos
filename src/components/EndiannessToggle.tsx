import React from 'react';
import { Cpu } from 'lucide-react';

interface EndiannessToggleProps {
  endianness: 'little' | 'big';
  onEndiannessChange: (endianness: 'little' | 'big') => void;
}

export function EndiannessToggle({ endianness, onEndiannessChange }: EndiannessToggleProps) {
  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
      <Cpu className="w-5 h-5 text-indigo-600" />
      <span className="text-sm font-medium text-gray-700">Endianness:</span>
      <div className="flex rounded-lg bg-gray-100">
        <button
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            endianness === 'little'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onEndiannessChange('little')}
        >
          Little Endian
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            endianness === 'big'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onEndiannessChange('big')}
        >
          Big Endian
        </button>
      </div>
    </div>
  );
}