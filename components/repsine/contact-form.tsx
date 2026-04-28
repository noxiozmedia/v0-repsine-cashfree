"use client"

import { useState } from "react"
import { Send, Loader2, Check } from "lucide-react"
import { submitContact } from "@/app/contact-us/actions"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setStatus("loading")
    setError(null)
    const result = await submitContact(formData)
    if (result.ok) {
      setStatus("success")
    } else {
      setStatus("error")
      setError(result.error ?? "Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card/40 p-10 text-center backdrop-blur">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">Message sent</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Thanks for reaching out. Our team will get back to you within 48 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-xs font-semibold tracking-wide text-primary uppercase hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-5 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" placeholder="Your full name" required />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <FieldArea label="Message" name="message" placeholder="How can we help you?" required />

      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string
  name: string
  type: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-wide text-foreground/80 uppercase">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </label>
  )
}

function FieldArea({
  label,
  name,
  placeholder,
  required,
}: {
  label: string
  name: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-wide text-foreground/80 uppercase">
        {label}
      </span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-none rounded-lg border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </label>
  )
}
