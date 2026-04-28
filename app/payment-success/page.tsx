import { PageShell } from "@/components/repsine/page-shell"
import { CheckCircle2 } from "lucide-react"

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>
}) {
  const params = await searchParams
  return (
    <PageShell title="Payment Successful">
      <div className="mx-auto max-w-2xl py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="font-display mt-6 text-3xl font-bold text-foreground">
          Payment Successful!
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Thank you for enrolling in the Canva Mastery course. Your payment has been received and
          your course access link has been sent to your email.
        </p>
        {params.order_id && (
          <p className="mt-6 text-sm text-muted-foreground">
            Order ID: <span className="font-mono font-medium text-foreground">{params.order_id}</span>
          </p>
        )}
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Back to Home
          </a>
        </div>
      </div>
    </PageShell>
  )
}
