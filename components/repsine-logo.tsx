import Image from "next/image"
import { cn } from "@/lib/utils"

export function RepsineLogo({
  className,
  size = 32,
}: {
  className?: string
  size?: number
}) {
  return (
    <Image
      src="/repsine-logo.jpg"
      alt="Repsine"
      width={size}
      height={size}
      priority
      className={cn("rounded-md object-cover", className)}
    />
  )
}
