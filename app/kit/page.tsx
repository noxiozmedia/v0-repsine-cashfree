import { Hero } from "@/components/repsine/hero"
import { WhatsInside } from "@/components/repsine/whats-inside"
import { Features } from "@/components/repsine/features"
import { HowItWorks } from "@/components/repsine/how-it-works"
import { Faq } from "@/components/repsine/faq"
import { SuccessCta } from "@/components/repsine/success-cta"

export default function KitPage() {
  return (
    <main className="repsine-cream relative min-h-screen bg-background pb-20 text-foreground sm:pb-0">
      <Hero />
      <WhatsInside />
      <Features />
      <HowItWorks />
      <Faq />
      <SuccessCta />
    </main>
  )
}
