import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string }
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const resendKey = process.env.Resend_API_KEY
    if (!resendKey) {
      return NextResponse.json({ error: "Resend API key missing" }, { status: 500 })
    }

    const admin = createAdminClient()
    const origin = new URL(request.url).origin
    const redirectTo = `${origin}/auth/callback`

    // Use "magiclink" type — generates a link only if the user already exists.
    // (We don't want to silently create accounts from the login page.)
    const { data, error } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: { redirectTo },
    })

    // If the user doesn't exist, return a generic OK so we don't leak which
    // emails are registered. Only the real ones get an email.
    if (error) {
      console.log("[v0] generateLink error", error.message)
      return NextResponse.json({ ok: true })
    }

    const actionLink = data?.properties?.action_link
    if (!actionLink) {
      return NextResponse.json({ ok: true })
    }

    const resend = new Resend(resendKey)
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; color: #18181b;">
        <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px;">Sign in to Repsine</h1>
        <p style="font-size: 14px; color: #52525b; margin: 0 0 24px; line-height: 1.6;">
          Click the button below to securely sign in to your dashboard. This link is valid for one hour and can only be used once.
        </p>
        <div style="margin: 0 0 28px;">
          <a href="${actionLink}" style="display: inline-block; background: #18181b; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none;">Sign in to dashboard</a>
        </div>
        <p style="font-size: 12px; color: #a1a1aa; margin: 0 0 4px;">
          Trouble with the button? Copy and paste this URL into your browser:
        </p>
        <p style="font-size: 11px; color: #71717a; word-break: break-all; margin: 0 0 28px;">
          ${actionLink}
        </p>
        <p style="font-size: 12px; color: #a1a1aa; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e4e4e7;">
          Didn&apos;t request this? You can safely ignore this email. Need help? Reply to this email and our team will get back to you.
        </p>
      </div>
    `

    const sent = await resend.emails.send({
      from: "Repsine <no-reply@repsine.com>",
      replyTo: "support@repsine.com",
      to: email,
      subject: "Your Repsine sign-in link",
      html,
    })

    if (sent.error) {
      console.log("[v0] send-magic-link Resend error", sent.error)
      return NextResponse.json({ error: "Could not send email" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] send-magic-link error", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
