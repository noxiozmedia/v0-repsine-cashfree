import { createAdminClient } from "@/lib/supabase/admin"

const USER_NOT_FOUND = /not found|no user|user.*does not exist|signups not allowed/i

/**
 * Generates a Supabase magic link + email OTP for the given email using the
 * service-role admin client. If the user does not exist yet, it is created so
 * sign-in can proceed (new users are routed to /auth/setup-password on login).
 *
 * Supabase does NOT send an email here — generateLink only mints the
 * link/OTP, which we deliver ourselves via Resend.
 */
export async function issueEmailAuth(email: string, redirectTo: string) {
  const admin = createAdminClient()

  async function generate() {
    return admin.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: { redirectTo },
    })
  }

  let { data, error } = await generate()

  // First-time visitor — create the account, then retry.
  if (error && USER_NOT_FOUND.test(error.message)) {
    const { error: createError } = await admin.auth.admin.createUser({
      email,
      email_confirm: false,
    })
    if (createError && !/already.*registered|already exists/i.test(createError.message)) {
      throw createError
    }
    ;({ data, error } = await generate())
  }

  if (error) throw error

  const hashedToken = data?.properties?.hashed_token
  const otp = data?.properties?.email_otp
  const verificationType = data?.properties?.verification_type ?? "magiclink"

  if (!hashedToken || !otp) {
    throw new Error("Failed to generate sign-in credentials")
  }

  // Build a link that points directly to OUR app's callback and verifies the
  // hashed token client-side. This avoids Supabase's hosted /auth/v1/verify
  // redirect, which otherwise sends users to the dashboard "Site URL"
  // (e.g. localhost) instead of the domain they're actually using.
  const base = redirectTo.split("?")[0]
  const actionLink = `${base}?token_hash=${encodeURIComponent(hashedToken)}&type=${encodeURIComponent(verificationType)}`

  return { actionLink, otp, hashedToken, verificationType }
}
