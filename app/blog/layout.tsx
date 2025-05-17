import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Rust Rocket - Solana Trading Bot",
  description: "Lese die neuesten Artikel über Solana Trading, Meme Coins und Krypto-Strategien vom Rust Rocket Team.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
