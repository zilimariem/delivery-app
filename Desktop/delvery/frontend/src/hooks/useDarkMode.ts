"use client";

import { useState, useEffect } from "react";

const DARK_MODE_KEY = "darkMode";

// Simple hook that doesn't use React Query at all
export const useDarkMode = () => {
  // Initialize state directly from localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem(DARK_MODE_KEY);
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });

  // Toggle function that updates both state and localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(DARK_MODE_KEY, JSON.stringify(newMode));
      }
      return newMode;
    });
  };

  // Sync with localStorage if it changes elsewhere
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === DARK_MODE_KEY && e.newValue !== null) {
        setDarkMode(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { darkMode, toggleDarkMode };
};
