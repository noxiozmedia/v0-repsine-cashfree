"use client"

import { LogOut } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { RepsineLogo } from "@/components/repsine-logo"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function DashboardMobileTopBar() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-lg lg:hidden">
      <div className="flex items-center gap-2">
        <RepsineLogo size={28} className="h-7 w-7" />
        <span className="font-display text-sm font-semibold tracking-tight text-foreground">Repsine</span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          onClick={handleSignOut}
          aria-label="Sign out"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-card text-foreground/70 transition-colors hover:text-foreground"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  )
}
