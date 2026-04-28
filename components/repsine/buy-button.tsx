"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Lock, ShieldCheck, X, Loader2, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

type BuyButtonProps = {
  label?: string
  className?: string
}

const COURSE_PRICE = 1299
const COURSE_MRP = 4999

export function BuyButton({ label = "BUY Now", className }: BuyButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-foreground px-14 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5",
          className,
        )}
      >
        {/* Purple circle that expands to fill the button on hover */}
        <span
          aria-hidden="true"
          className="absolute top-1 left-1 h-9 w-9 rounded-full bg-primary transition-all duration-500 ease-out group-hover:top-0 group-hover:left-0 group-hover:h-full group-hover:w-full"
        />

        {/* Foreground content */}
        <span className="relative z-10 flex items-center gap-2 tracking-wide text-background transition-colors duration-300 group-hover:text-primary-foreground">
          <ChevronRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
          <span>{label}</span>
        </span>
      </button>

      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({})

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  const validate = () => {
    const next: typeof errors = {}
    if (form.name.trim().length < 2) next.name = "Please enter your full name"
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address"
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) next.phone = "Enter a valid 10-digit phone number"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // Simulated payment initialisation. Replace with real Razorpay create-order
    // call once your Razorpay account is approved.
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 1400)
  }

  const handleClose = () => {
    setSuccess(false)
    setForm({ name: "", email: "", phone: "" })
    setErrors({})
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close checkout"
        onClick={handleClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-t-3xl border border-border/60 bg-card shadow-2xl shadow-primary/10 sm:rounded-3xl">
        {/* Header strip */}
        <div className="relative px-6 pt-6 pb-5">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.25 0.18 285) 0%, oklch(0.2 0.14 260) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-foreground/70 uppercase">
                Secure Checkout
              </p>
              <h2
                id="checkout-title"
                className="font-display mt-1 text-xl font-bold tracking-tight text-foreground"
              >
                Canva Mastery
              </h2>
              <p className="mt-1 text-xs text-foreground/70">Beginner to Advanced — Lifetime Access</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-background/40 text-foreground/80 transition-colors hover:bg-background/60 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {success ? (
          <SuccessState
            email={form.email}
            onClose={handleClose}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
            {/* Order summary */}
            <div className="rounded-xl border border-border/60 bg-background/40 p-4">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium text-foreground">Canva Mastery Course</p>
                <p className="font-display text-lg font-bold text-foreground">
                  ₹{COURSE_PRICE.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-xs text-muted-foreground">
                <span>One-time payment · Lifetime access</span>
                <span className="line-through">₹{COURSE_MRP.toLocaleString("en-IN")}</span>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary uppercase">
                <span>Save ₹{(COURSE_MRP - COURSE_PRICE).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              <Field
                id="name"
                label="Full Name"
                type="text"
                placeholder="Aarav Sharma"
                autoComplete="name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                error={errors.name}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                error={errors.email}
                hint="Course access link will be sent here."
              />
              <PhoneField
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                error={errors.phone}
              />
            </div>

            {/* Pay button */}
            <button
              type="submit"
              disabled={submitting}
              className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:translate-y-0"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Initialising payment…</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Pay ₹{COURSE_PRICE.toLocaleString("en-IN")} with Razorpay</span>
                </>
              )}
            </button>

            {/* Trust strip */}
            <div className="flex flex-col items-center gap-2 border-t border-border/60 pt-4 text-center">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>Secured by Razorpay · 256-bit SSL · 7-day refund</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                By continuing you agree to our{" "}
                <a href="/terms" className="underline-offset-2 hover:text-foreground hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline-offset-2 hover:text-foreground hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
  error,
  hint,
}: {
  id: string
  label: string
  type: string
  placeholder?: string
  autoComplete?: string
  value: string
  onChange: (v: string) => void
  error?: string
  hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-foreground/80">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          "w-full rounded-lg border bg-background/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40",
          error ? "border-destructive" : "border-border/60",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="text-[11px] text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[11px] text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

function PhoneField({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="phone" className="block text-xs font-semibold text-foreground/80">
        Phone Number
      </label>
      <div
        className={cn(
          "flex items-stretch overflow-hidden rounded-lg border bg-background/60 focus-within:ring-2 focus-within:ring-ring/40",
          error ? "border-destructive" : "border-border/60",
        )}
      >
        <span className="flex items-center border-r border-border/60 bg-background/40 px-3 text-sm font-medium text-foreground/80">
          +91
        </span>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          placeholder="98765 43210"
          autoComplete="tel-national"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d\s]/g, "").slice(0, 12))}
          aria-invalid={Boolean(error)}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />
      </div>
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  )
}

function SuccessState({ email, onClose }: { email: string; onClose: () => void }) {
  return (
    <div className="px-6 py-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h3 className="font-display mt-5 text-xl font-bold text-foreground">Almost there!</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        We&apos;ve received your details. As soon as our Razorpay account is fully activated, your secure
        payment link will be sent to{" "}
        <span className="font-medium text-foreground">{email || "your email"}</span>.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background"
      >
        Done
      </button>
    </div>
  )
}
