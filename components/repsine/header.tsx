"use client"

import { ShoppingCart } from "lucide-react"
import { BuyButton } from "./buy-button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
      <a
        href="/"
        aria-label="Cart"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/40 text-foreground/80 backdrop-blur transition-colors hover:text-foreground"
      >
        <ShoppingCart className="h-4 w-4" />
      </a>

      <a
        href="/"
        className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl"
      >
        Repsine
      </a>

      <BuyButton label="Enroll now" />
      </div>
    </header>
  )
}
