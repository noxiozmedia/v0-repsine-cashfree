import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const { templateTitle, userEmail } = await request.json() as {
      templateTitle?: string
      userEmail?: string
    }

    if (!templateTitle || !userEmail) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const resendKey = process.env.Resend_API_KEY
    if (!resendKey) {
      return NextResponse.json({ error: "Resend key missing" }, { status: 500 })
    }

    const resend = new Resend(resendKey)

    const sent = await resend.emails.send({
      from: "Repsine <support@repsine.com>",
      to: "contacthridaydas@gmail.com",
      replyTo: userEmail,
      subject: `Tutorial Request: ${templateTitle}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #18181b;">
          <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 16px;">Tutorial Request</h2>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse; border: 1px solid #e4e4e7; border-radius: 10px; overflow: hidden;">
            <tr style="background: #fafafa;">
              <td style="padding: 10px 16px; color: #71717a; width: 40%;">Template</td>
              <td style="padding: 10px 16px; font-weight: 600;">${templateTitle}</td>
            </tr>
            <tr>
              <td style="padding: 10px 16px; color: #71717a; border-top: 1px solid #e4e4e7;">Customer Email</td>
              <td style="padding: 10px 16px; border-top: 1px solid #e4e4e7;">${userEmail}</td>
            </tr>
          </table>
          <p style="font-size: 12px; color: #a1a1aa; margin-top: 24px;">Sent from Repsine Dashboard — you can reply directly to this email to contact the customer.</p>
        </div>
      `,
    })

    if (sent.error) {
      console.log("[v0] request-tutorial resend error", sent.error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] request-tutorial error", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
