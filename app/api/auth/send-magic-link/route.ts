import { type NextRequest, NextResponse } from "next/server"
import { issueEmailAuth } from "@/lib/auth/issue-email"
import { sendMagicLinkEmail } from "@/lib/email/send"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { email, redirectTo } = (await req.json()) as {
      email?: string
      redirectTo?: string
    }

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Enter a valid email" }, { status: 400 })
    }

    const origin = new URL(req.url).origin
    const callback = redirectTo || `${origin}/auth/callback`

    const { actionLink } = await issueEmailAuth(email, callback)
    const { error } = await sendMagicLinkEmail(email, actionLink)

    if (error) {
      console.log("[v0] resend magic link error", error)
      return NextResponse.json({ error: "Could not send sign-in link" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] send-magic-link error", err)
    return NextResponse.json({ error: "Could not send sign-in link" }, { status: 500 })
  }
}
