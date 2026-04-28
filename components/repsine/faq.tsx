"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Who is this course for?",
    a: "This course is for absolute beginners, social media managers, freelancers, students, small business owners and anyone who wants to design beautiful graphics and brand assets using Canva — no prior design experience needed.",
  },
  {
    q: "Do I need any special software to start?",
    a: "No special software is required. You only need a free Canva account and a stable internet connection. We will guide you through Canva Pro features and alternatives where needed.",
  },
  {
    q: "Will I get a certificate after completing the course?",
    a: "Yes. Once you finish all the modules and the final project, you will receive an industry-recognized certificate of completion that you can add to your resume and LinkedIn.",
  },
  {
    q: "Can I access the course content after completion?",
    a: "Absolutely. You get lifetime access to all the lessons, templates and future updates — so you can revisit the course any time you need a refresher.",
  },
  {
    q: "What if I have questions or need help during the course?",
    a: "You will have access to our private community and dedicated support channel where mentors and fellow students respond to your questions and review your designs.",
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
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-4xl">
            Maybe We Have An Answer
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
