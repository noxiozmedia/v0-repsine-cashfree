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
]
