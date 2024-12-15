import React from 'react';
import { Brackets } from 'lucide-react';

interface StructInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function StructInput({ value, onChange }: StructInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Brackets className="w-5 h-5 text-indigo-600" />
        <label className="text-sm font-medium text-gray-700">C Struct Definition</label>
      </div>
      <textarea
        className="w-full h-48 p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`struct Example {
  bool enabled;
  uint8_t type;
  uint16_t value;
  uint32_t timestamp;
};`}
      />
    </div>
  );
}