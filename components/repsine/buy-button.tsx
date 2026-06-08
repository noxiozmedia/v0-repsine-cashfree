"use client"

import { useState } from "react"
import { ChevronRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { CheckoutModal } from "./checkout-modal"
import { createClient } from "@/lib/supabase/client"

type BuyButtonProps = {
  label?: string
  className?: string
  variant?: "default" | "plain"
}

async function trackCtaClick() {
  try {
    const supabase = createClient()
    await supabase.rpc("increment_cta_clicks")
  } catch {
    // fire-and-forget — never block the UI
  }
}

export function BuyButton({ label = "BUY Now", className, variant = "default" }: BuyButtonProps) {
  const [open, setOpen] = useState(false)

  function handleClick() {
    void trackCtaClick()
    setOpen(true)
  }

  if (variant === "plain") {
    return (
      <>
        <button
          type="button"
          onClick={handleClick}
          className={cn(
            "inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90",
            className,
          )}
        >
          {label}
        </button>
        <CheckoutModal open={open} onClose={() => setOpen(false)} />
      </>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "group inline-flex h-12 cursor-pointer items-center overflow-hidden rounded-full bg-foreground pl-1.5 pr-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5",
          className,
        )}
      >
        {/* Circle with arrow — always left-anchored, shrink-0 so it never squishes */}
        <span className="relative mr-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary transition-transform duration-300">
          <ChevronRight className="h-4 w-4 text-primary-foreground" />
        </span>
        {/* Label — flex-1 + text-center so it centers in the remaining space */}
        <span className="flex-1 text-center tracking-wide">
          {label}
        </span>
      </button>

      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
