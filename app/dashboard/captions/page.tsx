"use client"

import { useState } from "react"
import { captions, captionCategories } from "@/lib/content/captions"
import { CopyButton } from "@/components/dashboard/copy-button"
import { SectionHeader } from "@/components/dashboard/section-header"
import { cn } from "@/lib/utils"

export default function CaptionsPage() {
  const [activeCategory, setActiveCategory] = useState(captionCategories[0].key)

  const items = captions.filter((c) => c.category === activeCategory)

  return (
    <>
      <SectionHeader
        eyebrow="Workspace"
        title="Captions"
        description="Copy-and-paste Instagram captions, organized by content type. Tap copy, paste into your post, swap a few details — done."
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        {/* Framework notice */}
        <p className="mb-5 text-xs text-muted-foreground">
          All captions are built as frameworks. Replace placeholders with your clinic details before posting.
        </p>

        {/* Category filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {captionCategories.map((cat) => (
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

        {/* Caption cards */}
        <div className="flex flex-col gap-3">
          {items.map((c) => {
            const fullText = `${c.body}\n\n${c.hashtags.map((h) => `#${h}`).join(" ")}`
            return (
              <article
                key={c.id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <header className="flex items-center justify-between gap-3 border-b border-border/60 bg-muted/30 px-4 py-2.5">
                  <h3 className="text-xs font-semibold text-foreground">{c.title}</h3>
                  <CopyButton text={fullText} label="Copy caption" />
                </header>
                <div className="px-4 py-4">
                  {c.note && (
                    <p className="mb-3 text-[11px] italic text-muted-foreground">{c.note}</p>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                    {c.body}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.hashtags.map((h) => (
                      <span key={h} className="text-[11px] font-medium text-primary/85">
                        #{h}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}
