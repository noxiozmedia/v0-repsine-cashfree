"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useRef, Suspense } from "react"
import { Loader2, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react"

function LoginInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const autoTriggered = useRef(false)

  const [step, setStep] = useState<"email" | "code" | "password">("email")
  const [authMode, setAuthMode] = useState<"code" | "password">("code")
  const [email, setEmail] = useState(searchParams.get("email") || "")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-send code if ?auto=1 is present and email is prefilled
  useEffect(() => {
    if (autoTriggered.current) return
    const shouldAuto = searchParams.get("auto") === "1" && email
    if (shouldAuto) {
      autoTriggered.current = true
      const t = setTimeout(() => {
        sendCodeAuto()
      }, 300)
      return () => clearTimeout(t)
    }
  }, [searchParams, email])

  async function sendCodeAuto() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to send code")
      setStep("code")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code")
    } finally {
      setLoading(false)
    }
  }

  async function sendCode(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to send code")
      setStep("code")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code")
    } finally {
      setLoading(false)
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // Verify the 6-digit OTP directly with Supabase. This creates the session
      // in the browser with no redirects and no link consumption issues.
      const supabase = createClient()
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      })

      if (error) throw error
      if (!data.session) throw new Error("Sign-in failed. Please try again.")

      // Check if password has been set yet — if not, force setup-password.
      const passwordSet = data.user?.user_metadata?.password_set === true
      router.push(passwordSet ? "/dashboard" : "/auth/setup-password")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid or expired code")
      setLoading(false)
    }
  }

  async function signInWithPassword(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  function goBack() {
    setStep("email")
    setCode("")
    setError(null)
  }

  function switchToPassword() {
    setAuthMode("password")
    setStep("password")
    setError(null)
  }

  function switchToCode() {
    setAuthMode("code")
    setStep("email")
    setCode("")
    setError(null)
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your Repsine dashboard</p>
        </div>

        {/* Step: Enter code */}
        {step === "code" && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <button
              type="button"
              onClick={goBack}
              className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </button>

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Enter your code</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              We sent a verification code to <span className="font-medium text-foreground">{email}</span>
            </p>

            <form onSubmit={verifyCode} className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="code" className="text-xs font-semibold">
                  Verification code
                </Label>
                <Input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={8}
                  required
                  autoFocus
                  autoComplete="one-time-code"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  className="h-12 text-center text-xl font-semibold tracking-[0.3em]"
                />
              </div>

              {error && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" className="h-11 w-full" disabled={loading || code.length < 6}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Verify & sign in
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={sendCode}
                disabled={loading}
                className="w-full text-center text-xs text-muted-foreground underline-offset-2 hover:underline disabled:opacity-50"
              >
                Didn&apos;t receive it? Send again
              </button>
            </form>
          </div>
        )}

        {/* Step: Enter email (for code flow) */}
        {step === "email" && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <form onSubmit={sendCode} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  autoFocus
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              {error && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" className="h-11 w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Send sign-in code
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 flex items-center gap-3 text-[10px] font-semibold tracking-[0.15em] text-muted-foreground/60 uppercase">
              <div className="h-px flex-1 bg-border" />
              or
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={switchToPassword}
              className="mt-4 w-full text-center text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
            >
              Sign in with password instead
            </button>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              Haven&apos;t purchased yet?{" "}
              <Link href="/" className="font-medium text-foreground underline-offset-2 hover:underline">
                Get access
              </Link>
            </p>
          </div>
        )}

        {/* Step: Password sign-in */}
        {step === "password" && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <form onSubmit={signInWithPassword} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email-pw" className="text-xs font-semibold">
                  Email
                </Label>
                <Input
                  id="email-pw"
                  type="email"
                  required
                  autoComplete="email"
                  autoFocus
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>

              {error && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" className="h-11 w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 flex items-center gap-3 text-[10px] font-semibold tracking-[0.15em] text-muted-foreground/60 uppercase">
              <div className="h-px flex-1 bg-border" />
              or
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={switchToCode}
              className="mt-4 w-full text-center text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
            >
              Sign in with email code instead
            </button>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              Haven&apos;t purchased yet?{" "}
              <Link href="/" className="font-medium text-foreground underline-offset-2 hover:underline">
                Get access
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh w-full items-center justify-center bg-background">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <LoginInner />
    </Suspense>
  )
}
