import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

// Self-hosted brand display font. next/font preloads these files before
// paint and builds a metric-matched fallback, and `display: "optional"`
// avoids the late wrong-font -> brand-font swap (FOUT).
const fhTotalDisplay = localFont({
  variable: "--font-fh-total",
  display: "optional",
  preload: true,
  adjustFontFallback: "Arial",
  src: [
    { path: "../public/fonts/fh-total/FHTotalDisplay-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-SemiBoldItalic.otf", weight: "600", style: "italic" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-BoldItalic.otf", weight: "700", style: "italic" },
  ],
})

export const metadata: Metadata = {
  title: "Repsine — Instagram Kit for Aesthetic Clinics",
  description:
    "Ready-to-use Instagram templates, captions, WhatsApp scripts and content calendars built specifically for aesthetic clinics. Pay once, get lifetime access plus free weekly updates.",
  generator: "v0.app",
  icons: {
    icon: "/repsine-logo.jpg",
    apple: "/repsine-logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${fhTotalDisplay.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
