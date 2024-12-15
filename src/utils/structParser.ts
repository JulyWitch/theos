import { StructField, TYPE_MAP } from './types';

export function parseStructDefinition(structDef: string): StructField[] {
  const fields: StructField[] = [];
  const lines = structDef.split('\n');

  for (const line of lines) {
    const match = line.trim().match(/(\w+)\s+(\w+);/);
    if (match) {
      const [, type, name] = match;
      const typeInfo = TYPE_MAP[type];
      if (typeInfo) {
        fields.push({
          name,
          type,
          size: typeInfo.size,
          isBoolean: typeInfo.isBoolean
        });
      }
    }
  }

  return fields;
}

export function parseHexBuffer(
  hexString: string, 
  fields: StructField[], 
  isLittleEndian: boolean
): Record<string, any> {
  const buffer = new Uint8Array(hexString.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
  const result: Record<string, any> = {};
  let offset = 0;

  for (const field of fields) {
    const view = new DataView(buffer.buffer);
    
    if (field.isBoolean) {
      result[field.name] = view.getUint8(offset) !== 0;
    } else {
      switch (field.type) {
        case 'uint8_t':
          result[field.name] = view.getUint8(offset);
          break;
        case 'int8_t':
          result[field.name] = view.getInt8(offset);
          break;
        case 'uint16_t':
          result[field.name] = view.getUint16(offset, isLittleEndian);
          break;
        case 'int16_t':
          result[field.name] = view.getInt16(offset, isLittleEndian);
          break;
        case 'uint32_t':
          result[field.name] = view.getUint32(offset, isLittleEndian);
          break;
        case 'int32_t':
          result[field.name] = view.getInt32(offset, isLittleEndian);
          break;
        case 'float':
          result[field.name] = view.getFloat32(offset, isLittleEndian);
          break;
        case 'double':
          result[field.name] = view.getFloat64(offset, isLittleEndian);
          break;
      }
    }
    offset += field.size;
  }

  return result;
}

export function constructHexBuffer(
  values: Record<string, any>, 
  fields: StructField[],
  isLittleEndian: boolean
): string {
  const buffer = new ArrayBuffer(fields.reduce((acc, field) => acc + field.size, 0));
  const view = new DataView(buffer);
  let offset = 0;

  for (const field of fields) {
    const value = values[field.name];
    
    if (field.isBoolean) {
      view.setUint8(offset, value ? 1 : 0);
    } else {
      switch (field.type) {
        case 'uint8_t':
          view.setUint8(offset, value);
          break;
        case 'int8_t':
          view.setInt8(offset, value);
          break;
        case 'uint16_t':
          view.setUint16(offset, value, isLittleEndian);
          break;
        case 'int16_t':
          view.setInt16(offset, value, isLittleEndian);
          break;
        case 'uint32_t':
          view.setUint32(offset, value, isLittleEndian);
          break;
        case 'int32_t':
          view.setInt32(offset, value, isLittleEndian);
          break;
        case 'float':
          view.setFloat32(offset, value, isLittleEndian);
          break;
        case 'double':
          view.setFloat64(offset, value, isLittleEndian);
          break;
      }
    }
    offset += field.size;
  }

  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}