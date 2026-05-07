"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "repsine-dashboard-theme"

export function DashboardThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")

  // Initialise from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "light" || stored === "dark") {
        setThemeState(stored)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const setTheme = (next: Theme) => {
    setThemeState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className={theme === "light" ? "repsine-light" : "dark"} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useDashboardTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useDashboardTheme must be used inside DashboardThemeProvider")
  return ctx
}
