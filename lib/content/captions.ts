export type CaptionBlock = {
  id: string
  category: "testimonial" | "before-after" | "promotional" | "educational" | "engagement"
  title: string
  body: string
  hashtags: string[]
  note?: string
}

export const captionCategories = [
  { key: "testimonial" as const, label: "Testimonials" },
  { key: "before-after" as const, label: "Before / After" },
  { key: "promotional" as const, label: "Promotional" },
  { key: "educational" as const, label: "Educational" },
  { key: "engagement" as const, label: "Engagement" },
]

export const captions: CaptionBlock[] = [
  // ─── Testimonials ────────────────────────────────────────────────────────────
  {
    id: "test-1",
    category: "testimonial",
    title: "Hook → Story → Result → CTA",
    note: "Replace all [ ] brackets before posting.",
    body: `Confidence has a glow — and [Client Name] found hers with us.

She came in for [Concern] and shared that she had been feeling [emotion] about it for a long time.

After [Treatment], she noticed [Result] — and honestly, so did everyone around her.

DM us to book your consultation.`,
    hashtags: ["aestheticclinic", "skincare", "skintransformation", "realresults", "clientlove"],
  },
  {
    id: "test-2",
    category: "testimonial",
    title: "First-timer comfort",
    note: "Replace all [ ] brackets before posting.",
    body: `"I was nervous about my first [Treatment] session — but the team made me feel safe the entire time."

That's the standard we hold ourselves to.

If you've been putting it off, come in for a no-pressure consult first.

Tap the link in our bio to book.`,
    hashtags: ["aestheticmedicine", "skintreatment", "confidenceboost", "firsttime", "aestheticclinic"],
  },
  {
    id: "test-3",
    category: "testimonial",
    title: "Long journey, visible result",
    note: "Replace all [ ] brackets before posting.",
    body: `[Client Name] walked in with [X] years of [Concern] she'd stopped believing could change.

[X] sessions later — she cried happy tears in our consultation room.

Those moments are why we do this.

DM us to start your skin story.`,
    hashtags: ["skintransformation", "aestheticclinic", "realresults", "selfconfidence", "skinjourney"],
  },
  {
    id: "test-4",
    category: "testimonial",
    title: "Referred by a friend",
    note: "Replace all [ ] brackets before posting.",
    body: `"I kept postponing because I was scared. My friend dragged me in. Best decision of my life."

First-timers are always the most rewarding to work with — the fear, then the smile, then the glow.

Book a no-pressure intro consult. We'll take it from there.`,
    hashtags: ["firsttime", "skincareclinic", "medspa", "beautyclinic", "aestheticclinic"],
  },
  {
    id: "test-5",
    category: "testimonial",
    title: "Long-term client love",
    note: "Replace all [ ] brackets before posting.",
    body: `Some clients have been with us for [X]+ years.

Not because they need to be — because they want to be.

When skincare becomes self-care, it stops feeling like a chore.

We'd love to be part of your long-term routine.`,
    hashtags: ["loyalclients", "skincarejourney", "aestheticclinic", "skinhealth", "selfcare"],
  },

  // ─── Before / After ──────────────────────────────────────────────────────────
  {
    id: "ba-1",
    category: "before-after",
    title: "Sessions reveal",
    note: "Replace all [ ] brackets before posting.",
    body: `Swipe to see how [X] sessions of [Treatment] transformed [Client Name]'s skin →

Before: [before state — e.g. uneven texture, congestion, dullness].
After: [after state — e.g. smooth, even-toned, visibly clearer].

Disclaimer: Individual results may vary. Always consult a licensed practitioner.`,
    hashtags: ["beforeafter", "skincareresults", "skincaretransformation", "aestheticclinic", "realresults"],
  },
  {
    id: "ba-2",
    category: "before-after",
    title: "Concern-to-clear framework",
    note: "Replace all [ ] brackets before posting.",
    body: `[Concern] doesn't have to be permanent.

This is [X] weeks / months of [Treatment] + consistent homecare.

Protocol: [Step 1] + [Step 2] + [homecare habit e.g. SPF daily].

The skin you've been wanting is possible — it just needs the right plan.

Save this post if you're starting your [Concern] journey.`,
    hashtags: ["skincareresults", "skinjourney", "beforeafter", "aesthetictreatment", "clearskin"],
  },
  {
    id: "ba-3",
    category: "before-after",
    title: "Time-lapse progress",
    note: "Replace all [ ] brackets before posting.",
    body: `Week 1 vs Week [X] — same person, same lighting, zero filters.

[Client Name] started with [Concern]. We built a [X]-session protocol around it.

What changed: [Result 1], [Result 2], [Result 3].

DM us '[Keyword]' to learn more about this treatment.`,
    hashtags: ["skinprogress", "beforeafter", "skintransformation", "aestheticclinic", "skincareroutine"],
  },
  {
    id: "ba-4",
    category: "before-after",
    title: "Confidence restored",
    note: "Replace all [ ] brackets before posting.",
    body: `[Concern] made [Client Name] feel [emotion] — even when no one else noticed.

After [Treatment], [Result].

The change wasn't just physical. It was the way she carried herself afterwards.

Consult us to see if you're a candidate.`,
    hashtags: ["aesthetictreatment", "skincare", "beforeafter", "selfconfidence", "skintransformation"],
  },
  {
    id: "ba-5",
    category: "before-after",
    title: "Dull to glowing",
    note: "Replace all [ ] brackets before posting.",
    body: `From [before state] to [after state].

[X] sessions of [Treatment].

No filters. No edits. Just consistent treatment.

Book a skin consult to find your glow protocol.`,
    hashtags: ["glowingskin", "skingoals", "beforeafter", "aestheticclinic", "skincaretransformation"],
  },

  // ─── Promotional ─────────────────────────────────────────────────────────────
  {
    id: "promo-1",
    category: "promotional",
    title: "Limited-time offer",
    note: "Replace all [ ] brackets before posting. Works for any festive or seasonal campaign.",
    body: `[Festival / Season] Special — now live.

[X]% off on [Treatment / Service] booked before [Date].
Limited slots — first come, first served.

DM '[Keyword]' to grab yours.`,
    hashtags: ["skincarespecial", "limitedoffer", "aestheticclinic", "skintreatment"],
  },
  {
    id: "promo-2",
    category: "promotional",
    title: "First-visit special",
    note: "Replace all [ ] brackets before posting.",
    body: `New here? We've got you.

Book your first consultation this month and get a complimentary skin analysis worth ₹[X].

DM us '[Keyword]' to claim.`,
    hashtags: ["newclient", "freeconsultation", "skinanalysis", "aestheticclinic"],
  },
  {
    id: "promo-3",
    category: "promotional",
    title: "Refer a friend",
    note: "Replace all [ ] brackets before posting.",
    body: `Your glow is contagious — and now it's rewarding too.

Refer a friend and both of you get ₹[X] off your next session.

No limit on referrals. The more you share, the more you save.

DM us '[Keyword]' to get your code.`,
    hashtags: ["referafriend", "skincareoffer", "aestheticclinic", "skinrewards"],
  },
  {
    id: "promo-4",
    category: "promotional",
    title: "Birthday month offer",
    note: "Replace all [ ] brackets before posting.",
    body: `It's your month — treat yourself.

Book any treatment in your birthday month and get [X]% off, on us.

Because glowing skin is the best gift.

DM us your birthday month to claim.`,
    hashtags: ["birthdayoffer", "treatyourself", "skincaregift", "aestheticclinic"],
  },
  {
    id: "promo-5",
    category: "promotional",
    title: "Bundle deal",
    note: "Replace all [ ] brackets before posting.",
    body: `Why do one treatment when three work better together?

Our [Bundle Name]:
• [Treatment 1] × [X] sessions
• [Treatment 2] × [X] sessions
• [Homecare / Add-on]

All for ₹[X] — saving you ₹[Y].

Only [Z] bundles available this month. DM '[Keyword]' to grab yours.`,
    hashtags: ["skincarebundle", "skintreatment", "aestheticclinic", "limitedoffer", "skingoals"],
  },

  // ─── Educational ─────────────────────────────────────────────────────────────
  {
    id: "edu-1",
    category: "educational",
    title: "Myth vs Truth framework",
    note: "Swap in any myth relevant to your clinic's most common treatments.",
    body: `Myth: [Common misconception about a treatment or skin concern].
Truth: [The real fact — keep it simple and reassuring].

[One sentence on how you approach it at your clinic.]

Save this post and share with someone who needs to hear this.`,
    hashtags: ["skinfacts", "skinmyths", "aestheticmedicine", "skincareeducation", "askthedoctor"],
  },
  {
    id: "edu-2",
    category: "educational",
    title: "Problem → Cause → Solution",
    note: "Works for any recurring skin concern your clients keep asking about.",
    body: `If [Problem] keeps coming back, [surface-level fix] is probably not enough.

It's usually caused by:
• [Cause 1]
• [Cause 2]
• [Cause 3]

The right starting point: a proper diagnosis, not just a quick fix.

Save this post and share with someone in the same cycle.`,
    hashtags: ["skineducation", "skinhealth", "aestheticclinic", "skincaretips", "knowyourskin"],
  },
  {
    id: "edu-3",
    category: "educational",
    title: "3 signs your skin needs attention",
    note: "Customise the 3 signs to match the concern your audience most relates to.",
    body: `3 signs your skin is telling you something:

1. [Sign 1 — e.g. feels tight after washing]
2. [Sign 2 — e.g. stings when you apply moisturiser]
3. [Sign 3 — e.g. gets red or irritated easily]

If any of these sound familiar, your skin needs more than just a new product.

Save this post — and if you want a proper plan, book a consult.`,
    hashtags: ["skintips", "skincareeducation", "skinhealth", "aestheticclinic", "dermatology"],
  },
  {
    id: "edu-4",
    category: "educational",
    title: "What [Treatment] actually does",
    note: "Replace [Treatment] with the service you want to explain. Works for any treatment.",
    body: `[Treatment] is not just [what people assume it is].

In one session it:
1. [Step / benefit 1]
2. [Step / benefit 2]
3. [Step / benefit 3]
4. [Step / benefit 4]

[Downtime / recovery note]. [Visible result timeline].

Save this post if you've been curious about trying it.`,
    hashtags: ["skineducation", "aesthetictreatment", "skincare", "aestheticclinic", "skincarefacts"],
  },
  {
    id: "edu-5",
    category: "educational",
    title: "Why consistency matters",
    note: "A universal post that works any time — no treatment name needed.",
    body: `The biggest skincare mistake? Expecting results without consistency.

[Treatment / Routine step] works — but only if you show up for it.

Here's why:
• [Reason 1 — biological / skin cycle fact]
• [Reason 2 — cumulative effect]
• [Reason 3 — homecare role]

Your skin is a long game. We're here to help you win it.`,
    hashtags: ["skincareroutine", "consistencyiskey", "skineducation", "aestheticclinic", "skingoals"],
  },

  // ─── Engagement ──────────────────────────────────────────────────────────────
  {
    id: "eng-1",
    category: "engagement",
    title: "Comment poll",
    body: `Quick poll for our community — drop your answer below:

What's the ONE skin concern you wish you could fix overnight?
A. Acne
B. Pigmentation
C. Dullness
D. Fine lines

We'll use your answers to plan our next live Q&A.`,
    hashtags: ["skincarecommunity", "skinconcerns", "askthedoctor", "aestheticclinic"],
  },
  {
    id: "eng-2",
    category: "engagement",
    title: "Behind the scenes",
    body: `A quiet morning at the clinic — sterilising rooms, prepping serums, brewing the third coffee.

Behind every transformation is a team that genuinely loves what we do.

Tag the friend who'd love to come visit us next.`,
    hashtags: ["behindthescenes", "clinicdiaries", "medspateam", "aestheticclinic"],
  },
  {
    id: "eng-3",
    category: "engagement",
    title: "This or that",
    body: `This or that? Tell us in the comments:

Morning skincare OR Night skincare?
SPF stick OR SPF serum?
In-clinic treatment OR At-home routine?

We'll use your answers to create content that actually helps you.`,
    hashtags: ["skincarecommunity", "thisorthat", "skincarelovers", "aestheticclinic"],
  },
  {
    id: "eng-4",
    category: "engagement",
    title: "Myth or fact",
    body: `Myth or Fact? Let us know what you think:

"Drinking water alone clears your skin."

Drop your answer — Myth or Fact — in the comments. We'll reveal the answer in our stories tonight.`,
    hashtags: ["skinfacts", "skinmyths", "skincareeducation", "askthedoctor"],
  },
  {
    id: "eng-5",
    category: "engagement",
    title: "What brought you here",
    body: `If you've been following us for a while — what originally made you hit follow?

A. Before/after results
B. Educational posts
C. A friend recommended us
D. You stumbled across a Reel

Tell us below — we're genuinely curious, and it helps us make more of what you love.`,
    hashtags: ["communityquestion", "skincarecommunity", "aestheticclinic", "followback"],
  },
]
