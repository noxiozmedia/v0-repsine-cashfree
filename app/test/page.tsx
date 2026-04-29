import { TestCheckout } from "@/components/test/test-checkout"

export const metadata = {
  title: "Cashfree Test — Repsine",
  description: "INR 1 test checkout to verify the Cashfree payment gateway.",
}

export default function TestPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-16">
      <TestCheckout />
    </main>
  )
}
