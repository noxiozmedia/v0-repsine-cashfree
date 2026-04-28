"use client"

import { useEffect, useRef, useState } from "react"
import { X, Lock, ShieldCheck, ChevronDown, CreditCard, Smartphone, Building2, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    Cashfree: any
  }
}

type Step = "details" | "payment" | "success"
type PayMethod = "card" | "upi" | "netbanking"

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
}

const PRICE = 1299
const MRP = 4999

const BANKS = [
  { code: "3333", name: "State Bank of India" },
  { code: "3007", name: "HDFC Bank" },
  { code: "3011", name: "ICICI Bank" },
  { code: "3005", name: "Axis Bank" },
  { code: "3006", name: "Kotak Bank" },
  { code: "3009", name: "IndusInd Bank" },
]

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("details")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [payMethod, setPayMethod] = useState<PayMethod>("card")
  const [upiId, setUpiId] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [orderId, setOrderId] = useState("")
  const [sdkReady, setSdkReady] = useState(false)
  const cfRef = useRef<any>(null)
  const cardNumberRef = useRef<any>(null)
  const cardExpiryRef = useRef<any>(null)
  const cardCvvRef = useRef<any>(null)
  const elementsRef = useRef<any>(null)

  // Load Cashfree SDK
  useEffect(() => {
    if (window.Cashfree) { setSdkReady(true); return }
    const s = document.createElement("script")
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js"
    s.async = true
    s.onload = () => setSdkReady(true)
    document.body.appendChild(s)
  }, [])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep("details")
      setName(""); setEmail(""); setPhone("")
      setErrors({}); setLoading(false); setSubmitting(false)
      setUpiId(""); setSelectedBank(""); setPayMethod("card")
      setSessionId(""); setOrderId("")
      cfRef.current = null; elementsRef.current = null
      cardNumberRef.current = null; cardExpiryRef.current = null; cardCvvRef.current = null
    }
  }, [open])

  // Mount card elements when switching to card tab on payment step
  useEffect(() => {
    if (step !== "payment" || payMethod !== "card" || !cfRef.current) return
    const timer = setTimeout(() => mountCardElements(), 150)
    return () => clearTimeout(timer)
  }, [step, payMethod])

  function mountCardElements() {
    if (!cfRef.current) return
    const style = {
      base: {
        fontSize: "14px",
        color: "#ffffff",
        fontFamily: "inherit",
        "::placeholder": { color: "rgba(255,255,255,0.35)" },
      },
      invalid: { color: "#ff6b6b" },
    }
    const elements = cfRef.current.elements({ style })
    elementsRef.current = elements

    if (document.getElementById("cf-card-number")) {
      cardNumberRef.current = elements.create("cardNumber", { placeholder: "1234 5678 9012 3456" })
      cardNumberRef.current.mount("#cf-card-number")
    }
    if (document.getElementById("cf-card-expiry")) {
      cardExpiryRef.current = elements.create("cardExpiry", { placeholder: "MM / YY" })
      cardExpiryRef.current.mount("#cf-card-expiry")
    }
    if (document.getElementById("cf-card-cvv")) {
      cardCvvRef.current = elements.create("cardCvv", { placeholder: "CVV" })
      cardCvvRef.current.mount("#cf-card-cvv")
    }
  }

  function validateDetails() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = "Full name is required"
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email is required"
    const digits = phone.replace(/\D/g, "")
    if (digits.length !== 10) e.phone = "Enter a valid 10-digit mobile number"
    return e
  }

  async function handleContinue() {
    const e = validateDetails()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.replace(/\D/g, "") }),
      })
      if (!res.ok) throw new Error("Order failed")
      const data = await res.json()
      setSessionId(data.payment_session_id)
      setOrderId(data.order_id ?? "")
      cfRef.current = await window.Cashfree({ mode: "production" })
      setStep("payment")
    } catch {
      alert("Could not start checkout. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handlePay() {
    if (!cfRef.current || !sessionId) return
    setSubmitting(true)
    try {
      let paymentMethod: any

      if (payMethod === "card") {
        if (!cardNumberRef.current) { alert("Card fields not loaded."); setSubmitting(false); return }
        paymentMethod = {
          card: {
            channel: "link",
            card_number: cardNumberRef.current,
            card_expiry_mm: cardExpiryRef.current,
            card_expiry_yy: cardExpiryRef.current,
            card_cvv: cardCvvRef.current,
            card_holder_name: name,
          },
        }
      } else if (payMethod === "upi") {
        if (!upiId.trim() || !upiId.includes("@")) { alert("Enter a valid UPI ID (e.g. name@upi)"); setSubmitting(false); return }
        paymentMethod = { upi: { channel: "collect", upiId: upiId.trim() } }
      } else {
        if (!selectedBank) { alert("Please select a bank"); setSubmitting(false); return }
        paymentMethod = { netbanking: { channel: "link", netbanking_bank_code: selectedBank } }
      }

      await cfRef.current.pay({
        paymentMethod,
        paymentSessionId: sessionId,
        returnUrl: `${window.location.origin}/payment-success?order_id=${orderId}`,
      })

      setStep("success")
    } catch (err: any) {
      alert(err?.message ?? "Payment failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[95dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-[oklch(0.12_0.05_275)] shadow-2xl sm:rounded-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-start justify-between bg-[oklch(0.18_0.1_280)] px-6 py-5">
          <div className="text-left">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-primary/80 uppercase">Secure Checkout</p>
            <h2 id="checkout-title" className="font-display mt-1 text-left text-xl font-bold text-foreground">Canva Mastery</h2>
            <p className="mt-0.5 text-left text-xs text-foreground/60">Beginner to Advanced — Lifetime Access</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close checkout" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-foreground/70 transition-colors hover:bg-white/20 hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto">
          {/* Order summary — shown on details + payment steps */}
          {step !== "success" && (
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
          )}

          {/* ── STEP: Details ── */}
          {step === "details" && (
            <div className="space-y-4 px-6 py-5">
              <Field label="Full Name" error={errors.name}>
                <input id="cf-name" type="text" placeholder="Aarav Sharma" value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: "" })) }}
                  className={inputClass(!!errors.name)} />
              </Field>

              <Field label="Email" error={errors.email} hint="Course access link will be sent here">
                <input id="cf-email" type="email" placeholder="you@example.com" value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })) }}
                  className={inputClass(!!errors.email)} />
              </Field>

              <Field label="Mobile Number" error={errors.phone}>
                <div className={cn("flex overflow-hidden rounded-xl border bg-white/5", errors.phone ? "border-red-500" : "border-border/40")}>
                  <span className="flex items-center border-r border-border/40 bg-white/5 px-3 text-sm font-medium text-foreground/70">+91</span>
                  <input id="cf-phone" type="tel" inputMode="numeric" maxLength={10} placeholder="98765 43210" value={phone}
                    onChange={e => { setPhone(e.target.value.replace(/\D/g, "")); setErrors(p => ({ ...p, phone: "" })) }}
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
                </div>
              </Field>

              <button type="button" onClick={handleContinue} disabled={loading || !sdkReady}
                className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60">
                <Lock className="h-4 w-4" />
                {loading ? "Preparing..." : `Continue to Pay ₹${PRICE.toLocaleString("en-IN")}`}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary/70" />
                <span>256-bit SSL Encryption · 7-day Refund Policy</span>
              </div>
              <p className="text-center text-[11px] text-muted-foreground">
                By continuing you agree to our{" "}
                <a href="/terms-and-conditions" className="underline underline-offset-2 hover:text-foreground">Terms</a>{" "}and{" "}
                <a href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</a>
              </p>
            </div>
          )}

          {/* ── STEP: Payment ── */}
          {step === "payment" && (
            <div className="px-6 py-5">
              <button type="button" onClick={() => setStep("details")}
                className="mb-4 flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                <ChevronDown className="h-3.5 w-3.5 rotate-90" />
                Back to details
              </button>

              {/* Payment method tabs */}
              <div className="mb-5 grid grid-cols-3 gap-2">
                {([
                  { id: "card", icon: CreditCard, label: "Card" },
                  { id: "upi", icon: Smartphone, label: "UPI" },
                  { id: "netbanking", icon: Building2, label: "Net Banking" },
                ] as const).map(({ id, icon: Icon, label }) => (
                  <button key={id} type="button" onClick={() => setPayMethod(id)}
                    className={cn(
                      "flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-semibold transition-all",
                      payMethod === id
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border/40 bg-white/5 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}>
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Card fields */}
              {payMethod === "card" && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold tracking-wide text-foreground/80 uppercase">Card Number</label>
                    <div id="cf-card-number" className="rounded-xl border border-border/40 bg-white/5 px-4 py-3 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wide text-foreground/80 uppercase">Expiry</label>
                      <div id="cf-card-expiry" className="rounded-xl border border-border/40 bg-white/5 px-4 py-3 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wide text-foreground/80 uppercase">CVV</label>
                      <div id="cf-card-cvv" className="rounded-xl border border-border/40 bg-white/5 px-4 py-3 text-sm" />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI */}
              {payMethod === "upi" && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold tracking-wide text-foreground/80 uppercase">UPI ID</label>
                  <input type="text" placeholder="yourname@upi" value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className={inputClass(false)} />
                  <p className="text-[11px] text-muted-foreground">e.g. yourname@okicici, name@ybl</p>
                </div>
              )}

              {/* Net Banking */}
              {payMethod === "netbanking" && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold tracking-wide text-foreground/80 uppercase">Select Bank</label>
                  {BANKS.map(b => (
                    <button key={b.code} type="button" onClick={() => setSelectedBank(b.code)}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all",
                        selectedBank === b.code
                          ? "border-primary bg-primary/15 text-foreground"
                          : "border-border/40 bg-white/5 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      )}>
                      {b.name}
                      {selectedBank === b.code && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                </div>
              )}

              <button type="button" onClick={handlePay} disabled={submitting}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60">
                <Lock className="h-4 w-4" />
                {submitting ? "Processing..." : `Pay ₹${PRICE.toLocaleString("en-IN")}`}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary/70" />
                <span>256-bit SSL Encryption · 7-day Refund Policy</span>
              </div>
            </div>
          )}

          {/* ── STEP: Success ── */}
          {step === "success" && (
            <div className="px-6 py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-display mt-5 text-xl font-bold text-foreground">Payment Successful!</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Thank you! Your course access link has been sent to{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </p>
              <button type="button" onClick={onClose}
                className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold tracking-wide text-foreground/80 uppercase">{label}</label>
      {children}
      {hint && !error && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60",
    hasError ? "border-red-500" : "border-border/40"
  )
}
