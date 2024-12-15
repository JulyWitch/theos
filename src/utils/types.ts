export interface StructField {
  name: string;
  type: string;
  size: number;
  isBoolean?: boolean;
}

export interface TypeInfo {
  size: number;
  isBoolean?: boolean;
}

export const TYPE_MAP: Record<string, TypeInfo> = {
  'bool': { size: 1, isBoolean: true },
  'uint8_t': { size: 1 },
  'int8_t': { size: 1 },
  'uint16_t': { size: 2 },
  'int16_t': { size: 2 },
  'uint32_t': { size: 4 },
  'int32_t': { size: 4 },
  'float': { size: 4 },
  'double': { size: 8 },
};