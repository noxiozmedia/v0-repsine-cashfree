import { NextResponse } from "next/server"
import { jsPDF } from "jspdf"
import { Resend } from "resend"
import { createAdminClient } from "@/lib/supabase/admin"

const CASHFREE_API_URL = "https://api.cashfree.com/pg/orders"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId, name, email, phone, test, amount } = body as {
      orderId?: string
      name?: string
      email?: string
      phone?: string
      test?: boolean
      amount?: number
    }

    if (!orderId || !email || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const appId = process.env.CASHFREE_APP_ID
    const secret = process.env.CASHFREE_SECRET_KEY
    const resendKey = process.env.Resend_API_KEY

    if (!resendKey) {
      return NextResponse.json({ error: "Resend API key missing" }, { status: 500 })
    }

    let orderAmount = 0
    const paidAt = new Date().toLocaleString("en-IN")

    if (test) {
      // Test bypass — skip Cashfree verification entirely.
      orderAmount = typeof amount === "number" && amount > 0 ? amount : 0
    } else {
      if (!appId || !secret) {
        return NextResponse.json({ error: "Cashfree credentials missing" }, { status: 500 })
      }

      // 1) Verify order is actually PAID before granting access
      const verifyRes = await fetch(`${CASHFREE_API_URL}/${encodeURIComponent(orderId)}`, {
        method: "GET",
        headers: {
          "x-client-id": appId,
          "x-client-secret": secret,
          "x-api-version": "2025-01-01",
        },
        cache: "no-store",
      })

      const order = await verifyRes.json()
      if (!verifyRes.ok || order?.order_status !== "PAID") {
        return NextResponse.json(
          { error: "Order is not PAID — access cannot be granted" },
          { status: 400 },
        )
      }

      orderAmount = Number(order.order_amount) || 0
    }

    // 2) Create or find Supabase user, then generate magic link
    const admin = createAdminClient()
    const origin = new URL(request.url).origin
    const redirectTo = `${origin}/auth/callback`

    // Try to create the user; if email already exists, that's fine.
    const { error: createErr } = await admin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        full_name: name,
        phone,
        password_set: false,
        latest_order_id: orderId,
      },
    })
    if (createErr && !createErr.message.toLowerCase().includes("already")) {
      console.log("[v0] createUser error", createErr)
    }

    // Generate a magic link the user can click to land directly in /dashboard
    const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: { redirectTo },
    })

    let magicLink: string | null = null
    if (linkErr) {
      console.log("[v0] generateLink error", linkErr)
    } else {
      magicLink = linkData?.properties?.action_link ?? null
    }

    // 3) Build receipt PDF
    const doc = new jsPDF()
    doc.setFont("helvetica", "bold")
    doc.setFontSize(22)
    doc.text("Payment Receipt", 20, 25)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(100)
    doc.text("Repsine — Payment Confirmation", 20, 33)

    doc.setDrawColor(220)
    doc.line(20, 40, 190, 40)

    doc.setTextColor(20)
    doc.setFontSize(12)

    const rows: Array<[string, string]> = [
      ["Status", "PAID"],
      ["Order ID", orderId],
      ["Amount", `INR ${orderAmount.toFixed(2)}`],
      ["Name", name],
      ["Email", email],
      ["WhatsApp", phone ? `+91 ${phone}` : "—"],
      ["Date", paidAt],
    ]

    let y = 52
    rows.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold")
      doc.text(label, 20, y)
      doc.setFont("helvetica", "normal")
      doc.text(value, 70, y)
      y += 9
    })

    doc.setDrawColor(220)
    doc.line(20, y + 4, 190, y + 4)

    doc.setFontSize(10)
    doc.setTextColor(120)
    doc.text("Thank you for your purchase.", 20, y + 14)
    doc.text("This is an automatically generated receipt from Repsine.", 20, y + 20)

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"))

    // 4) Send the welcome + receipt email
    const resend = new Resend(resendKey)

    const loginUrl = `${origin}/auth/login`
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #18181b;">
        <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">Welcome to Repsine, ${name.split(" ")[0]}!</h1>
        <p style="font-size: 14px; color: #52525b; margin: 0 0 20px; line-height: 1.6;">
          Your payment was successful and your account is ready. Use the button below to sign in to your dashboard whenever you&apos;re ready.
        </p>

        <div style="margin: 0 0 24px;">
          <a href="${loginUrl}" style="display: inline-block; background: #18181b; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none;">Sign in to dashboard</a>
          <p style="font-size: 11px; color: #a1a1aa; margin-top: 12px;">
            On the sign-in page, enter <span style="color: #18181b;">${email}</span> to receive a fresh one-time link. On your first sign-in, you&apos;ll be asked to set a password for future logins.
          </p>
        </div>

        <div style="border: 1px solid #e4e4e7; border-radius: 12px; padding: 20px; background: #fafafa; margin-bottom: 24px;">
          <p style="font-size: 13px; font-weight: 600; color: #18181b; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.04em;">Payment summary</p>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #71717a;">Order ID</td>
              <td style="padding: 6px 0; text-align: right; font-family: 'SF Mono', monospace; color: #18181b;">${orderId}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #71717a;">Amount Paid</td>
              <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #18181b;">INR ${orderAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #71717a;">Status</td>
              <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #16a34a;">PAID</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #71717a;">Date</td>
              <td style="padding: 6px 0; text-align: right; color: #18181b;">${paidAt}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 13px; color: #52525b; margin: 0 0 8px;">
          Your detailed receipt is attached as a PDF for your records.
        </p>

        <p style="font-size: 12px; color: #a1a1aa; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e4e4e7;">
          Need help? Just reply to this email and our team at support@repsine.com will get back to you.
        </p>
      </div>
    `

    const sent = await resend.emails.send({
      from: "Repsine <payments@repsine.com>",
      replyTo: "support@repsine.com",
      to: email,
      subject: `Welcome to Repsine — Receipt for order ${orderId}`,
      html,
      attachments: [
        {
          filename: `receipt-${orderId}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    if (sent.error) {
      console.log("[v0] Resend error", sent.error)
      // Don't fail the whole request: user is still created, link still returned
    }

    return NextResponse.json({
      ok: true,
      magicLink,
      messageId: sent.data?.id ?? null,
    })
  } catch (err) {
    console.log("[v0] post-payment error", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
