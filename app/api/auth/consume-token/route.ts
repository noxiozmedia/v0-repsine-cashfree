import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

/**
 * Consumes a custom magic-link token created by /api/auth/issue-token.
 *
 * Steps:
 *   1. Look up the token in auth_tokens
 *   2. Validate it's not expired and not already used
 *   3. Mark as used
 *   4. Generate a Supabase email_otp for that user via admin.generateLink
 *   5. Return { email, otp } to the client, which will call supabase.auth.verifyOtp
 *      directly to create the session in the browser
 *
 * The Supabase OTP we return is single-use and short-lived. Since it's only sent
 * to the verified browser (never via email), there's no scanner consumption risk.
 */
export async function POST(request: Request) {
  try {
    const { token } = (await request.json()) as { token?: string }
    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 })
    }

    const admin = createAdminClient()

    // 1) Look up the token
    const { data: row, error: lookupErr } = await admin
      .from("auth_tokens")
      .select("id, email, expires_at, used_at")
      .eq("token", token)
      .maybeSingle()

    if (lookupErr || !row) {
      return NextResponse.json({ error: "Invalid sign-in link" }, { status: 400 })
    }

    if (row.used_at) {
      return NextResponse.json(
        { error: "This sign-in link has already been used" },
        { status: 400 },
      )
    }

    if (new Date(row.expires_at).getTime() < Date.now()) {
      return NextResponse.json(
        { error: "This sign-in link has expired. Please request a new one." },
        { status: 400 },
      )
    }

    // 2) Mark as used immediately (single-use)
    const { error: updateErr } = await admin
      .from("auth_tokens")
      .update({ used_at: new Date().toISOString() })
      .eq("id", row.id)
    if (updateErr) {
      console.log("[v0] consume-token mark-used error", updateErr)
      return NextResponse.json({ error: "Could not consume token" }, { status: 500 })
    }

    // 3) Generate a Supabase email_otp the client can immediately verify
    const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: row.email,
    })
    if (linkErr || !linkData?.properties?.email_otp) {
      console.log("[v0] consume-token generateLink error", linkErr)
      return NextResponse.json({ error: "Could not create session" }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      email: row.email,
      otp: linkData.properties.email_otp,
    })
  } catch (err) {
    console.log("[v0] consume-token error", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
