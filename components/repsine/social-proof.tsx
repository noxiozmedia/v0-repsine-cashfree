import { Star } from "lucide-react"

const AVATARS = [
  { initials: "SA", color: "bg-amber-700" },
  { initials: "PK", color: "bg-stone-600" },
  { initials: "MR", color: "bg-amber-900" },
  { initials: "DV", color: "bg-stone-700" },
]

export function SocialProof() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3 py-1.5 shadow-md shadow-primary/10">
      {/* Avatar stack */}
      <div className="flex -space-x-2">
        {AVATARS.map((a) => (
          <span
            key={a.initials}
            className={`${a.color} flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-card`}
            aria-hidden="true"
          >
            {a.initials}
          </span>
        ))}
      </div>

      {/* Divider */}
      <span className="h-4 w-px bg-border" aria-hidden="true" />

      {/* Stars + rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
        ))}
        <span className="ml-1 text-xs font-semibold text-foreground">4.9</span>
      </div>

      {/* Label */}
      <span className="text-xs text-muted-foreground">2K+ clinics</span>
    </div>
  )
}
