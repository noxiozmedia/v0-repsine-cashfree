import { ArrowUpRight, MapPin } from "lucide-react"

const links = [
  { label: "Contact", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Shipping and Delivery", href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40">
      <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Canva Mastery by Repsine
        </h2>

        <ul className="mt-8 divide-y divide-border/60 border-y border-border/60">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group flex items-center justify-between py-4 text-sm font-semibold tracking-wide text-foreground/80 uppercase transition-colors hover:text-foreground"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
          <p className="leading-relaxed">
            Rangat, N &amp; M Andaman, India - 744205
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © Repsine {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted in the Andaman Islands
          </p>
        </div>
      </div>
    </footer>
  )
}
