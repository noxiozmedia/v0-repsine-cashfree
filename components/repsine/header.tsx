import Image from "next/image"
import { BuyButton } from "./buy-button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="Repsine home">
          <Image
            src="/images/repsine-logo.png"
            alt="Repsine logo"
            width={36}
            height={36}
            className="h-8 w-8 object-contain"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Repsine
          </span>
        </a>

        <BuyButton label="Get Access" variant="plain" />
      </div>
    </header>
  )
}
