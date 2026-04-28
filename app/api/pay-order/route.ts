import { NextResponse } from "next/server"

const CASHFREE_API_URL = "https://api.cashfree.com/pg/orders/sessions"

type PayOrderRequest = {
  paymentSessionId: string
  method: "upi-qr" | "upi-collect" | "upi-intent" | "netbanking"
  upiId?: string
  bankCode?: number
  appName?: "gpay" | "phonepe" | "paytm" | "bhim"
}

export async function POST(request: Request) {
  try {
    const body: PayOrderRequest = await request.json()
    const { paymentSessionId, method } = body

    if (!paymentSessionId || !method) {
      return NextResponse.json({ error: "Missing payment_session_id or method" }, { status: 400 })
    }

    let payment_method: Record<string, unknown> = {}

    if (method === "upi-qr") {
      payment_method = { upi: { channel: "qrcode" } }
    } else if (method === "upi-collect") {
      if (!body.upiId) return NextResponse.json({ error: "UPI ID required" }, { status: 400 })
      payment_method = { upi: { channel: "collect", upi_id: body.upiId } }
    } else if (method === "upi-intent") {
      payment_method = { upi: { channel: "link" } }
    } else if (method === "netbanking") {
      if (!body.bankCode) return NextResponse.json({ error: "Bank code required" }, { status: 400 })
      payment_method = { netbanking: { channel: "link", netbanking_bank_code: body.bankCode } }
    } else {
      return NextResponse.json({ error: "Unsupported payment method" }, { status: 400 })
    }

    const cashfreeRes = await fetch(CASHFREE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2025-01-01",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
      },
      body: JSON.stringify({
        payment_session_id: paymentSessionId,
        payment_method,
      }),
    })

    const data = await cashfreeRes.json()

    if (!cashfreeRes.ok) {
      console.log("[v0] Cashfree pay-order error:", data)
      return NextResponse.json(
        { error: data.message || "Payment initiation failed", details: data },
        { status: cashfreeRes.status },
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    console.log("[v0] pay-order route error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
