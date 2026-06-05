import { PageShell } from "@/components/repsine/page-shell"

export const metadata = {
  title: "Shipping & Delivery | Repsine",
  description:
    "The Repsine Instagram Kit is a digital product. Learn how instant access and lifetime delivery work.",
}

export default function ShippingPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Shipping & Delivery"
      description="The Repsine Instagram Kit is delivered entirely digitally — no physical shipping, no waiting. Here is everything you need to know about how we handle access and delivery."
    >
      <article className="space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Digital Product Delivery</h2>
        <p>
          The Repsine Instagram Kit is delivered entirely online — there is no physical shipment, no waiting
          for a package, and no delivery charges. As soon as your payment is successfully processed, you will
          receive an order confirmation email containing your receipt, login credentials, and a direct link
          to your personal dashboard where you can access all kit materials immediately. The complete kit is
          unlocked at the time of purchase, including all ready-to-post templates, captions, content
          calendar, WhatsApp scripts, and step-by-step tutorials.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Lifetime Access &amp; Updates</h2>
        <p>
          Every purchase of the Repsine Instagram Kit includes lifetime access to all materials, allowing
          you to revisit and reuse them whenever you need. Lifetime access also extends to future updates —
          whenever we add new templates, captions, or resources, you will receive free access to them
          automatically through the same dashboard. There are no recurring fees and no hidden charges.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Kit Access Features</h2>
        <p>
          Your dashboard is available 24 hours a day, 7 days a week, so you can access the kit entirely at
          your own pace and on your own schedule. It is fully mobile-friendly and can be accessed from any
          modern smartphone, tablet, or computer with an internet connection.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Payment Methods</h2>
        <p>
          We use a secure and trusted payment gateway to process all transactions. You may pay using your
          credit or debit card (Visa, MasterCard, American Express, or RuPay), UPI, net banking, or any
          other supported method at checkout. Once your payment is successfully completed, your access to the
          kit is granted immediately and a confirmation email with your login details is dispatched to the
          email address you provided at checkout.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Support &amp; Assistance</h2>
        <p>
          If you experience any difficulty accessing your kit, do not receive your confirmation email, or
          encounter any technical issue, our support team is ready to help. Reach out to us at{" "}
          <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
            repsine.agency@gmail.com
          </a>{" "}
          with your order details and a description of the issue, and we will respond within 48 hours.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Frequently Asked Questions</h2>
        <p>
          <strong className="text-foreground">How soon will I get access to the kit?</strong> As soon as
          your payment is completed, you will receive an instant access email with everything needed to log
          in and start using the kit. If the email does not arrive within a few minutes, please check your
          spam or promotions folder before contacting support.
        </p>
        <p>
          <strong className="text-foreground">Can I share the kit with others?</strong> Access to the kit
          is granted only to the person who purchases it. Sharing of login credentials or kit materials with
          third parties is strictly prohibited and may result in immediate suspension of your account without
          a refund.
        </p>
        <p>
          <strong className="text-foreground">What happens if I forget my password?</strong> You can reset
          your password using the &quot;Forgot Password&quot; option on the login page. A secure reset link
          will be sent to your registered email address within minutes.
        </p>
      </article>
    </PageShell>
  )
}
