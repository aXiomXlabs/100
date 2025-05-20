import type React from "react"
import type { Metadata } from "next"
import CookieConsentBanner from "@/components/CookieConsentBanner"

export const metadata: Metadata = {
  title: "Thank You | Rust Rocket",
  description: "Thank you for your interest in Rust Rocket - the fastest Solana sniper bot.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThanksLayout({
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
