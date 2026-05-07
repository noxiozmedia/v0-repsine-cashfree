import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, code } = (await request.json()) as { email?: string; code?: string }

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code required" }, { status: 400 })
    }

    const admin = createAdminClient()

    // Look up the code
    const { data: codeRow, error: lookupError } = await admin
      .from("verification_codes")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("code", code)
      .eq("used", false)
      .single()

    if (lookupError || !codeRow) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 })
    }

    // Check expiry
    if (new Date(codeRow.expires_at) < new Date()) {
      return NextResponse.json({ error: "Code has expired" }, { status: 400 })
    }

    // Mark code as used
    await admin
      .from("verification_codes")
      .update({ used: true })
      .eq("id", codeRow.id)

    // Find or create a magic link to sign the user in (using PKCE flow internally)
    // We'll generate a one-time sign-in link and return it - but this time we control
    // the redirect to be immediate rather than email-based
    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: email.toLowerCase(),
      options: {
        redirectTo: `${new URL(request.url).origin}/auth/callback`,
      },
    })

    if (linkError || !linkData?.properties?.action_link) {
      console.log("[v0] generateLink error:", linkError)
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
    }

    // Return the magic link for immediate client-side redirect
    // This link is consumed instantly by the client, not sent via email
    return NextResponse.json({
      ok: true,
      redirectUrl: linkData.properties.action_link,
    })
  } catch (err) {
    console.log("[v0] verify-code error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
