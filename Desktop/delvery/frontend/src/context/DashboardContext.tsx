import React, { createContext, useContext, useState, useMemo } from "react";

interface DashboardContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DashboardContext = createContext<DashboardContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialiser depuis localStorage
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("dashboardDarkMode");
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode: boolean) => {
      // Définir explicitement le type de `prevMode`
      const newMode = !prevMode;
      localStorage.setItem("dashboardDarkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const value = useMemo(
    () => ({
      darkMode,
      toggleDarkMode,
    }),
    [darkMode]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
