"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"magic" | "password">("magic")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [linkSent, setLinkSent] = useState(false)

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      setLinkSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send link")
    } finally {
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

        {linkSent ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Check your email</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We&apos;ve sent a sign-in link to <span className="font-medium text-foreground">{email}</span>.
              Tap it on this device to log in.
            </p>
            <button
              type="button"
              onClick={() => {
                setLinkSent(false)
                setEmail("")
              }}
              className="mt-4 text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex rounded-full bg-muted p-1">
              <button
                type="button"
                onClick={() => setMode("magic")}
                className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  mode === "magic" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Magic link
              </button>
              <button
                type="button"
                onClick={() => setMode("password")}
                className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  mode === "password" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Password
              </button>
            </div>

            <form onSubmit={mode === "magic" ? sendMagicLink : signInWithPassword} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              {mode === "password" && (
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
              )}

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
                    {mode === "magic" ? "Send magic link" : "Sign in"}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

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
