import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { email: rawEmail, code: rawCode } = (await request.json()) as {
      email?: string
      code?: string
    }
    const email = rawEmail?.trim().toLowerCase()
    const code = rawCode?.trim()
    if (!email || !code || !/^\d{4}$/.test(code)) {
      return NextResponse.json({ error: "Email and 4-digit code required" }, { status: 400 })
    }

    const admin = createAdminClient()

    // Find the latest unused OTP row for this email.
    const { data: row, error: lookupErr } = await admin
      .from("auth_tokens")
      .select("id, expires_at, used_at")
      .eq("email", email)
      .eq("token", code)
      .eq("kind", "otp")
      .is("used_at", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (lookupErr || !row) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 })
    }
    if (new Date(row.expires_at).getTime() < Date.now()) {
      return NextResponse.json({ error: "Code expired. Please request a new one." }, { status: 400 })
    }

    // Mark used immediately to prevent replay.
    await admin
      .from("auth_tokens")
      .update({ used_at: new Date().toISOString() })
      .eq("id", row.id)

    // Ensure the user exists; if not, create one (so password/magic-link
    // logins also auto-provision when needed for early manual testing).
    const { data: list } = await admin.auth.admin.listUsers()
    const existing = list?.users?.find((u) => u.email?.toLowerCase() === email)
    if (!existing) {
      const { error: createErr } = await admin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { password_set: false },
      })
      if (createErr) {
        console.log("[v0] verify-otp createUser error", createErr)
        return NextResponse.json({ error: "Could not create account" }, { status: 500 })
      }
    }

    // Generate a fresh Supabase email_otp; the browser will immediately
    // call supabase.auth.verifyOtp({ email, token, type: "email" }) with it
    // to create the session in-memory — never travels via URL.
    const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email,
    })
    if (linkErr || !linkData?.properties?.email_otp) {
      console.log("[v0] verify-otp generateLink error", linkErr)
      return NextResponse.json({ error: "Could not start session" }, { status: 500 })
    }

    return NextResponse.json({ ok: true, email, token: linkData.properties.email_otp })
  } catch (err) {
    console.log("[v0] verify-otp error", err)
    return NextResponse.json({ error: "Could not verify code" }, { status: 500 })
  }
}
