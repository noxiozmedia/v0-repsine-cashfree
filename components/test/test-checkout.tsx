"use client"

import { useEffect, useState } from "react"
import { Loader2, X } from "lucide-react"

declare global {
  interface Window {
    Cashfree: any
  }
}

const AMOUNT = 1

export function TestCheckout() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  function validate() {
    const next: { email?: string; phone?: string } = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email"
    const digits = phone.replace(/\D/g, "")
    if (digits.length !== 10) next.phone = "Enter a 10-digit WhatsApp number"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!validate()) return

    setLoading(true)
    try {
      // Use email prefix as the customer name (API requires a name field)
      const namePart = email.split("@")[0] || "Test Customer"

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: namePart,
          email,
          phone: phone.replace(/\D/g, ""),
          amount: AMOUNT,
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
      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal",
      })
    } catch (err) {
      console.log("[v0] test-checkout error", err)
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function close() {
    if (loading) return
    setOpen(false)
    setError(null)
  }

  return (
    <>
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-zinc-500 uppercase">
          Cashfree Test
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
          One-rupee checkout
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          A minimal page to verify your Cashfree payment gateway. Click Buy to enter your details
          and complete a INR 1 test payment without leaving this page.
        </p>

        <div className="mt-6 flex items-center justify-between rounded-lg bg-zinc-100 px-4 py-3">
          <span className="text-sm text-zinc-700">Test product</span>
          <span className="text-sm font-semibold text-zinc-900">INR 1.00</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
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
                  Pay INR 1.00
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handlePay} className="space-y-4 px-6 py-5">
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
                {errors.email && <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>}
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
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-[11px] text-red-600">{errors.phone}</p>}
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
                  "Pay INR 1.00"
                )}
              </button>

              <p className="text-center text-[11px] text-zinc-500">
                Secure test payment powered by Cashfree.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
