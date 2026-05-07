import { createAdminClient } from "@/lib/supabase/admin"
import { Resend } from "resend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const resendKey = process.env.Resend_API_KEY
    if (!resendKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const admin = createAdminClient()

    // Check if user exists - if not, they haven't purchased
    const { data: existingUser } = await admin.auth.admin.listUsers()
    const userExists = existingUser?.users?.some(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    )

    if (!userExists) {
      return NextResponse.json(
        { error: "No account found with this email. Please purchase first." },
        { status: 404 }
      )
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Invalidate any existing codes for this email
    await admin
      .from("verification_codes")
      .delete()
      .eq("email", email.toLowerCase())

    // Store the new code
    const { error: insertError } = await admin.from("verification_codes").insert({
      email: email.toLowerCase(),
      code,
      expires_at: expiresAt.toISOString(),
    })

    if (insertError) {
      console.log("[v0] Failed to store code:", insertError)
      return NextResponse.json({ error: "Failed to generate code" }, { status: 500 })
    }

    // Send email via Resend
    const resend = new Resend(resendKey)
    const { error: emailError } = await resend.emails.send({
      from: "Repsine <no-reply@repsine.com>",
      replyTo: "support@repsine.com",
      to: email,
      subject: `Your sign-in code: ${code}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
          <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 16px; color: #18181b;">Your sign-in code</h1>
          <p style="font-size: 14px; color: #52525b; margin: 0 0 24px; line-height: 1.6;">
            Enter this code on the sign-in page to access your Repsine dashboard:
          </p>
          <div style="background: #f4f4f5; border-radius: 12px; padding: 24px; text-align: center; margin: 0 0 24px;">
            <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #18181b;">${code}</span>
          </div>
          <p style="font-size: 12px; color: #a1a1aa; margin: 0; line-height: 1.5;">
            This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    })

    if (emailError) {
      console.log("[v0] Failed to send code email:", emailError)
      return NextResponse.json({ error: "Failed to send code" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] send-code error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
