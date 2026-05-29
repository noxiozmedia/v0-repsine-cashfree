import { NextResponse, type NextRequest } from "next/server"
import { PREVIEW_COOKIE } from "@/lib/auth/preview"

// Dev/demo entry point. Sets the preview cookie, then redirects into the real
// dashboard so all internal navigation stays unauthenticated. No account needed.
export function GET(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/dashboard", request.url))
  res.cookies.set(PREVIEW_COOKIE, "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
  })
  return res
}
