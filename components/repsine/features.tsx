import Image from "next/image"

const features = [
  {
    tag: "Templates",
    title: "Templates",
    description:
      "Ready-to-post designs for testimonials, before/afters, FAQs and more — so your clinic looks active and professional in minutes.",
    image: "/images/templates.gif",
    alt: "Animated before and after acne treatment Instagram template",
  },
  {
    tag: "Plan",
    title: "Content Calendar",
    description:
      "Know exactly what to post each week with a proven content plan designed specifically for aesthetic clinics.",
    image: "/images/content-calendar.jpg",
    alt: "Day-by-day content calendar with post ideas for an aesthetic clinic",
  },
  {
    tag: "Captions",
    title: "Captions",
    description:
      "Skip the blank page. Get ready-to-use captions that educate, build trust and encourage patients to take action.",
    image: "/images/captions.jpg",
    alt: "Ready-to-use Instagram caption with hashtags for a skincare clinic",
  },
  {
    tag: "Scripts",
    title: "WhatsApp & DM Scripts",
    description:
      "Know exactly what to say when patients ask about pricing, treatments or bookings — without awkward guesswork.",
    image: "/images/wp-scripts.jpg",
    alt: "WhatsApp chat script for replying to a patient about acne scars",
  },
]

export function Features() {
  return (
    <section className="relative border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-foreground/70 uppercase">
            What&apos;s Inside
          </span>
          <h2 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Everything You Need To Stay Consistent On Instagram
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.alt}
                  fill
                  unoptimized={feature.image.endsWith(".gif")}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6 sm:p-7">
                <span className="text-[10px] font-semibold tracking-[0.18em] text-primary/70 uppercase">
                  {feature.tag}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
