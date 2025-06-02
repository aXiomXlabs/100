import type { Metadata } from "next"
import SolanaSniperBotClientPage from "./SolanaSniperBotClientPage"

export const metadata: Metadata = {
  title: "Solana Sniper Bot - Rust Rocket",
  description:
    "Lightning-fast 25 ms Solana sniper bot. Same-block fills, 95 % success rate and smart copy-trading for Pump.fun, Raydium & Jupiter.",
  keywords: [
    "Solana sniper bot",
    "Pump.fun trading",
    "Raydium sniper",
    "Jupiter trading",
    "copy trading",
    "meme coin trading",
    "automated trading bot",
    "DeFi trading",
    "same-block execution",
    "25ms latency",
  ],
  openGraph: {
    title: "Solana Sniper Bot - Rust Rocket",
    description:
      "Lightning-fast 25 ms Solana sniper bot. Same-block fills, 95 % success rate and smart copy-trading for Pump.fun, Raydium & Jupiter.",
    type: "website",
    url: "https://rust-rocket.com/solana-sniper-bot",
    images: [
      {
        url: "/images/solana-trading-bot-dashboard.png",
        width: 1200,
        height: 630,
        alt: "Rust Rocket Solana Sniper Bot Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Sniper Bot - Rust Rocket",
    description:
      "Lightning-fast 25 ms Solana sniper bot. Same-block fills, 95 % success rate and smart copy-trading for Pump.fun, Raydium & Jupiter.",
    images: ["/images/solana-trading-bot-dashboard.png"],
  },
}

export default function SolanaSniperBotPage() {
  return <SolanaSniperBotClientPage />
}
