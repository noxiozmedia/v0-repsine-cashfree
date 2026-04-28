import { BuyButton } from "./buy-button"
import { SocialProof } from "./social-proof"

export function SuccessCta() {
  return (
    <section id="enroll" className="relative">
      <div className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 px-6 py-14 sm:px-10 sm:py-20">
          <div className="absolute inset-0 cta-glow opacity-90" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center text-center">
            <span className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-foreground/80 uppercase backdrop-blur">
              Guarantee
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-5xl">
              Your Success, Guaranteed.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
              At <span className="font-semibold text-foreground">Repsine</span>, we are committed to making
              Canva easy and practical for you. With expert guidance, hands-on projects and lifetime
              access — success is just a step away.
            </p>

            <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
              <BuyButton />
              <SocialProof />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
