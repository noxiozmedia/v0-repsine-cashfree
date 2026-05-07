import { notFound } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { templates } from "@/lib/content/templates"
import { SectionHeader } from "@/components/dashboard/section-header"
import { VariantTabs } from "@/components/dashboard/variant-tabs"

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const template = templates.find((t) => t.slug === id)
  if (!template) notFound()

  return (
    <>
      <SectionHeader
        eyebrow={template.category}
        title={template.title}
        description={template.description}
        backHref="/dashboard/templates"
        backLabel="All templates"
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="min-w-0">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-foreground/60 uppercase">
              Variants
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a format. Each variant is sized for the platform it&apos;s designed for.
            </p>
            <div className="mt-4">
              <VariantTabs variants={[...template.variants]} />
            </div>

            <div className="mt-10">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-foreground/60 uppercase">
                Tutorial
              </h2>
              <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
                <iframe
                  src={template.videoEmbedUrl}
                  title={`${template.title} tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-foreground/60 uppercase">
              How to use
            </h2>
            <ol className="mt-3 flex flex-col gap-3">
              {template.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-5 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              You can duplicate this template unlimited times.
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
