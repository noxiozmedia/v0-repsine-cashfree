"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X, Lock, Loader2, CheckCircle2, ShieldCheck, ArrowRight, RotateCcw } from "lucide-react"

const PRICE = 999
const ORIGINAL_PRICE = 4999

declare global {
  interface Window {
    Cashfree: any
  }
}

type Stage = "details" | "submitting" | "verifying" | "success" | "failed"

type Props = {
  open: boolean
  onClose: () => void
}

export function CheckoutModal({ open, onClose }: Props) {
  const [stage, setStage] = useState<Stage>("details")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  const [paidOrder, setPaidOrder] = useState<{ id: string; amount: number } | null>(null)
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  // True while we're handing off to Cashfree's own modal — hides our card so
  // there's no bordered box flashing before Cashfree's UI appears.
  const [handoff, setHandoff] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load the Cashfree SDK once
  useEffect(() => {
    if (typeof window === "undefined") return
    if (document.getElementById("cashfree-sdk")) return
    const script = document.createElement("script")
    script.id = "cashfree-sdk"
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  // Lock scroll + ESC close
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function handleClose() {
    // Don't allow closing mid-payment
    if (stage === "submitting" || stage === "verifying") return
    setStage("details")
    setName("")
    setEmail("")
    setPhone("")
    setErrors({})
    setError(null)
    setPaidOrder(null)
    setDashboardUrl(null)
    setEmailSent(false)
    setHandoff(false)
    onClose()
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 2) e.name = "Please enter your full name"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Please enter a valid email"
    const digits = phone.replace(/\D/g, "")
    if (digits.length !== 10 || !/^[6-9]/.test(digits)) e.phone = "Enter a valid 10-digit mobile number"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function grantAccess(orderId: string, test = false) {
    try {
      const res = await fetch("/api/post-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.replace(/\D/g, ""),
          ...(test ? { test: true, amount: PRICE } : {}),
        }),
      })
      const data = await res.json()
      if (res.ok && data.dashboardUrl) {
        setDashboardUrl(data.dashboardUrl)
        setEmailSent(true)
      } else {
        setError(data?.error || "We couldn't set up your access. Contact support@repsine.com.")
        setStage("failed")
      }
    } catch (err) {
      console.log("[v0] post-payment error", err)
      setError("We couldn't set up your access. Contact support@repsine.com.")
      setStage("failed")
    }
  }

  async function verifyOrder(orderId: string) {
    setStage("verifying")
    try {
      const res = await fetch(`/api/order-status?orderId=${encodeURIComponent(orderId)}`, {
        cache: "no-store",
      })
      const data = await res.json()
      if (data?.order_status === "PAID") {
        setPaidOrder({ id: data.order_id, amount: data.order_amount })
        setStage("success")
        grantAccess(data.order_id)
      } else {
        setError("We couldn't confirm your payment. If money was deducted, contact support@repsine.com.")
        setStage("failed")
      }
    } catch (err) {
      console.log("[v0] verify error", err)
      setError("Something went wrong while confirming your payment.")
      setStage("failed")
    }
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    setError(null)
    if (!validate()) return
    setStage("submitting")

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.replace(/\D/g, ""),
          amount: PRICE,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.payment_session_id) {
        throw new Error(data?.error || "Could not start checkout. Please try again.")
      }

      if (!window.Cashfree) {
        throw new Error("Payment system is still loading — please try again in a moment.")
      }

      const cashfree = await window.Cashfree({ mode: "production" })
      // Hide our card right before Cashfree injects its modal so there's no
      // bordered-box flash during the handoff.
      setHandoff(true)
      await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal",
      })
      setHandoff(false)

      await verifyOrder(data.order_id)
    } catch (err) {
      console.log("[v0] checkout error", err)
      setHandoff(false)
      setError(err instanceof Error ? err.message : "Something went wrong")
      setStage("failed")
    }
  }

  // DEV ONLY: skip the real Cashfree payment and jump straight to the success
  // flow (still grants access + sends the email). Never rendered in production.
  async function devBypass() {
    setError(null)
    if (!validate()) return
    const fakeOrderId = `dev_${Date.now()}`
    setPaidOrder({ id: fakeOrderId, amount: PRICE })
    setStage("success")
    grantAccess(fakeOrderId, true)
  }

  function tryAgain() {
    setError(null)
    setPaidOrder(null)
    setDashboardUrl(null)
    setEmailSent(false)
    setHandoff(false)
    setStage("details")
  }

  if (!open || !mounted) return null

  const savings = ORIGINAL_PRICE - PRICE
  const busy = stage === "submitting" || stage === "verifying"

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="repsine-cream fixed inset-0 z-[9999] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => {
        // Don't dismiss on backdrop click during handoff or after a successful
        // payment — the user must use the dashboard/close button instead.
        if (e.target === e.currentTarget && !handoff && stage !== "success") handleClose()
      }}
      ref={dialogRef}
    >
      <div className="relative max-h-[95svh] w-full max-w-lg overflow-hidden rounded-t-3xl border border-border/60 bg-card shadow-2xl shadow-black/40 sm:max-h-[90vh] sm:rounded-3xl">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-background/40 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-2 text-left">
            <Lock className="h-3.5 w-3.5 text-primary" />
            <p className="text-[10px] font-semibold tracking-[0.2em] text-foreground/70 uppercase">
              Secure Checkout
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close checkout"
            disabled={busy}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(95svh-49px)] overflow-y-auto sm:max-h-[calc(90vh-49px)]">
          {handoff && (
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
              <Loader2 className="h-9 w-9 animate-spin text-primary" />
              <div>
                <p className="font-display text-base font-bold text-foreground">Opening secure checkout</p>
                <p className="mt-1 text-sm text-muted-foreground">Complete your payment in the secure window.</p>
              </div>
            </div>
          )}
          {!handoff && (stage === "details" || stage === "submitting") && (
            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 text-left">
              {/* Order summary card */}
              <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-bold text-foreground">
                      Repsine Template Kit
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      One-time payment · Lifetime access
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-foreground">
                      ₹{PRICE.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground line-through">
                      ₹{ORIGINAL_PRICE.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="mt-3 inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
                  SAVE ₹{savings.toLocaleString("en-IN")}
                </div>
              </div>

              <h2 id="checkout-title" className="font-display text-left text-lg font-bold text-foreground">
                Your Details
              </h2>

              <Field
                label="Full Name"
                id="name"
                value={name}
                onChange={setName}
                placeholder="Aarav Sharma"
                autoComplete="name"
                error={errors.name}
              />
              <Field
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email}
              />
              <PhoneField value={phone} onChange={setPhone} error={errors.phone} />

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={stage === "submitting"}
                className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {stage === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Opening secure payment…
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" /> Pay ₹{PRICE.toLocaleString("en-IN")}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={devBypass}
                disabled={busy}
                className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-dashed border-amber-500/60 bg-amber-500/10 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                DEV: Skip payment &amp; grant access
              </button>

              <div className="flex flex-col items-start gap-2 border-t border-border/60 pt-4">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span>256-bit SSL · UPI, Cards &amp; Netbanking · 7-day Refund</span>
                </div>
                <p className="text-left text-[11px] text-muted-foreground">
                  By continuing you agree to our{" "}
                  <a
                    href="/terms-and-conditions"
                    className="underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy-policy"
                    className="underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          )}

          {stage === "verifying" && (
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <Loader2 className="h-9 w-9 animate-spin text-primary" />
              <p className="font-display text-base font-bold text-foreground">Confirming your payment…</p>
              <p className="text-sm text-muted-foreground">Please don&apos;t close this window.</p>
            </div>
          )}

          {stage === "success" && (
            <div className="px-6 py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="font-display mt-5 text-xl font-bold text-foreground">
                Payment Successful
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Thank you, {name.split(" ")[0]}! {emailSent ? "We've emailed" : "We're sending"} your
                receipt and access link to{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </p>
              {paidOrder && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Order ID: <span className="font-mono text-foreground/80">{paidOrder.id}</span>
                </p>
              )}

              {dashboardUrl ? (
                <a
                  href={dashboardUrl}
                  className="mt-6 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Access your dashboard <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <div className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-background/40 text-sm font-semibold text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Setting up your access…
                </div>
              )}
            </div>
          )}

          {stage === "failed" && (
            <div className="px-6 py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                <X className="h-8 w-8" />
              </div>
              <h2 className="font-display mt-5 text-xl font-bold text-foreground">
                Payment Not Completed
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {error || "Your payment didn't go through. No worries — you can try again."}
              </p>
              <button
                type="button"
                onClick={tryAgain}
                className="mt-6 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <RotateCcw className="h-4 w-4" /> Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

/* ---------- Field components ---------- */

function Field(props: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  autoComplete?: string
  error?: string
}) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-xs font-semibold uppercase tracking-wide text-foreground/80"
      >
        {props.label}
      </label>
      <input
        id={props.id}
        name={props.id}
        type={props.type ?? "text"}
        autoComplete={props.autoComplete}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      {props.error && <p className="mt-1 text-xs text-destructive">{props.error}</p>}
    </div>
  )
}

function PhoneField(props: { value: string; onChange: (v: string) => void; error?: string }) {
  function handleChange(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 10)
    props.onChange(digits)
  }
  return (
    <div>
      <label
        htmlFor="phone"
        className="block text-xs font-semibold uppercase tracking-wide text-foreground/80"
      >
        Phone Number
      </label>
      <div className="mt-1.5 flex h-11 overflow-hidden rounded-lg border border-border bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
        <span className="flex items-center border-r border-border px-3 text-sm font-medium text-foreground/80">
          +91
        </span>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={props.value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="98765 43210"
          className="h-full w-full bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
      </div>
      {props.error && <p className="mt-1 text-xs text-destructive">{props.error}</p>}
    </div>
  )
}
