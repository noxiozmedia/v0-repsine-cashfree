import { LayoutGrid, MessageSquareQuote, CalendarDays, MessagesSquare } from "lucide-react"

const items = [
  {
    icon: LayoutGrid,
    count: "20+",
    title: "Instagram Templates",
    description: "Posts, carousels & stories — before/after, testimonials, FAQs and more.",
  },
  {
    icon: MessageSquareQuote,
    count: "50+",
    title: "Caption Frameworks",
    description: "Ready-to-use caption formulas for every category and content type.",
  },
  {
    icon: CalendarDays,
    count: "30-Day",
    title: "Content Calendar",
    description: "A full month of done-for-you post ideas mapped out day by day.",
  },
  {
    icon: MessagesSquare,
    count: "20+",
    title: "DM & WhatsApp Scripts",
    description: "Exact replies for pricing, bookings and treatment questions.",
  },
]

export function WhatsInside() {
  return (
    <section className="relative border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-foreground/70 uppercase">
            The Full Kit
          </span>
          <h2 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            What&apos;s Inside <em>The Kit</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
            Everything an aesthetic clinic needs to post consistently — all in one place.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={item.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-xl hover:shadow-primary/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">
                  {item.count}
                </p>
                <h3 className="mt-1 text-sm font-semibold tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
