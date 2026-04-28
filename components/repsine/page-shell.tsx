import type { ReactNode } from "react"
import { SiteHeader } from "./header"
import { SiteFooter } from "./footer"

interface PageShellProps {
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
}

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden="true"
        />
        <SiteHeader />
        <div className="relative mx-auto w-full max-w-3xl px-4 pt-12 pb-10 sm:px-6 sm:pt-20">
          {eyebrow && (
            <span className="mb-5 inline-flex items-center rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-foreground/80 uppercase backdrop-blur">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance text-foreground sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl px-4 pb-20 sm:px-6">
        {children}
      </main>

      <SiteFooter />
    </>
  )
}

interface ProseSectionProps {
  children: ReactNode
}

export function ProseSection({ children }: ProseSectionProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur sm:p-10">
      <div className="prose-repsine space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </div>
  )
}
