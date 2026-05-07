export type CalendarDay = {
  day: number
  type: "Reel" | "Carousel" | "Story" | "Post"
  title: string
  hook: string
  details: string
  templateSlug?: string
  cta: string
}

export const calendar: CalendarDay[] = [
  {
    day: 1,
    type: "Carousel",
    title: "Welcome / clinic introduction",
    hook: "Meet the team behind your skin's glow.",
    details:
      "Open with a 5-slide intro of your clinic — the founder, the doctor, the senior aesthetician, the receptionist, and a final 'come visit us' card. Use warm pastel tones.",
    templateSlug: "edu-treatment-explainer",
    cta: "DM us 'HI' to say hello!",
  },
  {
    day: 2,
    type: "Story",
    title: "Quick poll: skin concern",
    hook: "What's bothering your skin this week?",
    details:
      "Use the IG poll sticker with options: Acne / Pigmentation / Dullness / Dryness. This boosts engagement and gives you content ideas for the next 7 days.",
    cta: "Save the poll insights for next week's content.",
  },
  {
    day: 3,
    type: "Reel",
    title: "30-second treatment explainer",
    hook: "What is HydraFacial actually?",
    details:
      "Film a vertical reel of the HydraFacial process (no faces visible) and overlay 3 quick text bullets. Pair with a trending audio.",
    templateSlug: "edu-treatment-explainer",
    cta: "Tap the link in bio to book a HydraFacial.",
  },
  {
    day: 4,
    type: "Post",
    title: "Quote of the week",
    hook: "Confidence is the best filter.",
    details:
      "Use the Quote — Confidence Series template. Soft beige background, one-line quote, your clinic logo bottom-right.",
    templateSlug: "quote-confidence",
    cta: "Tag a friend who needs to hear this today.",
  },
  {
    day: 5,
    type: "Carousel",
    title: "Before / After — first reveal",
    hook: "8 weeks of pigmentation work.",
    details:
      "Use the Before/After template. Always disclose 'Individual results may vary'. Pair with the matching caption from Captions.",
    templateSlug: "before-after-skin",
    cta: "Comment 'PIGMENT' for our pigmentation guide.",
  },
  {
    day: 6,
    type: "Story",
    title: "Behind the scenes",
    hook: "A morning at the clinic.",
    details:
      "Film 3-4 short clips: sterilising rooms, opening the door, the front desk smile, the first consultation of the day. Keep it warm and human.",
    cta: "Use the 'mention' sticker so the team can re-share.",
  },
  {
    day: 7,
    type: "Post",
    title: "Patient testimonial — Glow",
    hook: "Real client. Real result.",
    details:
      "Use the Patient Testimonial — Glow template. Replace with a real review (with consent), make sure the photo is well-lit.",
    templateSlug: "patient-testimonial-glow",
    cta: "DM 'BOOK' to start your own glow journey.",
  },
  {
    day: 8,
    type: "Reel",
    title: "Skincare myth #1",
    hook: "Botox does NOT freeze your face.",
    details:
      "Quick 15-second reel of you (or the doctor) busting one common myth. Use big text overlays.",
    cta: "Save this and share with someone considering Botox.",
  },
  {
    day: 9,
    type: "Story",
    title: "Q&A sticker",
    hook: "Ask me anything.",
    details:
      "Open the Q&A sticker with 'Drop your skincare questions, the doctor will answer 5 today'. Save the best ones for tomorrow's reel.",
    cta: "Repost the best Qs with answers in stories.",
  },
  {
    day: 10,
    type: "Carousel",
    title: "Top 5 questions answered",
    hook: "Answers from yesterday.",
    details:
      "Use the Educational template. Take the 5 best questions from yesterday's Q&A and answer each in 1 slide.",
    templateSlug: "edu-treatment-explainer",
    cta: "Save this guide for later.",
  },
  {
    day: 11,
    type: "Post",
    title: "Quote — self care",
    hook: "Self care is a discipline, not a luxury.",
    details: "Use the Quote — Confidence Series template. Pair with a soft sage-green background.",
    templateSlug: "quote-confidence",
    cta: "Tag yourself if you needed this reminder.",
  },
  {
    day: 12,
    type: "Reel",
    title: "Trending audio + transformation",
    hook: "Use a trending IG audio.",
    details:
      "Pick this week's top trending audio (under 30s). Match it with a quick before/after transformation cut. The trending audio dramatically improves reach.",
    cta: "Comment 🌸 if you want to know what we used.",
  },
  {
    day: 13,
    type: "Carousel",
    title: "Festive promo announcement",
    hook: "20% off this week only.",
    details:
      "Use the Promotional — Festive Offer template. Set a real expiry. Only run this once a week — overusing destroys urgency.",
    templateSlug: "promo-festive-offer",
    cta: "DM 'GLOW' to claim your slot.",
  },
  {
    day: 14,
    type: "Story",
    title: "Promo countdown",
    hook: "Reminder: offer ends in 24h.",
    details: "Use the IG countdown sticker pointing to the offer end time.",
    cta: "Drive last-minute conversions.",
  },
  {
    day: 15,
    type: "Post",
    title: "Patient testimonial — Comfort",
    hook: "First-time client share.",
    details: "Use the Patient Testimonial template. Focus on the COMFORT angle, not just the result.",
    templateSlug: "patient-testimonial-glow",
    cta: "DM us your nervous question — we'll answer privately.",
  },
  {
    day: 16,
    type: "Reel",
    title: "Day in the life of an aesthetician",
    hook: "What we actually do all day.",
    details: "Film 5 quick cuts: morning briefing, prepping serums, a back-of-head consult, lunch break, end of day reset.",
    cta: "Tag your favourite aesthetician.",
  },
  {
    day: 17,
    type: "Carousel",
    title: "Educational — SPF deep dive",
    hook: "Why SPF is the only skincare you can't skip.",
    details:
      "Use the Educational template. 5 slides: 1) why SPF, 2) UVA vs UVB, 3) how much to use, 4) reapplication, 5) our top 3 recos.",
    templateSlug: "edu-treatment-explainer",
    cta: "Save this guide for later.",
  },
  {
    day: 18,
    type: "Story",
    title: "Poll: skincare myth",
    hook: "Myth or fact? Drinking water clears acne.",
    details: "Use the IG poll sticker. Reveal the answer in your next reel.",
    cta: "Build curiosity for tomorrow's reel.",
  },
  {
    day: 19,
    type: "Reel",
    title: "Myth-busting reel",
    hook: "We answered yesterday's poll.",
    details: "Reveal the answer with a fun cut. Keep it under 20 seconds.",
    cta: "Comment your next myth, we'll bust it next week.",
  },
  {
    day: 20,
    type: "Post",
    title: "Before / After — fresh",
    hook: "Acne journey, 12 weeks.",
    details: "Use the Before/After template with a warm caption focused on the patient's emotional journey.",
    templateSlug: "before-after-skin",
    cta: "Comment 'ACNE' for our acne guide.",
  },
  {
    day: 21,
    type: "Carousel",
    title: "Three things we never recommend",
    hook: "Things we'll never do at our clinic.",
    details:
      "Bold, controversial, opinion-led. Builds trust and differentiates you. Examples: 'we never push fillers on under-25s', 'we never sell you 10 sessions you don't need'.",
    templateSlug: "edu-treatment-explainer",
    cta: "Comment 💯 if you agree.",
  },
  {
    day: 22,
    type: "Story",
    title: "Behind-the-scenes prep",
    hook: "Prepping rooms for the day.",
    details: "Quick clip + warm caption. Humanises the brand.",
    cta: "Show up authentically — no need to over-edit.",
  },
  {
    day: 23,
    type: "Reel",
    title: "Trending sound + transition",
    hook: "Trending audio + a 'glow up' transition.",
    details: "Look for a sound trending TODAY (use IG's trending tab). Match with a 'come with me to my facial' style edit.",
    cta: "Tag a friend you'd take with you.",
  },
  {
    day: 24,
    type: "Post",
    title: "Quote — Tuesday motivation",
    hook: "Glowing skin is just the side effect.",
    details: "Use the Quote — Confidence Series template. One line, beautiful typography, your handle.",
    templateSlug: "quote-confidence",
    cta: "Tag a friend who needs the reminder.",
  },
  {
    day: 25,
    type: "Carousel",
    title: "Patient testimonial — Carousel",
    hook: "5 slides of a real story.",
    details:
      "Slide 1: hook ('Riya was scared of her wedding day…'), slides 2-4: the journey, slide 5: result + DM CTA.",
    templateSlug: "patient-testimonial-glow",
    cta: "DM 'WEDDING' for our bridal package.",
  },
  {
    day: 26,
    type: "Story",
    title: "Q&A sticker round 2",
    hook: "Ask the doctor anything.",
    details: "Same as day 9 — gather questions for the next Q&A reel.",
    cta: "Save best Qs for tomorrow.",
  },
  {
    day: 27,
    type: "Reel",
    title: "Doctor answers Q&A",
    hook: "Top 3 questions, answered.",
    details:
      "Vertical clip of the doctor answering 3 Qs from yesterday's stories. Add captions on screen.",
    cta: "Drop more Qs in the comments.",
  },
  {
    day: 28,
    type: "Post",
    title: "Educational — pigmentation guide",
    hook: "How to actually fade dark spots.",
    details:
      "Use the Educational template. Real protocol: in-clinic + homecare + SPF. Avoid product spam.",
    templateSlug: "edu-treatment-explainer",
    cta: "Save & share with a friend with pigmentation concerns.",
  },
  {
    day: 29,
    type: "Story",
    title: "Recap of the month",
    hook: "Your wins, our wins.",
    details:
      "5-slide story collage of best moments this month — patient smiles (with consent), team moments, behind-the-scenes.",
    cta: "Thank you to everyone who walked into our clinic this month.",
  },
  {
    day: 30,
    type: "Reel",
    title: "Month-end thank you reel",
    hook: "30 days. 100s of smiles.",
    details:
      "Quick 30-second montage of clinic moments. Slow trending audio. End with a CTA to book next month.",
    cta: "DM us to book your slot for next month.",
  },
]
