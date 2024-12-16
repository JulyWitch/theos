import React from 'react';
import type { StructField } from '../utils/types';

interface FieldInputProps {
  field: StructField;
  value: any;
  onChange: (fieldName: string, value: string | boolean) => void;
}

export function FieldInput({ field, value, onChange }: FieldInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.name} ({field.type})
      </label>
      {field.isBoolean ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={value || false}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            onChange={(e) => onChange(field.name, e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-600">
            {field.name}
          </span>
        </div>
      ) : (
        <input
          type="number"
          value={value || ''}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )}
    </div>
  );
}
