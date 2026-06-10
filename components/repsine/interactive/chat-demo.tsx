"use client"

import { useEffect, useState } from "react"
import { Send, ChevronLeft, ChevronRight } from "lucide-react"

// Short, demo-friendly reply variants.
const replyVariants = [
  {
    title: "Warm welcome",
    text: "Hey! Thank you so much for reaching out. I'd love to help with your skin concern. Could you share your main concern and age range?",
  },
  {
    title: "Treatment first",
    text: "Hi! Great question. For that concern we'd actually recommend a treatment over a product — it works at the root. Want me to share what that looks like?",
  },
  {
    title: "Soft booking",
    text: "Hi there! Happy to help. The best next step is a quick 15-min consult — no pressure. Would Tuesday 4 PM or Wednesday 11 AM suit you better?",
  },
]

export function ChatDemo() {
  const [variant, setVariant] = useState(0)
  const [sent, setSent] = useState(false)
  const [paused, setPaused] = useState(false)

  // Auto-cycle through the reply variants until one is sent or user interacts.
  useEffect(() => {
    if (sent || paused) return
    const id = setInterval(() => {
      setVariant((v) => (v + 1) % replyVariants.length)
    }, 2400)
    return () => clearInterval(id)
  }, [sent, paused])

  const go = (dir: 1 | -1) => {
    setPaused(true)
    setVariant((v) => (v + dir + replyVariants.length) % replyVariants.length)
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

      {/* Floating reply popup — rounded card, auto-cycles, vanishes once sent */}
      {!sent && (
        <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-[#2a3942] p-3 shadow-xl shadow-black/40 ring-1 ring-white/10 duration-300 animate-in slide-in-from-bottom-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-wide text-emerald-300/90 uppercase">
              {replyVariants[variant].title}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous reply"
                onClick={() => go(-1)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Next reply"
                onClick={() => go(1)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <p
              key={variant}
              className="flex-1 text-[12px] leading-relaxed text-white/90 duration-300 animate-in fade-in"
            >
              {replyVariants[variant].text}
            </p>
            <button
              type="button"
              aria-label="Send reply"
              onClick={() => setSent(true)}
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
