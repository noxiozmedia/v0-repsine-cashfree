"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AlertCircle, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function AuthErrorPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function recover() {
      // The Supabase JS client auto-detects tokens in the URL hash
      // (#access_token=...). If a magic-link redirected here by mistake
      // because the project's redirect-allow-list points at /auth/error,
      // the session is still valid — we just need to honor it and forward
      // the user to the right place.
      const hash = typeof window !== "undefined" ? window.location.hash : ""
      const hasTokens = hash.includes("access_token=")

      if (!hasTokens) {
        if (!cancelled) setChecking(false)
        return
      }

      const supabase = createClient()
      // Give the JS client a tick to ingest the hash tokens.
      await new Promise((r) => setTimeout(r, 60))

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (cancelled) return

      if (user) {
        // Clean the hash and route to the right destination.
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", window.location.pathname)
        }
        if (user.user_metadata?.password_set !== true) {
          router.replace("/auth/setup-password")
        } else {
          router.replace("/dashboard")
        }
        return
      }

      setChecking(false)
    }

    recover()
    return () => {
      cancelled = true
    }
  }, [router])

  if (checking) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-background p-4">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <p className="text-sm">Signing you in&hellip;</p>
        </div>
      </div>
    )
  }

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
