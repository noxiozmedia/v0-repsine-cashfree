import { notFound } from "next/navigation"
import { Target } from "lucide-react"
import { adCreatives } from "@/lib/content/ads"
import { SectionHeader } from "@/components/dashboard/section-header"
import { AdVariantTabs } from "@/components/dashboard/ad-variant-tabs"
import { CopyButton } from "@/components/dashboard/copy-button"

export default async function AdDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ad = adCreatives.find((a) => a.slug === id)
  if (!ad) notFound()

  return (
    <>
      <SectionHeader
        eyebrow={ad.category}
        title={ad.title}
        description={ad.description}
        backHref="/dashboard/ads"
        backLabel="All ads"
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="min-w-0">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-foreground/60 uppercase">
              Variants
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a placement. Each variant is sized for its native ad slot.
            </p>
            <div className="mt-4">
              <AdVariantTabs variants={[...ad.variants]} />
            </div>

            <div className="mt-10">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-foreground/60 uppercase">
                Tutorial
              </h2>
              <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
                <iframe
                  src={ad.videoEmbedUrl}
                  title={`${ad.title} tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-foreground/60 uppercase">
                Ad copy
              </h2>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold tracking-wider text-foreground/50 uppercase">
                    Primary text
                  </p>
                  <CopyButton text={ad.copy.primary} />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed whitespace-pre-line text-foreground/85">
                  {ad.copy.primary}
                </p>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold tracking-wider text-foreground/50 uppercase">
                    Headline
                  </p>
                  <CopyButton text={ad.copy.headline} />
                </div>
                <p className="mt-1.5 text-sm font-semibold text-foreground">{ad.copy.headline}</p>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2">
                <p className="text-xs font-semibold text-primary">CTA · {ad.copy.cta}</p>
                <Target className="h-3.5 w-3.5 text-primary" />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </>
  )
}
