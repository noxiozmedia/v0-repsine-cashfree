import { Mail, MapPin, Phone } from "lucide-react"
import { PageShell } from "@/components/repsine/page-shell"
import { ContactForm } from "@/components/repsine/contact-form"

export const metadata = {
  title: "Contact | Repsine",
  description:
    "Get in touch with the Repsine team for support, questions, or feedback about the Repsine Instagram Kit.",
}

const contactDetails = [
  {
    icon: MapPin,
    label: "Our Address",
    value: "Rangat, N & M Andaman, India - 744205",
  },
  {
    icon: Mail,
    label: "Email",
    value: "repsine.agency@gmail.com",
    href: "mailto:repsine.agency@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6295 747 270",
    href: "tel:+916295747270",
  },
]

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Get in Touch"
      title="We'd love to hear from you."
      description="Whether you have questions about our courses, need support, or want to share feedback, our team is here to assist you and ensure your experience is seamless and successful."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <ul className="space-y-4">
          {contactDetails.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <item.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-wide text-foreground/70 uppercase">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-1 block break-words text-sm leading-relaxed text-foreground hover:text-primary sm:text-base"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm leading-relaxed text-foreground sm:text-base">
                    {item.value}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <ContactForm />
      </div>
    </PageShell>
  )
}
