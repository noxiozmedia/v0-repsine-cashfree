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

        {/* Video embed */}
        <div className="relative mt-14 w-full">
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl shadow-primary/10">
            <iframe
              src="https://www.youtube.com/embed/UtgfsKdJwM4?rel=0&modestbranding=1"
              title="Canva Mastery course preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
