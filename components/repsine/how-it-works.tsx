import { Download, Pencil, Send } from "lucide-react"

const steps = [
  {
    icon: Download,
    step: "Step 1",
    title: "Get Instant Access",
    description:
      "Access all templates, captions, scripts and content plans immediately after purchase.",
  },
  {
    icon: Pencil,
    step: "Step 2",
    title: "Edit In Canva",
    description:
      "Customize your clinic name, logo and contact details in minutes — no design skills needed.",
  },
  {
    icon: Send,
    step: "Step 3",
    title: "Post With Confidence",
    description:
      "Stay active on Instagram with professional content that helps patients trust your clinic.",
  },
]

export function HowItWorks() {
  return (
    <section className="relative border-t border-border/60 bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-foreground/70 uppercase">
            How It Works
          </span>
          <h2 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Your Next Instagram Post Is Just 3 Steps Away
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div
              key={title}
              className="relative flex flex-col items-start rounded-2xl border border-border bg-card p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <span className="mt-5 text-[10px] font-semibold tracking-[0.18em] text-primary/70 uppercase">
                {step}
              </span>
              <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
