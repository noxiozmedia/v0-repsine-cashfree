import { PageShell, ProseSection } from "@/components/repsine/page-shell"

export const metadata = {
  title: "Shipping & Delivery | Repsine",
  description:
    "Repsine's Canva Mastery course is a digital product. Learn how instant access and lifetime delivery work.",
}

const steps = [
  {
    title: "1. Order Confirmation",
    body: "Once you complete your purchase, you will receive an order confirmation email. This includes a receipt of your purchase, login credentials to access the course, and a link to your personal dashboard where you can begin learning.",
  },
  {
    title: "2. Instant Access to the Course",
    body: "After your payment is processed, you will be able to access the course immediately through our secure online platform. You can start learning right away by logging into your account. The course content will be available in its entirety, and you will have lifetime access to the materials.",
  },
  {
    title: "3. Lifetime Access",
    body: "All course materials, video lessons, design exercises, templates, and projects are available for lifetime access. You can return to the content at any time, ensuring you can refresh your knowledge or revisit any lesson as needed.",
  },
  {
    title: "4. Updates & New Content",
    body: "As part of your lifetime access, we offer regular updates to the course content. Whenever we add new lessons, features, or resources, you will receive free access to them automatically.",
  },
]

const features = [
  { title: "Available 24/7", body: "Learn at your own pace, on your schedule." },
  {
    title: "Interactive Learning",
    body: "Practical design exercises, quizzes, and hands-on projects for better retention.",
  },
  {
    title: "Mobile Friendly",
    body: "Access the course from your mobile device, tablet, or computer.",
  },
]

const faqs = [
  {
    q: "How soon will I get access to the course?",
    a: "As soon as your payment is completed, you will receive an instant access email with all the details needed to log into your account and start learning.",
  },
  {
    q: "Can I share the course with others?",
    a: "Access to the course is granted only to the person who purchases it. Sharing of login credentials is strictly prohibited under our terms of service.",
  },
  {
    q: "What happens if I forget my password?",
    a: "You can easily reset your password using the “Forgot Password” option on the login page. A reset link will be sent to your registered email address.",
  },
]

export default function ShippingPage() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Shipping & Delivery"
      description="At Repsine, we prioritize delivering your Canva Mastery course efficiently and securely. Since our course is a digital product, there is no physical shipping involved. Below is everything you need to know about how we handle course delivery."
    >
      <div className="space-y-6">
        <ProseSection>
          <h2 className="font-display text-xl font-bold text-foreground">Digital Product Delivery</h2>
          <p>
            The Canva Mastery course is entirely online, so you will receive immediate access to all course
            content after completing your purchase. Here&apos;s how our process works:
          </p>
          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.title} className="rounded-xl border border-border/60 bg-background/40 p-4">
                <p className="font-semibold text-foreground">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">{s.body}</p>
              </div>
            ))}
          </div>
        </ProseSection>

        <ProseSection>
          <h2 className="font-display text-xl font-bold text-foreground">Course Access &amp; Features</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <li key={f.title} className="rounded-xl border border-border/60 bg-background/40 p-4">
                <p className="font-semibold text-foreground">{f.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </li>
            ))}
          </ul>
        </ProseSection>

        <ProseSection>
          <h2 className="font-display text-xl font-bold text-foreground">Payment Methods</h2>
          <p>
            We offer secure payment methods to ensure that your transaction is processed efficiently:
            Credit/Debit Cards (Visa, MasterCard, American Express, RuPay) and Razorpay — a secure and widely
            accepted payment gateway. Upon successful payment, your access to the course will be granted
            immediately. You will also receive a confirmation email with the course login details.
          </p>
        </ProseSection>

        <ProseSection>
          <h2 className="font-display text-xl font-bold text-foreground">Support &amp; Assistance</h2>
          <p>
            If you experience any issues with your course access or encounter technical difficulties, our
            dedicated support team is ready to assist you. Reach out at{" "}
            <a href="mailto:repsine.agency@gmail.com" className="text-primary hover:underline">
              repsine.agency@gmail.com
            </a>
            . We aim to respond to all inquiries within 48 hours.
          </p>
        </ProseSection>

        <ProseSection>
          <h2 className="font-display text-xl font-bold text-foreground">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q}>
                <p className="font-semibold text-foreground">{f.q}</p>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">{f.a}</p>
              </div>
            ))}
          </div>
        </ProseSection>
      </div>
    </PageShell>
  )
}
