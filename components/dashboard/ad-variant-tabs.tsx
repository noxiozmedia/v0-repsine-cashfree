"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AdVariant } from "@/lib/content/ads"

export function AdVariantTabs({ variants }: { variants: AdVariant[] }) {
  const [activeId, setActiveId] = useState(variants[0]?.id)
  const active = variants.find((v) => v.id === activeId) ?? variants[0]

  if (!active) return null

  return (
    <div>
      {/* Variant selector */}
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActiveId(v.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              v.id === active.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground/70 hover:bg-muted",
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Preview — always square (1:1); frames adjusted manually in editing */}
      <div className="relative mt-5 aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src={active.image || "/placeholder.svg"}
          alt={`${active.label} variant`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {active.label} · {active.size}
      </p>

      <a
        href={active.canvaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Edit in Canva
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  )
}
