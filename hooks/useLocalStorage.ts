import { useState } from "react";

function useLocalStorage<T>(item: string, initial: T) {
  const [localStorageValue, setLocalStorageValue] = useState<T>(() =>
    getLocalStorageValue<T>(item, initial)
  );

  const setLsValue = (value: T | ((val: T) => T)) => {
    const valueToStore =
      value instanceof Function ? value(localStorageValue) : value;
    setLocalStorageValue(valueToStore);

    if (typeof window !== "undefined") {
      localStorage.setItem(item, JSON.stringify(valueToStore));
    }
  };

  return [localStorageValue, setLsValue] as const;
}

function getLocalStorageValue<T>(item: string, initial: T): T {
  if (typeof window !== "undefined") {
    const lsItem = localStorage.getItem(item);
    return lsItem ? JSON.parse(lsItem) : initial;
  }
  return initial;
}

export default useLocalStorage;
