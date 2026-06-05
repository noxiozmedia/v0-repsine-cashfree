"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, CheckCircle2, KeyRound, Loader2, Mail, Sparkles } from "lucide-react"
import { RepsineLogo } from "@/components/repsine-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

type Method = "password" | "magic" | "otp"

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function LoginInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const autoTriggered = useRef(false)

  const initialMethod = searchParams.get("method") as Method | null
  const [method, setMethod] = useState<Method>(
    initialMethod === "magic" || initialMethod === "otp" || initialMethod === "password"
      ? initialMethod
      : "password",
  )

  const [email, setEmail] = useState(searchParams.get("email") ?? "")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [linkSent, setLinkSent] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  // Auto-fire the active method when arriving with ?auto=1&email=...
  useEffect(() => {
    if (autoTriggered.current) return
    const auto = searchParams.get("auto") === "1"
    if (!auto || !email || !isValidEmail(email)) return
    autoTriggered.current = true
    const t = setTimeout(() => {
      if (method === "magic") void sendMagicLink()
      else if (method === "otp") void sendOtp()
    }, 250)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  function switchMethod(next: Method) {
    setMethod(next)
    setError(null)
    setLinkSent(false)
    setOtpSent(false)
    setCode("")
  }

  async function signInWithPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) return setError("Enter a valid email")
    if (!password) return setError("Enter your password")
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (!data.session) throw new Error("Sign-in failed. Please try again.")
      const passwordSet = data.user?.user_metadata?.password_set === true
      router.replace(passwordSet ? "/dashboard" : "/auth/setup-password")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in")
      setLoading(false)
    }
  }

  async function sendMagicLink(e?: React.FormEvent) {
    e?.preventDefault()
    if (!isValidEmail(email)) return setError("Enter a valid email")
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/request-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "Could not send link")
      setLinkSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send link")
    } finally {
      setLoading(false)
    }
  }

  async function sendOtp(e?: React.FormEvent) {
    e?.preventDefault()
    if (!isValidEmail(email)) return setError("Enter a valid email")
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "Could not send code")
      setOtpSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send code")
    } finally {
      setLoading(false)
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!/^\d{4}$/.test(code)) return setError("Enter the 4-digit code")
    setError(null)
    setLoading(true)
    try {
      // 1) Validate the 4-digit code against our auth_tokens table
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "Invalid or expired code")

      // 2) Use the returned Supabase email_otp client-side to create the session
      const supabase = createClient()
      const { data: session, error: sErr } = await supabase.auth.verifyOtp({
        email: data.email,
        token: data.token,
        type: "email",
      })
      if (sErr) throw sErr
      if (!session.session) throw new Error("Sign-in failed. Please try again.")
      const passwordSet = session.user?.user_metadata?.password_set === true
      router.replace(passwordSet ? "/dashboard" : "/auth/setup-password")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not verify code")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <RepsineLogo size={48} className="mx-auto mb-4 h-12 w-12 rounded-xl" />
          <h1 className="font-display text-2xl font-semibold text-balance text-foreground">
            Sign in to Repsine
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Choose how you&apos;d like to continue
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Sign-in method"
          className="mb-5 grid grid-cols-3 gap-1 rounded-full border border-border bg-muted/40 p-1"
        >
          {(
            [
              { id: "password", label: "Password", icon: KeyRound },
              { id: "magic", label: "Magic link", icon: Sparkles },
              { id: "otp", label: "Code", icon: Mail },
            ] as const
          ).map((opt) => {
            const active = method === opt.id
            return (
              <button
                key={opt.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => switchMethod(opt.id)}
                className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full text-xs font-medium transition-colors ${
                  active
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <opt.icon className="h-3.5 w-3.5" />
                <span>{opt.label}</span>
              </button>
            )
          })}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          {/* PASSWORD */}
          {method === "password" && (
            <form onSubmit={signInWithPassword} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => switchMethod("magic")}
                    className="text-[11px] font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <PasswordInput
                  id="password"
                  required
                  autoComplete="current-password"
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
          )}

          {/* MAGIC LINK — request */}
          {method === "magic" && !linkSent && (
            <form onSubmit={sendMagicLink} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email-magic" className="text-xs font-semibold">
                  Email
                </Label>
                <Input
                  id="email-magic"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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
                    Email me a sign-in link
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We&apos;ll send a one-time link to your inbox.
              </p>
            </form>
          )}
          {method === "magic" && linkSent && (
            <div className="space-y-3 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h2 className="font-display text-base font-semibold text-foreground">
                Check your inbox
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We sent a sign-in link to{" "}
                <span className="font-medium text-foreground">{email}</span>. Click it to continue
                — the link expires in 1 hour.
              </p>
              <button
                type="button"
                onClick={() => sendMagicLink()}
                disabled={loading}
                className="text-xs font-medium text-foreground underline underline-offset-4 disabled:opacity-60"
              >
                Resend link
              </button>
            </div>
          )}

          {/* OTP — request */}
          {method === "otp" && !otpSent && (
            <form onSubmit={sendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email-otp" className="text-xs font-semibold">
                  Email
                </Label>
                <Input
                  id="email-otp"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11"
                />
              </div>
              {error && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" className="h-11 w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Email me a 4-digit code"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Code is valid for 10 minutes.
              </p>
            </form>
          )}
          {method === "otp" && otpSent && (
            <form onSubmit={verifyOtp} className="space-y-4">
              <div className="text-center">
                <h2 className="font-display text-base font-semibold text-foreground">
                  Enter your code
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sent to <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="code" className="sr-only">
                  4-digit code
                </Label>
                <Input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  required
                  autoFocus
                  autoComplete="one-time-code"
                  placeholder="0000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="h-14 text-center text-2xl font-semibold tracking-[0.4em]"
                />
              </div>
              {error && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="h-11 w-full"
                disabled={loading || code.length !== 4}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify and sign in"}
              </Button>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false)
                    setCode("")
                    setError(null)
                  }}
                  className="hover:text-foreground"
                >
                  Change email
                </button>
                <button
                  type="button"
                  onClick={() => sendOtp()}
                  disabled={loading}
                  className="font-medium hover:text-foreground disabled:opacity-60"
                >
                  Resend code
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Haven&apos;t purchased yet?{" "}
          <Link
            href="/"
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            Get access
          </Link>
        </p>
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
