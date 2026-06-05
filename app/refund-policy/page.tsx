import { PageShell } from "@/components/repsine/page-shell"

export const metadata = {
  title: "Refund Policy | Repsine",
  description:
    "Repsine's refund policy for the Instagram Kit for Aesthetic Clinics. Read the eligibility criteria and process below.",
}

export default function RefundPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Refund Policy"
      description="At Repsine, we stand behind every product we create. Read our refund policy for the Repsine Instagram Kit below."
    >
      <article className="space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Eligibility for a Refund</h2>
        <p>
          To qualify for a refund, the request must meet all of the following conditions. The refund request
          must be submitted within 7 days from the date of purchase. The customer must provide a legitimate
          reason for dissatisfaction with the kit content. All refund requests must be submitted through our
          official channel by emailing{" "}
          <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
            repsine.agency@gmail.com
          </a>{" "}
          from the email address used for purchase.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Non-Refundable Conditions</h2>
        <p>
          We regret that we are unable to process refunds in certain circumstances. Refund requests made
          after the 7-day window has expired will not be considered. Requests made simply due to a change of
          mind after accessing the kit are not eligible. We will not issue refunds where kit materials have
          been downloaded, shared with third parties, or otherwise misused. Technical issues that were not
          first reported to and addressed by our support team are not eligible for a refund — please always
          reach out to support before requesting a refund.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">How to Request a Refund</h2>
        <p>
          Contact our support team at{" "}
          <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
            repsine.agency@gmail.com
          </a>{" "}
          with your order details — invoice number, purchase date, and registered email address — along with
          a clear explanation of the reason for the refund request. Our team will review your request and
          respond within 48 hours. If approved, the refund will be returned via the original payment method
          within 5 to 7 business days.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Need Assistance?</h2>
        <p>
          Our support team is here to help resolve any issues you may experience with the kit. We strongly
          encourage you to contact us at{" "}
          <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
            repsine.agency@gmail.com
          </a>{" "}
          before initiating a refund request — in most cases we are able to resolve concerns without the
          need for a refund.
        </p>
      </article>
    </PageShell>
  )
}
