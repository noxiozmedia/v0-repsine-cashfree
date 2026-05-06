import { NextResponse } from "next/server"
import { jsPDF } from "jspdf"
import { Resend } from "resend"

const CASHFREE_API_URL = "https://api.cashfree.com/pg/orders"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId, name, email, phone } = body as {
      orderId?: string
      name?: string
      email?: string
      phone?: string
    }

    if (!orderId || !email || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const appId = process.env.CASHFREE_APP_ID
    const secret = process.env.CASHFREE_SECRET_KEY
    const resendKey = process.env.Resend_API_KEY

    if (!appId || !secret) {
      return NextResponse.json({ error: "Cashfree credentials missing" }, { status: 500 })
    }
    if (!resendKey) {
      return NextResponse.json({ error: "Resend API key missing" }, { status: 500 })
    }

    // Verify order is actually PAID before sending receipt
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
        { error: "Order is not PAID — receipt cannot be sent" },
        { status: 400 },
      )
    }

    const orderAmount = Number(order.order_amount) || 0
    const paidAt = new Date().toLocaleString("en-IN")

    // ---- Generate PDF ----
    const doc = new jsPDF()
    doc.setFont("helvetica", "bold")
    doc.setFontSize(22)
    doc.text("Payment Receipt", 20, 25)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(100)
    doc.text("Repsine — Test Payment Confirmation", 20, 33)

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
    doc.text("Thank you for your payment.", 20, y + 14)
    doc.text("This is an automatically generated receipt from Repsine.", 20, y + 20)

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"))

    // ---- Send via Resend ----
    const resend = new Resend(resendKey)

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #18181b;">
        <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px;">Payment Successful</h1>
        <p style="font-size: 14px; color: #52525b; margin: 0 0 24px;">
          Hi ${name}, thank you for your payment. Your transaction was processed successfully.
        </p>

        <div style="border: 1px solid #e4e4e7; border-radius: 12px; padding: 20px; background: #fafafa; margin-bottom: 24px;">
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
          This is an automated confirmation from Repsine. If you did not authorize this payment, please reach out to support@repsine.com.
        </p>
      </div>
    `

    const sent = await resend.emails.send({
      from: "Repsine Payments <payments@repsine.com>",
      replyTo: "support@repsine.com",
      to: email,
      subject: `Payment receipt — Order ${orderId}`,
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
      return NextResponse.json({ error: "Could not send email" }, { status: 500 })
    }

    return NextResponse.json({ ok: true, messageId: sent.data?.id })
  } catch (err) {
    console.log("[v0] send-receipt error", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
