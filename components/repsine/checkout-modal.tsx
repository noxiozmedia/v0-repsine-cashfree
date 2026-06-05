"use client"

import { useEffect, useRef, useState } from "react"
import { X, Lock, Loader2, CheckCircle2, ShieldCheck } from "lucide-react"

const COURSE_PRICE = 1299
const ORIGINAL_PRICE = 4999

type Stage = "details" | "submitting" | "success"

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

  const dialogRef = useRef<HTMLDivElement>(null)

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
    setStage("details")
    setName("")
    setEmail("")
    setPhone("")
    setErrors({})
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

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setStage("submitting")
    // Simulated submit — replace with real API later
    await new Promise((r) => setTimeout(r, 900))
    setStage("success")
  }

  if (!open) return null

  const savings = ORIGINAL_PRICE - COURSE_PRICE

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose()
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
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(95svh-49px)] overflow-y-auto sm:max-h-[calc(90vh-49px)]">
          {(stage === "details" || stage === "submitting") && (
            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 text-left">
              {/* Order summary card */}
              <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-bold text-foreground">
                      Canva Mastery Course
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      One-time payment · Lifetime access
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-foreground">
                      ₹{COURSE_PRICE.toLocaleString("en-IN")}
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

              <button
                type="submit"
                disabled={stage === "submitting"}
                className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {stage === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" /> Continue
                  </>
                )}
              </button>

              <div className="flex flex-col items-start gap-2 border-t border-border/60 pt-4">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span>256-bit SSL Encryption · 7-day Refund Policy</span>
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

          {stage === "success" && (
            <div className="px-6 py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="font-display mt-5 text-xl font-bold text-foreground">
                Details Received
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We&apos;ve received your details. Your secure payment link will be sent to{" "}
                <span className="font-medium text-foreground">{email}</span> shortly.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
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
