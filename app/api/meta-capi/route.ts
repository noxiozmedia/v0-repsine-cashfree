import { type NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"

// Meta Conversions API endpoint version.
const API_VERSION = "v21.0"

// SHA-256 hash normalized PII, as required by Meta for advanced matching.
function hash(value?: string | null) {
  if (!value) return undefined
  const normalized = value.trim().toLowerCase()
  if (!normalized) return undefined
  return createHash("sha256").update(normalized).digest("hex")
}

// Phone numbers: strip non-digits, then hash (with country code if present).
function hashPhone(value?: string | null) {
  if (!value) return undefined
  const digits = value.replace(/\D/g, "")
  if (!digits) return undefined
  return createHash("sha256").update(digits).digest("hex")
}

export async function POST(req: NextRequest) {
  try {
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
    const token = process.env.META_CAPI_ACCESS_TOKEN

    if (!pixelId || !token) {
      // Don't error the client flow if CAPI isn't configured.
      return NextResponse.json({ ok: false, skipped: true })
    }

    const body = await req.json()
    const {
      eventName,
      eventId,
      eventSourceUrl,
      customData = {},
      user = {},
      fbp,
      fbc,
    } = body as {
      eventName: string
      eventId: string
      eventSourceUrl?: string
      customData?: Record<string, unknown>
      user?: { email?: string; phone?: string; firstName?: string; lastName?: string }
      fbp?: string
      fbc?: string
    }

    if (!eventName || !eventId) {
      return NextResponse.json({ ok: false, error: "Missing eventName or eventId" }, { status: 400 })
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined
    const userAgent = req.headers.get("user-agent") || undefined

    const userData: Record<string, unknown> = {
      em: hash(user.email),
      ph: hashPhone(user.phone),
      fn: hash(user.firstName),
      ln: hash(user.lastName),
      client_ip_address: ip,
      client_user_agent: userAgent,
      fbp,
      fbc,
    }
    // Strip undefined keys
    Object.keys(userData).forEach((k) => userData[k] === undefined && delete userData[k])

    const eventPayload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      event_source_url: eventSourceUrl,
      user_data: userData,
      custom_data: customData,
    }

    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [eventPayload] }),
      },
    )

    const result = await res.json()
    if (!res.ok) {
      console.log("[v0] Meta CAPI error", result)
      return NextResponse.json({ ok: false, error: result }, { status: 200 })
    }

    return NextResponse.json({ ok: true, result })
  } catch (err) {
    console.log("[v0] Meta CAPI route error", err)
    return NextResponse.json({ ok: false, error: "CAPI request failed" }, { status: 200 })
  }
}
