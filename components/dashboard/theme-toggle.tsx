"use client"

import { Moon, Sun } from "lucide-react"
import { useDashboardTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useDashboardTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-card text-foreground/70 transition-colors hover:text-foreground"
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </button>
  )
}
