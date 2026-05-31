"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronLeft, Sparkles } from "lucide-react"
import { calendar } from "@/lib/content/calendar"
import { templates } from "@/lib/content/templates"
import { cn } from "@/lib/utils"

const typeColor: Record<string, string> = {
  Reel: "bg-pink-500/15 text-pink-500",
  Carousel: "bg-blue-500/15 text-blue-500",
  Story: "bg-amber-500/15 text-amber-500",
  Post: "bg-emerald-500/15 text-emerald-500",
}

export default function CalendarPage() {
  const [openDay, setOpenDay] = useState<number | null>(null)

  return (
    <>
      <div className="border-b border-border bg-background/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          <Link
            href="/dashboard"
            className="inline-flex w-fit items-center gap-1 text-xs font-medium text-foreground/60 transition-colors hover:text-foreground lg:hidden"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Dashboard
          </Link>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">
            30-day plan
          </p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Content Calendar
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A 30-day, ready-to-post plan. Tap any day to expand it, follow the brief, and use the
            suggested template.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        <ol className="flex flex-col gap-2">
          {calendar.map((day) => {
            const isOpen = openDay === day.day
            const suggested = day.templateSlug
              ? templates.find((t) => t.slug === day.templateSlug)
              : null
            return (
              <li
                key={day.day}
                className={cn(
                  "overflow-hidden rounded-xl border bg-card transition-colors",
                  isOpen ? "border-primary/40" : "border-border",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenDay(isOpen ? null : day.day)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-left sm:px-4"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-muted">
                    <span className="text-[9px] font-medium tracking-wider text-foreground/50 uppercase">
                      Day
                    </span>
                    <span className="-mt-0.5 text-sm font-bold text-foreground">{day.day}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span
                        className={cn(
                          "flex-shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                          typeColor[day.type],
                        )}
                      >
                        {day.type}
                      </span>
                      <p className="text-sm font-semibold text-foreground">{day.title}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 flex-shrink-0 text-foreground/50 transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                {isOpen && (
                  <>
                    <div className="mx-3 border-t border-border/60 sm:mx-4" />
                    <div className="p-4 sm:p-5">
                      <p className="text-[10px] font-semibold tracking-[0.18em] text-foreground/60 uppercase">
                        Brief
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{day.details}</p>

                      <p className="mt-4 text-[10px] font-semibold tracking-[0.18em] text-foreground/60 uppercase">
                        Call to action
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{day.cta}</p>

                      {suggested && (
                        <Link
                          href={`/dashboard/templates/${suggested.slug}`}
                          className="mt-4 inline-flex w-full items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 p-3 transition-colors hover:bg-primary/15 sm:w-auto"
                        >
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold tracking-wider text-primary uppercase">
                              Suggested template
                            </p>
                            <p className="truncate text-xs font-semibold text-foreground">
                              {suggested.title}
                            </p>
                          </div>
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}
