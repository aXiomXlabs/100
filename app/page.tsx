import { Suspense } from "react"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ProblemSection from "@/components/ProblemSection"
import SolutionSection from "@/components/SolutionSection"
import CopyTradingSection from "@/components/CopyTradingSection"
import BDNNetworkSection from "@/components/BDNNetworkSection"
import DashboardPreviewSection from "@/components/DashboardPreviewSection"
import AdditionalFeaturesSection from "@/components/AdditionalFeaturesSection"
import VisionSection from "@/components/VisionSection"
import RoadmapSection from "@/components/RoadmapSection"
import FAQSection from "@/components/FAQSection"
import Footer from "@/components/Footer"
import ParticlesBackground from "@/components/ParticlesBackground"
import SectionDivider from "@/components/SectionDivider"
import ScrollToTop from "@/components/ScrollToTop"
import UTMTracker from "@/components/UTMTracker"

export const metadata: Metadata = {
  title: "Solana Sniper Bot with 25ms Same-Block Execution | Rust Rocket Trading Bot",
  description:
    "Dominate Solana meme coin trading with Rust Rocket's 25ms sniper bot. Features intelligent copy trading, automated DeFi trading & same-block execution for Pump.fun sniping.",
  keywords: [
    "Solana sniper bot",
    "meme coin trading",
    "copy trading bot",
    "automated trading",
    "DeFi trading bot",
    "Pump.fun sniper",
    "Raydium trading",
    "same-block execution",
    "cryptocurrency trading bot",
    "Solana trading platform",
  ],
  openGraph: {
    title: "Solana Sniper Bot with 25ms Same-Block Execution | Rust Rocket",
    description:
      "Dominate Solana meme coin trading with Rust Rocket's 25ms sniper bot. Features intelligent copy trading & automated DeFi trading.",
    type: "website",
    url: "https://rust-rocket.com",
    images: [
      {
        url: "/images/solana-trading-bot-dashboard.png",
        width: 1200,
        height: 630,
        alt: "Rust Rocket Solana Trading Bot Dashboard with 25ms execution speed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Sniper Bot with 25ms Same-Block Execution | Rust Rocket",
    description:
      "Dominate Solana meme coin trading with Rust Rocket's 25ms sniper bot. Features intelligent copy trading & automated DeFi trading.",
    images: ["/images/solana-trading-bot-dashboard.png"],
  },
}

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main id="main-content" role="main">
        <Hero />
        <SectionDivider />
        <ProblemSection />
        <SectionDivider />
        <SolutionSection />
        <SectionDivider />
        <CopyTradingSection />
        <SectionDivider />
        <BDNNetworkSection />
        <SectionDivider />
        <DashboardPreviewSection />
        <SectionDivider />
        <AdditionalFeaturesSection />
        <SectionDivider />
        <RoadmapSection />
        <SectionDivider />
        <FAQSection />
        <SectionDivider />
        <VisionSection />
      </main>
      <Footer />
      <ScrollToTop />
      <Suspense fallback={null}>
        <UTMTracker />
      </Suspense>
    </>
  )
}
