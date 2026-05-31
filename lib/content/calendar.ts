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
      "Start with a pain point your audience relates to — acne coming back, dark spots not fading, or products not working anymore. Make the first line impossible to scroll past.",
    templateSlug: "problem-pain",
    cta: "DM us if this sounds familiar — we can help.",
  },
  {
    day: 2,
    type: "Story",
    title: "Poll Story",
    hook: "Ask a quick question to start engagement.",
    details:
      "Use an Instagram poll to ask what skin concern is bothering them most right now. Keep it simple and easy to tap.",
    cta: "Vote in the poll and tell us what you struggle with most.",
  },
  {
    day: 3,
    type: "Post",
    title: "FAQ Carousel",
    hook: "Answer one common question clearly.",
    details:
      "Pick one question clients ask often — like how many sessions are needed, whether the treatment is painful, or if it suits Indian skin tones. Keep the answer short and useful.",
    templateSlug: "faq",
    cta: "Save this post if you found it helpful.",
  },
  {
    day: 4,
    type: "Post",
    title: "Before/After Carousel",
    hook: "Show a real transformation story.",
    details:
      "Use a strong before/after result with a short explanation of what changed. Keep the visual clean and make sure the result feels believable.",
    templateSlug: "before-after",
    cta: "DM us to know what treatment could work for you.",
  },
  {
    day: 5,
    type: "Post",
    title: "Testimonial Post",
    hook: "Build trust with a client story.",
    details:
      "Share a real client review that focuses on comfort, confidence, or results. Make it feel human and genuine, not over-polished.",
    templateSlug: "testimonial",
    cta: "Book your consultation and start your skin journey.",
  },
  {
    day: 6,
    type: "Story",
    title: "Before/After Story",
    hook: "Share a quick result in story format.",
    details:
      "Use the story version of the before/after template to give a fast transformation highlight. Keep it short and visual.",
    templateSlug: "before-after",
    cta: "Swipe through and DM us if you want similar results.",
  },
  {
    day: 7,
    type: "Story",
    title: "Soft CTA Story",
    hook: "End the week with a booking nudge.",
    details:
      "Use a simple story that reminds viewers to take the next step. Keep it warm and non-pushy.",
    cta: "DM us to book your consultation.",
  },
  {
    day: 8,
    type: "Post",
    title: "Problem/Pain Post",
    hook: "Use a new pain point angle.",
    details:
      "Talk about another common frustration — stubborn marks, slow progress, or trying everything without results. Make it feel real and relatable.",
    templateSlug: "problem-pain",
    cta: "If this feels familiar, message us.",
  },
  {
    day: 9,
    type: "Story",
    title: "Question Sticker Story",
    hook: "Invite followers to ask questions.",
    details:
      "Use the question sticker so people can send skin concerns, treatment doubts, or aftercare questions.",
    cta: "Drop your question — we'll answer a few tomorrow.",
  },
  {
    day: 10,
    type: "Post",
    title: "FAQ Carousel",
    hook: "Answer the most asked question.",
    details:
      "Choose one question from yesterday's story and answer it in a simple carousel. Focus on clarity and trust.",
    templateSlug: "faq",
    cta: "Save this for later.",
  },
  {
    day: 11,
    type: "Post",
    title: "Before/After Post",
    hook: "Use a single-post transformation.",
    details:
      "Show a strong result in one clean post. Keep the caption short and highlight what improved.",
    templateSlug: "before-after",
    cta: "DM us to see if this treatment is right for you.",
  },
  {
    day: 12,
    type: "Story",
    title: "Testimonial Story",
    hook: "Share a short client review.",
    details:
      "Use one strong line from a happy client and turn it into a story. Keep it simple and believable.",
    templateSlug: "testimonial",
    cta: "Trust the process — book your consult today.",
  },
  {
    day: 13,
    type: "Story",
    title: "Poll Story",
    hook: "Use a quick engagement question.",
    details:
      "Ask a simple either/or poll related to skin concerns or treatment preferences. Keep it easy to answer in one tap.",
    cta: "Tap your answer and stay tuned for tomorrow's post.",
  },
  {
    day: 14,
    type: "Story",
    title: "Promotion Story",
    hook: "Share a soft offer.",
    details:
      "Use a short promotional story for consultation slots, a limited-time offer, or a reminder to book soon. Keep it light.",
    cta: "Reply to this story to book.",
  },
  {
    day: 15,
    type: "Post",
    title: "Problem/Pain Post",
    hook: "Change the pain angle again.",
    details:
      "Focus on emotional frustration — feeling stuck, losing confidence, or not knowing what actually works. Keep the hook strong.",
    templateSlug: "problem-pain",
    cta: "DM us if you need help.",
  },
  {
    day: 16,
    type: "Post",
    title: "FAQ Carousel",
    hook: "Answer a safety or aftercare question.",
    details:
      "Pick a practical question that helps reduce hesitation. Make the answer calm, short, and reassuring.",
    templateSlug: "faq",
    cta: "Save this post before your visit.",
  },
  {
    day: 17,
    type: "Post",
    title: "Before/After Carousel",
    hook: "Show a stronger transformation story.",
    details:
      "Use the carousel format to walk through the journey and show the result clearly. Keep the proof believable.",
    templateSlug: "before-after",
    cta: "DM us to know the next step.",
  },
  {
    day: 18,
    type: "Post",
    title: "Testimonial Post",
    hook: "Share a trust-building client review.",
    details:
      "Focus on what the client felt before treatment and how they felt after. Keep it human and warm.",
    templateSlug: "testimonial",
    cta: "Book your consultation today.",
  },
  {
    day: 19,
    type: "Story",
    title: "Before/After Story",
    hook: "Post a fast visual result.",
    details:
      "Use a story frame to show a clean visual transformation. Keep the text short and easy to read.",
    templateSlug: "before-after",
    cta: "Swipe for the result and DM us if you want a plan.",
  },
  {
    day: 20,
    type: "Story",
    title: "Question Sticker Story",
    hook: "Open another Q&A round.",
    details:
      "Ask followers what they want to know about skin, treatments, or clinic care. This keeps the page interactive.",
    cta: "Send your question now.",
  },
  {
    day: 21,
    type: "Story",
    title: "Soft CTA Story",
    hook: "End the week with a gentle push.",
    details:
      "Keep it simple: remind viewers they can book a consult and get guided on the right treatment.",
    cta: "DM us to get started.",
  },
  {
    day: 22,
    type: "Post",
    title: "Problem/Pain Post",
    hook: "Use another relatable concern.",
    details:
      "Talk about repeated breakouts, marks that stay too long, or skin that never seems to settle. Make it feel personal.",
    templateSlug: "problem-pain",
    cta: "If you relate, reach out.",
  },
  {
    day: 23,
    type: "Story",
    title: "Poll Story",
    hook: "Ask a quick skin-related poll.",
    details:
      "Use a simple tap-based question to keep engagement active without needing extra content.",
    cta: "Vote and watch tomorrow's post.",
  },
  {
    day: 24,
    type: "Post",
    title: "FAQ Carousel",
    hook: "Answer one more booking or treatment question.",
    details:
      "Use the carousel to clear hesitation and make the clinic feel approachable.",
    templateSlug: "faq",
    cta: "Save this if you are considering treatment.",
  },
  {
    day: 25,
    type: "Post",
    title: "Before/After Post",
    hook: "Highlight one strong result.",
    details:
      "Use the post format to show a transformation with minimal text and strong proof.",
    templateSlug: "before-after",
    cta: "DM us to ask about this treatment.",
  },
  {
    day: 26,
    type: "Story",
    title: "Testimonial Story",
    hook: "Share another short client win.",
    details:
      "Keep it quick and honest. One line from a real client is enough.",
    templateSlug: "testimonial",
    cta: "This could be your story too — book now.",
  },
  {
    day: 27,
    type: "Post",
    title: "Problem/Pain Post",
    hook: "Use a final pain-driven post for the month.",
    details:
      "Focus on the pain of wasted time, wasted products, or repeated disappointment. Make the hook sharp.",
    templateSlug: "problem-pain",
    cta: "DM us if this sounds like you.",
  },
  {
    day: 28,
    type: "Story",
    title: "Promotion Story",
    hook: "Share a booking reminder or limited availability message.",
    details:
      "Keep the message short and direct so it feels easy to act on.",
    cta: "Reply now to reserve your slot.",
  },
  {
    day: 29,
    type: "Post",
    title: "FAQ Carousel",
    hook: "Answer one final useful question.",
    details:
      "Choose a question that helps close the month with trust and clarity.",
    templateSlug: "faq",
    cta: "Save this and share it with someone who needs it.",
  },
  {
    day: 30,
    type: "Story",
    title: "Month-End CTA Story",
    hook: "Close the month with a booking push.",
    details:
      "Use a warm end-of-month message that encourages people to start their skin journey.",
    cta: "Book your consultation for next month.",
  },
]
