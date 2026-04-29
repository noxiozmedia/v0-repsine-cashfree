import { NextRequest, NextResponse } from "next/server"

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID!
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY!
const CASHFREE_API_URL = "https://api.cashfree.com/pg/orders"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, amount } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const orderAmount = typeof amount === "number" && amount > 0 ? amount : 1299

    // Create order with Cashfree
    const orderPayload = {
      order_amount: orderAmount,
      order_currency: "INR",
      order_id: `order_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      customer_details: {
        customer_id: `customer_${Date.now()}`,
        customer_name: name,
        customer_email: email,
        customer_phone: phone.replace(/\D/g, ""),
      },
      order_meta: {
        return_url: `${request.nextUrl.origin}/payment-success?order_id={order_id}`,
        notify_url: `${request.nextUrl.origin}/api/webhook/cashfree`,
      },
    }

    const response = await fetch(CASHFREE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2025-01-01",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
      },
      body: JSON.stringify(orderPayload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Cashfree API error:", errorData)
      return NextResponse.json(
        { error: "Failed to create order", details: errorData },
        { status: response.status },
      )
    }

    const orderData = await response.json()
    console.log("[v0] Order created successfully:", orderData.order_id)

    return NextResponse.json({
      order_id: orderData.order_id,
      payment_session_id: orderData.payment_session_id,
      order_status: orderData.order_status,
    })
  } catch (error) {
    console.error("[v0] Create order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
