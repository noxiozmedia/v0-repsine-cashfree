"use client"

import { useState } from "react"
import { ChevronRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { CheckoutModal } from "./checkout-modal"

type BuyButtonProps = {
  label?: string
  className?: string
}

export function BuyButton({ label = "BUY Now", className }: BuyButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative inline-flex h-12 cursor-pointer items-center overflow-hidden rounded-full bg-foreground pl-1.5 pr-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5",
          className,
        )}
      >
        {/* Purple circle — expands to fill on hover keeping padding */}
        <span
          aria-hidden="true"
          className="absolute top-1.5 left-1.5 h-9 w-9 rounded-full bg-primary transition-[width,height,top,left] duration-500 ease-out group-hover:top-1.5 group-hover:left-1.5 group-hover:h-[calc(100%-0.75rem)] group-hover:w-[calc(100%-0.75rem)]"
        />
        {/* Arrow icon inside the purple circle */}
        <span className="relative z-10 mr-2.5 flex h-9 w-9 flex-shrink-0 items-center justify-center">
          <ChevronRight className="h-4 w-4 text-primary-foreground" />
        </span>
        {/* Label */}
        <span className="relative z-10 tracking-wide transition-colors duration-300 group-hover:text-primary-foreground">
          {label}
        </span>
      </button>

      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
