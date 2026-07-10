import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RepsineLogo } from "@/components/repsine-logo"

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="flex flex-col items-center gap-6">
        <RepsineLogo size={56} className="h-14 w-14" />

        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
          Welcome to Repsine
        </h1>

        <Link
          href="/dashboard"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Sign in
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </main>
  )
}
