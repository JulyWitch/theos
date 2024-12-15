import React, { useEffect, useState } from 'react';
import { constructHexBuffer } from '../utils/structParser';
import type { StructField } from '../utils/types';
import { FileUp } from 'lucide-react';
import { CopyButton } from './CopyButton';

interface ConstructModeProps {
  fields: StructField[];
  isLittleEndian: boolean;
}

export function ConstructMode({ fields, isLittleEndian }: ConstructModeProps) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [hexOutput, setHexOutput] = useState('');

  useEffect(() => {
    try {
      if (Object.keys(values).length > 0) {
        const hex = constructHexBuffer(values, fields, isLittleEndian);
        setHexOutput(hex);
      }
    } catch (error) {
      console.error('Failed to construct hex buffer:', error);
    }
  }, [values, fields, isLittleEndian]);

  const handleValueChange = (fieldName: string, value: string | boolean) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: typeof value === 'boolean' ? value : Number(value),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.name} ({field.type})
            </label>
            {field.isBoolean ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  onChange={(e) => handleValueChange(field.name, e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">
                  {field.name}
                </span>
              </div>
            ) : (
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => handleValueChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileUp className="w-5 h-5 text-indigo-600" />
            <label className="text-sm font-medium text-gray-700">Generated Hex Buffer</label>
          </div>
          <CopyButton text={hexOutput} />
        </div>
        <input
          type="text"
          className="w-full p-3 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg"
          value={hexOutput}
          readOnly
        />
      </div>
    </div>
  );
}