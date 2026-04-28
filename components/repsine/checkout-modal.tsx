"use client"

import { useEffect, useRef, useState } from "react"
import {
  X,
  Lock,
  CreditCard,
  Smartphone,
  Building2,
  QrCode,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

const COURSE_PRICE = 1299
const ORIGINAL_PRICE = 4999

type Method = "upi" | "card" | "netbanking"
type UpiSubMethod = "qr" | "collect"
type Stage = "details" | "method" | "processing" | "qr" | "awaiting" | "success" | "failed"

const POPULAR_BANKS = [
  { code: 3003, name: "State Bank of India" },
  { code: 3021, name: "HDFC Bank" },
  { code: 3022, name: "ICICI Bank" },
  { code: 3031, name: "Axis Bank" },
  { code: 3043, name: "Kotak Mahindra Bank" },
  { code: 3084, name: "Yes Bank" },
  { code: 3050, name: "Punjab National Bank" },
  { code: 3046, name: "Bank of Baroda" },
]

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
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null)

  const [method, setMethod] = useState<Method>("upi")
  const [upiSub, setUpiSub] = useState<UpiSubMethod>("qr")
  const [upiId, setUpiId] = useState("")
  const [bankCode, setBankCode] = useState<number | null>(null)
  const [qrSrc, setQrSrc] = useState<string | null>(null)
  const [statusMsg, setStatusMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const pollRef = useRef<NodeJS.Timeout | null>(null)
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
    if (pollRef.current) clearInterval(pollRef.current)
    setStage("details")
    setOrderId(null)
    setPaymentSessionId(null)
    setQrSrc(null)
    setUpiId("")
    setBankCode(null)
    setStatusMsg("")
    setErrorMsg("")
    setErrors({})
    onClose()
  }

  function validateDetails() {
    const e: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 2) e.name = "Please enter your full name"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Please enter a valid email"
    const digits = phone.replace(/\D/g, "")
    if (digits.length !== 10 || !/^[6-9]/.test(digits)) e.phone = "Enter a valid 10-digit mobile number"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleDetailsSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validateDetails()) return
    setSubmitting(true)
    setErrorMsg("")
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.replace(/\D/g, "") }),
      })
      const data = await res.json()
      if (!res.ok || !data.payment_session_id) {
        throw new Error(data.error || "Failed to create order")
      }
      setOrderId(data.order_id)
      setPaymentSessionId(data.payment_session_id)
      setStage("method")
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong")
      setStage("failed")
    } finally {
      setSubmitting(false)
    }
  }

  function startPolling() {
    if (!orderId) return
    if (pollRef.current) clearInterval(pollRef.current)
    pollRef.current = setInterval(async () => {
      try {
        const r = await fetch(`/api/order-status?orderId=${orderId}`)
        const d = await r.json()
        if (d.order_status === "PAID") {
          if (pollRef.current) clearInterval(pollRef.current)
          setStage("success")
          setTimeout(() => {
            window.location.href = `/payment-success?order_id=${orderId}`
          }, 1500)
        }
      } catch {
        // ignore transient errors
      }
    }, 3000)
  }

  async function payWithUpiQr() {
    if (!paymentSessionId) return
    setStage("processing")
    setStatusMsg("Generating secure QR code...")
    try {
      const res = await fetch("/api/pay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentSessionId, method: "upi-qr" }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      const qr =
        data.data?.payload?.qrcode ||
        data.payload?.qrcode ||
        data.qrcode ||
        null
      if (!qr) throw new Error("QR code unavailable. Please try another method.")
      setQrSrc(qr.startsWith("data:") ? qr : `data:image/png;base64,${qr}`)
      setStage("qr")
      startPolling()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "QR generation failed")
      setStage("failed")
    }
  }

  async function payWithUpiCollect() {
    if (!paymentSessionId) return
    if (!/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
      setErrors({ upi: "Enter a valid UPI ID (e.g. yourname@okicici)" })
      return
    }
    setErrors({})
    setStage("processing")
    setStatusMsg(`Sending payment request to ${upiId.trim()}...`)
    try {
      const res = await fetch("/api/pay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentSessionId, method: "upi-collect", upiId: upiId.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      setStage("awaiting")
      setStatusMsg(
        `Approve the payment request in your UPI app (${upiId.trim()}). This page will update automatically.`,
      )
      startPolling()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Payment request failed")
      setStage("failed")
    }
  }

  async function payWithNetBanking() {
    if (!paymentSessionId || !bankCode) return
    setStage("processing")
    setStatusMsg("Connecting to your bank...")
    try {
      const res = await fetch("/api/pay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentSessionId, method: "netbanking", bankCode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      const url = data.data?.url || data.url
      if (!url) throw new Error("Bank redirect URL unavailable")
      window.location.href = url
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Net banking failed")
      setStage("failed")
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose()
      }}
      ref={dialogRef}
    >
      <div className="relative max-h-[95vh] w-full max-w-4xl overflow-hidden rounded-t-3xl border border-border/60 bg-card shadow-2xl shadow-black/40 sm:rounded-3xl">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-background/40 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-2 text-left">
            <Lock className="h-3.5 w-3.5 text-primary" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
              Secure Checkout
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close checkout"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(95vh-49px)] overflow-y-auto">
          {stage === "details" && (
            <DetailsStage
              name={name}
              email={email}
              phone={phone}
              errors={errors}
              submitting={submitting}
              onName={setName}
              onEmail={setEmail}
              onPhone={setPhone}
              onSubmit={handleDetailsSubmit}
            />
          )}

          {stage === "method" && (
            <MethodStage
              method={method}
              onMethod={setMethod}
              upiSub={upiSub}
              onUpiSub={setUpiSub}
              upiId={upiId}
              onUpiId={setUpiId}
              upiError={errors.upi}
              bankCode={bankCode}
              onBankCode={setBankCode}
              onPayUpiQr={payWithUpiQr}
              onPayUpiCollect={payWithUpiCollect}
              onPayNetBanking={payWithNetBanking}
              onBack={() => setStage("details")}
            />
          )}

          {stage === "processing" && <ProcessingStage message={statusMsg} />}

          {stage === "qr" && qrSrc && (
            <QrStage
              qrSrc={qrSrc}
              onCancel={handleClose}
              onBack={() => {
                if (pollRef.current) clearInterval(pollRef.current)
                setStage("method")
              }}
            />
          )}

          {stage === "awaiting" && <AwaitingStage message={statusMsg} onCancel={handleClose} />}

          {stage === "success" && <SuccessStage email={email} />}

          {stage === "failed" && (
            <FailedStage
              message={errorMsg}
              onRetry={() => setStage(orderId ? "method" : "details")}
            />
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- Stage components ---------- */

function OrderSummary() {
  const savings = ORIGINAL_PRICE - COURSE_PRICE
  return (
    <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Order Summary
      </p>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-bold text-foreground">Canva Mastery Course</p>
          <p className="mt-1 text-xs text-muted-foreground">Beginner to Advanced — Lifetime access</p>
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
      <div className="mt-4 space-y-1.5 border-t border-border/60 pt-3 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="text-foreground">₹{COURSE_PRICE.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>GST</span>
          <span className="text-foreground">Included</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2 text-sm font-semibold text-foreground">
          <span>Total</span>
          <span>₹{COURSE_PRICE.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  )
}

function DetailsStage(props: {
  name: string
  email: string
  phone: string
  errors: Record<string, string>
  submitting: boolean
  onName: (v: string) => void
  onEmail: (v: string) => void
  onPhone: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
}) {
  return (
    <div className="grid gap-6 p-6 text-left md:grid-cols-[1fr_320px]">
      <form onSubmit={props.onSubmit} className="space-y-5">
        <div>
          <h2 id="checkout-title" className="font-display text-xl font-bold text-foreground">
            Your Details
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Course access link will be sent to your email after payment.
          </p>
        </div>

        <Field
          label="Full Name"
          id="name"
          value={props.name}
          onChange={props.onName}
          placeholder="Aarav Sharma"
          autoComplete="name"
          error={props.errors.name}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          value={props.email}
          onChange={props.onEmail}
          placeholder="you@example.com"
          autoComplete="email"
          error={props.errors.email}
        />
        <PhoneField value={props.phone} onChange={props.onPhone} error={props.errors.phone} />

        <button
          type="submit"
          disabled={props.submitting}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {props.submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5" /> Continue to Payment
            </>
          )}
        </button>

        <p className="text-[11px] text-muted-foreground">
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
      </form>

      <OrderSummary />
    </div>
  )
}

function MethodStage(props: {
  method: Method
  onMethod: (m: Method) => void
  upiSub: UpiSubMethod
  onUpiSub: (s: UpiSubMethod) => void
  upiId: string
  onUpiId: (v: string) => void
  upiError?: string
  bankCode: number | null
  onBankCode: (c: number | null) => void
  onPayUpiQr: () => void
  onPayUpiCollect: () => void
  onPayNetBanking: () => void
  onBack: () => void
}) {
  return (
    <div className="grid gap-0 md:grid-cols-[260px_1fr_300px]">
      {/* Left rail — payment methods */}
      <aside className="border-b border-border/60 p-4 md:border-b-0 md:border-r">
        <button
          type="button"
          onClick={props.onBack}
          className="mb-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <h3 className="font-display text-base font-bold text-foreground">Choose payment method</h3>
        <p className="mt-1 text-xs text-muted-foreground">All transactions are secured & encrypted.</p>

        <div className="mt-4 space-y-1.5">
          <MethodTab
            active={props.method === "upi"}
            onClick={() => props.onMethod("upi")}
            icon={<Smartphone className="h-4 w-4" />}
            title="UPI"
            sub="Pay by any UPI app"
          />
          <MethodTab
            active={props.method === "card"}
            onClick={() => props.onMethod("card")}
            icon={<CreditCard className="h-4 w-4" />}
            title="Credit / Debit Card"
            sub="Visa, Mastercard, RuPay & more"
          />
          <MethodTab
            active={props.method === "netbanking"}
            onClick={() => props.onMethod("netbanking")}
            icon={<Building2 className="h-4 w-4" />}
            title="Net Banking"
            sub="Pay through your favourite bank"
          />
        </div>
      </aside>

      {/* Center pane — method-specific UI */}
      <main className="p-6">
        {props.method === "upi" && (
          <div className="space-y-5">
            <h4 className="font-display text-lg font-bold text-foreground">Pay with UPI</h4>

            <div className="flex gap-2 rounded-full border border-border/60 bg-background/40 p-1">
              <button
                type="button"
                onClick={() => props.onUpiSub("qr")}
                className={cn(
                  "flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors",
                  props.upiSub === "qr"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Scan QR Code
              </button>
              <button
                type="button"
                onClick={() => props.onUpiSub("collect")}
                className={cn(
                  "flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors",
                  props.upiSub === "collect"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Enter UPI ID
              </button>
            </div>

            {props.upiSub === "qr" ? (
              <div className="space-y-4 rounded-2xl border border-border/60 bg-background/40 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <QrCode className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-foreground">
                      Scan & pay with any UPI app
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Supports Google Pay, PhonePe, Paytm, BHIM, Amazon Pay & all other UPI apps.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={props.onPayUpiQr}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <QrCode className="h-4 w-4" /> Show QR Code
                </button>
              </div>
            ) : (
              <div className="space-y-3 rounded-2xl border border-border/60 bg-background/40 p-5">
                <Field
                  label="UPI ID"
                  id="upi"
                  value={props.upiId}
                  onChange={props.onUpiId}
                  placeholder="yourname@okicici"
                  error={props.upiError}
                />
                <p className="text-[11px] text-muted-foreground">
                  We&apos;ll send a payment request to your UPI app. Approve it to complete the payment.
                </p>
                <button
                  type="button"
                  onClick={props.onPayUpiCollect}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <Lock className="h-4 w-4" /> Send Payment Request
                </button>
              </div>
            )}
          </div>
        )}

        {props.method === "card" && (
          <div className="rounded-2xl border border-dashed border-border/60 bg-background/40 p-8 text-center">
            <CreditCard className="mx-auto h-10 w-10 text-muted-foreground" />
            <h4 className="font-display mt-3 text-base font-bold text-foreground">
              Card payments — coming soon
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              For instant access today, please use UPI or Net Banking. Card support will be available
              shortly with PCI-compliant secure tokenisation.
            </p>
          </div>
        )}

        {props.method === "netbanking" && (
          <div className="space-y-4">
            <h4 className="font-display text-lg font-bold text-foreground">Select your bank</h4>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_BANKS.map((b) => (
                <button
                  key={b.code}
                  type="button"
                  onClick={() => props.onBankCode(b.code)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-colors",
                    props.bankCode === b.code
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border/60 bg-background/40 text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{b.name}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!props.bankCode}
              onClick={props.onPayNetBanking}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <Lock className="h-4 w-4" /> Continue to Bank
            </button>
          </div>
        )}
      </main>

      {/* Right rail — order summary */}
      <aside className="border-t border-border/60 p-4 md:border-l md:border-t-0">
        <OrderSummary />
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-border/60 bg-background/40 p-3 text-[11px] text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
          <p>256-bit SSL encryption · 7-day refund policy · Authentic course access guaranteed.</p>
        </div>
      </aside>
    </div>
  )
}

function ProcessingStage({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
      <p className="font-display text-base font-bold text-foreground">Please wait...</p>
      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">{message}</p>
    </div>
  )
}

function QrStage({
  qrSrc,
  onCancel,
  onBack,
}: {
  qrSrc: string
  onCancel: () => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Scan with any UPI app
      </p>
      <h4 className="font-display text-lg font-bold text-foreground">
        Pay ₹{COURSE_PRICE.toLocaleString("en-IN")}
      </h4>
      <div className="rounded-2xl border border-border/60 bg-white p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrSrc} alt="UPI payment QR code" className="h-56 w-56" />
      </div>
      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
        Open Google Pay, PhonePe, Paytm or any UPI app and scan this QR. Your access will activate
        automatically after payment.
      </p>
      <div className="mt-2 flex items-center gap-2 text-xs text-primary">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Waiting for payment confirmation…
      </div>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
        >
          Choose another method
        </button>
        <span className="text-muted-foreground">·</span>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function AwaitingStage({ message, onCancel }: { message: string; onCancel: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Smartphone className="h-8 w-8" />
      </div>
      <h4 className="font-display text-base font-bold text-foreground">Payment request sent</h4>
      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">{message}</p>
      <div className="flex items-center gap-2 text-xs text-primary">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Waiting for confirmation…
      </div>
      <button
        type="button"
        onClick={onCancel}
        className="mt-2 text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
      >
        Cancel
      </button>
    </div>
  )
}

function SuccessStage({ email }: { email: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h4 className="font-display text-xl font-bold text-foreground">Payment successful!</h4>
      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
        Course access link has been sent to <span className="text-foreground">{email}</span>.
        Redirecting you now…
      </p>
    </div>
  )
}

function FailedStage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/15 text-destructive">
        <X className="h-8 w-8" />
      </div>
      <h4 className="font-display text-base font-bold text-foreground">Payment failed</h4>
      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        Try again
      </button>
    </div>
  )
}

/* ---------- Form primitives ---------- */

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  error,
}: {
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
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(
          "h-11 w-full rounded-xl border bg-background/40 px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2",
          error
            ? "border-destructive focus:ring-destructive/30"
            : "border-border/60 focus:border-primary focus:ring-primary/30",
        )}
      />
      {error && <p className="mt-1 text-[11px] text-destructive">{error}</p>}
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
    <div>
      <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-foreground">
        Phone Number
      </label>
      <div className="flex">
        <span className="inline-flex h-11 items-center justify-center rounded-l-xl border border-r-0 border-border/60 bg-background/40 px-3 text-sm font-medium text-foreground">
          +91
        </span>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="98765 43210"
          aria-invalid={!!error}
          className={cn(
            "h-11 w-full rounded-r-xl border bg-background/40 px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2",
            error
              ? "border-destructive focus:ring-destructive/30"
              : "border-border/60 focus:border-primary focus:ring-primary/30",
          )}
        />
      </div>
      {error && <p className="mt-1 text-[11px] text-destructive">{error}</p>}
    </div>
  )
}

function MethodTab({
  active,
  onClick,
  icon,
  title,
  sub,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  sub: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors",
        active
          ? "border-primary bg-primary/10"
          : "border-border/60 bg-background/40 hover:border-border hover:bg-card",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg",
          active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
        {icon}
      </span>
      <span>
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="mt-0.5 block text-[11px] text-muted-foreground">{sub}</span>
      </span>
    </button>
  )
}
