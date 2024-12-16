import React, { useEffect } from 'react';
import { constructHexBuffer } from '../utils/structParser';
import type { StructField } from '../utils/types';
import { FileUp } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { useUrlState } from '../hooks/useUrlState';
import { serializeValues, deserializeValues } from '../utils/urlHelpers';
import { FieldInput } from './FieldInput';

interface ConstructModeProps {
  fields: StructField[];
  isLittleEndian: boolean;
}

export function ConstructMode({ fields, isLittleEndian }: ConstructModeProps) {
  const [values, setValues] = useUrlState<Record<string, any>>(
    'values',
    {},
    serializeValues,
    deserializeValues
  );
  const [hexOutput, setHexOutput] = useUrlState<string>('hexOutput', '');

  useEffect(() => {
    try {
      if (Object.keys(values).length > 0) {
        const hex = constructHexBuffer(values, fields, isLittleEndian);
        setHexOutput(hex);
      }
    } catch (error) {
      console.error('Failed to construct hex buffer:', error);
    }
  }, [values, fields, isLittleEndian, setHexOutput]);

  const handleValueChange = (fieldName: string, value: string | boolean) => {
    setValues({
      ...values,
      [fieldName]: typeof value === 'boolean' ? value : Number(value),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {fields.map((field) => (
          <FieldInput
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={handleValueChange}
          />
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
