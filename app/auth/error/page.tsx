import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/15 text-destructive">
          <AlertCircle className="h-5 w-5" />
        </div>
        <h1 className="font-display text-xl font-bold tracking-tight text-foreground">Sign-in failed</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          That sign-in link is invalid or has expired. Please request a new one.
        </p>
        <Link
          href="/auth/login"
          className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Try again
        </Link>
      </div>
    </div>
  )
}
