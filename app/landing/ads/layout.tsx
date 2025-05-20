import type React from "react"
import type { Metadata } from "next"
import CookieConsentBanner from "@/components/CookieConsentBanner"

export const metadata: Metadata = {
  title: "Rust Rocket | Solana Sniper Bot Ads",
  description: "Rust Rocket Ads - Solana Sniper Bot with Pro Copy Trading",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <CookieConsentBanner />
      {children}
    </div>
  )
}
