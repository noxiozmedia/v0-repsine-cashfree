import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 })
    }

    const res = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, {
      method: "GET",
      headers: {
        "x-api-version": "2025-01-01",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
      },
      cache: "no-store",
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Status check failed" }, { status: res.status })
    }

    return NextResponse.json({
      order_status: data.order_status,
      order_id: data.order_id,
      order_amount: data.order_amount,
    })
  } catch (err) {
    console.log("[v0] order-status route error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
