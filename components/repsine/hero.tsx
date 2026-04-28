import { Play } from "lucide-react"
import { BuyButton } from "./buy-button"
import { SocialProof } from "./social-proof"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 hero-glow opacity-90" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-16 pb-10 sm:px-6 sm:pt-24 lg:pt-28">
        {/* Badge */}
        <span className="mb-6 inline-flex items-center rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-foreground/80 uppercase backdrop-blur">
          Master Creative Pro Bundle
        </span>

        {/* Headline */}
        <h1 className="font-display text-center text-5xl leading-[1.05] font-bold tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
          Canva Mastery
          <br />
          Beginner To Advanced
        </h1>

        {/* Subhead */}
        <p className="mt-5 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          Pay Once, Enjoy Lifetime access to over 5+ Courses on Canva Designing &amp; Branding.
        </p>

        {/* CTA + social proof */}
        <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
          <BuyButton />
          <SocialProof />
        </div>

        {/* Video placeholder */}
        <div className="relative mt-14 w-full">
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl shadow-primary/10">
            {/* Decorative gradient placeholder */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.25 0.12 280) 0%, oklch(0.2 0.1 250) 50%, oklch(0.18 0.08 220) 100%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 40%, oklch(0.6 0.22 285 / 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 60%, oklch(0.55 0.2 220 / 0.5) 0%, transparent 50%)",
              }}
              aria-hidden="true"
            />

            {/* Centered title chip */}
            <div className="absolute top-6 left-6 rounded-lg bg-background/70 px-4 py-2 backdrop-blur sm:top-10 sm:left-10">
              <p className="font-display text-lg font-bold text-foreground sm:text-2xl">
                Canva Mastery
              </p>
            </div>

            {/* Play button */}
            <button
              type="button"
              aria-label="Play course preview"
              className="group absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-transform hover:scale-105 sm:h-20 sm:w-20"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground sm:h-14 sm:w-14">
                <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" />
              </span>
            </button>

            <p className="absolute right-6 bottom-6 text-xs tracking-wider text-foreground/50 uppercase">
              Video placeholder
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
