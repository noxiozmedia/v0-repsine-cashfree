import { PageShell, ProseSection } from "@/components/repsine/page-shell"

export const metadata = {
  title: "About Us | Repsine",
  description:
    "Repsine empowers learners with practical, hands-on Canva design education for creators, freelancers, and small businesses.",
}

const mission = [
  {
    title: "Simplified Learning",
    body: "Breaking down complex design concepts into easy-to-follow lessons.",
  },
  {
    title: "Practical Approach",
    body: "Real-world examples, design exercises, and portfolio-ready projects.",
  },
  {
    title: "Beginner-Friendly",
    body: "No prior design experience needed — start from absolute zero.",
  },
  {
    title: "Self-Paced Learning",
    body: "Learn anytime, anywhere, on your own schedule.",
  },
]

const why = [
  "Comprehensive Curriculum — covers everything from Canva basics to advanced branding, social media kits, and client deliverables.",
  "Hands-On Projects — apply what you learn through real-world design briefs and mini-projects.",
  "Expert Guidance — crafted by working designers and creative educators.",
  "Affordable & Accessible — quality education without the high cost.",
]

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About Us"
      title="Empowering learners with practical design skills."
      description="At Repsine, we are passionate about making Canva design accessible, simple, and effective for learners of all levels. Whether you're a beginner taking your first steps or a creator looking to sharpen your skills, our courses are designed to provide a structured and practical learning experience."
    >
      <div className="space-y-8">
        <ProseSection>
          <h2 className="font-display text-2xl font-bold text-foreground">Our Mission</h2>
          <p>
            Our goal is to bridge the gap between theory and real-world application by offering a hands-on
            approach to Canva design and visual branding. We believe learning should be:
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {mission.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-border/60 bg-background/40 p-4"
              >
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </ProseSection>

        <ProseSection>
          <h2 className="font-display text-2xl font-bold text-foreground">Why Learn With Us?</h2>
          <ul className="space-y-3">
            {why.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ProseSection>

        <ProseSection>
          <h2 className="font-display text-2xl font-bold text-foreground">Join Us &amp; Start Creating</h2>
          <p>
            Unlock the power of Canva and build a strong design foundation with Repsine. Whether you aim to
            become a freelance designer, social media manager, or content creator, our courses will set you on
            the right path.
          </p>
          <p>
            For inquiries, reach us at{" "}
            <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
              repsine.agency@gmail.com
            </a>
            . Let&apos;s design, create, and grow together.
          </p>
        </ProseSection>
      </div>
    </PageShell>
  )
}
