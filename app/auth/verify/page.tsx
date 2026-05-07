"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type ErrorState = {
  message: string
  code: "used" | "expired" | "invalid" | "generic"
  email?: string
}

function VerifyInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ranRef = useRef(false)
  const [err, setErr] = useState<ErrorState | null>(null)

  useEffect(() => {
    if (ranRef.current) return
    ranRef.current = true

    const token = searchParams.get("token")
    if (!token) {
      setErr({ code: "invalid", message: "Sign-in link is missing or malformed." })
      return
    }

    ;(async () => {
      try {
        // 1) Consume our custom token server-side; receive a fresh Supabase OTP
        const res = await fetch("/api/auth/consume-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
        const data = await res.json()
        if (!res.ok) {
          const code: ErrorState["code"] =
            data?.code === "used" || data?.code === "expired" || data?.code === "invalid"
              ? data.code
              : "generic"
          setErr({ code, message: data?.error || "Sign-in failed" })
          return
        }

        // 2) Verify the Supabase OTP directly in the browser to create a session
        const supabase = createClient()
        const { data: session, error: sErr } = await supabase.auth.verifyOtp({
          email: data.email,
          token: data.otp,
          type: "email",
        })
        if (sErr) throw sErr
        if (!session.session) throw new Error("Sign-in failed. Please try again.")

        // 3) First-time login? Send to setup-password. Otherwise dashboard.
        const passwordSet = session.user?.user_metadata?.password_set === true
        router.replace(passwordSet ? "/dashboard" : "/auth/setup-password")
      } catch (e) {
        setErr({
          code: "generic",
          message: e instanceof Error ? e.message : "Sign-in failed",
        })
      }
    })()
  }, [router, searchParams])

  if (err) {
    const isUsed = err.code === "used"
    const heading = isUsed
      ? "Link already used"
      : err.code === "expired"
        ? "Link expired"
        : "Sign-in failed"
    const body = isUsed
      ? "This sign-in link has already been used. Request a fresh one to continue — it&apos;ll arrive in seconds."
      : err.message
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-lg font-semibold text-foreground">{heading}</h1>
          <p
            className="mt-2 text-sm leading-relaxed text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <Link
            href={`/auth/login?method=magic${err.email ? `&email=${encodeURIComponent(err.email)}` : ""}`}
            className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Request a new link
          </Link>
          <p className="mt-3 text-xs text-muted-foreground">
            Or{" "}
            <Link
              href="/auth/login"
              className="font-medium text-foreground underline-offset-2 hover:underline"
            >
              sign in with password
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Signing you in&hellip;</p>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh w-full items-center justify-center bg-background">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <VerifyInner />
    </Suspense>
  )
}
