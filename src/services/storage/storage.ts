import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export type StorageKey = 'city' | 'weather';

const getValue = <T>(key: StorageKey): T | undefined => {
  try {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const saveValue = <T>(key: StorageKey, value: T) => {
  storage.set(key, JSON.stringify(value));
};

const removeValue = (key: StorageKey) => {
  storage.delete(key);
};

export const Storage = {
  saveValue,
  getValue,
  removeValue,
};