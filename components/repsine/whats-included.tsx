import { CheckCircle2, Zap, RefreshCw, ShieldCheck } from "lucide-react"
import { BuyButton } from "./buy-button"
import { SocialProof } from "./social-proof"

const features = [
  {
    title: "Complete Canva Curriculum (Beginner to Advanced)",
    description:
      "Start from the basics — workspace, layers, and text — then progress to brand kits, advanced layouts, animations, and team collaboration workflows.",
  },
  {
    title: "Real-World Hands-on Projects",
    description:
      "Apply what you learn by designing logos, social media kits, presentations, YouTube thumbnails, posters and a complete brand identity package.",
  },
  {
    title: "Interactive Quizzes & Assignments",
    description:
      "Reinforce your learning with thought-provoking quizzes, design challenges, and hands-on assignments designed to sharpen your visual eye.",
  },
  {
    title: "Lifetime Access & Future Updates",
    description:
      "Get unlimited access to the course materials, including future updates and newly added content, without any extra charges.",
  },
  {
    title: "Downloadable Resources & Templates",
    description:
      "Access exclusive Canva templates, color palettes, font pairings and reference guides to assist you in designing efficiently.",
  },
  {
    title: "Dedicated Support & Community Access",
    description:
      "Join a community of designers, interact with mentors, ask questions, and get expert guidance whenever needed.",
  },
  {
    title: "Canva Career Roadmap & Freelance Prep",
    description:
      "Learn how to use Canva in real-world careers like social media management, branding and freelance design — with sessions on pricing and client onboarding.",
  },
  {
    title: "Certificate of Completion",
    description:
      "Receive an industry-recognized certificate upon successfully completing the course to showcase your skills to employers and clients.",
  },
]

const guarantees = [
  { icon: Zap, label: "Instant Access" },
  { icon: RefreshCw, label: "Constant Updates" },
  { icon: ShieldCheck, label: "7-Day Guarantee" },
]

export function WhatsIncluded() {
  return (
    <section className="relative border-t border-border/40 bg-background">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 8px)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="rounded-2xl bg-card/50 p-6 ring-1 ring-border/60 sm:p-10">
          {/* Badge */}
          <span className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-foreground/80 uppercase">
            Creative Pro
          </span>

          {/* Heading */}
          <h2 className="mt-5 font-display text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-4xl">
            What&apos;s Included Inside?
          </h2>

          {/* Features list */}
          <ul className="mt-8 flex flex-col gap-6">
            {features.map((feature) => (
              <li key={feature.title} className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400"
                  strokeWidth={2.5}
                />
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  <span className="font-semibold text-foreground">{feature.title}</span>{" "}
                  <span className="text-foreground/60">— </span>
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
            <BuyButton />
            <SocialProof />
          </div>

          {/* Guarantees row */}
          <div className="mt-10 flex flex-wrap items-center justify-around gap-4 border-t border-border/60 pt-6">
            {guarantees.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-[11px] font-semibold tracking-[0.18em] text-foreground/80 uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
