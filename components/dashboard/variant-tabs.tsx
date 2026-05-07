"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

type Variant = {
  id: string
  label: string
  size: string
  image: string
  canvaUrl: string
}

export function VariantTabs({ variants }: { variants: Variant[] }) {
  const [activeId, setActiveId] = useState(variants[0]?.id)
  const active = variants.find((v) => v.id === activeId) ?? variants[0]

  if (!active) return null

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const isActive = v.id === active.id
          return (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(v.id)}
              className={cn(
                "flex h-9 cursor-pointer items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition-colors",
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground/70 hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {v.label}
              <span className="text-[10px] font-normal opacity-70">{v.size}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted lg:max-w-md">
          <Image
            src={active.image || "/placeholder.svg"}
            alt={`${active.label} variant`}
            fill
            sizes="(min-width: 1024px) 28rem, 100vw"
            className="object-cover"
          />
        </div>

        <a
          href={active.canvaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-11 cursor-pointer items-center justify-center gap-2 self-start rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
        >
          Edit in Canva
          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  )
}
