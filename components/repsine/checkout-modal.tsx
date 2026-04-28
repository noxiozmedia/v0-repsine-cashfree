"use client"

import { useEffect, useRef, useState } from "react"
import { X, Lock, ShieldCheck, RotateCcw, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    Cashfree: any
  }
}

type Step = "details" | "payment"

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
}

const PRICE = 1299
const MRP = 4999

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("details")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const dropContainerRef = useRef<HTMLDivElement>(null)
  const cashfreeRef = useRef<any>(null)

  // Load Cashfree SDK
  useEffect(() => {
    if (window.Cashfree) { setSdkReady(true); return }
    const script = document.createElement("script")
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"
    script.async = true
    script.onload = () => setSdkReady(true)
    document.body.appendChild(script)
  }, [])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep("details")
      setName(""); setEmail(""); setPhone("")
      setErrors({}); setLoading(false)
      cashfreeRef.current = null
    }
  }, [open])

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = "Full name is required"
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email is required"
    const digits = phone.replace(/\D/g, "")
    if (digits.length !== 10) e.phone = "Enter a valid 10-digit mobile number"
    return e
  }

  async function handleContinue() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    setLoading(true)

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.replace(/\D/g, "") }),
      })

      if (!res.ok) { throw new Error("Order creation failed") }
      const { payment_session_id } = await res.json()

      // Initialize Cashfree
      cashfreeRef.current = await window.Cashfree({ mode: "production" })

      setStep("payment")

      // Mount Drop checkout into our container after DOM updates
      setTimeout(() => {
        if (!dropContainerRef.current || !cashfreeRef.current) return

        const components = ["card", "upi", "netbanking", "app"]
        const style = {
          backgroundColor: "oklch(0.14 0.04 270)",
          color: "#ffffff",
          fontFamily: "inherit",
          fontSize: "14px",
          errorColor: "#ff6b6b",
          theme: "dark",
        }

        cashfreeRef.current.checkout({
          paymentSessionId: payment_session_id,
          redirectTarget: "_self",
          components,
          style,
          onSuccess: () => {},
          onFailure: () => {},
        })
      }, 100)
    } catch (err) {
      alert("Failed to initiate payment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[95dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-[oklch(0.12_0.05_275)] shadow-2xl sm:rounded-2xl">

        {/* Header */}
        <div className="flex items-start justify-between bg-[oklch(0.18_0.1_280)] px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-primary/80 uppercase">
              Secure Checkout
            </p>
            <h2 className="font-display mt-1 text-xl font-bold text-foreground">
              Canva Mastery
            </h2>
            <p className="mt-0.5 text-xs text-foreground/60">Beginner to Advanced — Lifetime Access</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-foreground/70 transition-colors hover:bg-white/20 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto">
          {/* Price summary */}
          <div className="mx-6 mt-5 rounded-xl border border-border/40 bg-white/5 px-4 py-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Canva Mastery Course</p>
                <p className="mt-0.5 text-xs text-muted-foreground">One-time payment · Lifetime access</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">₹{PRICE.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground line-through">₹{MRP.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <span className="mt-3 inline-flex items-center rounded-full bg-primary/20 px-3 py-0.5 text-[11px] font-semibold text-primary">
              SAVE ₹{(MRP - PRICE).toLocaleString("en-IN")}
            </span>
          </div>

          {/* Step: Details */}
          {step === "details" && (
            <div className="space-y-4 px-6 py-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="cf-name" className="block text-xs font-semibold tracking-wide text-foreground/80 uppercase">
                  Full Name
                </label>
                <input
                  id="cf-name"
                  type="text"
                  placeholder="Aarav Sharma"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: "" })) }}
                  className={cn(
                    "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60",
                    errors.name ? "border-red-500" : "border-border/40"
                  )}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="cf-email" className="block text-xs font-semibold tracking-wide text-foreground/80 uppercase">
                  Email
                </label>
                <input
                  id="cf-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })) }}
                  className={cn(
                    "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60",
                    errors.email ? "border-red-500" : "border-border/40"
                  )}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                <p className="text-[11px] text-muted-foreground">Course access link will be sent here</p>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="cf-phone" className="block text-xs font-semibold tracking-wide text-foreground/80 uppercase">
                  Mobile Number
                </label>
                <div className={cn(
                  "flex overflow-hidden rounded-xl border bg-white/5",
                  errors.phone ? "border-red-500" : "border-border/40"
                )}>
                  <span className="flex items-center border-r border-border/40 bg-white/5 px-3 text-sm font-medium text-foreground/70">
                    +91
                  </span>
                  <input
                    id="cf-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={e => { setPhone(e.target.value.replace(/\D/g, "")); setErrors(p => ({ ...p, phone: "" })) }}
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>

              {/* Continue button */}
              <button
                type="button"
                onClick={handleContinue}
                disabled={loading || !sdkReady}
                className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
              >
                <Lock className="h-4 w-4" />
                {loading ? "Preparing payment..." : `Continue to Pay ₹${PRICE.toLocaleString("en-IN")}`}
              </button>

              {/* Trust strip */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary/70" />
                <span>256-bit SSL Encryption · 7-day Refund Policy</span>
              </div>
              <p className="text-center text-[11px] text-muted-foreground">
                By continuing you agree to our{" "}
                <a href="/terms-and-conditions" className="underline underline-offset-2 hover:text-foreground">Terms</a>
                {" "}and{" "}
                <a href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</a>
              </p>
            </div>
          )}

          {/* Step: Payment — Cashfree Drop renders here */}
          {step === "payment" && (
            <div className="px-6 py-5">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="mb-4 flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <ChevronDown className="h-3.5 w-3.5 rotate-90" />
                Back to details
              </button>
              <div
                id="cashfree-drop-container"
                ref={dropContainerRef}
                className="min-h-[300px] rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
