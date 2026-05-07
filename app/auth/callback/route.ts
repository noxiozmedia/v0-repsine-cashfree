import { createClient } from "@/lib/supabase/server"
import { type EmailOtpType } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get("code")
  const tokenHash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const next = searchParams.get("next") ?? "/dashboard"

  const supabase = await createClient()
  let exchangeError: string | null = null

  // Path A: PKCE flow (client-initiated signInWithOtp / signInWithPassword OAuth)
  // Returns ?code=...
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      exchangeError = error.message
      console.log("[v0] auth callback: exchangeCodeForSession failed", error.message)
    }
  }
  // Path B: Server-generated magic link via admin.generateLink
  // Returns ?token_hash=...&type=magiclink
  else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    })
    if (error) {
      exchangeError = error.message
      console.log("[v0] auth callback: verifyOtp failed", error.message)
    }
  } else {
    exchangeError = "Missing code or token_hash"
    console.log("[v0] auth callback: no code or token_hash present")
  }

  if (exchangeError) {
    return NextResponse.redirect(`${origin}/auth/error`)
  }

  // Session is now set — check whether the user still needs to choose a password.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && user.user_metadata?.password_set !== true) {
    return NextResponse.redirect(`${origin}/auth/setup-password`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
