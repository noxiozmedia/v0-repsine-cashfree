export type TemplateVariant = {
  id: "story" | "carousel" | "post"
  label: string
  size: string
  ratio: "4:5" | "9:16"
  image: string       // cover / preview image
  slides?: string[]   // carousel only: ordered list of all slide images
  canvaUrl: string
}

export type Template = {
  slug: string
  category: "testimonial" | "before-after" | "faq" | "problem-pain"
  categoryLabel: string
  title: string
  description: string
  cover: string
  videoEmbedUrl: string
  instructions: string[]
  variants: TemplateVariant[]
}

export type LockedTemplate = {
  title: string
  categoryLabel: string
  description: string
  cover: string
}

export const templateCategories = [
  { key: "testimonial" as const, label: "Testimonial" },
  { key: "before-after" as const, label: "Before / After" },
  { key: "faq" as const, label: "FAQ" },
  { key: "problem-pain" as const, label: "Problem / Pain" },
]

// Shared size presets
const POST     = { id: "post"     as const, label: "Post",     size: "1080 × 1350",        ratio: "4:5"  as const }
const STORY    = { id: "story"    as const, label: "Story",    size: "1080 × 1920",        ratio: "9:16" as const }
const CAROUSEL = { id: "carousel" as const, label: "Carousel", size: "1080 × 1350",        ratio: "4:5"  as const }

const PLACEHOLDER_CANVA = "https://www.canva.com/design/your-template-link"

export const templates: Template[] = [
  {
    slug: "testimonial",
    category: "testimonial",
    categoryLabel: "Testimonial",
    title: "Testimonial",
    description:
      "Credible patient testimonial layouts that build trust without feeling salesy. Available as a feed post and a story.",
    cover: "/dashboard/templates/testimonial.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructions: [
      "Click 'Edit in Canva' and duplicate the file to your account.",
      "Replace the patient quote with a real client review (keep it under 25 words).",
      "Swap the headshot — use a high-resolution, well-lit portrait, ideally the patient's actual photo with consent.",
      "Update the treatment label (e.g. 'Botox · 1 session').",
      "Export as PNG (post) or MP4 (story) and pair it with a caption from the Captions section.",
    ],
    variants: [
      { ...POST,  image: "/dashboard/templates/testimonial.jpg", canvaUrl: `${PLACEHOLDER_CANVA}-testimonial-post` },
      { ...STORY, image: "/dashboard/templates/testimonial.jpg", canvaUrl: `${PLACEHOLDER_CANVA}-testimonial-story` },
    ],
  },
  {
    slug: "before-after",
    category: "before-after",
    categoryLabel: "Before / After",
    title: "Before / After",
    description:
      "High-conversion split-screen reveals with a clean transition. Ideal for HydraFacial, chemical peel and laser results. Post, story and carousel.",
    cover: "/dashboard/templates/before-after-post.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructions: [
      "Open the template in Canva and replace the placeholder photos — use the same lighting and angle for both shots.",
      "Adjust the 'Before / After' label colours to your brand if needed.",
      "Add the treatment name and number of sessions in the small footer line.",
      "Always disclose 'Individual results may vary' as a small caption — required by most aesthetic boards.",
      "Export and post during peak hours (7-9 PM IST) for best engagement.",
    ],
    variants: [
      { ...POST,  image: "/dashboard/templates/before-after-post.jpg",  canvaUrl: `${PLACEHOLDER_CANVA}-beforeafter-post` },
      { ...STORY, image: "/dashboard/templates/before-after-story.jpg", canvaUrl: `${PLACEHOLDER_CANVA}-beforeafter-story` },
      {
        ...CAROUSEL,
        size: "1080 × 1350 · 4 slides",
        image: "/dashboard/templates/before-after-post.jpg",
        slides: [
          "/dashboard/templates/before-after-c1.jpg",
          "/dashboard/templates/before-after-c2.jpg",
          "/dashboard/templates/before-after-c3.jpg",
          "/dashboard/templates/before-after-c4.jpg",
        ],
        canvaUrl: `${PLACEHOLDER_CANVA}-beforeafter-carousel`,
      },
    ],
  },
  {
    slug: "faq",
    category: "faq",
    categoryLabel: "FAQ",
    title: "FAQ",
    description:
      "A swipeable FAQ carousel that answers the questions patients always DM about — drives saves and starts conversations.",
    cover: "/dashboard/templates/faq-1.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructions: [
      "Pick 4-5 of the most common questions your front desk gets asked.",
      "Slide 1: a hook ('5 questions everyone asks before their first facial').",
      "One question + a short, jargon-free answer per slide.",
      "Final slide: 'Still have questions? DM us' with your handle.",
      "Pair with the matching caption from the Captions section to maximise saves.",
    ],
    variants: [
      {
        ...CAROUSEL,
        size: "1080 × 1350 · 5 slides",
        image: "/dashboard/templates/faq-1.jpg",
        slides: [
          "/dashboard/templates/faq-1.jpg",
          "/dashboard/templates/faq-2.jpg",
          "/dashboard/templates/faq-3.jpg",
          "/dashboard/templates/faq-4.jpg",
          "/dashboard/templates/faq-5.jpg",
        ],
        canvaUrl: `${PLACEHOLDER_CANVA}-faq-carousel`,
      },
    ],
  },
  {
    slug: "problem-pain",
    category: "problem-pain",
    categoryLabel: "Problem / Pain",
    title: "Problem / Pain",
    description:
      "A problem-agitate-solve carousel that speaks directly to a patient's pain point, then positions your treatment as the fix.",
    cover: "/dashboard/templates/quote.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructions: [
      "Slide 1: name the exact problem your patient feels ('Still breaking out at 30?').",
      "Slides 2-3: agitate gently — why it happens and how it affects confidence.",
      "Slide 4: introduce your treatment as the solution, briefly.",
      "Final slide: a clear call-to-action ('DM 'CLEAR' to book a consult').",
      "Keep the tone empathetic, never shaming — pair with a caption from the Captions section.",
    ],
    variants: [
      {
        ...CAROUSEL,
        size: "1080 × 1350 · 5 slides",
        image: "/dashboard/templates/quote.jpg",
        canvaUrl: `${PLACEHOLDER_CANVA}-problempain-carousel`,
      },
    ],
  },
]

// Bonus templates — shown blurred + locked, unlocking in the next update.
export const lockedTemplates: LockedTemplate[] = [
  {
    title: "Treatment Awareness",
    categoryLabel: "Awareness",
    description: "Educate followers about a specific treatment and what to expect.",
    cover: "/dashboard/templates/educational.jpg",
  },
  {
    title: "Promotional Offers",
    categoryLabel: "Promotional",
    description: "Urgency-led offer creatives for festivals and seasonal pushes.",
    cover: "/dashboard/templates/promo.jpg",
  },
  {
    title: "Myth Busting",
    categoryLabel: "Educational",
    description: "Debunk common skincare and aesthetic myths your patients believe.",
    cover: "/dashboard/templates/quote.jpg",
  },
  {
    title: "Ad Creatives",
    categoryLabel: "Paid Ads",
    description: "Scroll-stopping creatives built specifically for paid Reels and feed ads.",
    cover: "/dashboard/templates/before-after-post.jpg",
  },
]

export function getTemplateBySlug(slug: string) {
  return templates.find((t) => t.slug === slug)
}
