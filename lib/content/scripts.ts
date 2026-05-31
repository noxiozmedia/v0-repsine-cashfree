export type Script = {
  id: string
  category: "first-contact" | "qualifying" | "booking" | "objection" | "follow-up" | "post-visit" | "bonus"
  channel: "WhatsApp" | "Instagram DM" | "Both"
  title: string
  body: string
}

export const scriptCategories = [
  { key: "first-contact" as const, label: "First contact" },
  { key: "qualifying" as const, label: "Qualifying" },
  { key: "booking" as const, label: "Booking & Scheduling" },
  { key: "objection" as const, label: "Objection handling" },
  { key: "follow-up" as const, label: "Follow-up" },
  { key: "post-visit" as const, label: "Post visit" },
  { key: "bonus" as const, label: "Bonus scripts" },
]

export const scripts: Script[] = [
  // ─── First contact ───────────────────────────────────────────
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
    id: "fc-3",
    category: "first-contact",
    channel: "Instagram DM",
    title: "Story reply — product question",
    body: `Hey [name]! Great question on our story.

For [concern], we'd actually recommend a treatment over a product — here's why: topicals address the surface, while our protocols work at the root.

Want me to share what that would look like for your skin type?`,
  },
  {
    id: "fc-4",
    category: "first-contact",
    channel: "WhatsApp",
    title: "After a walk-in inquiry",
    body: `Hi [name], lovely meeting you at the clinic today!

As promised, here's a quick summary of what we discussed:
• Concern: [concern]
• Suggested treatment: [treatment]
• Estimated sessions: [X]
• Starting price: ₹[X]

Whenever you're ready to take the next step, just reply here and we'll book you in.`,
  },

  // ─── Qualifying ──────────────────────────────────────────────
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
    id: "qual-3",
    category: "qualifying",
    channel: "Both",
    title: "Previous treatment check",
    body: `Before I suggest anything, quick question — have you tried any treatments for [concern] before?

This helps me avoid recommending something that hasn't worked and find what will actually move the needle for your skin.`,
  },
  {
    id: "qual-4",
    category: "qualifying",
    channel: "WhatsApp",
    title: "Skin type check",
    body: `To make sure we recommend the right treatment, could you tell me a bit about your skin?

• Is it oily, dry, combination, or sensitive?
• Any known allergies to skincare ingredients?
• Are you currently on any medication (especially for acne or hormones)?

Once I have these, I can tailor the suggestion properly.`,
  },
  {
    id: "qual-5",
    category: "qualifying",
    channel: "Both",
    title: "In-person vs. virtual check",
    body: `We can help you in two ways:

1. Virtual consult (free, 15 min) — great if you're exploring options
2. In-clinic consult (₹[X], redeemable against your treatment) — better if you want a hands-on skin assessment

Which feels right for where you are right now?`,
  },

  // ─── Booking & Scheduling ────────────────────────────────────
  {
    id: "book-1",
    category: "booking",
    channel: "Both",
    title: "Consultation booking",
    body: `Great! Based on what you've shared, I think a consultation would be the best next step.

We currently have:

Tuesday 4:00 PM
Wednesday 11:00 AM
Thursday 6:30 PM

Which works best for you?`,
  },
  {
    id: "book-2",
    category: "booking",
    channel: "Both",
    title: "Appointment confirmation",
    body: `You're all set for [date/time].

Clinic Address: [address]

Please arrive 10 minutes early. If you need to reschedule, just reply here.`,
  },
  {
    id: "book-3",
    category: "booking",
    channel: "Both",
    title: "Consultation reminder",
    body: `Looking forward to seeing you tomorrow at [time].

If you have any questions before your appointment, feel free to message us.`,
  },
  {
    id: "book-4",
    category: "booking",
    channel: "Both",
    title: "No-show recovery",
    body: `Hi [name], we missed you today. No worries — things come up.

Would you like me to help find another slot this week?`,
  },

  // ─── Objection handling ──────────────────────────────────────
  {
    id: "obj-1",
    category: "objection",
    channel: "Both",
    title: "When price feels high",
    body: `Totally fair, [name] — it's a real investment.

A few things to consider:
• You'll save on temporary fixes that don't work long-term.
• Results typically last 6-12 months, so the per-month cost is lower than it looks.
• We can split the payment across 2-3 EMIs if that helps.

Want me to share a payment option that makes it easier?`,
  },
  {
    id: "obj-2",
    category: "objection",
    channel: "Both",
    title: "When they're nervous about the procedure",
    body: `That's completely normal — most first-timers feel the same way.

A few reassurances:
• The doctor walks you through every step beforehand.
• Numbing cream is applied 30 mins before — most clients feel barely anything.
• You can stop anytime, no questions asked.

Want to start with a free 15-minute consult — no obligation to book?`,
  },
  {
    id: "obj-3",
    category: "objection",
    channel: "Both",
    title: "When they want to think about it",
    body: `Of course — take your time.

Two things that might help while you decide:
1. Our before/after gallery: [link]
2. A quick FAQ on [treatment]: [link]

I'll check back in a few days. No pressure at all.`,
  },
  {
    id: "obj-4",
    category: "objection",
    channel: "Both",
    title: "When they found a cheaper option elsewhere",
    body: `That's completely fair to compare — I'd do the same.

A few things worth checking with any clinic:
• Is the doctor performing the treatment or a technician?
• What device/product brand do they use?
• Do they offer a patch test before the full session?

Happy to answer all of these for our clinic so you can compare properly.`,
  },
  {
    id: "obj-5",
    category: "objection",
    channel: "Both",
    title: "When they say they'll try products first",
    body: `That makes sense — products can genuinely help with mild concerns.

The honest truth: for [specific concern], products maintain results but treatments create them.

If you'd like, I can suggest a basic homecare routine to start with while you consider the treatment option?`,
  },

  // ─── Follow-up ───────────────────────────────────────────────
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
    id: "fu-3",
    category: "follow-up",
    channel: "WhatsApp",
    title: "Sharing a result post",
    body: `Hi [name]! Thought of you when we shared this result on our Instagram today.

This client had a very similar concern to yours — [brief description of result].

Here's the post: [link]

Whenever you're ready to chat, I'm here.`,
  },
  {
    id: "fu-5",
    category: "follow-up",
    channel: "Both",
    title: "Last-slot urgency",
    body: `Hi [name], quick heads-up — we have one slot left for [treatment] this [week/month] at a discounted rate (₹[X] instead of ₹[Y]).

I thought of you first.

Want me to hold it for 24 hours while you decide?`,
  },
  {
    id: "fu-6",
    category: "follow-up",
    channel: "Both",
    title: "Before/After gallery share",
    body: `Absolutely — here's a recent client with a similar concern: [gallery link]

Results vary from person to person, but this gives you a realistic idea of what may be possible.`,
  },

  // ─── Post-visit ──────────────────────────────────────────────
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
  {
    id: "post-3",
    category: "post-visit",
    channel: "Both",
    title: "Homecare reminder",
    body: `Hi [name], quick homecare reminder for the next 72 hours:

• Keep the treated area clean and moisturised
• Avoid direct sun exposure — hat + SPF if you're going out
• No gym or steam room for 48h
• Don't pick or exfoliate the area

Feel free to send photos if you notice anything unusual. We're always here.`,
  },
  {
    id: "post-4",
    category: "post-visit",
    channel: "Both",
    title: "Next session nudge",
    body: `Hi [name]! You're about halfway through your recommended [treatment] plan.

Based on how you're progressing, your next session should ideally be in [X] weeks to keep the results compounding.

Should I check available slots for you?`,
  },
  {
    id: "post-5",
    category: "post-visit",
    channel: "Both",
    title: "Rebooking after 3 months",
    body: `Hi [name], it's been about 3 months since your last visit 🌸

Just checking in — how has your skin been holding up?

If you'd like a top-up or a new treatment to build on your results, I'd love to help you plan the next step.`,
  },
  {
    id: "post-6",
    category: "post-visit",
    channel: "Both",
    title: "Review request",
    body: `If you enjoyed your experience with us, we'd be so grateful for a quick Google review: [link]

It helps more people discover the clinic and means a lot to our team.`,
  },

  // ─── Bonus scripts (lower priority) ─────────────────────────
  {
    id: "bonus-1",
    category: "bonus",
    channel: "Both",
    title: "Seasonal nudge",
    body: `Hey [name] — as the season changes, so do our skin's needs.

[Summer/Monsoon/Winter] is actually a great time to address [concern] because [brief reason].

Would you like me to share what a quick 2-session protocol would look like for you?`,
  },
  {
    id: "bonus-2",
    category: "bonus",
    channel: "Both",
    title: "Referral intro",
    body: `Hi [name]! [referring client's name] mentioned you might be looking for help with [concern] — so glad you reached out.

We already know a bit about what you're looking for, so we can make your first consult very targeted.

Would [day] or [day] work for a quick 15-minute call?`,
  },
]
