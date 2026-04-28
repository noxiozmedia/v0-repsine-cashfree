import { PageShell } from "@/components/repsine/page-shell"

export const metadata = {
  title: "Shipping & Delivery | Repsine",
  description:
    "Repsine's Canva Mastery course is a digital product. Learn how instant access and lifetime delivery work.",
}

export default function ShippingPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Shipping & Delivery"
      description="At Repsine, we prioritize delivering your Canva Mastery course efficiently and securely. Since our course is a digital product, there is no physical shipping involved. Below is everything you need to know about how we handle course delivery."
    >
      <article className="space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Digital Product Delivery</h2>
        <p>
          The Canva Mastery course is delivered entirely online — there is no physical shipment, no waiting
          for a package, and no delivery charges. As soon as your payment is successfully processed through
          our payment partner, you will receive an order confirmation email containing your receipt, login
          credentials, and a direct link to your personal learning dashboard where you can begin learning
          immediately. The complete course content is unlocked at the time of purchase, including all video
          lessons, design exercises, downloadable templates, and project files.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Lifetime Access &amp; Updates</h2>
        <p>
          Every purchase of the Canva Mastery course includes lifetime access to all course materials,
          allowing you to revisit lessons whenever you need a refresher or want to apply a concept to a new
          project. Lifetime access also extends to future updates — whenever we add new lessons, expand
          existing modules, or introduce additional templates and resources, you will receive free access to
          them automatically through the same dashboard. There are no recurring fees and no hidden charges.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Course Access Features</h2>
        <p>
          Our learning platform is available 24 hours a day, 7 days a week, so you can learn entirely at your
          own pace and on your own schedule. The course is fully mobile-friendly and can be accessed from any
          modern smartphone, tablet, or computer with an internet connection. The learning experience itself
          is interactive, combining video instruction with practical design exercises, quizzes, and
          hands-on projects to help you retain what you learn and build a real portfolio of work as you
          progress.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Payment Methods</h2>
        <p>
          We use Razorpay, a secure and widely-trusted payment gateway, to process all transactions. You may
          pay using your credit or debit card (Visa, MasterCard, American Express, or RuPay), UPI, net
          banking, or any other method supported by Razorpay at checkout. Once your payment is successfully
          completed, your access to the course is granted immediately and a confirmation email with your
          login details is dispatched to the email address you provided at checkout.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Support &amp; Assistance</h2>
        <p>
          If you experience any difficulty accessing your course, do not receive your confirmation email, or
          encounter any other technical issue, our dedicated support team is ready to help. Reach out to us
          at{" "}
          <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
            repsine.agency@gmail.com
          </a>{" "}
          with your order details and a description of the issue, and we will respond within 48 hours to
          resolve your concern.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-foreground">Frequently Asked Questions</h2>
        <p>
          <strong className="text-foreground">How soon will I get access to the course?</strong> As soon as
          your payment is completed, you will receive an instant access email containing all the details
          needed to log into your account and start learning. In the unlikely event that the email does not
          arrive within a few minutes, please check your spam or promotions folder before contacting support.
        </p>
        <p>
          <strong className="text-foreground">Can I share the course with others?</strong> Access to the
          course is granted only to the person who purchases it. Sharing of login credentials, course videos,
          or downloadable materials is strictly prohibited under our Terms &amp; Conditions and may result in
          immediate suspension of your account without a refund.
        </p>
        <p>
          <strong className="text-foreground">What happens if I forget my password?</strong> You can easily
          reset your password using the &quot;Forgot Password&quot; option on the login page. A secure reset
          link will be sent to your registered email address, and you can set a new password within minutes.
        </p>
      </article>
    </PageShell>
  )
}
