// Dashboard preview / demo-account access.
//
// When enabled, the dashboard is viewable WITHOUT a real Supabase session so
// the UI can be designed and edited freely. This is ON automatically in local
// / v0 dev preview (NODE_ENV !== "production"), and can be force-enabled on a
// deployed environment by setting DASHBOARD_PREVIEW="true".
//
// On the real production site (NODE_ENV === "production" and the flag unset)
// it is OFF, so auth still fully protects /dashboard.
export function isDashboardPreview(): boolean {
  if (process.env.DASHBOARD_PREVIEW === "true") return true
  return process.env.NODE_ENV !== "production"
}

// Stand-in identity used to render the dashboard in preview mode.
export const DEMO_USER = {
  email: "demo@repsine.com",
  fullName: "Demo User",
}
