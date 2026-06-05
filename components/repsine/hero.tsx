import Image from "next/image"
import { Check } from "lucide-react"
import { BuyButton } from "./buy-button"
import { SocialProof } from "./social-proof"
import { SiteHeader } from "./header"

const checkPoints = ["No Design Skills Needed", "Edit & Post In Minutes", "Free Weekly Updates"]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Cream glow background */}
      <div className="absolute inset-0 cream-glow opacity-90" aria-hidden="true" />

      <div className="relative">
        <SiteHeader />

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-14 pb-10 sm:px-6 sm:pt-20 lg:pt-24">
          {/* Badge */}
          <span className="mb-6 inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-foreground/70 uppercase backdrop-blur">
            Instagram Kit For Aesthetic Clinics
          </span>

          {/* Headline */}
          <h1 className="max-w-3xl text-center font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            Have an Instagram patients can trust — without adding more work to your day
          </h1>

          {/* Subhead */}
          <p className="mt-5 max-w-2xl text-center text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
            Stop wondering what to post. Get ready-to-use templates, captions, WhatsApp scripts and content
            plans designed specifically for aesthetic clinics — so your Instagram looks active, professional
            and trustworthy before patients ever contact you.
          </p>

          {/* CTA + social proof */}
          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
            <BuyButton label="Get Instant Access — ₹999" />
            <SocialProof />
          </div>

          {/* Check points */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {checkPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          {/* Hero image */}
          <div className="relative mt-12 w-full sm:mt-14">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
              <Image
                src="/images/utf.jpg"
                alt="Repsine ready-to-post Instagram templates shown on phone, laptop and tablet"
                width={2560}
                height={1280}
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
