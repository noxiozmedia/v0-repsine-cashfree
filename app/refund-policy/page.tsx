import { PageShell } from "@/components/repsine/page-shell"

export const metadata = {
  title: "Refund Policy | Repsine",
  description:
    "Repsine offers a 7-day refund policy on the Canva Mastery course. Read the eligibility and process below.",
}

export default function RefundPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Refund Policy"
      description="At Repsine, we are committed to delivering exceptional learning experiences. We offer a 7-day refund policy on our Canva Mastery course, providing peace of mind and flexibility to those who are not fully satisfied with their purchase."
    >
      <article className="space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Eligibility for a Refund</h2>
        <p>
          To qualify for a refund, the request must meet all of the following conditions. The refund request
          must be submitted within 7 days from the date of purchase. The customer must provide a legitimate
          reason for dissatisfaction with the course content. The customer must have accessed or completed no
          more than 20% of the total course material at the time of requesting the refund. All refund
          requests must be submitted through our official channel by emailing{" "}
          <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
            repsine.agency@gmail.com
          </a>{" "}
          from the email address used for purchase.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Non-Refundable Conditions</h2>
        <p>
          We regret that we are unable to process refunds in certain circumstances. Refund requests made
          after the 7-day window has expired will not be considered. Refunds will not be granted if more than
          20% of the course content has been accessed or completed. Requests made simply due to a change of
          mind after purchase are not eligible. We will not issue refunds where course materials have been
          downloaded, shared with third parties, or otherwise misused. Finally, technical issues that were
          not first reported to and addressed by our support team are not eligible for a refund — please
          always reach out to support before requesting a refund.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">How to Request a Refund</h2>
        <p>
          The refund process is straightforward. Begin by contacting our support team at{" "}
          <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
            repsine.agency@gmail.com
          </a>{" "}
          with your order details — invoice number, purchase date, and registered email address — along with
          a clear explanation of the reason for the refund request. Our support team will review your
          request and respond within 48 hours to acknowledge receipt and assess your eligibility against the
          policy criteria above. If your refund request is approved, it will be processed and the funds will
          be returned to you via the original payment method used at the time of purchase. Refunds are
          typically processed within 5 to 7 business days from the date of approval, although the exact time
          may vary depending on your bank or payment provider.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Need Assistance?</h2>
        <p>
          Our dedicated support team is here to help resolve any issues you may experience with the course,
          whether they are technical difficulties or general inquiries about course content. We strongly
          encourage you to contact us at{" "}
          <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
            repsine.agency@gmail.com
          </a>{" "}
          before initiating a refund request — in most cases we are able to resolve concerns and improve your
          learning experience without the need for a refund. We are committed to making your time with
          Repsine valuable, productive, and enjoyable.
        </p>
      </article>
    </PageShell>
  )
}
