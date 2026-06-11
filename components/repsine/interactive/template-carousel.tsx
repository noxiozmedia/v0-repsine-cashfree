"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  // Before / After
  { image: "/dashboard/templates/before-after-c1.jpg", label: "Before / After" },
  { image: "/dashboard/templates/before-after-c2.jpg", label: "Before / After" },
  { image: "/dashboard/templates/before-after-c3.jpg", label: "Before / After" },
  // Testimonial Story
  { image: "/dashboard/templates/testimonial-story.jpg", label: "Testimonial Story" },
  // FAQ
  { image: "/dashboard/templates/faq-1.jpg", label: "FAQ Carousel" },
  { image: "/dashboard/templates/faq-2.jpg", label: "FAQ Carousel" },
  // Problem / Pain
  { image: "/dashboard/templates/pain-1.jpg", label: "Problem / Pain" },
  { image: "/dashboard/templates/pain-2.jpg", label: "Problem / Pain" },
  { image: "/dashboard/templates/pain-5.jpg", label: "Problem / Pain" },
]

export function TemplateCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [],
  )

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 2600)
    return () => clearInterval(t)
  }, [paused])

  return (
    <div
      className="group/carousel relative h-full w-full overflow-hidden rounded-xl bg-secondary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.image}
          src={slide.image || "/placeholder.svg"}
          alt={`${slide.label} Instagram template`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          priority={i === 0}
        />
      ))}

      {/* gradient for control legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* label and chip */}
      <div className="absolute left-3 top-3 flex items-center gap-2">
        <span className="rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur">
          {slides[index].label}
        </span>
        <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary shadow-sm backdrop-blur">
          20+ Templates
        </span>
      </div>

      {/* arrows */}
      <button
        type="button"
        aria-label="Previous template"
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-[#8a4b3a] bg-background/90 text-[#8a4b3a] shadow-md backdrop-blur transition hover:bg-background"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Next template"
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-[#8a4b3a] bg-background/90 text-[#8a4b3a] shadow-md backdrop-blur transition hover:bg-background"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.image}
            type="button"
            aria-label={`Go to ${s.label}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 cursor-pointer rounded-full transition-all ${i === index ? "w-5 bg-background" : "w-1.5 bg-background/60"}`}
          />
        ))}
      </div>
    </div>
  )
}
