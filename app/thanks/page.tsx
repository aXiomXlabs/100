import type { Metadata } from "next"
import ThanksPage from "./ThanksPage"

export const metadata: Metadata = {
  title: "Thanks for Joining | Rust Rocket",
  description: "You've successfully joined the Rust Rocket waitlist.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://rust-rocket.com/solana-sniper-bot",
  },
}

export default function Thanks() {
  return <ThanksPage />
}
