"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const ranRef = useRef(false)

  useEffect(() => {
    if (ranRef.current) return
    ranRef.current = true

    async function run() {
      const supabase = createClient()
      const code = searchParams.get("code")
      const tokenHash = searchParams.get("token_hash")
      const type = searchParams.get("type") as
        | "signup"
        | "magiclink"
        | "recovery"
        | "invite"
        | "email_change"
        | null

      try {
        if (code) {
          // PKCE flow (signInWithOtp from client)
          const { error: exchangeErr } = await supabase.auth.exchangeCodeForSession(code)
          if (exchangeErr) throw exchangeErr
        } else if (tokenHash && type) {
          // Token-hash flow (admin.generateLink in some cases)
          const { error: verifyErr } = await supabase.auth.verifyOtp({
            type,
            token_hash: tokenHash,
          })
          if (verifyErr) throw verifyErr
        } else {
          // Implicit flow — Supabase put tokens in the URL hash. The browser
          // client's detectSessionInUrl=true automatically picks these up;
          // we just need to wait briefly for the session to register.
          await new Promise((r) => setTimeout(r, 200))
        }

        // At this point, if any flow above succeeded, we should have a session.
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          throw new Error("Could not establish a session")
        }

        // Clean the hash so the access_token never lingers in the URL bar
        if (typeof window !== "undefined" && window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search)
        }

        const passwordSet = user.user_metadata?.password_set === true
        router.replace(passwordSet ? "/dashboard" : "/auth/setup-password")
      } catch (err) {
        console.log("[v0] auth callback error", err)
        setError(err instanceof Error ? err.message : "Sign-in failed")
        router.replace("/auth/error")
      }
    }

    run()
  }, [router, searchParams])

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          {error ? "Redirecting…" : "Signing you in…"}
        </p>
      </div>
    </main>
  )
}
