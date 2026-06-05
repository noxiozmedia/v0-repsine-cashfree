import Image from "next/image"
import { Check } from "lucide-react"
import { BuyButton } from "./buy-button"
import { SocialProof } from "./social-proof"

const points = [
  "Stay Consistent On Instagram",
  "Build Trust Before Patients Contact You",
  "No Designer Or Agency Required",
]

export function SuccessCta() {
  return (
    <section id="enroll" className="relative border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
          <div className="absolute inset-0 cream-glow opacity-80" aria-hidden="true" />

          <div className="relative grid grid-cols-1 items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
            {/* Copy */}
            <div className="flex flex-col items-start text-left">
              <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-foreground/70 uppercase backdrop-blur">
                Get Started Today
              </span>
              <h2 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                Give Your Clinic The Instagram It Deserves
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
                Everything you need to stay active, professional and trustworthy — without hiring an agency
                or spending hours creating content.
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm font-medium text-foreground/85">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
                <BuyButton label="Get Instant Access — ₹999" />
                <SocialProof />
              </div>
            </div>

            {/* Image — transparent mockup */}
            <div className="relative">
              <Image
                src="/images/utf.png"
                alt="Repsine Instagram kit shown across phone, laptop and tablet"
                width={4992}
                height={2640}
                sizes="(max-width: 1024px) 100vw, 512px"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
