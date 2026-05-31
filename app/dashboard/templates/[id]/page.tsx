import Image from "next/image"
import { notFound } from "next/navigation"
import { templates } from "@/lib/content/templates"
import { SectionHeader } from "@/components/dashboard/section-header"
import { TemplateWorkspace } from "@/components/dashboard/template-workspace"

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const template = templates.find((t) => t.slug === id)
  if (!template) notFound()

  // Collect every image URL that could ever appear in the workspace so Next.js
  // priority-fetches them all before the user clicks any variant tab.
  const allImages = template.variants.flatMap((v) =>
    v.slides ? [v.image, ...v.slides] : [v.image],
  )

  return (
    <>
      {/* Hidden priority images — forces the browser to load all variant/carousel
          images immediately so switching tabs shows the image instantly. */}
      <div className="sr-only" aria-hidden="true">
        {allImages.map((src) => (
          <Image key={src} src={src} alt="" fill priority sizes="1px" />
        ))}
      </div>

      <SectionHeader
        eyebrow={template.categoryLabel}
        title={template.title}
        description={template.description}
        backHref="/dashboard/templates"
        backLabel="All templates"
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        <TemplateWorkspace template={template} />
      </div>
    </>
  )
}
