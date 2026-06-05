import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { MetaPixel } from "@/components/meta-pixel"
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

// Self-hosted brand display font, served as tiny (~8KB) WOFF2 files that
// next/font preloads at high priority before paint. `display: "block"` keeps
// headline text invisible for a brief block period and then paints it directly
// in FH Total Display, so the user never sees a wrong-font -> brand-font swap.
const fhTotalDisplay = localFont({
  variable: "--font-fh-total",
  display: "block",
  preload: true,
  adjustFontFallback: "Arial",
  src: [
    { path: "../public/fonts/fh-total/FHTotalDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-SemiBoldItalic.woff2", weight: "600", style: "italic" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/fh-total/FHTotalDisplay-BoldItalic.woff2", weight: "700", style: "italic" },
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
        <MetaPixel />
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
