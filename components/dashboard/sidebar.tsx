"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { navItems } from "./nav-items"
import { ThemeToggle } from "./theme-toggle"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function DashboardSidebar({ email }: { email?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <aside className="hidden h-screen w-64 flex-shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </div>
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
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-2 flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg text-xs font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
