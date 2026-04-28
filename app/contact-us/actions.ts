"use server"

export async function submitContact(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in all fields." }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return { ok: false, error: "Please enter a valid email address." }
  }

  // Basic logging for now — wire this up to an email/service later.
  console.log("[v0] New contact submission:", { name, email, message })

  return { ok: true }
}
