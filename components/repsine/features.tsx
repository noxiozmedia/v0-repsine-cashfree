import { TemplateCarousel } from "./interactive/template-carousel"
import { CalendarDemo } from "./interactive/calendar-demo"
import { ChatDemo } from "./interactive/chat-demo"
import { CaptionsDemo } from "./interactive/captions-demo"

type Feature = {
  tag: string
  title: string
  description: string
  demo: "templates" | "calendar" | "captions" | "scripts"
  mobileOrder?: string
}

const features: Feature[] = [
  {
    tag: "Templates",
    title: "Templates",
    description:
      "Ready-to-post designs for testimonials, before/afters, FAQs and more — preview them right here.",
    demo: "templates",
  },
  {
    tag: "Plan",
    title: "Content Calendar",
    description:
      "Pick any day and see exactly what to post — hook, content idea and CTA, mapped out for you.",
    demo: "calendar",
  },
  {
    tag: "Captions",
    title: "Captions",
    description:
      "Skip the blank page. Swipe through ready-to-use captions, then copy the one you like in a tap.",
    demo: "captions",
    // On mobile: visually pushed after Scripts. On desktop: natural grid position.
    mobileOrder: "order-4 md:order-none",
  },
  {
    tag: "Scripts",
    title: "WhatsApp & DM Scripts",
    description:
      "A patient says 'Hello' — pick the perfect reply and send. Never freeze on a DM again.",
    demo: "scripts",
    // On mobile: visually pulled before Captions. On desktop: natural grid position.
    mobileOrder: "order-3 md:order-none",
  },
]

function FeatureDemo({ demo }: { demo: Feature["demo"] }) {
  if (demo === "templates") return <TemplateCarousel />
  if (demo === "calendar") return <CalendarDemo />
  if (demo === "captions") return <CaptionsDemo />
  return <ChatDemo />
}

export function Features() {
  return (
    <section className="relative border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-foreground/70 uppercase">
            What&apos;s Inside
          </span>
          <h2 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            See Exactly What You&apos;re <em>Getting</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
            No guesswork. Try the templates, content plan, captions and DM scripts right here — before
            you buy.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature) => {
            // Templates + chat use a fixed 1:1 frame; calendar + captions size to their content.
            const isFixed = feature.demo === "templates" || feature.demo === "scripts"
            return (
              <article
                key={feature.title}
                className={`group flex flex-col rounded-2xl border border-border bg-card p-3 transition-shadow hover:shadow-xl hover:shadow-primary/5${feature.mobileOrder ? ` ${feature.mobileOrder}` : ""}`}
              >
                <div
                  className={`relative w-full overflow-hidden rounded-xl${isFixed ? " aspect-square" : ""}`}
                >
                  <FeatureDemo demo={feature.demo} />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3 pt-5 sm:p-4 sm:pt-5">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-primary/70 uppercase">
                    {feature.tag}
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
          Got questions? <span className="text-foreground">Please ask first!</span>
        </p>
      </div>
    </section>
  )
}
