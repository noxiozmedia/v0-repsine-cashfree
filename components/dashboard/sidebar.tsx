"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, HelpCircle, MessageCircle, Mail, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { navItems } from "./nav-items"
import { ThemeToggle } from "./theme-toggle"
import { RepsineLogo } from "@/components/repsine-logo"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function DashboardSidebar({ email }: { email?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [helpOpen, setHelpOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <RepsineLogo size={32} className="h-8 w-8" />
        <span className="font-display text-base font-semibold tracking-tight text-sidebar-foreground">
          Repsine
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        <p className="px-3 pb-2 text-[10px] font-semibold tracking-[0.15em] text-sidebar-foreground/50 uppercase">
          Workspace
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  active ? "text-sidebar-primary" : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground",
                )}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between rounded-lg px-2 py-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-sidebar-foreground">
              {email || "Member"}
            </p>
            <p className="text-[10px] text-sidebar-foreground/50">Aesthetic Kit</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Help button + popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setHelpOpen((v) => !v)}
            className="mt-1 flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg text-xs font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Help &amp; Support
          </button>

          {helpOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setHelpOpen(false)} />
              <div className="absolute bottom-10 left-0 right-0 z-50 rounded-xl border border-border bg-card p-3 shadow-xl">
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
          className="mt-1 flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg text-xs font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
