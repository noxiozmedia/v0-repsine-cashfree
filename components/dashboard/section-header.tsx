import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export function SectionHeader({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  backHref?: string
  backLabel?: string
  children?: React.ReactNode
}) {
  return (
    <div className="border-b border-border bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex w-fit items-center gap-1 text-xs font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            {backLabel ?? "Back"}
          </Link>
        )}
        {eyebrow && (
          <p className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
