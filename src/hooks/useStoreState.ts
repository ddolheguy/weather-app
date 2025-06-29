import { Storage, StorageKey } from "@/services/storage/storage";
import { useCallback, useState } from "react";


export const useStoreState = <T>(key: StorageKey, fallbackValue?: T): [T | undefined, (value: T) => void] => {
  const initialData = Storage.getValue<T>(key);
  const [storedValue, setStoredValue] = useState<T | undefined>(initialData ?? fallbackValue);

  const handleSetValue = useCallback((value: T) => {
    setStoredValue(value);
    if (value) {
      Storage.saveValue<T>(key, value);
    } else {
      Storage.removeValue(key);
    }
  }, [key]);

  return [storedValue, handleSetValue];
};