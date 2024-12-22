import { useEffect } from "react";

const setWithExpiry = (key: string, value: any, expiryInHours: number) => {
  const now = new Date().getTime();
  const expiryTime = now + expiryInHours * 60 * 60 * 1000; 
  const item = { value, expiry: expiryTime };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date().getTime();

  if (now > item.expiry) {
    localStorage.removeItem(key); 
    return null;
  }
  return item.value;
};


const useClearExpiredItems = (intervalMs: number = 60000) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      Object.keys(localStorage).forEach((key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return;

        const item = JSON.parse(itemStr);
        if (item.expiry && now > item.expiry) {
          localStorage.removeItem(key);
        }
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);
};


export { useClearExpiredItems, getWithExpiry, setWithExpiry };