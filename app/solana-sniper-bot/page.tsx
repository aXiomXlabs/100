import type { Metadata } from "next"
import SolanaSniperBotClientPage from "./SolanaSniperBotClientPage"

export const metadata: Metadata = {
  title: "Solana Sniper Bot - Rust Rocket",
  description:
    "Lightning-fast Solana sniper bot with 25ms execution. Intelligent copy trading for Pump.fun & Raydium markets.",
  keywords: [
    "Solana sniper bot",
    "Pump.fun trading",
    "Raydium sniper",
    "copy trading",
    "meme coin trading",
    "automated trading bot",
    "DeFi trading",
    "same-block execution",
  ],
  openGraph: {
    title: "Solana Sniper Bot - Rust Rocket",
    description:
      "Lightning-fast Solana sniper bot with 25ms execution. Intelligent copy trading for Pump.fun & Raydium.",
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
      "Lightning-fast Solana sniper bot with 25ms execution. Intelligent copy trading for Pump.fun & Raydium.",
    images: ["/images/solana-trading-bot-dashboard.png"],
  },
}

export default function SolanaSniperBotPage() {
  return <SolanaSniperBotClientPage />
}
