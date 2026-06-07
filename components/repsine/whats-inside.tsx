import { LayoutGrid, MessageSquareQuote, CalendarDays, MessagesSquare } from "lucide-react"

const items = [
  {
    icon: LayoutGrid,
    count: "25+",
    title: "Instagram Templates",
    description: "Posts, carousels & stories — before/after, testimonials, FAQs and more.",
  },
  {
    icon: MessageSquareQuote,
    count: "20+",
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
    count: "30+",
    title: "DM & WhatsApp Scripts",
    description: "Exact replies for pricing, bookings and treatment questions.",
  },
]

export function WhatsInside() {
  return (
    <section className="relative border-t border-border/60">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
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

        <div className="mt-12 rounded-3xl border border-border bg-card p-2 shadow-xl shadow-primary/5 sm:p-3">
          <ul className="flex flex-col">
            {items.map((item, index) => {
              const Icon = item.icon
              return (
                <li
                  key={item.title}
                  className={
                    "flex items-start gap-4 px-4 py-5 sm:px-6 sm:py-6" +
                    (index !== items.length - 1 ? " border-b border-border/60" : "")
                  }
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                        {item.count}
                      </span>
                      <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
