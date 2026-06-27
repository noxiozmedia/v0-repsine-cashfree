import { type NextRequest, NextResponse } from "next/server"
import { issueEmailAuth } from "@/lib/auth/issue-email"
import { sendOtpEmail } from "@/lib/email/send"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string }

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Enter a valid email" }, { status: 400 })
    }

    const origin = new URL(req.url).origin
    const { otp } = await issueEmailAuth(email, `${origin}/auth/callback`)
    const { error } = await sendOtpEmail(email, otp)

    if (error) {
      console.log("[v0] resend otp error", error)
      return NextResponse.json({ error: "Could not send code" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] send-otp error", err)
    return NextResponse.json({ error: "Could not send code" }, { status: 500 })
  }
}
