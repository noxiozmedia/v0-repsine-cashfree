export type CaptionBlock = {
  id: string
  category: "testimonial" | "before-after" | "promotional" | "educational" | "engagement"
  title: string
  body: string
  hashtags: string[]
}

export const captionCategories = [
  { key: "testimonial" as const, label: "Testimonials" },
  { key: "before-after" as const, label: "Before / After" },
  { key: "promotional" as const, label: "Promotional" },
  { key: "educational" as const, label: "Educational" },
  { key: "engagement" as const, label: "Engagement" },
]

export const captions: CaptionBlock[] = [
  {
    id: "test-1",
    category: "testimonial",
    title: "Real client, real result",
    body: `Confidence has a glow — and Aanya found hers with us 💫

She came in for a HydraFacial routine before her wedding and shared that her skin has never felt this calm and bright.

We don't just treat skin, we celebrate every story behind it. ✨

DM us to book your consultation.`,
    hashtags: ["aestheticclinic", "hydrafacial", "skincare", "medspa", "glowup", "skintransformation"],
  },
  {
    id: "test-2",
    category: "testimonial",
    title: "Comfort-first",
    body: `"I was nervous about my first Botox session — but the team made me feel safe the entire time."

That's the standard we hold ourselves to.

Tap the link in our bio to book a no-pressure consult.`,
    hashtags: ["botox", "aestheticmedicine", "skintreatment", "confidenceboost"],
  },
  {
    id: "test-3",
    category: "testimonial",
    title: "5-star skin",
    body: `Priya walked in with 3 years of pigmentation she'd stopped believing could fade.

4 sessions later — she cried happy tears in our consultation room.

Those moments are why we do this.

DM us to start your skin story.`,
    hashtags: ["skintransformation", "pigmentation", "aestheticclinic", "realresults", "selfconfidence"],
  },
  {
    id: "test-4",
    category: "testimonial",
    title: "First-timer review",
    body: `"I kept postponing because I was scared. My friend dragged me in. Best decision of my life."

First-timers are always the most rewarding to work with — the fear, then the smile, then the glow.

Book a no-pressure intro consult. We'll take it from there.`,
    hashtags: ["firsttime", "skincareclinic", "acnetreatment", "medspa", "beautyclinic"],
  },
  {
    id: "test-5",
    category: "testimonial",
    title: "Long-time client",
    body: `Some clients have been with us for 3+ years.

Not because they need to be — because they want to be.

When skincare becomes self-care, it stops feeling like a chore.

We'd love to be part of your long-term routine.`,
    hashtags: ["loyalclients", "skincarejourney", "aestheticclinic", "skinhealth", "selfcare"],
  },
  {
    id: "ba-1",
    category: "before-after",
    title: "Skin reveal",
    body: `Swipe to see how 6 sessions of HydraFacial transformed Riya's skin →

Before: dehydrated, uneven texture, congested t-zone.
After: soft, hydrated, visibly even-toned skin.

Disclaimer: Individual results may vary. Always consult a licensed practitioner.`,
    hashtags: ["beforeafter", "hydrafacial", "skincaretransformation", "medspa"],
  },
  {
    id: "ba-2",
    category: "before-after",
    title: "Pigmentation reset",
    body: `Pigmentation didn't disappear overnight — but in 8 weeks, it visibly faded.

Our protocol: 4 chemical peels + a custom homecare kit + SPF every single day.

Save this post if you're starting your pigmentation journey.`,
    hashtags: ["pigmentation", "chemicalpeel", "skinjourney", "skincareresults"],
  },
  {
    id: "ba-3",
    category: "before-after",
    title: "Acne scar fade",
    body: `Those deep acne scars? They don't have to be permanent.

This is [X] months of laser resurfacing + consistent homecare.

The skin you've been wanting is possible — it just needs the right plan.

DM us 'SCARS' to learn more.`,
    hashtags: ["acnescars", "lasertreatment", "skinresurfacing", "beforeafter", "clearskin"],
  },
  {
    id: "ba-4",
    category: "before-after",
    title: "Dark circles transformation",
    body: `Under-eye hollows make you look tired even when you're not.

A single session of under-eye filler gave [name] her confidence back — and she's been sleeping the same 6 hours she always did.

Results last 9-12 months. Consult us to see if you're a candidate.`,
    hashtags: ["undereye", "fillers", "aesthetictreatment", "skincare", "beforeafter"],
  },
  {
    id: "ba-5",
    category: "before-after",
    title: "Dull to dewy",
    body: `From dull, tired skin to a dewy, lit-from-within glow.

3 sessions of Vitamin C infusion + LED therapy.

No filters. No edits. Just consistent treatment.

Book a skin consult to find your glow protocol.`,
    hashtags: ["glowingskin", "vitaminc", "ledtherapy", "skingoals", "dewyskin"],
  },
  {
    id: "promo-1",
    category: "promotional",
    title: "Festive offer",
    body: `🎉 Diwali Glow Edit 🎉

20% off on every HydraFacial booked before Oct 28.
Limited slots — first come, first served.

DM 'GLOW' to grab yours.`,
    hashtags: ["diwalioffer", "festiveskincare", "hydrafacial", "limitedoffer"],
  },
  {
    id: "promo-2",
    category: "promotional",
    title: "First-visit special",
    body: `New here? We've got you.

Book your first consultation this month and get a complimentary skin analysis worth ₹1,500.

DM us 'NEW' to claim.`,
    hashtags: ["newclient", "freeconsultation", "skinanalysis", "aestheticclinic"],
  },
  {
    id: "promo-3",
    category: "promotional",
    title: "Refer a friend",
    body: `Your glow is contagious — and now it's rewarding too.

Refer a friend and both of you get ₹500 off your next session.

No limit on referrals. The more you share, the more you save.

DM us 'REFER' to get your code.`,
    hashtags: ["referafriend", "skincareoffer", "aestheticclinic", "skinrewards"],
  },
  {
    id: "promo-4",
    category: "promotional",
    title: "Birthday month offer",
    body: `It's your month — treat yourself.

Book any treatment in your birthday month and get 15% off, on us.

Because glowing skin is the best gift.

DM us your birthday month to claim.`,
    hashtags: ["birthdayoffer", "treatyourself", "skincaregift", "aestheticclinic"],
  },
  {
    id: "promo-5",
    category: "promotional",
    title: "Bundle deal",
    body: `Why do one treatment when three work better together?

Our Clear Skin Bundle:
• 4x HydraFacial
• 2x Chemical Peel
• Custom homecare kit

All for ₹[X] — saving you ₹[Y].

Only [Z] bundles available this month. DM 'BUNDLE' to grab yours.`,
    hashtags: ["skincarebundle", "hydrafacial", "chemicalpeel", "skintreatment", "limitedoffer"],
  },
  {
    id: "edu-1",
    category: "educational",
    title: "Botox myth-busting",
    body: `Myth: Botox freezes your face.
Truth: Done well, you still look like you — just rested.

We use micro-dosing protocols to keep expressions natural.

Save this post & share with someone who's been on the fence about Botox.`,
    hashtags: ["botoxfacts", "aestheticmedicine", "antiaging", "skinhealth"],
  },
  {
    id: "edu-2",
    category: "educational",
    title: "Why SPF every day",
    body: `Even on cloudy days. Even indoors.

UV-A passes through windows and is the #1 cause of premature ageing.

A broad-spectrum SPF 50 every morning is the cheapest, most effective skincare investment you'll ever make.`,
    hashtags: ["spfeveryday", "skincare101", "antiaging", "dermatology"],
  },
  {
    id: "edu-3",
    category: "educational",
    title: "Why acne keeps coming back",
    body: `If your acne keeps coming back, topical creams are probably not enough.

Recurring acne is usually caused by:
• Hormonal fluctuations
• Gut inflammation
• Clogged follicles that need professional extractions
• Wrong skincare products worsening the barrier

A proper diagnosis — not just a prescription — is the starting point.

Save this post and share with someone in the same cycle.`,
    hashtags: ["acnetreatment", "acneskincare", "skinhealth", "hormoneacne", "clearskin"],
  },
  {
    id: "edu-4",
    category: "educational",
    title: "What HydraFacial actually does",
    body: `HydraFacial is not just a facial.

In one session it:
1. Deep-cleanses and opens pores
2. Exfoliates dead skin cells
3. Extracts blackheads and congestion
4. Infuses your skin with actives (hyaluronic acid, peptides, antioxidants)

Zero downtime. Visible glow within 24 hours.

Save this post if you've been curious about trying it.`,
    hashtags: ["hydrafacial", "skineducation", "aesthetictreatment", "facialtreatment", "skincare"],
  },
  {
    id: "edu-5",
    category: "educational",
    title: "3 signs your skin barrier is damaged",
    body: `Your skin feels tight after washing? Stings when you apply moisturiser? Gets red easily?

These are signs of a damaged skin barrier — and no serum will fix it until you address it.

How we repair it:
• Strip back your routine to basics (cleanser + SPF)
• Introduce ceramide-rich moisturiser
• Book a barrier repair facial

Heal the barrier first. Everything else follows.`,
    hashtags: ["skinbarrier", "sensitiveskin", "skintips", "dermatology", "skincareroutine"],
  },
  {
    id: "eng-1",
    category: "engagement",
    title: "Comment poll",
    body: `Quick poll for our community 👇

What's the ONE skin concern you wish you could fix overnight?
A. Acne
B. Pigmentation
C. Dullness
D. Fine lines

Drop your answer below — we'll use it to plan our next live Q&A.`,
    hashtags: ["skincarecommunity", "skinconcerns", "askthedoctor"],
  },
  {
    id: "eng-2",
    category: "engagement",
    title: "Behind the scenes",
    body: `A quiet morning at the clinic — sterilising rooms, prepping serums, brewing the third coffee.

Behind every transformation is a team that genuinely loves what we do.

Tag the friend who'd love to come visit us next.`,
    hashtags: ["behindthescenes", "clinicdiaries", "medspateam"],
  },
  {
    id: "eng-3",
    category: "engagement",
    title: "This or that",
    body: `This or that? Tell us in the comments 👇

Hydrafacial OR Chemical Peel?
Morning skincare OR Night skincare?
SPF stick OR SPF serum?

We'll use your answers to create content that actually helps you. Drop your picks below.`,
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
