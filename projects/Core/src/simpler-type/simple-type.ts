import { StringSignatures } from '@/core/simpler-type/signatures-type';

export type Dictionary<K, V> = { [T: string]: V }

export type LocalStorageLike = {
  getItem(key: string): any
  clear(): void;
  removeItem(key: string): any
  setItem(key: string, value: string): any
} | StringSignatures
