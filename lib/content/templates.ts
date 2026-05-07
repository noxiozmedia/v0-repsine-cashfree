export type TemplateVariant = {
  id: "story" | "carousel" | "post"
  label: string
  size: string
  image: string
  canvaUrl: string
}

export type Template = {
  slug: string
  category: "testimonial" | "before-after" | "promotional" | "educational" | "quote"
  title: string
  description: string
  cover: string
  videoEmbedUrl: string
  instructions: string[]
  variants: TemplateVariant[]
}

export const templateCategories = [
  { key: "testimonial" as const, label: "Testimonial" },
  { key: "before-after" as const, label: "Before / After" },
  { key: "promotional" as const, label: "Promotional" },
  { key: "educational" as const, label: "Educational" },
  { key: "quote" as const, label: "Quote" },
]

export const templates: Template[] = [
  {
    slug: "patient-testimonial-glow",
    category: "testimonial",
    title: "Patient Testimonial — Glow",
    description:
      "Soft beige & blush testimonial layout designed to look credible without feeling salesy. Works beautifully on Reels and feed.",
    cover: "/dashboard/templates/testimonial.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructions: [
      "Click 'Edit in Canva' and duplicate the file to your account.",
      "Replace the patient quote with a real client review (keep it under 25 words).",
      "Swap the headshot — use a high-resolution, well-lit portrait, ideally the patient's actual photo with consent.",
      "Update the treatment label (e.g. 'Botox · 1 session').",
      "Export as PNG (post) / MP4 (story) and post with the matching caption from the Captions section.",
    ],
    variants: [
      {
        id: "story",
        label: "Story",
        size: "1080 × 1920",
        image: "/dashboard/templates/testimonial.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-story",
      },
      {
        id: "carousel",
        label: "Carousel",
        size: "1080 × 1080 · 6 slides",
        image: "/dashboard/templates/testimonial.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-carousel",
      },
      {
        id: "post",
        label: "Post",
        size: "1080 × 1080",
        image: "/dashboard/templates/testimonial.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-post",
      },
    ],
  },
  {
    slug: "before-after-skin",
    category: "before-after",
    title: "Before / After — Skin Reveal",
    description:
      "A high-conversion split-screen reveal with a clean swipe transition. Ideal for HydraFacial, chemical peel and laser results.",
    cover: "/dashboard/templates/before-after.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructions: [
      "Open the template in Canva and replace the placeholder photos — use the same lighting and angle for both shots.",
      "Adjust the 'Before / After' label colours to your brand if needed.",
      "Add the treatment name + number of sessions in the small footer line.",
      "Always disclose 'Individual results may vary' as a small caption — required by most aesthetic boards.",
      "Export and post during peak hours (7-9 PM IST) for best engagement.",
    ],
    variants: [
      {
        id: "story",
        label: "Story",
        size: "1080 × 1920",
        image: "/dashboard/templates/before-after.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-story",
      },
      {
        id: "carousel",
        label: "Carousel",
        size: "1080 × 1080 · 4 slides",
        image: "/dashboard/templates/before-after.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-carousel",
      },
      {
        id: "post",
        label: "Post",
        size: "1080 × 1080",
        image: "/dashboard/templates/before-after.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-post",
      },
    ],
  },
  {
    slug: "promo-festive-offer",
    category: "promotional",
    title: "Promotional — Festive Offer",
    description:
      "An urgency-led festive promo template with countdown placeholder. Use for Diwali, New Year, Valentine's, monsoon specials.",
    cover: "/dashboard/templates/promo.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructions: [
      "Edit the offer headline (e.g. '20% off all facials this Diwali').",
      "Set a real expiry date in the badge — never leave 'limited time' vague.",
      "Add your clinic name and one line about the treatment included.",
      "Keep the call-to-action short: 'DM to book' or 'Tap link in bio'.",
      "Cross-post the carousel + run the same creative as a paid Reels ad.",
    ],
    variants: [
      {
        id: "story",
        label: "Story",
        size: "1080 × 1920",
        image: "/dashboard/templates/promo.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-story",
      },
      {
        id: "carousel",
        label: "Carousel",
        size: "1080 × 1080 · 5 slides",
        image: "/dashboard/templates/promo.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-carousel",
      },
      {
        id: "post",
        label: "Post",
        size: "1080 × 1080",
        image: "/dashboard/templates/promo.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-post",
      },
    ],
  },
  {
    slug: "edu-treatment-explainer",
    category: "educational",
    title: "Educational — Treatment Explainer",
    description:
      "A 5-slide explainer that demystifies a procedure (eg. Botox, fillers, microneedling) — drives saves and DMs.",
    cover: "/dashboard/templates/educational.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructions: [
      "Pick one treatment per carousel — never combine two in one post.",
      "Slide 1: a curiosity-driven hook ('What actually happens during a Botox session?').",
      "Slides 2-4: step-by-step with simple language, avoid jargon.",
      "Slide 5: 'DM us to book a consultation' with your handle.",
      "Use the matching caption from the Captions section to maximise saves.",
    ],
    variants: [
      {
        id: "story",
        label: "Story",
        size: "1080 × 1920",
        image: "/dashboard/templates/educational.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-story",
      },
      {
        id: "carousel",
        label: "Carousel",
        size: "1080 × 1080 · 5 slides",
        image: "/dashboard/templates/educational.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-carousel",
      },
      {
        id: "post",
        label: "Post",
        size: "1080 × 1080",
        image: "/dashboard/templates/educational.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-post",
      },
    ],
  },
  {
    slug: "quote-confidence",
    category: "quote",
    title: "Quote — Confidence Series",
    description:
      "Minimal typography quote layouts that build emotional connection and brand recall. Drop these between promos.",
    cover: "/dashboard/templates/quote.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructions: [
      "Pick one quote per post — keep total length under 90 characters.",
      "Avoid clichés ('beauty is in the eye of the beholder'). Aim for something specific to skincare/self-care.",
      "Sign off with your clinic name in small text bottom-right.",
      "Best paired with a soft pastel background — 1 colour palette per month builds recognisable feed aesthetics.",
    ],
    variants: [
      {
        id: "story",
        label: "Story",
        size: "1080 × 1920",
        image: "/dashboard/templates/quote.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-story",
      },
      {
        id: "post",
        label: "Post",
        size: "1080 × 1080",
        image: "/dashboard/templates/quote.jpg",
        canvaUrl: "https://www.canva.com/design/your-template-link-post",
      },
    ],
  },
]

export function getTemplateBySlug(slug: string) {
  return templates.find((t) => t.slug === slug)
}
