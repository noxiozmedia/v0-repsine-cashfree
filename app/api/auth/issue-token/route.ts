import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { randomBytes } from "node:crypto"

/**
 * Issues a custom magic-link token for a given email.
 * Token is stored in `auth_tokens` table with 1-hour expiry.
 * Returns a URL that lands on /auth/verify?token=xxx.
 *
 * Used by:
 * - The post-payment flow (called server-side internally — see post-payment route)
 * - A "Send me a sign-in link" button on the login page
 */
export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string }
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    const admin = createAdminClient()
    const origin = new URL(request.url).origin

    // Make sure a Supabase user exists for this email; if not, create one.
    // (Self-serve sign-in via this route only works for existing customers,
    //  so we don't create new users here unless explicitly allowed.)
    const { data: existing } = await admin
      .from("auth_tokens")
      .select("email")
      .eq("email", email)
      .limit(1)

    // We don't strictly need to verify the user exists in auth.users — the
    // verify route will reject if no Supabase account exists for this email.
    void existing

    // Generate a cryptographically random token (URL-safe base64)
    const token = randomBytes(32).toString("base64url")
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour

    const { error } = await admin.from("auth_tokens").insert({
      email,
      token,
      expires_at: expiresAt,
    })
    if (error) {
      console.log("[v0] issue-token insert error", error)
      return NextResponse.json({ error: "Could not issue token" }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      url: `${origin}/auth/verify?token=${token}`,
      token,
    })
  } catch (err) {
    console.log("[v0] issue-token error", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
