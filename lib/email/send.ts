import { Resend } from "resend"

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Repsine <support@repsine.com>"

let resendClient: Resend | null = null

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error("Missing RESEND_API_KEY env var")
  if (!resendClient) resendClient = new Resend(key)
  return resendClient
}

const shell = (heading: string, body: string) => `
  <div style="background:#f5f5f4;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:440px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:16px;overflow:hidden;">
      <div style="padding:28px 32px 8px;">
        <p style="margin:0;font-size:18px;font-weight:700;color:#0c0a09;letter-spacing:-0.01em;">Repsine</p>
      </div>
      <div style="padding:8px 32px 32px;">
        <h1 style="margin:0 0 12px;font-size:20px;line-height:1.3;font-weight:600;color:#0c0a09;">${heading}</h1>
        ${body}
      </div>
      <div style="padding:16px 32px;background:#fafaf9;border-top:1px solid #e7e5e4;">
        <p style="margin:0;font-size:12px;line-height:1.5;color:#78716c;">
          If you didn&rsquo;t request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  </div>
`

export async function sendMagicLinkEmail(to: string, actionLink: string) {
  const body = `
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#44403c;">
      Click the button below to securely sign in to your Repsine account. This link expires in 1 hour.
    </p>
    <a href="${actionLink}" style="display:inline-block;background:#0c0a09;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:10px;">
      Sign in to Repsine
    </a>
    <p style="margin:20px 0 0;font-size:12px;line-height:1.6;color:#78716c;word-break:break-all;">
      Or paste this link into your browser:<br />
      <span style="color:#44403c;">${actionLink}</span>
    </p>
  `
  return getResend().emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Your Repsine sign-in link",
    html: shell("Sign in to Repsine", body),
  })
}

export async function sendOtpEmail(to: string, otp: string) {
  const body = `
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#44403c;">
      Enter this code to sign in to your Repsine account. It expires in 1 hour.
    </p>
    <div style="font-size:32px;font-weight:700;letter-spacing:0.3em;color:#0c0a09;background:#f5f5f4;border:1px solid #e7e5e4;border-radius:12px;padding:16px;text-align:center;">
      ${otp}
    </div>
  `
  return getResend().emails.send({
    from: FROM_EMAIL,
    to,
    subject: `${otp} is your Repsine code`,
    html: shell("Your sign-in code", body),
  })
}
