import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { templates } from "@/lib/content/templates"
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <Link
              key={t.slug}
              href={`/dashboard/templates/${t.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src={t.cover || "/placeholder.svg"}
                  alt={t.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur">
                  {t.category}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-foreground">{t.title}</h3>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-foreground/40 transition-colors group-hover:text-primary" />
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {t.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {t.variants.map((v) => (
                    <span
                      key={v.id}
                      className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground/70"
                    >
                      {v.label}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
