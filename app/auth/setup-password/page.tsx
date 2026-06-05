"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { RepsineLogo } from "@/components/repsine-logo"

export default function SetupPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/auth/login")
        return
      }
      setEmail(user.email ?? "")
      // If user already set a password, skip to dashboard.
      if (user.user_metadata?.password_set === true) {
        router.replace("/dashboard")
      }
    })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password,
        data: { password_set: true },
      })
      if (error) throw error
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <RepsineLogo size={48} className="mx-auto mb-4 h-12 w-12 rounded-2xl" />
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Set your password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a password so you can sign in faster next time.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          {email && (
            <p className="mb-4 truncate rounded-lg border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
              Logged in as <span className="font-medium text-foreground">{email}</span>
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold">
                New password
              </Label>
              <PasswordInput
                id="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-xs font-semibold">
                Confirm password
              </Label>
              <PasswordInput
                id="confirm"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="h-11"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" className="h-11 w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save & continue"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
