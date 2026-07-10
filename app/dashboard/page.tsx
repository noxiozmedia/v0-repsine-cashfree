import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { navItems } from "@/components/dashboard/nav-items"
import { templates } from "@/lib/content/templates"
import { calendar } from "@/lib/content/calendar"
import { captions } from "@/lib/content/captions"
import { scripts } from "@/lib/content/scripts"
import { USER } from "@/lib/user"

export default function DashboardHome() {
  const firstName = USER.fullName.split(" ")[0]

  const stats = [
    { label: "Templates", value: "10+", href: "/dashboard/templates" },
    { label: "Calendar days", value: calendar.length, href: "/dashboard/calendar" },
    { label: "Captions", value: captions.length, href: "/dashboard/captions" },
    { label: "DM scripts", value: scripts.length, href: "/dashboard/scripts" },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        <Sparkles className="h-3.5 w-3.5" />
        Aesthetic & MedSpa Kit
      </div>
      <h1 className="font-display mt-2 text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
        Welcome back, {firstName}.
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Templates, calendars, captions, DM scripts and ad creatives — everything you need to grow
        your aesthetic clinic on social media.
      </p>

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <span className="text-2xl font-bold tracking-tight text-foreground">{s.value}</span>
            <span className="mt-0.5 text-xs text-muted-foreground">{s.label}</span>
          </Link>
        ))}
      </div>

      {/* Section quick links */}
      <h2 className="mt-10 text-xs font-semibold tracking-[0.2em] text-foreground/60 uppercase">
        Jump in
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">Open {item.short.toLowerCase()}</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-colors group-hover:text-primary" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
