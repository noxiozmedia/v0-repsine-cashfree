"use client"

import { useEffect, useState } from "react"
import { calendar } from "@/lib/content/calendar"

const typeStyles: Record<string, string> = {
  Reel: "bg-pink-500/10 text-pink-600",
  Carousel: "bg-primary/10 text-primary",
  Story: "bg-amber-500/10 text-amber-600",
  Post: "bg-emerald-500/10 text-emerald-600",
}

// Show the first 7 days in the picker.
const pickerDays = calendar.slice(0, 7)

export function CalendarDemo() {
  const [day, setDay] = useState(1)
  const [paused, setPaused] = useState(false)
  const active = calendar.find((d) => d.day === day) ?? calendar[0]

  // Auto-advance through the 7 days until the user interacts.
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setDay((d) => (d % pickerDays.length) + 1)
    }, 2800)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl bg-[oklch(0.9_0.03_66)]">
      {/* Day picker */}
      <div className="px-3 py-3">
        <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-foreground/50 uppercase">
          Select a day
        </p>
        <div className="flex gap-1.5">
          {pickerDays.map((d) => (
            <button
              key={d.day}
              type="button"
              onClick={() => {
                setPaused(true)
                setDay(d.day)
              }}
              className={`flex h-9 flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border text-[11px] font-semibold leading-none transition-colors ${
                d.day === day
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-transparent bg-card text-foreground/60 hover:text-foreground"
              }`}
            >
              <span className="text-[8px] font-medium opacity-70">Day</span>
              {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Day content (dashboard-style) */}
      <div key={day} className="m-2 mt-0 flex flex-col gap-3 rounded-lg bg-card p-4 duration-300 animate-in fade-in">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-foreground px-2 py-0.5 text-[10px] font-bold text-background">
            Day {active.day}
          </span>
          <span
            className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${typeStyles[active.type] ?? "bg-muted text-foreground/70"}`}
          >
            {active.type}
          </span>
        </div>

        <h4 className="font-display text-lg font-semibold leading-tight text-foreground">
          {active.title}
        </h4>

        <div>
          <p className="text-[10px] font-semibold tracking-wide text-primary/70 uppercase">Hook</p>
          <p className="mt-0.5 text-sm leading-relaxed text-foreground/80">{active.hook}</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-wide text-foreground/40 uppercase">
            What to post
          </p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{active.details}</p>
        </div>

        <div className="rounded-lg border border-dashed border-[#8a4b3a] bg-[#8a4b3a]/5 px-3 py-2">
          <p className="text-[10px] font-semibold tracking-wide text-foreground/40 uppercase">CTA</p>
          <p className="mt-0.5 text-[13px] font-medium leading-relaxed text-foreground/80">{active.cta}</p>
        </div>
      </div>
    </div>
  )
}
