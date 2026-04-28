"use client"

import { useEffect, useId, useState } from "react"
import { ChevronRight, Lock, Mail, Phone, Shield, User, X } from "lucide-react"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    Cashfree: any
  }
}

const COURSE_PRICE = 1299
const COURSE_MRP = 4999

type CheckoutModalProps = {
  open: boolean
  onClose: () => void
}

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const titleId = useId()
  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  // Load Cashfree SDK once when modal first opens
  useEffect(() => {
    if (!open) return
    if (document.getElementById("cashfree-sdk")) return
    const script = document.createElement("script")
    script.id = "cashfree-sdk"
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"
    script.async = true
    document.body.appendChild(script)
  }, [open])

  function validate() {
    const next: typeof errors = {}
    if (!form.name.trim() || form.name.trim().length < 2) next.name = "Please enter your full name"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address"
    if (!/^[6-9]\d{9}$/.test(form.phone))
      next.phone = "Enter a valid 10-digit Indian mobile number"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError(null)
    if (!validate()) return

    setSubmitting(true)
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.payment_session_id) {
        throw new Error(data?.error || "Failed to initiate payment")
      }

      // Wait for Cashfree SDK to be ready
      const start = Date.now()
      while (!window.Cashfree && Date.now() - start < 8000) {
        await new Promise((r) => setTimeout(r, 100))
      }
      if (!window.Cashfree) {
        throw new Error("Payment system is taking too long. Please try again.")
      }

      // Open Cashfree as an overlay modal — user stays on our page
      const cashfree = await window.Cashfree({ mode: "production" })
      await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal",
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setApiError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close checkout"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-background/80 backdrop-blur-sm"
      />

      <div className="relative z-10 mx-auto flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl border border-border bg-card text-foreground shadow-2xl shadow-primary/20 sm:rounded-3xl">
        {/* Header */}
        <div className="relative bg-[linear-gradient(135deg,oklch(0.25_0.12_280)_0%,oklch(0.18_0.08_260)_100%)] px-6 py-5 text-left">
          <div className="flex items-start justify-between text-left">
            <div>
              <p className="text-left text-[10px] font-semibold tracking-[0.2em] text-foreground/70 uppercase">
                Secure Checkout
              </p>
              <h2
                id={titleId}
                className="font-display mt-1 text-left text-xl font-bold tracking-tight text-foreground"
              >
                Canva Mastery
              </h2>
              <p className="mt-1 text-left text-xs text-foreground/70">
                Beginner to Advanced — Lifetime Access
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background/40 text-foreground/80 transition-colors hover:bg-background/60 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto px-6 py-6 text-left">
          {/* Order summary */}
          <div className="rounded-xl border border-border/60 bg-background/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-left">
                <p className="font-semibold text-foreground">Canva Mastery Course</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  One-time payment · Lifetime access
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg font-bold text-foreground">
                  ₹{COURSE_PRICE.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-muted-foreground line-through">
                  ₹{COURSE_MRP.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-1 text-[10px] font-semibold tracking-wide text-primary uppercase">
              Save ₹{(COURSE_MRP - COURSE_PRICE).toLocaleString("en-IN")}
            </div>
          </div>

          {/* Customer details */}
          <Field
            id="checkout-name"
            label="Full Name"
            icon={<User className="h-4 w-4" />}
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            placeholder="Aarav Sharma"
            error={errors.name}
            autoComplete="name"
          />
          <Field
            id="checkout-email"
            label="Email"
            type="email"
            icon={<Mail className="h-4 w-4" />}
            value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
            placeholder="you@example.com"
            error={errors.email}
            autoComplete="email"
            hint="Course access link will be sent here."
          />
          <PhoneField
            id="checkout-phone"
            value={form.phone}
            onChange={(v) =>
              setForm((p) => ({ ...p, phone: v.replace(/\D/g, "").slice(0, 10) }))
            }
            error={errors.phone}
          />

          {apiError && (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
              {apiError}
            </p>
          )}

          {/* Pay CTA */}
          <button
            type="submit"
            disabled={submitting}
            className="group relative inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                <span>Opening secure checkout…</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Continue to Pay ₹{COURSE_PRICE.toLocaleString("en-IN")}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          {/* Trust strip */}
          <div className="flex flex-col items-start gap-2 border-t border-border/60 pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-primary" />
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
      </div>
    </div>
  )
}

/* ---------- Field primitives ---------- */

function Field({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  hint,
  autoComplete,
}: {
  id: string
  label: string
  icon: React.ReactNode
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
  type?: string
  hint?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
      </label>
      <div
        className={cn(
          "flex h-11 items-center gap-2 rounded-lg border bg-background px-3 transition-colors",
          error ? "border-destructive" : "border-border focus-within:border-primary",
        )}
      >
        <span className="text-muted-foreground">{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

function PhoneField({
  id,
  value,
  onChange,
  error,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-foreground">
        Phone Number
      </label>
      <div
        className={cn(
          "flex h-11 items-center rounded-lg border bg-background transition-colors",
          error ? "border-destructive" : "border-border focus-within:border-primary",
        )}
      >
        <div className="flex h-full items-center gap-1.5 border-r border-border px-3 text-sm text-foreground">
          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
          <span>+91</span>
        </div>
        <input
          id={id}
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="98765 43210"
          inputMode="numeric"
          autoComplete="tel-national"
          className="flex-1 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}
