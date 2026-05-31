"use client"

import { useState } from "react"
import { Instagram, MessageCircle } from "lucide-react"
import { scripts, scriptCategories } from "@/lib/content/scripts"
import { CopyButton } from "@/components/dashboard/copy-button"
import { SectionHeader } from "@/components/dashboard/section-header"
import { cn } from "@/lib/utils"

function ChannelBadge({ channel }: { channel: "WhatsApp" | "Instagram DM" | "Both" }) {
  if (channel === "WhatsApp") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-500">
        <MessageCircle className="h-3 w-3" />
        WhatsApp
      </span>
    )
  }
  if (channel === "Instagram DM") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-pink-500/10 px-1.5 py-0.5 text-[10px] font-medium text-pink-500">
        <Instagram className="h-3 w-3" />
        Instagram DM
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
      Both
    </span>
  )
}

export default function ScriptsPage() {
  const [activeCategory, setActiveCategory] = useState(scriptCategories[0].key)

  const items = scripts.filter((s) => s.category === activeCategory)

  return (
    <>
      <SectionHeader
        eyebrow="Workspace"
        title="WhatsApp & DM Scripts"
        description="Battle-tested scripts to convert DMs and WhatsApp leads into booked consultations. Replace [bracketed] placeholders before sending."
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        {/* Category filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {scriptCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                activeCategory === cat.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/70 hover:border-primary/50 hover:text-foreground",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Script cards */}
        <div className="flex flex-col gap-3">
          {items.map((s) => (
            <article
              key={s.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <header className="flex flex-col gap-2 border-b border-border/60 bg-muted/30 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <ChannelBadge channel={s.channel} />
                  <h3 className="text-xs font-semibold text-foreground">{s.title}</h3>
                </div>
                <CopyButton text={s.body} label="Copy script" />
              </header>
              <div className="px-4 py-4">
                <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
