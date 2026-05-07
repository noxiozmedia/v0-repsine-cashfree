import { NextResponse } from "next/server"
import { Resend } from "resend"
import { randomInt } from "node:crypto"
import { createAdminClient } from "@/lib/supabase/admin"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { email: rawEmail } = (await request.json()) as { email?: string }
    const email = rawEmail?.trim().toLowerCase()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    const resendKey = process.env.Resend_API_KEY
    if (!resendKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const admin = createAdminClient()

    // Generate a 4-digit code (0000-9999, padded).
    const code = String(randomInt(0, 10000)).padStart(4, "0")
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 min

    // Invalidate any prior unused OTPs for this email so only the latest works.
    await admin
      .from("auth_tokens")
      .update({ used_at: new Date().toISOString() })
      .eq("email", email)
      .eq("kind", "otp")
      .is("used_at", null)

    const { error: insertErr } = await admin.from("auth_tokens").insert({
      email,
      token: code,
      kind: "otp",
      expires_at: expiresAt,
    })
    if (insertErr) {
      console.log("[v0] request-otp insert error", insertErr)
      return NextResponse.json({ error: "Could not issue code" }, { status: 500 })
    }

    const resend = new Resend(resendKey)
    await resend.emails.send({
      from: "Repsine <no-reply@repsine.com>",
      to: email,
      subject: `Your Repsine sign-in code: ${code}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #18181b;">
          <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px;">Your sign-in code</h1>
          <p style="font-size: 14px; color: #52525b; margin: 0 0 20px; line-height: 1.6;">
            Enter this code on the Repsine sign-in page. It expires in 10 minutes.
          </p>
          <div style="margin: 0 0 24px; padding: 24px; background: #fafafa; border-radius: 12px; text-align: center;">
            <div style="font-size: 36px; font-weight: 700; letter-spacing: 0.4em; color: #18181b; font-family: 'SF Mono', Menlo, monospace;">${code}</div>
          </div>
          <p style="font-size: 11px; color: #a1a1aa; line-height: 1.6;">
            If you didn&apos;t request this, you can safely ignore this email.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] request-otp error", err)
    return NextResponse.json({ error: "Could not send code" }, { status: 500 })
  }
}
