import React, { useEffect, useState } from 'react';
import { parseHexBuffer } from '../utils/structParser';
import type { StructField } from '../utils/structParser';
import { FileDown } from 'lucide-react';

interface ParseModeProps {
  fields: StructField[];
  isLittleEndian: boolean;
}

export function ParseMode({ fields, isLittleEndian }: ParseModeProps) {
  const [hexInput, setHexInput] = useState('');
  const [parsedData, setParsedData] = useState<Record<string, any>>({});

  useEffect(() => {
    try {
      if (hexInput && fields.length > 0) {
        const parsed = parseHexBuffer(
          hexInput.replace(/[^0-9a-fA-F]/g, ''), 
          fields,
          isLittleEndian
        );
        setParsedData(parsed);
      }
    } catch (error) {
      console.error('Failed to parse hex buffer:', error);
    }
  }, [hexInput, fields, isLittleEndian]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileDown className="w-5 h-5 text-indigo-600" />
          <label className="text-sm font-medium text-gray-700">Hex Buffer Input</label>
        </div>
        <input
          type="text"
          className="w-full p-3 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
          placeholder="Enter hex buffer (e.g., 0A0B0C)"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Parsed Data</h3>
        </div>
        <div className="p-4">
          <pre className="p-4 bg-gray-50 rounded-lg overflow-auto">
            {JSON.stringify(parsedData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}