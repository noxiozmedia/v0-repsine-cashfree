import Image from "next/image"
import { Lock } from "lucide-react"
import { adCreatives } from "@/lib/content/ads"
import { SectionHeader } from "@/components/dashboard/section-header"

export default function AdsPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Paid social"
        title="Ads Creatives"
        description="High-converting ad creatives with copy, hooks and CTAs. Pick a format, edit in Canva, plug into Meta Ads Manager."
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Ad creatives are coming soon — sit tight.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              Free for you — no extra charge
            </span>
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold text-primary">
              Unlocks in next weekly update!
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {adCreatives.map((a) => (
            <div
              key={a.slug}
              aria-disabled="true"
              className="relative flex select-none flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Image
                  src={a.cover || "/placeholder.svg"}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="scale-110 object-cover blur-md"
                />
                <div className="absolute inset-0 bg-background/40" />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <h3 className="font-display text-base font-semibold text-foreground">{a.title}</h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {a.description}
                </p>
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
    </>
  )
}
