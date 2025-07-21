import { useState, useEffect } from 'react';
import { ToothStatus } from '../types/dental';

const validToothStatuses: ToothStatus[] = [
  'healthy',
  'caries',
  'filled',
  'crown',
  'extracted',
  'implant',
  'root_canal',
  'fracture'
];

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      const parsed = JSON.parse(item);
      
      // Validate tooth data if this is the odontogram-teeth key
      if (key === 'odontogram-teeth' && Array.isArray(parsed)) {
        return parsed.filter(tooth => 
          tooth && 
          typeof tooth.status === 'string' && 
          validToothStatuses.includes(tooth.status as ToothStatus)
        ) as T;
      }
      
      return parsed;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Validate tooth data before storing if this is the odontogram-teeth key
      if (key === 'odontogram-teeth' && Array.isArray(valueToStore)) {
        const validatedTeeth = valueToStore.filter(tooth => 
          tooth && 
          typeof tooth.status === 'string' && 
          validToothStatuses.includes(tooth.status as ToothStatus)
        );
        setStoredValue(validatedTeeth as T);
        window.localStorage.setItem(key, JSON.stringify(validatedTeeth));
        return;
      }
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}