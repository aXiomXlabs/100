import type { Metadata } from "next"
import SolanaSniperBotClientPage from "./SolanaSniperBotClientPage"

export const metadata: Metadata = {
  title: "Solana Sniper Bot | 25ms Execution Time & Same-Block Execution",
  description:
    "The ultimate Solana Sniper Bot with 25ms latency, same-block execution and advanced copy-trading for Pump.fun and Raydium. Maximize your profits on meme coin launches.",
  keywords: [
    "Solana Sniper Bot",
    "Pump.fun Sniper",
    "Raydium Sniper",
    "Same-Block Execution",
    "Copy Trading Solana",
    "Meme Coin Bot",
    "Solana Trading Bot",
    "Fastest Sniper Bot",
    "25ms Latency Bot",
    "Solana Meme Coins",
  ],
  openGraph: {
    title: "Solana Sniper Bot | 25ms Execution Time & Same-Block Execution",
    description:
      "The ultimate Solana Sniper Bot with 25ms latency, same-block execution and advanced copy-trading for Pump.fun and Raydium.",
    url: "https://rust-rocket.com/solana-sniper-bot",
    siteName: "Rust Rocket",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rust Rocket Solana Sniper Bot",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Sniper Bot | 25ms Execution Time & Same-Block Execution",
    description:
      "The ultimate Solana Sniper Bot with 25ms latency, same-block execution and advanced copy-trading for Pump.fun and Raydium.",
    images: ["/images/twitter-image.png"],
    creator: "@rustrocket",
  },
  alternates: {
    canonical: "https://rust-rocket.com/solana-sniper-bot",
  },
}

export default function SolanaSniperBotPage() {
  return <SolanaSniperBotClientPage />
}
