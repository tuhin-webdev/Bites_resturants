import { StateStorage } from "zustand/middleware";

export const safeLocalStorage: StateStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      const val = window.localStorage.getItem(key);
      if (!val || val === "undefined" || val === "null" || val.trim() === "") return null;
      return val;
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, value);
    } catch {}
  },
  removeItem: (key: string): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch {}
  },
};
