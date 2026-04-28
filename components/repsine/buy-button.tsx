"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type BuyButtonProps = {
  label?: string
  className?: string
}

const COURSE_PRICE = 1299

// Cashfree SDK types
declare global {
  interface Window {
    Cashfree: any
  }
}

export function BuyButton({ label = "BUY Now", className }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)
  const [cashfreeLoaded, setCashfreeLoaded] = useState(false)

  // Load Cashfree SDK on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.Cashfree) {
      setCashfreeLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"
    script.async = true
    script.onload = () => setCashfreeLoaded(true)
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  const handleClick = async () => {
    if (loading) return
    if (!cashfreeLoaded) {
      alert("Payment system is loading. Please try again in a moment.")
      return
    }

    setLoading(true)

    try {
      // Create order on server with minimal placeholder customer info
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Customer",
          email: "customer@repsine.com",
          phone: "9999999999",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[v0] Order creation failed:", errorData)
        alert("Failed to initiate payment. Please try again.")
        setLoading(false)
        return
      }

      const { payment_session_id } = await response.json()

      // Initialize Cashfree SDK
      const cashfree = await window.Cashfree({
        mode: "sandbox", // Change to "production" when going live
      })

      // Open checkout — Cashfree's hosted page collects customer details
      cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_self",
      })
    } catch (error) {
      console.error("[v0] Payment error:", error)
      alert("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "group relative inline-flex h-12 cursor-pointer items-center overflow-hidden rounded-full bg-foreground pl-1.5 pr-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-90",
        className,
      )}
    >
      {/* Purple circle — sits inset on left; on hover expands to fill the inset area (keeps padding) */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-1.5 h-9 w-9 rounded-full bg-primary transition-[width,height,top,left] duration-500 ease-out group-hover:top-1.5 group-hover:left-1.5 group-hover:h-[calc(100%-0.75rem)] group-hover:w-[calc(100%-0.75rem)]"
      />

      {/* Arrow icon or loader — centred inside the purple circle area */}
      <span className="relative z-10 mr-2.5 flex h-9 w-9 flex-shrink-0 items-center justify-center">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-primary-foreground" />
        )}
      </span>

      {/* Label — turns white when purple fills the pill */}
      <span className="relative z-10 tracking-wide transition-colors duration-300 group-hover:text-primary-foreground">
        {loading ? "Loading..." : label}
      </span>
    </button>
  )
}
