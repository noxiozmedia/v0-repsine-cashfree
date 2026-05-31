import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Lock } from "lucide-react"
import { templates, lockedTemplates } from "@/lib/content/templates"
import { SectionHeader } from "@/components/dashboard/section-header"

export default function TemplatesPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Workspace"
        title="Templates"
        description="Plug-and-play Canva templates for your aesthetic clinic. Pick a template, choose a variant, edit it in Canva, post."
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        {/* Active templates */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <Link
              key={t.slug}
              href={`/dashboard/templates/${t.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Image
                  src={t.cover || "/placeholder.svg"}
                  alt={t.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur">
                  {t.categoryLabel}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-foreground">{t.title}</h3>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-foreground/40 transition-colors group-hover:text-primary" />
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{t.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {t.variants.map((v) => (
                    <span
                      key={v.id}
                      className="chip-shimmer rounded-md border bg-primary/5 px-2 py-0.5 text-[10px] font-semibold text-primary"
                    >
                      {v.label} · {v.ratio}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bonus / locked templates */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Bonus templates</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Unlocking in the next update — sit tight, these are on the way.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">
              <Lock className="h-3 w-3" />
              Locked
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lockedTemplates.map((t) => (
              <div
                key={t.title}
                aria-disabled="true"
                className="relative flex select-none flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  <Image
                    src={t.cover || "/placeholder.svg"}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="scale-110 object-cover blur-md"
                  />
                  <div className="absolute inset-0 bg-background/40" />
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-4">
                  <h3 className="font-display text-base font-semibold text-foreground">{t.title}</h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{t.description}</p>
                </div>

                {/* Lock overlay */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur">
                    <Lock className="h-4 w-4" />
                  </span>
                  <span className="rounded-full bg-foreground px-3 py-1 text-[10px] font-semibold tracking-wide text-background uppercase">
                    Next update
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
