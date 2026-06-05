import { Hero } from "@/components/repsine/hero"
import { Features } from "@/components/repsine/features"
import { HowItWorks } from "@/components/repsine/how-it-works"
import { Faq } from "@/components/repsine/faq"
import { SuccessCta } from "@/components/repsine/success-cta"
import { SiteFooter } from "@/components/repsine/footer"

export default function Page() {
  return (
    <main className="repsine-cream relative min-h-screen bg-background pb-20 text-foreground sm:pb-0">
      <Hero />
      <Features />
      <HowItWorks />
      <Faq />
      <SuccessCta />
      <SiteFooter />
    </main>
  )
}
