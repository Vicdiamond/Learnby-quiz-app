"use client";
import { createContext, useContext, useEffect } from "react";
import useLocalStorageState from "../_hooks/useLocalStorageState";

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("DarkModeContext is used outside of the DarkMode provider");

  return context;
}

export { DarkModeProvider, useDarkMode };
