import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type BuyButtonProps = {
  label?: string
  className?: string
}

export function BuyButton({ label = "BUY Now", className }: BuyButtonProps) {
  return (
    <a
      href="#enroll"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full bg-foreground py-2 pr-5 pl-1 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <ChevronRight className="h-4 w-4" />
      </span>
      <span className="tracking-wide">{label}</span>
    </a>
  )
}
