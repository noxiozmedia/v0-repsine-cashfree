import { ChevronRight, ShoppingCart } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-6 sm:px-6">
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

      <a
        href="#enroll"
        className="group inline-flex items-center gap-2 rounded-full bg-foreground py-1.5 pr-4 pl-1 text-xs font-semibold text-background sm:text-sm"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
        <span>Enroll now</span>
      </a>
    </header>
  )
}
