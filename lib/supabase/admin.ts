import { createClient } from "@supabase/supabase-js"

/**
 * Service-role Supabase client for privileged server-only operations
 * (generating auth links/OTPs, creating users, etc.).
 *
 * NEVER import this into client components — it uses the service role key
 * which bypasses Row Level Security.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) throw new Error("Missing SUPABASE URL env var")
  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY env var")

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
