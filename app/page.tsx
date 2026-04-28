import { Hero } from "@/components/repsine/hero"
import { TrustedBy } from "@/components/repsine/trusted-by"
import { WhatsIncluded } from "@/components/repsine/whats-included"
import { Faq } from "@/components/repsine/faq"
import { SuccessCta } from "@/components/repsine/success-cta"
import { SiteFooter } from "@/components/repsine/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Hero />
      <TrustedBy />
      <WhatsIncluded />
      <Faq />
      <SuccessCta />
      <SiteFooter />
    </main>
  )
}
