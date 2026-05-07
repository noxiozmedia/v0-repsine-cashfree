import { NextResponse } from "next/server"
import { Resend } from "resend"
import { randomBytes } from "node:crypto"
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

    // Best-effort check: only emit "user not found" if we are sure no user exists.
    // Don't block on this check — we still let unknown emails request a link, and
    // the consume step will short-circuit if the user truly doesn't exist.
    // (We don't reveal account existence to prevent enumeration.)

    const token = randomBytes(32).toString("base64url")
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour

    const { error: insertErr } = await admin.from("auth_tokens").insert({
      email,
      token,
      kind: "magiclink",
      expires_at: expiresAt,
    })
    if (insertErr) {
      console.log("[v0] request-magic-link insert error", insertErr)
      return NextResponse.json({ error: "Could not issue link" }, { status: 500 })
    }

    const origin = new URL(request.url).origin
    const verifyUrl = `${origin}/auth/verify?token=${token}`

    const resend = new Resend(resendKey)
    await resend.emails.send({
      from: "Repsine <no-reply@repsine.com>",
      to: email,
      subject: "Your Repsine sign-in link",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #18181b;">
          <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px;">Sign in to Repsine</h1>
          <p style="font-size: 14px; color: #52525b; margin: 0 0 20px; line-height: 1.6;">
            Click the button below to sign in. This link is valid for one hour and can only be used once.
          </p>
          <div style="margin: 0 0 24px;">
            <a href="${verifyUrl}" style="display: inline-block; background: #18181b; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none;">Sign in to dashboard</a>
          </div>
          <p style="font-size: 11px; color: #a1a1aa; line-height: 1.6;">
            If you didn&apos;t request this email, you can safely ignore it. The link expires automatically.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] request-magic-link error", err)
    return NextResponse.json({ error: "Could not send sign-in link" }, { status: 500 })
  }
}
