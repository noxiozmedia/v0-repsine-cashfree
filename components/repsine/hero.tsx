import Image from "next/image"
import { Check } from "lucide-react"
import { BuyButton } from "./buy-button"
import { SiteHeader } from "./header"

const checkPoints = ["No Design Skills Needed", "Edit & Post In Minutes", "Free Weekly Updates"]

export function Hero({ headerCta = "buy" }: { headerCta?: "buy" | "login" }) {
  return (
    <section className="relative overflow-hidden">
      {/* Cream glow background */}
      <div className="absolute inset-0 cream-glow opacity-90" aria-hidden="true" />

      <div className="relative">
        <SiteHeader cta={headerCta} />

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-x-12 px-4 pt-10 pb-24 sm:px-6 sm:pt-14 sm:pb-16 lg:grid-cols-2 lg:items-center lg:pt-20 lg:pb-24">
          {/* Headline */}
          <h1 className="order-2 mt-6 text-center font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:col-start-1 lg:row-start-2 lg:mt-5 lg:max-w-xl lg:text-left lg:text-[3.4rem]">
            Done-For-You Instagram Content For <em>Aesthetic Clinics</em>
          </h1>

          {/* Subhead */}
          <p className="order-3 mt-5 text-center text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base lg:col-start-1 lg:row-start-3 lg:max-w-xl lg:text-left">
            25+ templates, 20+ captions, 30+ DM scripts and a 30-day content plan — designed specifically for aesthetic clinics.
          </p>

          {/* Mockup PNG — no background. After subtext on mobile, right side on desktop */}
          <div className="order-4 mt-8 w-full lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:mt-0 lg:self-center">
            <Image
              src="/images/utf.png"
              alt="Repsine ready-to-post Instagram templates shown on phone, laptop and tablet"
              width={999}
              height={503}
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="h-auto w-full object-contain"
            />
          </div>

          {/* CTA — inline on desktop only (sticky bar on mobile) */}
          <div className="order-5 hidden sm:flex sm:justify-center lg:col-start-1 lg:row-start-4 lg:mt-8 lg:justify-start">
            <BuyButton label="Get Instant Access - ₹999" />
          </div>

          {/* Check points */}
          <ul className="order-6 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:col-start-1 lg:row-start-5 lg:mt-4 lg:flex-col lg:flex-nowrap lg:items-start lg:gap-y-2.5">
            {checkPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/90 px-4 py-3 backdrop-blur-md sm:hidden">
        <BuyButton label="Get Instant Access - ₹999" className="w-full" />
      </div>
    </section>
  )
}
