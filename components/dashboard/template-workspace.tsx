"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle2, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Template } from "@/lib/content/templates"

export function TemplateWorkspace({ template }: { template: Template }) {
  const variants = template.variants
  const [activeId, setActiveId] = useState(variants[0]?.id)
  const [slideIndex, setSlideIndex] = useState(0)
  const active = variants.find((v) => v.id === activeId) ?? variants[0]

  if (!active) return null

  // slideCount derived from the carousel variant so prev/next wrap correctly
  const carouselVariant = variants.find((v) => v.id === "carousel")
  const slideCount = carouselVariant?.slides?.length ?? 0

  function prevSlide() { setSlideIndex((i) => (i - 1 + slideCount) % slideCount) }
  function nextSlide() { setSlideIndex((i) => (i + 1) % slideCount) }

  function handleVariantChange(id: typeof activeId) {
    setActiveId(id)
    setSlideIndex(0)
  }

  const CanvaButton = ({ className }: { className?: string }) => (
    <a
      href={active.canvaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground",
        className,
      )}
    >
      Edit in Canva
      <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  )

  return (
    <div className="flex flex-col gap-10">
      {/* Variants — full width, above the preview/how-to row */}
      <div>
        <h2 className="text-xs font-semibold tracking-[0.2em] text-foreground/60 uppercase">Variants</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a format. Each variant is sized for the platform it&apos;s designed for.
        </p>

        <div role="tablist" className="mt-4 flex flex-wrap gap-2">
          {variants.map((v) => {
            const isActive = v.id === activeId
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleVariantChange(v.id)}
                className={cn(
                  "flex h-9 cursor-pointer items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/70 hover:border-primary hover:bg-primary/10 hover:text-primary",
                )}
              >
                {v.label}
                <span className="text-[10px] font-normal opacity-70">{v.ratio}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* TOP — preview (left) + how to use (right), both start at the same top, matched heights */}
      <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-stretch">
        {/* LEFT — preview */}
        <div className="flex min-w-0 flex-col">
          {/* All variant images are stacked in the DOM simultaneously so switching tabs
              is an instant opacity change — no network wait after first page paint. */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted lg:h-[clamp(320px,56vh,560px)] lg:w-auto">

            {/* Non-carousel variants — all in DOM, show/hide via opacity */}
            {variants.map((v) => {
              if (v.id === "carousel") return null
              return (
                <div
                  key={v.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-150",
                    activeId === v.id ? "opacity-100" : "opacity-0 pointer-events-none",
                  )}
                >
                  <Image
                    src={v.image}
                    alt={`${v.label} variant`}
                    fill
                    sizes="(min-width: 1024px) 56vh, 100vw"
                    className="object-cover"
                  />
                </div>
              )
            })}

            {/* Carousel variant — sliding strip + nav buttons */}
            {variants.map((v) => {
              if (v.id !== "carousel" || !v.slides?.length) return null
              const carouselSlides = v.slides
              return (
                <div
                  key="carousel"
                  className={cn(
                    "absolute inset-0 transition-opacity duration-150",
                    activeId === "carousel" ? "opacity-100" : "opacity-0 pointer-events-none",
                  )}
                >
                  {/* Sliding strip */}
                  <div
                    className="flex h-full transition-transform duration-300 ease-in-out"
                    style={{
                      width: `${carouselSlides.length * 100}%`,
                      transform: `translateX(-${(slideIndex / carouselSlides.length) * 100}%)`,
                    }}
                  >
                    {carouselSlides.map((src, i) => (
                      <div
                        key={src}
                        className="relative h-full flex-shrink-0"
                        style={{ width: `${100 / carouselSlides.length}%` }}
                      >
                        <Image
                          src={src}
                          alt={`Slide ${i + 1}`}
                          fill
                          sizes="(min-width: 1024px) 56vh, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Prev button — always visible */}
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* Next button — always visible */}
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Dot indicators */}
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {carouselSlides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSlideIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-200",
                          i === slideIndex ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80",
                        )}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Canva button — mobile only */}
          <CanvaButton className="mt-5 w-full lg:hidden" />
        </div>

        {/* RIGHT — how to use (stretches to match left, note + button pinned to bottom) */}
        <aside className="flex flex-col rounded-2xl border border-border bg-card p-5">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-foreground/60 uppercase">How to use</h2>
          <ol className="mt-3 flex flex-col gap-3">
            {template.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          {/* Note — mobile only */}
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary lg:hidden">
            <CheckCircle2 className="h-3.5 w-3.5" />
            You can duplicate this template unlimited times.
          </div>

          {/* Note + Canva button — desktop only, pinned to bottom */}
          <div className="mt-auto hidden flex-col gap-4 pt-6 lg:flex">
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              You can duplicate this template unlimited times.
            </div>
            <CanvaButton className="w-full" />
          </div>
        </aside>
      </div>

      {/* Tutorial section hidden until videos are ready */}
    </div>
  )
}
