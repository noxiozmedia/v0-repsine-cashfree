export type Script = {
  id: string
  category: "first-contact" | "qualifying" | "objection" | "follow-up" | "post-visit"
  channel: "WhatsApp" | "Instagram DM" | "Both"
  title: string
  body: string
}

export const scriptCategories = [
  { key: "first-contact" as const, label: "First contact" },
  { key: "qualifying" as const, label: "Qualifying" },
  { key: "objection" as const, label: "Objection handling" },
  { key: "follow-up" as const, label: "Follow-up" },
  { key: "post-visit" as const, label: "Post visit" },
]

export const scripts: Script[] = [
  {
    id: "fc-1",
    category: "first-contact",
    channel: "Instagram DM",
    title: "When someone DMs from a Reel",
    body: `Hey [name]! Thank you so much for reaching out 💜

I'd love to help you with [skin concern they mentioned]. To suggest the right treatment, could you share:

1. Your age range
2. Any current skincare routine
3. Anything you've tried before that didn't work

Once I have these, I'll share 2-3 options that could genuinely help.`,
  },
  {
    id: "fc-2",
    category: "first-contact",
    channel: "WhatsApp",
    title: "First WhatsApp reply",
    body: `Hi [name], thanks for messaging us at [clinic name].

We'd love to understand your goals before recommending a treatment. Could you share:

1. Your main skin concern
2. Whether you'd prefer a one-time treatment or a longer plan
3. A photo of the area, if you're comfortable

Looking forward to helping you 🌸`,
  },
  {
    id: "qual-1",
    category: "qualifying",
    channel: "Both",
    title: "Budget qualifier",
    body: `That makes total sense, [name].

For [concern], we have:
• A starter plan (₹X) — single session, mild results
• A core plan (₹Y) — 4 sessions, visible transformation
• A premium plan (₹Z) — 8 sessions + homecare, full reset

Which one feels right for where you are right now?`,
  },
  {
    id: "qual-2",
    category: "qualifying",
    channel: "Both",
    title: "Timeline qualifier",
    body: `Quick question — when would you ideally like to see the result by?

If it's:
• Within 4 weeks: we'd start with [treatment A]
• Within 3 months: [treatment B] gives you longer-lasting results
• 6+ months: we'd build a custom protocol

Knowing this helps me suggest something realistic.`,
  },
  {
    id: "obj-1",
    category: "objection",
    channel: "Both",
    title: "When price feels high",
    body: `Totally fair, [name] — it's a real investment.

A few honest things to consider:
• You'll save on temporary fixes (creams, serums that don't work).
• Most clients see results that last 6-12 months — making the per-month cost much lower than it looks.
• We can split the payment across 2-3 EMIs if helpful.

Want me to share a payment option that makes it easier?`,
  },
  {
    id: "obj-2",
    category: "objection",
    channel: "Both",
    title: "When they're nervous about the procedure",
    body: `It's completely normal to feel that way — most of our first-time clients do.

A few things that might help:
• Our doctor walks you through every step before starting.
• Numbing cream is applied 30 mins before — most clients say they feel barely anything.
• You can stop anytime if uncomfortable, no questions asked.

Would you feel better doing a free 15-minute consult first, with no obligation to book?`,
  },
  {
    id: "fu-1",
    category: "follow-up",
    channel: "Both",
    title: "Follow-up after 24h of no reply",
    body: `Hi [name], just circling back on your DM 🌸

If now isn't the right time, no worries at all — happy to help whenever you're ready.

If you have any questions or need a different option, just say the word.`,
  },
  {
    id: "fu-2",
    category: "follow-up",
    channel: "Both",
    title: "Follow-up after a week",
    body: `Hey [name], hope you're doing well!

Wanted to share — we have a few open slots for [treatment they were interested in] this week. If you'd like to grab one, I can hold it for you for 24h.

No pressure either way 💜`,
  },
  {
    id: "post-1",
    category: "post-visit",
    channel: "Both",
    title: "Same-day thank you",
    body: `Thank you so much for trusting us today, [name] 🌸

Quick aftercare reminders:
• Avoid direct sun for 24h
• No harsh exfoliants for 3 days
• SPF 50 every morning, no excuses

If anything feels off, message us anytime — we're here.`,
  },
  {
    id: "post-2",
    category: "post-visit",
    channel: "Both",
    title: "Day-7 check-in",
    body: `Hi [name], it's been a week since your treatment 💜

How is your skin feeling? Any redness, dryness, or anything you want to share?

Also — if you're loving the results, we'd be so grateful for a quick 1-line review. It genuinely helps us reach more people who could use the same care.`,
  },
]
