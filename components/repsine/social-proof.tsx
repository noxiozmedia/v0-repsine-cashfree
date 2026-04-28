import { Star } from "lucide-react"
import Image from "next/image"

export function SocialProof() {
  const avatars = [
    "/avatars/student-1.jpg",
    "/avatars/student-2.jpg",
    "/avatars/student-3.jpg",
  ]

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {avatars.map((src, i) => (
            <span
              key={i}
              className="relative inline-block h-8 w-8 overflow-hidden rounded-full ring-2 ring-background"
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`Student ${i + 1}`}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </span>
          ))}
          <span className="relative inline-flex h-8 w-10 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground ring-2 ring-background">
            2K+
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Join 2K+ Members</p>
      </div>
    </div>
  )
}
