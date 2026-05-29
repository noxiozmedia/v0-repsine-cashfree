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

  return (
    <>
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
