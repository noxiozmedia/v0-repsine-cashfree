export type AdVariant = {
  id: "feed" | "story" | "reel"
  label: string
  size: string
  image: string
  canvaUrl: string
}

export type AdCreative = {
  slug: string
  category: "lead-gen" | "remarketing" | "awareness" | "promo"
  title: string
  description: string
  cover: string
  videoEmbedUrl: string
  copy: {
    primary: string
    headline: string
    cta: string
  }
  instructions: string[]
  variants: AdVariant[]
}

export const adCategories = [
  { key: "lead-gen" as const, label: "Lead Gen" },
  { key: "remarketing" as const, label: "Remarketing" },
  { key: "awareness" as const, label: "Awareness" },
  { key: "promo" as const, label: "Promo" },
]

export const adCreatives: AdCreative[] = [
  {
    slug: "lead-glow-consult",
    category: "lead-gen",
    title: "Free Glow Consult — Lead Gen",
    description:
      "A high-converting lead-gen creative offering a free 15-minute skin consult. Pair with a Meta Lead Form.",
    cover: "/dashboard/ads/lead.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    copy: {
      primary:
        "Skin not behaving lately? Book a free 15-min consult with our skin doctor — no commitment, just clarity.",
      headline: "Free 15-min Skin Consult",
      cta: "Book Now",
    },
    instructions: [
      "Use a real photo of the doctor or clinic — never a stock model.",
      "Run as Meta Lead Form ad — auto-fills name + WhatsApp from the user's IG profile.",
      "Daily budget: start at ₹500/day for 7 days, scale based on cost-per-lead.",
      "Target: women 22-45, interests in skincare, dermatology, beauty, your city + 25km.",
    ],
    variants: [
      {
        id: "feed",
        label: "Feed",
        size: "1080 × 1080",
        image: "/dashboard/ads/lead.jpg",
        canvaUrl: "https://www.canva.com/design/your-ad-link-feed",
      },
      {
        id: "story",
        label: "Story",
        size: "1080 × 1920",
        image: "/dashboard/ads/lead.jpg",
        canvaUrl: "https://www.canva.com/design/your-ad-link-story",
      },
      {
        id: "reel",
        label: "Reel",
        size: "1080 × 1920 (15s)",
        image: "/dashboard/ads/lead.jpg",
        canvaUrl: "https://www.canva.com/design/your-ad-link-reel",
      },
    ],
  },
  {
    slug: "rmkt-doubt-buster",
    category: "remarketing",
    title: "Doubt-buster — Remarketing",
    description:
      "Targets people who visited your profile but didn't DM. Addresses the top 3 objections head-on.",
    cover: "/dashboard/ads/remarketing.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    copy: {
      primary:
        "Still on the fence? Here's exactly what we do — no jargon, no upsell. Just the protocol our patients love.",
      headline: "We answer your top 3 questions",
      cta: "Send Message",
    },
    instructions: [
      "Build a custom audience: people who visited your IG profile in the last 30 days but didn't DM.",
      "Use the carousel format — 1 slide per common objection.",
      "Drive to a 'Send Message' CTA, not a website.",
      "Daily budget: ₹200-300/day, low frequency cap (1 impression / 7 days).",
    ],
    variants: [
      {
        id: "feed",
        label: "Feed Carousel",
        size: "1080 × 1080 · 4 slides",
        image: "/dashboard/ads/remarketing.jpg",
        canvaUrl: "https://www.canva.com/design/your-ad-link-feed",
      },
      {
        id: "story",
        label: "Story",
        size: "1080 × 1920",
        image: "/dashboard/ads/remarketing.jpg",
        canvaUrl: "https://www.canva.com/design/your-ad-link-story",
      },
    ],
  },
  {
    slug: "promo-festive-blast",
    category: "promo",
    title: "Festive Blast — Promo",
    description:
      "A time-bound festive offer creative. Run only during festival weeks — stop after the deadline.",
    cover: "/dashboard/ads/promo.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    copy: {
      primary:
        "🎉 Diwali Glow — 20% off every HydraFacial booked before Oct 28. Limited slots, real countdown.",
      headline: "Diwali Glow · 20% off",
      cta: "Book Now",
    },
    instructions: [
      "Always include a real expiry date and a real slot count.",
      "Use bold, festive accent colours — but keep your brand colours dominant.",
      "Run for 5-7 days only, then stop. Avoid 'always-on' promos.",
      "Daily budget: ₹800-1500/day depending on city.",
    ],
    variants: [
      {
        id: "feed",
        label: "Feed",
        size: "1080 × 1080",
        image: "/dashboard/ads/promo.jpg",
        canvaUrl: "https://www.canva.com/design/your-ad-link-feed",
      },
      {
        id: "story",
        label: "Story",
        size: "1080 × 1920",
        image: "/dashboard/ads/promo.jpg",
        canvaUrl: "https://www.canva.com/design/your-ad-link-story",
      },
      {
        id: "reel",
        label: "Reel",
        size: "1080 × 1920 (10s)",
        image: "/dashboard/ads/promo.jpg",
        canvaUrl: "https://www.canva.com/design/your-ad-link-reel",
      },
    ],
  },
  {
    slug: "aware-clinic-tour",
    category: "awareness",
    title: "Clinic Tour — Awareness",
    description:
      "Soft-sell awareness video that introduces your clinic to a cold audience. Builds brand recall.",
    cover: "/dashboard/ads/awareness.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    copy: {
      primary:
        "A 15-second tour of our space, our team, and the care we put into every appointment. Welcome to our clinic.",
      headline: "Welcome to our clinic",
      cta: "Learn More",
    },
    instructions: [
      "Film a real, unedited tour — no stock footage.",
      "Keep the video under 20 seconds, no voiceover, only background music.",
      "Optimise for video views, not clicks.",
      "Daily budget: ₹300/day, run for 14-21 days.",
    ],
    variants: [
      {
        id: "reel",
        label: "Reel",
        size: "1080 × 1920 (15s)",
        image: "/dashboard/ads/awareness.jpg",
        canvaUrl: "https://www.canva.com/design/your-ad-link-reel",
      },
      {
        id: "story",
        label: "Story",
        size: "1080 × 1920 (15s)",
        image: "/dashboard/ads/awareness.jpg",
        canvaUrl: "https://www.canva.com/design/your-ad-link-story",
      },
    ],
  },
]

export function getAdBySlug(slug: string) {
  return adCreatives.find((a) => a.slug === slug)
}
