import type { Metadata } from "next"
import AdsLandingPage from "./AdsLandingPage"

export const metadata: Metadata = {
  title: "25 ms Solana Sniper Bot – Free Beta | Rust Rocket",
  description: "Same-block fills & copy-trading. Join the free beta waitlist.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "25 ms Solana Sniper Bot – Free Beta | Rust Rocket",
    description: "Same-block fills & copy-trading. Join the free beta waitlist.",
    url: "https://rust-rocket.com/landing/ads",
    siteName: "Rust Rocket",
    images: [
      {
        url: "/assets/og-ads.webp",
        width: 1200,
        height: 630,
        alt: "Rust Rocket Solana Sniper Bot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "25 ms Solana Sniper Bot – Free Beta | Rust Rocket",
    description: "Same-block fills & copy-trading. Join the free beta waitlist.",
    images: ["/assets/og-ads.webp"],
    creator: "@rustrocket",
  },
  alternates: {
    canonical: "https://rust-rocket.com/solana-sniper-bot",
  },
}

export default function AdsPage() {
  return <AdsLandingPage />
}
