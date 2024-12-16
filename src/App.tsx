import React from 'react';
import { StructInput } from './components/StructInput';
import { ModeToggle } from './components/ModeToggle';
import { EndiannessToggle } from './components/EndiannessToggle';
import { ParseMode } from './components/ParseMode';
import { ConstructMode } from './components/ConstructMode';
import { parseStructDefinition } from './utils/structParser';
import type { StructField } from './utils/structParser';
import { Cpu } from 'lucide-react';
import { useUrlState } from './hooks/useUrlState';
import { serializeStructDef, deserializeStructDef } from './utils/urlHelpers';

export default function App() {
  const [structDef, setStructDef] = useUrlState('struct', '', serializeStructDef, deserializeStructDef);
  const [mode, setMode] = useUrlState<'parse' | 'construct'>('mode', 'parse');
  const [endianness, setEndianness] = useUrlState<'little' | 'big'>('endianness', 'little');
  const [fields, setFields] = React.useState<StructField[]>([]);

  React.useEffect(() => {
    if (structDef) {
      const parsedFields = parseStructDefinition(structDef);
      setFields(parsedFields);
    }
  }, [structDef]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <Cpu className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">IoT Struct Tool</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <StructInput value={structDef} onChange={setStructDef} />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <ModeToggle mode={mode} onModeChange={setMode} />
            </div>
            <div className="flex-1">
              <EndiannessToggle
                endianness={endianness}
                onEndiannessChange={setEndianness}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            {mode === 'parse' ? (
              <ParseMode
                fields={fields}
                isLittleEndian={endianness === 'little'}
              />
            ) : (
              <ConstructMode
                fields={fields}
                isLittleEndian={endianness === 'little'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
