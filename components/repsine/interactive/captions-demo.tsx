"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Check, Copy } from "lucide-react"

// A small, demo-friendly selection of caption frameworks.
const captionDemos = [
  {
    title: "Testimonial",
    body: `Confidence has a glow — and [Client Name] found hers with us.

She came in for [Concern] and had been feeling self-conscious for a long time.

After [Treatment], she noticed real results — and so did everyone around her.

DM us to book your consultation.`,
    hashtags: ["aestheticclinic", "skincare", "realresults", "clientlove"],
  },
  {
    title: "Before / After",
    body: `Same person. 6 weeks apart. Zero filters.

[Client Name]'s [Concern] needed a plan, not a product — and the results speak for themselves.

Individual results may vary.

DM us to know what could work for your skin.`,
    hashtags: ["beforeafter", "skintransformation", "aestheticclinic", "glowup"],
  },
  {
    title: "Educational",
    body: `3 things nobody tells you about [Treatment] 👇

1. It works at the root, not just the surface.
2. Results compound over a few sessions.
3. The right aftercare doubles your results.

Save this for later — and DM us your questions.`,
    hashtags: ["skincaretips", "aestheticmedicine", "skinhealth", "education"],
  },
]

export function CaptionsDemo() {
  const [index, setIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const active = captionDemos[index]

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + captionDemos.length) % captionDemos.length)

  async function copy() {
    const text = `${active.body}\n\n${active.hashtags.map((h) => `#${h}`).join(" ")}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border/60">
      {/* Header: title + copy */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-3.5 py-2.5">
        <span className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
          {active.title}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-foreground transition hover:bg-muted"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Caption body */}
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
        <p className="whitespace-pre-line text-[13px] leading-relaxed text-foreground/85">
          {active.body}
        </p>
        <p className="mt-3 text-[12px] font-medium leading-relaxed text-primary/70">
          {active.hashtags.map((h) => `#${h}`).join(" ")}
        </p>
      </div>

      {/* Swipe controls */}
      <div className="flex items-center justify-between border-t border-border/60 px-3 py-2.5">
        <button
          type="button"
          aria-label="Previous caption"
          onClick={() => go(-1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {captionDemos.map((c, i) => (
            <button
              key={c.title}
              type="button"
              aria-label={`Go to ${c.title}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 cursor-pointer rounded-full transition-all ${i === index ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next caption"
          onClick={() => go(1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
