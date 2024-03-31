import { useState, useEffect } from 'react';

// Custom hook to sync state with localStorage
const useLocalStorage = (key, firstValue = null) => {
  const initialValue = localStorage.getItem(key) || firstValue;
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState(initialValue); 

  useEffect(() => {
    if (storedValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, storedValue); 
    }
  }, [key, storedValue]); 

  return [storedValue, setStoredValue];
}

export default useLocalStorage;

