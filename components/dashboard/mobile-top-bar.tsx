"use client"

import { useState } from "react"
import { LogOut, HelpCircle, MessageCircle, Mail, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { RepsineLogo } from "@/components/repsine-logo"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function DashboardMobileTopBar() {
  const router = useRouter()
  const [helpOpen, setHelpOpen] = useState(false)

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

        {/* Help icon + popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setHelpOpen((v) => !v)}
            aria-label="Help and support"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-card text-foreground/70 transition-colors hover:text-foreground"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>

          {helpOpen && (
            <>
              {/* backdrop */}
              <div className="fixed inset-0 z-40" onClick={() => setHelpOpen(false)} />
              <div className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-border bg-card p-3 shadow-xl">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-foreground">Need help?</p>
                  <button type="button" onClick={() => setHelpOpen(false)} className="cursor-pointer text-foreground/50 hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <a
                    href="https://wa.me/916295747270"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-green-600" />
                    WhatsApp us
                  </a>
                  <a
                    href="mailto:support@repsine.com"
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    support@repsine.com
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

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
