import { captions, captionCategories } from "@/lib/content/captions"
import { CopyButton } from "@/components/dashboard/copy-button"
import { SectionHeader } from "@/components/dashboard/section-header"

export default function CaptionsPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Workspace"
        title="Captions"
        description="Copy-and-paste Instagram captions, organized by content type. Tap copy, paste into your post, swap a few details — done."
      />

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-10">
        {captionCategories.map((cat) => {
          const items = captions.filter((c) => c.category === cat.key)
          if (items.length === 0) return null
          return (
            <section key={cat.key} className="mb-10">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="font-display text-base font-semibold text-foreground">{cat.label}</h2>
                <span className="text-[10px] font-medium tracking-wider text-foreground/50 uppercase">
                  {items.length} captions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {items.map((c) => {
                  const fullText = `${c.body}\n\n${c.hashtags.map((h) => `#${h}`).join(" ")}`
                  return (
                    <article
                      key={c.id}
                      className="overflow-hidden rounded-2xl border border-border bg-card"
                    >
                      <header className="flex items-center justify-between gap-3 border-b border-border/60 bg-muted/30 px-4 py-2.5">
                        <h3 className="text-xs font-semibold text-foreground">{c.title}</h3>
                        <CopyButton text={fullText} label="Copy caption" />
                      </header>
                      <div className="px-4 py-4">
                        <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                          {c.body}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {c.hashtags.map((h) => (
                            <span
                              key={h}
                              className="text-[11px] font-medium text-primary/85"
                            >
                              #{h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
