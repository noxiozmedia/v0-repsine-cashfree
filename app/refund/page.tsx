import { Check, X } from "lucide-react"
import { PageShell, ProseSection } from "@/components/repsine/page-shell"

export const metadata = {
  title: "Refund Policy | Repsine",
  description:
    "Repsine offers a 7-day refund policy on the Canva Mastery course. Read the eligibility and process below.",
}

const eligible = [
  "Refund Request Timing — submitted within 7 days from the date of purchase.",
  "Valid Reason for Dissatisfaction — a legitimate reason for dissatisfaction with the course content.",
  "Course Progress Limit — you must have accessed or completed no more than 20% of the course material.",
  "Official Refund Channel — requests submitted via email to repsine.agency@gmail.com.",
]

const ineligible = [
  "Post-Refund Period — refund requests made after the 7-day window has expired.",
  "Course Material Access — more than 20% of the course content has been accessed or completed.",
  "Change of Mind — requests made due to a change of mind after purchase.",
  "Misuse of Materials — refunds will not be issued if course materials have been downloaded, shared, or misused.",
  "Unreported Technical Issues — issues that were not reported and resolved through our support team.",
]

export default function RefundPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Refund Policy"
      description="At Repsine, we are committed to delivering exceptional learning experiences. We offer a 7-day refund policy on our Canva Mastery course, providing peace of mind and flexibility to those who are not fully satisfied with their purchase."
    >
      <div className="space-y-6">
        <ProseSection>
          <h2 className="font-display text-xl font-bold text-foreground">Eligibility for Refund</h2>
          <p>To qualify for a refund, the following conditions must be met:</p>
          <ul className="space-y-3">
            {eligible.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </ProseSection>

        <ProseSection>
          <h2 className="font-display text-xl font-bold text-foreground">Non-Refundable Conditions</h2>
          <p>We regret that we are unable to process refunds under the following conditions:</p>
          <ul className="space-y-3">
            {ineligible.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                  <X className="h-3 w-3" />
                </span>
                <span className="text-sm sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </ProseSection>

        <ProseSection>
          <h2 className="font-display text-xl font-bold text-foreground">How to Request a Refund</h2>
          <ol className="space-y-4">
            <RefundStep
              n={1}
              title="Contact Support"
              body={
                <>
                  Send an email to{" "}
                  <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
                    repsine.agency@gmail.com
                  </a>{" "}
                  with your order details (invoice number, purchase date, and registered email) and a clear
                  explanation of the reason for requesting a refund.
                </>
              }
            />
            <RefundStep
              n={2}
              title="Refund Request Review"
              body="Our support team will review your request and respond within 48 hours to acknowledge receipt and assess your eligibility."
            />
            <RefundStep
              n={3}
              title="Refund Approval"
              body="If your refund request is approved, it will be processed and the funds will be returned to you via the original payment method."
            />
            <RefundStep
              n={4}
              title="Refund Processing Time"
              body="Refunds are typically processed within 5–7 business days. The processing time may vary depending on your payment provider."
            />
          </ol>
        </ProseSection>

        <ProseSection>
          <h2 className="font-display text-xl font-bold text-foreground">Need Assistance?</h2>
          <p>
            Our dedicated support team is here to help resolve any issues you may have with the course,
            whether technical difficulties or general inquiries. We encourage you to contact us at{" "}
            <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
              repsine.agency@gmail.com
            </a>{" "}
            before initiating a refund request — we are more than happy to assist and improve your learning
            experience.
          </p>
        </ProseSection>
      </div>
    </PageShell>
  )
}

function RefundStep({ n, title, body }: { n: number; title: string; body: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {n}
      </span>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">{body}</p>
      </div>
    </li>
  )
}
