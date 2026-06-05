import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { BuyButton } from "./buy-button"

type SiteHeaderProps = {
  cta?: "buy" | "login"
}

export function SiteHeader({ cta = "buy" }: SiteHeaderProps) {
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

        {cta === "login" ? (
          <Link
            href="/auth/login"
            className="inline-flex h-10 items-center justify-center gap-1 rounded-full bg-foreground pl-5 pr-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
          >
            Login
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <BuyButton label="Get Access" variant="plain" />
        )}
      </div>
    </header>
  )
}
