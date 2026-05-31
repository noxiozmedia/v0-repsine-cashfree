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
    type: "Post",
    title: "Problem/Pain Post",
    hook: "Open with a common concern your audience feels.",
    details:
      "Use the Problem/Pain template. Start with a pain point your audience relates to — acne coming back, dark spots not fading, or products not working anymore. Make the first line impossible to scroll past.",
    templateSlug: "problem-pain",
    cta: "DM us if this sounds familiar — we can help.",
  },
  {
    day: 2,
    type: "Story",
    title: "Poll Story",
    hook: "What's your biggest skin concern right now?",
    details:
      "Use an Instagram poll sticker. Options: Acne / Pigmentation / Dullness / Dryness. Save the results — they tell you what to post next week.",
    cta: "Save poll results to plan next week's content.",
  },
  {
    day: 3,
    type: "Carousel",
    title: "FAQ Carousel",
    hook: "Your top skin questions, answered.",
    details:
      "Use the FAQ template. Answer one common question like 'How many sessions will I need?' or 'Is this treatment safe for Indian skin?' Keep answers short and direct.",
    cta: "Save this for when you're ready to book.",
  },
  {
    day: 4,
    type: "Carousel",
    title: "Before/After Carousel",
    hook: "Real result. Real client.",
    details:
      "Use the Before/After template. Show a genuine result with a short caption and a clear disclaimer: 'Individual results may vary.' Focus the caption on the patient's journey, not just the visual.",
    templateSlug: "before-after",
    cta: "Comment 'RESULT' for the full treatment breakdown.",
  },
  {
    day: 5,
    type: "Post",
    title: "Testimonial Post",
    hook: "Real words from a real client.",
    details:
      "Use the Testimonial Post template. Focus on comfort, confidence, or trust — not just the result. A client feeling safe and cared for is more powerful than any before/after.",
    templateSlug: "testimonial",
    cta: "DM 'BOOK' to start your own journey.",
  },
  {
    day: 6,
    type: "Story",
    title: "Question Sticker Story",
    hook: "Drop your skin questions below.",
    details:
      "Use an Instagram Q&A sticker. Prompt: 'Drop your skin questions below — we'll answer a few tomorrow.' Save the best questions to answer in your next carousel or reel.",
    cta: "Collect Qs for tomorrow's content.",
  },
  {
    day: 7,
    type: "Story",
    title: "Soft CTA Story",
    hook: "Ready to get started?",
    details:
      "Use a simple story post. Message: 'If you're ready to get started, DM us CONSULT and we'll guide you.' Keep it warm, not pushy.",
    cta: "DM 'CONSULT' to get started.",
  },
  {
    day: 8,
    type: "Post",
    title: "Problem/Pain Post",
    hook: "Stubborn marks. Recurring breakouts. Sound familiar?",
    details:
      "Use the Problem/Pain template again with a different angle — stubborn acne marks, recurring pigmentation, or rough texture. Each pain point speaks to a different segment of your audience.",
    templateSlug: "problem-pain",
    cta: "Tell us your concern in the comments.",
  },
  {
    day: 9,
    type: "Story",
    title: "Poll Story",
    hook: "What do you struggle with more?",
    details:
      "Ask a simple either/or question using the IG poll sticker. Example: 'What do you struggle with more?' — Acne / Marks. Simple polls get high engagement and take under 2 minutes to make.",
    cta: "Use the answer to guide your next post.",
  },
  {
    day: 10,
    type: "Carousel",
    title: "FAQ Carousel",
    hook: "Your next most-asked question, answered.",
    details:
      "Use the FAQ template again with a different question: 'Is this treatment painful?' or 'Is it suitable for Indian skin tones?' Answering objections through FAQs builds trust before the consultation.",
    cta: "Save this post — share it with someone who asked you the same thing.",
  },
  {
    day: 11,
    type: "Carousel",
    title: "Before/After Carousel",
    hook: "A different story. A different result.",
    details:
      "Use the Before/After template with a different transformation story. Vary the concern — if Day 4 was pigmentation, make this one acne or texture. Each new story speaks to a new person.",
    templateSlug: "before-after",
    cta: "DM us to find out which treatment is right for you.",
  },
  {
    day: 12,
    type: "Post",
    title: "Testimonial Post",
    hook: "First visit. Last hesitation.",
    details:
      "Use the Testimonial Post template. This can be a first-time client story — someone who was nervous, then amazed. Or a long-term client who has seen consistent results over months.",
    templateSlug: "testimonial",
    cta: "DM 'FIRST' if you've been thinking about coming in.",
  },
  {
    day: 13,
    type: "Story",
    title: "Question Sticker Story",
    hook: "What do you want us to cover next?",
    details:
      "Use the Q&A sticker. Ask: 'Want us to cover a treatment, concern, or aftercare question?' This keeps content ideas coming directly from your audience.",
    cta: "Save the best Qs for your next FAQ or reel.",
  },
  {
    day: 14,
    type: "Story",
    title: "Promotion Story",
    hook: "This week's slots are open.",
    details:
      "Use a soft promotional story. Keep it natural: 'This week's consultation slots are open. Book yours before they fill up.' Avoid heavy discounting — scarcity works better.",
    cta: "DM 'SLOT' to grab a consultation this week.",
  },
  {
    day: 15,
    type: "Post",
    title: "Problem/Pain Post",
    hook: "Products tried. Confidence lost. Sound familiar?",
    details:
      "Use the Problem/Pain template. This time shift to the emotional angle — losing confidence, feeling frustrated after trying everything, or giving up on skincare. Emotional copy converts.",
    templateSlug: "problem-pain",
    cta: "You haven't found the right solution yet. DM us.",
  },
  {
    day: 16,
    type: "Story",
    title: "Poll Story",
    hook: "Have you ever tried a clinic treatment before?",
    details:
      "Use a quick story poll. Options: Yes / No. This tells you how much of your audience is warm vs cold. Use it to calibrate how educational vs conversion-focused your next post should be.",
    cta: "Use the data to shape next week's content.",
  },
  {
    day: 17,
    type: "Carousel",
    title: "FAQ Carousel",
    hook: "Everything you wanted to know about aftercare.",
    details:
      "Use the FAQ template. Focus on aftercare, downtime, or number of sessions. These are the questions that stop people from booking — answering them proactively removes the barrier.",
    cta: "Save this — share it after your next consultation.",
  },
  {
    day: 18,
    type: "Carousel",
    title: "Before/After Carousel",
    hook: "Strong visual. Simple caption.",
    details:
      "Use the Before/After template. This one should have your strongest visual result. Keep the caption simple — let the image do the work. One sentence of context, one CTA.",
    templateSlug: "before-after",
    cta: "Comment your concern below — we'll tag the right treatment.",
  },
  {
    day: 19,
    type: "Post",
    title: "Testimonial Post",
    hook: "She almost didn't book. Then she did.",
    details:
      "Use the Testimonial Post template. Highlight trust, comfort, or the client's experience at the clinic — not the treatment itself. People buy from people they trust.",
    templateSlug: "testimonial",
    cta: "DM us if you're on the fence — we'll answer every question.",
  },
  {
    day: 20,
    type: "Story",
    title: "Question Sticker Story",
    hook: "Ask us anything about your skin concern.",
    details:
      "Use the Q&A sticker again. Prompt: 'Ask us anything about your skin concern.' This is your third Q&A this month — by now, your audience knows to use it.",
    cta: "Collect and answer the top 3 in tomorrow's story.",
  },
  {
    day: 21,
    type: "Story",
    title: "Soft CTA Story",
    hook: "Not sure which treatment is right for you?",
    details:
      "Message: 'Need help choosing the right treatment? DM us and we'll suggest the next step.' Position your team as guides, not salespeople.",
    cta: "DM us — no commitment, just clarity.",
  },
  {
    day: 22,
    type: "Post",
    title: "Problem/Pain Post",
    hook: "You've tried everything. Nothing's worked. Here's why.",
    details:
      "Use the Problem/Pain template. This angle addresses the 'tried everything' frustration — surface-level products can't fix root causes. Lead into why a professional treatment changes the result.",
    templateSlug: "problem-pain",
    cta: "DM 'WHY' and we'll explain what's actually happening with your skin.",
  },
  {
    day: 23,
    type: "Story",
    title: "Poll Story",
    hook: "What do you want to improve first?",
    details:
      "Ask a 4-option poll using the quiz sticker. Options: Acne / Glow / Pigmentation / Texture. Four options get more considered responses than two.",
    cta: "Use results to plan the last week of content.",
  },
  {
    day: 24,
    type: "Carousel",
    title: "FAQ Carousel",
    hook: "The question we get asked the most about booking.",
    details:
      "Use the FAQ template. Answer the most common booking question from your specific clinic — whether it's about pricing, how to prepare, what to expect, or whether consultations are free.",
    cta: "Still have questions? DM us directly.",
  },
  {
    day: 25,
    type: "Carousel",
    title: "Before/After Carousel",
    hook: "Another story. Another result.",
    details:
      "Use the Before/After template with a fresh transformation. If you've shown acne and pigmentation this month, this one could be texture, dullness, or under-eye concerns.",
    templateSlug: "before-after",
    cta: "DM 'RESULT' for a free 15-minute skin consult.",
  },
  {
    day: 26,
    type: "Post",
    title: "Testimonial Post",
    hook: "Short review. Big impact.",
    details:
      "Use the Testimonial Post template. This one can be short and emotional — a one-liner review paired with a strong photo. Sometimes the shortest testimonial is the most powerful.",
    templateSlug: "testimonial",
    cta: "DM 'BOOK' to become our next success story.",
  },
  {
    day: 27,
    type: "Story",
    title: "Question Sticker Story",
    hook: "What do you want us to explain next?",
    details:
      "Use the Q&A sticker. Ask: 'What do you want us to explain next?' This feeds your content calendar for the following month.",
    cta: "Save the responses — they become next month's posts.",
  },
  {
    day: 28,
    type: "Story",
    title: "Promotion Story",
    hook: "One last reminder before the month ends.",
    details:
      "Use a simple offer reminder or consultation reminder. Keep it natural and not too salesy — something like 'Last few slots left this month. Book to lock in your spot.'",
    cta: "DM 'LAST' to grab one of the remaining slots.",
  },
  {
    day: 29,
    type: "Story",
    title: "Recap Story",
    hook: "A month of results, moments, and milestones.",
    details:
      "Post a simple monthly recap using 3–5 photos or screenshots. Show results (with consent), clinic moments, team, reviews, or treatment shots. Keep it warm and grateful.",
    cta: "Thank you for being part of this month.",
  },
  {
    day: 30,
    type: "Story",
    title: "Soft Month-End CTA",
    hook: "New month. New skin goals.",
    details:
      "Close the month with a booking push. Message: 'New month, new skin goals. Book your consult to get started.' Simple, warm, and direct. No heavy sell needed — the whole month's content has done the work.",
    cta: "DM 'NEW MONTH' to book your consultation.",
  },
]
