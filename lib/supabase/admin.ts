import { createClient } from "@supabase/supabase-js"

/**
 * Service-role Supabase client for SERVER-SIDE ONLY operations
 * (creating users, generating magic links, etc.).
 * Never import this from client code.
 */
export function createAdminClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase admin env vars (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)")
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
