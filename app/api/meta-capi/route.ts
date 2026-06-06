import { type NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"

export const runtime = "nodejs"

// Meta Conversions API endpoint version.
const API_VERSION = "v21.0"

// SHA-256 hash normalized PII as required by Meta.
function hash(value?: string | null): string[] | [null] {
  if (!value?.trim()) return [null] as unknown as [null]
  return [createHash("sha256").update(value.trim().toLowerCase()).digest("hex")]
}

// Phone: strip non-digits then hash. Must include country code e.g. 919876543210.
function hashPhone(value?: string | null): string[] | [null] {
  if (!value) return [null] as unknown as [null]
  let digits = value.replace(/\D/g, "")
  if (!digits) return [null] as unknown as [null]
  // Prepend India country code if not already present.
  if (!digits.startsWith("91") && digits.length === 10) digits = "91" + digits
  return [createHash("sha256").update(digits).digest("hex")]
}

export async function POST(req: NextRequest) {
  try {
    // Pixel ID hardcoded per Meta's manual install instructions.
    const pixelId = "839225112316916"
    const token = process.env.META_CAPI_ACCESS_TOKEN

    if (!token) {
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

    const now = Math.floor(Date.now() / 1000)

    // Build user_data with hashed arrays per Meta spec.
    const userData: Record<string, unknown> = {
      em: hash(user.email),
      ph: hashPhone(user.phone),
      fn: hash(user.firstName),
      client_user_agent: userAgent,
    }
    if (user.lastName) userData.ln = hash(user.lastName)
    if (ip) userData.client_ip_address = ip
    if (fbp) userData.fbp = fbp
    if (fbc) userData.fbc = fbc

    // Ensure currency is always set for Purchase/InitiateCheckout.
    const enrichedCustomData = {
      currency: "INR",
      ...customData,
    }

    const eventPayload: Record<string, unknown> = {
      event_name: eventName,
      event_time: now,
      event_id: eventId,
      action_source: "website",
      event_source_url: eventSourceUrl,
      user_data: userData,
      custom_data: enrichedCustomData,
      // Required per Meta's payload spec.
      original_event_data: {
        event_name: eventName,
        event_time: now,
      },
    }

    console.log("[v0] CAPI payload", JSON.stringify(eventPayload, null, 2))

    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [eventPayload],
        }),
      },
    )

    const result = await res.json()
    if (!res.ok) {
      console.log("[v0] Meta CAPI error", JSON.stringify(result))
      return NextResponse.json({ ok: false, error: result }, { status: 200 })
    }

    console.log("[v0] Meta CAPI success", JSON.stringify(result))
    return NextResponse.json({ ok: true, result })
  } catch (err) {
    console.log("[v0] Meta CAPI route error", err)
    return NextResponse.json({ ok: false, error: "CAPI request failed" }, { status: 200 })
  }
}
