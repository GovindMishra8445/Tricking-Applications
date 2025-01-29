import { useEffect, useState } from "react";

export function useLocalStorage(key, initialData) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const exitingData = JSON.parse(localStorage.getItem(key));
    if (exitingData) {
      setData(exitingData);
    } else {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  }, []);

  const updateLocalStorage = (newData) => {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
    }
    setData(newData);
  };
  return [data, updateLocalStorage];
}
