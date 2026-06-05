import { ArrowUpRight } from "lucide-react"

const links = [
  { label: "Contact", href: "/contact-us" },
  { label: "About Us", href: "/about-us" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Shipping and Delivery", href: "/shipping-and-delivery" },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40">
      <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Instagram Kit for Aesthetic Clinics by Repsine
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

        <div className="mt-10 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">
            © Repsine {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
