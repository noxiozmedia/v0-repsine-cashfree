"use client"

import { useState } from "react"
import { ChevronRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { CheckoutModal } from "./checkout-modal"

type BuyButtonProps = {
  label?: string
  className?: string
  variant?: "default" | "plain"
}

export function BuyButton({ label = "BUY Now", className, variant = "default" }: BuyButtonProps) {
  const [open, setOpen] = useState(false)

  if (variant === "plain") {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
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
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex h-12 cursor-pointer items-center overflow-hidden rounded-full bg-foreground pl-1.5 pr-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5",
          className,
        )}
      >
        {/* Circle with arrow — always left-anchored, shrink-0 so it never squishes */}
        <span className="relative mr-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary transition-transform duration-300">
          <ChevronRight className="h-4 w-4 text-primary-foreground" />
        </span>
        {/* Label */}
        <span className="tracking-wide">
          {label}
        </span>
      </button>

      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
