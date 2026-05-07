"use client"

import { useEffect, useState } from "react"
import { ArrowRight, CheckCircle2, Download, Loader2, Mail, RotateCcw, X, XCircle } from "lucide-react"

declare global {
  interface Window {
    Cashfree: any
  }
}

type Status = "idle" | "verifying" | "success" | "failed"
type EmailStatus = "idle" | "sending" | "sent" | "error"

export function TestCheckout() {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("1")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<{
    amount?: string
    name?: string
    email?: string
    phone?: string
  }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle")
  const [paidOrder, setPaidOrder] = useState<{ id: string; amount: number } | null>(null)
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (document.getElementById("cashfree-sdk-test")) return
    const script = document.createElement("script")
    script.id = "cashfree-sdk-test"
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  function validateOuter() {
    const next: { amount?: string } = {}
    const numeric = Number(amount)
    if (!amount || Number.isNaN(numeric) || numeric < 1) {
      next.amount = "Enter an amount of at least INR 1"
    }
    setErrors((prev) => ({ ...prev, ...next }))
    return Object.keys(next).length === 0
  }

  function validateModal() {
    const next: { name?: string; email?: string; phone?: string } = {}
    if (!name.trim() || name.trim().length < 2) next.name = "Enter your full name"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email"
    const digits = phone.replace(/\D/g, "")
    if (digits.length !== 10) next.phone = "Enter a 10-digit WhatsApp number"
    setErrors((prev) => ({ ...prev, ...next }))
    return Object.keys(next).length === 0
  }

  function openCheckoutModal() {
    if (!validateOuter()) return
    setError(null)
    setStatus("idle")
    setEmailStatus("idle")
    setOpen(true)
  }

  async function grantAccess(orderId: string, opts?: { test?: boolean; amount?: number }) {
    setEmailStatus("sending")
    try {
      const res = await fetch("/api/post-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          name: name.trim(),
          email,
          phone: phone.replace(/\D/g, ""),
          test: opts?.test ?? false,
          amount: opts?.amount,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Could not grant access")
      if (data.dashboardUrl) setDashboardUrl(data.dashboardUrl)
      setEmailStatus("sent")
    } catch (err) {
      console.log("[v0] post-payment error", err)
      setEmailStatus("error")
    }
  }

  async function markAsPaid() {
    setError(null)
    if (!validateModal()) return

    const fakeOrderId = `TEST_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    const numericAmount = Number(amount) || 0

    setPaidOrder({ id: fakeOrderId, amount: numericAmount })
    setStatus("success")
    grantAccess(fakeOrderId, { test: true, amount: numericAmount })
  }

  async function verifyOrder(orderId: string) {
    setStatus("verifying")
    try {
      const res = await fetch(`/api/order-status?orderId=${encodeURIComponent(orderId)}`, {
        cache: "no-store",
      })
      const data = await res.json()
      if (data?.order_status === "PAID") {
        setPaidOrder({ id: data.order_id, amount: data.order_amount })
        setStatus("success")
        // Fire the post-payment flow in the background
        grantAccess(data.order_id)
      } else {
        setStatus("failed")
      }
    } catch (err) {
      console.log("[v0] verify error", err)
      setStatus("failed")
    }
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!validateModal()) return

    setLoading(true)
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email,
          phone: phone.replace(/\D/g, ""),
          amount: Number(amount),
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.payment_session_id) {
        throw new Error(data?.error || "Could not start checkout")
      }

      if (!window.Cashfree) {
        throw new Error("Payment SDK not loaded yet — please retry")
      }

      const cashfree = await window.Cashfree({ mode: "production" })
      const result = await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal",
      })

      console.log("[v0] cashfree result", result)
      await verifyOrder(data.order_id)
    } catch (err) {
      console.log("[v0] test-checkout error", err)
      setError(err instanceof Error ? err.message : "Something went wrong")
      setStatus("failed")
    } finally {
      setLoading(false)
    }
  }

  function close() {
    if (loading || status === "verifying") return
    setOpen(false)
    setError(null)
    if (status === "success" || status === "failed") {
      setStatus("idle")
      setEmailStatus("idle")
      setPaidOrder(null)
      setDashboardUrl(null)
    }
  }

  function tryAgain() {
    setStatus("idle")
    setEmailStatus("idle")
    setError(null)
    setPaidOrder(null)
    setDashboardUrl(null)
  }

  async function downloadReceipt() {
    if (!paidOrder) return
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF()

    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.text("Payment Receipt", 20, 25)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(100)
    doc.text("Repsine — Cashfree Test Payment", 20, 33)

    doc.setDrawColor(220)
    doc.line(20, 40, 190, 40)

    doc.setTextColor(20)
    doc.setFontSize(12)

    const rows: Array<[string, string]> = [
      ["Status", "PAID"],
      ["Order ID", paidOrder.id],
      ["Amount", `INR ${paidOrder.amount.toFixed(2)}`],
      ["Name", name.trim()],
      ["Email", email],
      ["WhatsApp", `+91 ${phone}`],
      ["Date", new Date().toLocaleString("en-IN")],
    ]

    let y = 52
    rows.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold")
      doc.text(label, 20, y)
      doc.setFont("helvetica", "normal")
      doc.text(value, 70, y)
      y += 9
    })

    doc.setDrawColor(220)
    doc.line(20, y + 2, 190, y + 2)

    doc.setFontSize(10)
    doc.setTextColor(120)
    doc.text("Thank you for your payment.", 20, y + 12)
    doc.text("This is an automatically generated receipt.", 20, y + 18)

    doc.save(`receipt-${paidOrder.id}.pdf`)
  }

  return (
    <>
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-zinc-500 uppercase">
          Cashfree Test
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">Custom checkout</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          Enter any amount and verify your Cashfree payment gateway. The checkout opens right here
          on this page.
        </p>

        <div className="mt-6">
          <label
            htmlFor="test-amount"
            className="mb-1.5 block text-xs font-semibold text-zinc-700"
          >
            Amount (INR)
          </label>
          <div className="flex h-11 overflow-hidden rounded-lg border border-zinc-200 focus-within:border-zinc-900">
            <span className="flex items-center bg-zinc-50 px-3 text-sm font-semibold text-zinc-700">
              INR
            </span>
            <input
              id="test-amount"
              type="number"
              inputMode="decimal"
              min="1"
              step="1"
              placeholder="1"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }))
              }}
              className="flex-1 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          {errors.amount && <p className="mt-1 text-[11px] text-red-600">{errors.amount}</p>}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-zinc-100 px-4 py-3">
          <span className="text-sm text-zinc-700">Test product</span>
          <span className="text-sm font-semibold text-zinc-900">
            INR {Number(amount || 0).toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={openCheckoutModal}
          className="mt-6 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
        >
          Buy
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="test-checkout-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between px-6 pt-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-zinc-500 uppercase">
                  Checkout
                </p>
                <h2
                  id="test-checkout-title"
                  className="mt-1 text-lg font-bold tracking-tight text-zinc-900"
                >
                  {status === "success"
                    ? "Payment successful"
                    : status === "failed"
                      ? "Payment failed"
                      : status === "verifying"
                        ? "Verifying payment…"
                        : `Pay INR ${Number(amount || 0).toFixed(2)}`}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                disabled={loading || status === "verifying"}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Idle — collect details */}
            {status === "idle" && (
              <form onSubmit={handlePay} className="space-y-4 px-6 py-5">
                <div>
                  <label
                    htmlFor="test-name"
                    className="mb-1.5 block text-xs font-semibold text-zinc-700"
                  >
                    Full name
                  </label>
                  <input
                    id="test-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Aarav Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none"
                  />
                  {errors.name && <p className="mt-1 text-[11px] text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label
                    htmlFor="test-email"
                    className="mb-1.5 block text-xs font-semibold text-zinc-700"
                  >
                    Email
                  </label>
                  <input
                    id="test-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="test-phone"
                    className="mb-1.5 block text-xs font-semibold text-zinc-700"
                  >
                    WhatsApp number
                  </label>
                  <div className="flex h-11 overflow-hidden rounded-lg border border-zinc-200 focus-within:border-zinc-900">
                    <span className="flex items-center bg-zinc-50 px-3 text-sm font-semibold text-zinc-700">
                      +91
                    </span>
                    <input
                      id="test-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      className="flex-1 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.phone}</p>
                  )}
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Opening checkout…
                    </>
                  ) : (
                    `Pay INR ${Number(amount || 0).toFixed(2)}`
                  )}
                </button>

                <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                  <div className="h-px flex-1 bg-zinc-200" />
                  Dev only
                  <div className="h-px flex-1 bg-zinc-200" />
                </div>

                <button
                  type="button"
                  onClick={markAsPaid}
                  disabled={loading}
                  className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-amber-300 bg-amber-50 text-xs font-semibold text-amber-800 transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Mark as paid (skip gateway)
                </button>

                <p className="text-center text-[11px] text-zinc-500">
                  Secure test payment powered by Cashfree.
                </p>
              </form>
            )}

            {/* Verifying */}
            {status === "verifying" && (
              <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
                <p className="text-sm text-zinc-600">Confirming payment with Cashfree…</p>
              </div>
            )}

            {/* Success */}
            {status === "success" && paidOrder && (
              <div className="px-6 py-6">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">
                    Payment of INR {paidOrder.amount.toFixed(2)} received
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Order ID:{" "}
                    <span className="font-mono text-zinc-700">{paidOrder.id}</span>
                  </p>
                </div>

                {/* Email status */}
                <div
                  className={`mt-5 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                    emailStatus === "sent"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : emailStatus === "error"
                        ? "border-amber-200 bg-amber-50 text-amber-700"
                        : "border-zinc-200 bg-zinc-50 text-zinc-600"
                  }`}
                >
                  {emailStatus === "sending" && (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Sending receipt to {email}…</span>
                    </>
                  )}
                  {emailStatus === "sent" && (
                    <>
                      <Mail className="h-3.5 w-3.5" />
                      <span>Receipt emailed to {email}</span>
                    </>
                  )}
                  {emailStatus === "error" && (
                    <>
                      <Mail className="h-3.5 w-3.5" />
                      <span>Could not send email — you can still download the receipt below.</span>
                    </>
                  )}
                  {emailStatus === "idle" && (
                    <>
                      <Mail className="h-3.5 w-3.5" />
                      <span>Preparing receipt…</span>
                    </>
                  )}
                </div>

                {dashboardUrl ? (
                  <a
                    href={dashboardUrl}
                    className="mt-4 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-zinc-900 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                  >
                    Access your dashboard
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <div className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 text-sm font-semibold text-zinc-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Preparing dashboard access…
                  </div>
                )}

                <button
                  type="button"
                  onClick={downloadReceipt}
                  className="mt-2 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  <Download className="h-4 w-4" />
                  Download receipt
                </button>

                <button
                  type="button"
                  onClick={close}
                  className="mt-2 inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-lg text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900"
                >
                  Close
                </button>
              </div>
            )}

            {/* Failed */}
            {status === "failed" && (
              <div className="px-6 py-6">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <XCircle className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">Payment failed</h3>
                  <p className="text-xs text-zinc-500">
                    {error
                      ? error
                      : "We could not confirm the payment. No amount has been charged. Please try again."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={tryAgain}
                  className="mt-6 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-zinc-900 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try again
                </button>

                <button
                  type="button"
                  onClick={close}
                  className="mt-2 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
