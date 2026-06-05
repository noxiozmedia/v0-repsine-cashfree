// Shared helpers for Meta Pixel (browser) + Conversions API (server) tracking.
// Both fire the SAME event with the SAME eventId so Meta deduplicates them.

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

export type MetaUserData = {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
}

export type MetaEventOptions = {
  eventName: string
  eventId: string
  // Standard custom_data fields
  value?: number
  currency?: string
  contentName?: string
  contentIds?: string[]
  user?: MetaUserData
}

// Generate a unique id used to deduplicate the Pixel + CAPI events.
export function newEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

// Read a cookie value (used to pass fbp/fbc to the server for better matching).
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : undefined
}

// Fire a standard event on the browser Pixel and mirror it through CAPI.
export function trackMeta(opts: MetaEventOptions) {
  const { eventName, eventId, value, currency = "INR", contentName, contentIds, user } = opts

  const customData: Record<string, unknown> = {}
  if (typeof value === "number") customData.value = value
  if (value !== undefined) customData.currency = currency
  if (contentName) customData.content_name = contentName
  if (contentIds) customData.content_ids = contentIds

  // 1) Browser Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, customData, { eventID: eventId })
  }

  // 2) Server-side Conversions API (fire-and-forget)
  if (typeof window !== "undefined") {
    const payload = {
      eventName,
      eventId,
      eventSourceUrl: window.location.href,
      customData,
      user,
      fbp: getCookie("_fbp"),
      fbc: getCookie("_fbc"),
    }
    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Non-fatal: pixel already fired client-side.
    })
  }
}
