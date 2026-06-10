"use client"

import { useEffect, useState } from "react"
import { Send } from "lucide-react"

// Short, demo-friendly reply variants (trimmed from the real script library).
const replyVariants = [
  {
    title: "Warm welcome",
    text: "Hey! Thank you so much for reaching out. I'd love to help with your skin concern. Could you share your main concern and age range so I can suggest the right treatment?",
  },
  {
    title: "Treatment-first",
    text: "Hi! Great question. For that concern we'd actually recommend a treatment over a product — it works at the root. Want me to share what that would look like for your skin?",
  },
  {
    title: "Soft booking",
    text: "Hi there! Happy to help. The best next step is a quick 15-min consult — no pressure to book. Would Tuesday 4 PM or Wednesday 11 AM suit you better?",
  },
]

export function ChatDemo() {
  const [variant, setVariant] = useState(0)
  const [sent, setSent] = useState(false)

  // Auto-cycle through the reply variants until one is sent.
  useEffect(() => {
    if (sent) return
    const id = setInterval(() => {
      setVariant((v) => (v + 1) % replyVariants.length)
    }, 2200)
    return () => clearInterval(id)
  }, [sent])

  function send() {
    setSent(true)
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#0b141a] ring-1 ring-border/60">
      {/* Chat header */}
      <div className="flex items-center gap-2.5 bg-[#1f2c33] px-3 py-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
          P
        </div>
        <div className="leading-tight">
          <p className="text-[13px] font-semibold text-white">Patient</p>
          <p className="text-[10px] text-emerald-300/80">online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-3">
        {/* incoming */}
        <div className="max-w-[80%] self-start rounded-lg rounded-tl-sm bg-[#1f2c33] px-3 py-1.5">
          <p className="text-[13px] text-white">Hello</p>
          <span className="mt-0.5 block text-right text-[9px] text-white/40">9:41 AM</span>
        </div>

        {/* sent reply (only visible after sending) */}
        {sent && (
          <div className="max-w-[85%] self-end rounded-lg rounded-tr-sm bg-[#005c4b] px-3 py-1.5 duration-300 animate-in slide-in-from-bottom-2 fade-in">
            <p className="text-[13px] leading-relaxed text-white">{replyVariants[variant].text}</p>
            <span className="mt-0.5 block text-right text-[9px] text-emerald-200/60">9:42 AM ✓✓</span>
          </div>
        )}
      </div>

      {/* Bottom reply popup — auto-cycles, vanishes once sent */}
      {!sent && (
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#1f2c33] p-2.5 duration-300 animate-in slide-in-from-bottom-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-wide text-emerald-300/80 uppercase">
              Suggested reply · {replyVariants[variant].title}
            </span>
            <div className="flex items-center gap-1">
              {replyVariants.map((r, i) => (
                <span
                  key={r.title}
                  className={`h-1.5 rounded-full transition-all ${i === variant ? "w-4 bg-emerald-400" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <p
              key={variant}
              className="flex-1 rounded-lg bg-[#2a3942] px-3 py-2 text-[12px] leading-relaxed text-white/90 duration-300 animate-in fade-in"
            >
              {replyVariants[variant].text}
            </p>
            <button
              type="button"
              aria-label="Send reply"
              onClick={send}
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-400"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
