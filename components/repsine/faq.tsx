"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Do I need Canva experience?",
    a: "No. Every template is designed to be edited in Canva with simple drag-and-drop changes.",
  },
  {
    q: "How long does it take to customize a template?",
    a: "Most templates can be customized and posted in under 10 minutes.",
  },
  {
    q: "Are these templates made specifically for aesthetic clinics?",
    a: "Yes. Every template, caption, script and content plan is designed specifically for aesthetic clinics and medspas.",
  },
  {
    q: "What exactly is included in the kit?",
    a: "You'll get Instagram Templates, ready-to-use Captions, WhatsApp & DM Scripts, a Content Calendar and free Weekly Updates.",
  },
  {
    q: "Is this a subscription?",
    a: "No. Pay once and get lifetime access, including free weekly updates.",
  },
  {
    q: "Will I receive future templates?",
    a: "Yes. New templates and resources are added regularly at no extra cost.",
  },
  {
    q: "Can I use this for multiple clinic locations?",
    a: "Your purchase covers a single clinic. For multiple locations, reach out to us and we'll sort out the right license for you.",
  },
  {
    q: "What if I don't know what to post?",
    a: "That's exactly why the kit includes a content calendar, ready-made templates and captions — so you always know what to post next.",
  },
]

export function Faq() {
  return (
    <section className="relative border-t border-border/40">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-foreground/80 uppercase">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Questions? We&apos;ve Got Answers
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 flex flex-col gap-3">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-border/60 bg-card/40 px-5 backdrop-blur"
            >
              <AccordionTrigger className="cursor-pointer py-4 text-left text-sm font-semibold text-foreground hover:no-underline sm:text-[15px]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
