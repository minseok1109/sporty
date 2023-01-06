import { useState, useEffect } from "react";

export function getStorageItem(key, initialValue) {
  try {
    // Get from local storage by key

    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;

    // Parse stored json or if none return initialValue
  } catch (error) {
    // If error also return initialValue
    console.log(error);
    return initialValue;
  }
}

export function setStorageItem(key, value) {
  try {
    if (window) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return getStorageItem(key, initialValue);
  });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    setStorageItem(key, valueToStore);
  };

  return [storedValue, setValue];
}
