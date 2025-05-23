import type { Metadata } from "next"
import AdsLandingPage from "./AdsLandingPage"

export const metadata: Metadata = {
  title: "25ms Solana Sniper Bot – Free Beta Access | Rust Rocket",
  description:
    "Join the fastest Solana sniper bot with 25ms execution speed. Same-block fills, copy trading, and MEV protection. Limited beta spots available.",
  keywords: [
    "Solana sniper bot",
    "25ms execution",
    "same-block fills",
    "copy trading Solana",
    "MEV protection",
    "pump.fun sniper",
    "Solana trading bot",
    "beta access",
    "free trial",
    "meme coin sniper",
  ],
  robots: {
    index: true, // Changed from false to true for better visibility
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "25ms Solana Sniper Bot – Free Beta Access | Rust Rocket",
    description:
      "Join the fastest Solana sniper bot with 25ms execution speed. Same-block fills, copy trading, and MEV protection. Limited beta spots available.",
    url: "https://rust-rocket.com/landing/ads",
    siteName: "Rust Rocket",
    images: [
      {
        url: "/assets/og-ads.webp",
        width: 1200,
        height: 630,
        alt: "Rust Rocket Solana Sniper Bot - 25ms Execution Speed",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "25ms Solana Sniper Bot – Free Beta Access | Rust Rocket",
    description:
      "Join the fastest Solana sniper bot with 25ms execution speed. Same-block fills, copy trading, and MEV protection. Limited beta spots available.",
    images: ["/assets/og-ads.webp"],
    creator: "@rustrocket",
    site: "@rustrocket",
  },
  alternates: {
    canonical: "https://rust-rocket.com/landing/ads",
  },
  other: {
    "google-site-verification": "your-google-verification-code", // Add your actual verification code
  },
}

// Enhanced JSON-LD Schema for Landing Page
const landingPageSchema = {
  "@context": "https://schema.org",
  "@type": "LandingPage",
  "@id": "https://rust-rocket.com/landing/ads#landingpage",
  name: "Rust Rocket Solana Sniper Bot - Beta Access",
  description:
    "Join the fastest Solana sniper bot with 25ms execution speed. Same-block fills, copy trading, and MEV protection.",
  url: "https://rust-rocket.com/landing/ads",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Rust Rocket Solana Sniper Bot",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      validFrom: "2024-01-01",
      priceValidUntil: "2025-12-31",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  },
  provider: {
    "@type": "Organization",
    name: "Axiom Enterprise GmbH",
    url: "https://rust-rocket.com",
  },
}

export default function AdsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingPageSchema) }} />
      <AdsLandingPage />
    </>
  )
}
