// Dashboard preview / demo-account access.
//
// The dashboard can be viewed WITHOUT a real Supabase session in two cases:
//   1. Local / v0 dev preview (NODE_ENV !== "production"), or the
//      DASHBOARD_PREVIEW="true" env flag is set on a deployment.
//   2. The visitor entered through /dashboard-test, which sets a preview
//      cookie. This lets you demo the dashboard on the PUBLISHED site without
//      logging in. All /dashboard navigation then stays unauthenticated until
//      the cookie expires or is cleared.
//
// Visiting /dashboard directly (no cookie, no flag) on production still
// requires a real authenticated user.

export const PREVIEW_COOKIE = "dashboard_preview"

// Env-based preview: true in dev, or when DASHBOARD_PREVIEW is forced on.
export function isPreviewEnv(): boolean {
  if (process.env.DASHBOARD_PREVIEW === "true") return true
  return process.env.NODE_ENV !== "production"
}

// Stand-in identity used to render the dashboard in preview / demo mode.
export const DEMO_USER = {
  email: "demo@repsine.com",
  fullName: "Demo User",
}
