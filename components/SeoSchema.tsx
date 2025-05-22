"use client"

import { usePathname } from "next/navigation"

export default function SeoSchema() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const currentYear = new Date().getFullYear()

  // Basis-URL für alle Schema-Referenzen
  const baseUrl = "https://rust-rocket.com"

  // Organization Schema (nur auf der Homepage)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rust Rocket Labs",
    url: baseUrl,
    logo: `${baseUrl}/images/rust-rocket-logo.gif`,
    sameAs: ["https://x.com/ax_rustrocket", "https://t.me/rustxrocket", "https://discord.gg/rustrocket"],
  }

  // FAQ Schema (nur auf der Homepage)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a Solana sniper bot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Solana sniper bot is an automated trading tool that executes trades on the Solana blockchain with extremely low latency. Rust Rocket achieves 25 ms execution time and same-block execution.",
        },
      },
      {
        "@type": "Question",
        name: "How does Rust Rocket's copy-trading feature work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rust Rocket's intelligent copy-trading automatically identifies and mirrors successful Solana traders' strategies with custom stop-loss and auto-sell conditions.",
        },
      },
      {
        "@type": "Question",
        name: "What makes Rust Rocket faster than other Solana bots?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rust Rocket achieves superior speed through 15 private BDN gateways providing direct, low-latency connections to Solana, delivering 25 ms execution time.",
        },
      },
      {
        "@type": "Question",
        name: "When will Rust Rocket be available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Rust Rocket's beta version launches on May 9, ${currentYear}. Join our waitlist now to get early access to our 25 ms Solana sniper bot.`,
        },
      },
    ],
  }

  // Review Schema (nur auf der Homepage) - korrekt formatiert mit itemReviewed und author
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody:
      "Rust Rocket's copy-trading feature is a game-changer for Solana trading. I've been able to automatically mirror successful strategies with custom stop-loss conditions, which has significantly improved my returns.",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: "Alex K.",
    },
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: "Rust Rocket Solana Sniper Bot",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
    },
  }

  // Software Application Schema (nur auf der Homepage)
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rust Rocket Solana Sniper Bot",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/ComingSoon",
    },
    description:
      "Dominate Solana meme coins with Rust Rocket - the fastest same-block execution bot with intelligent copy trading. Perfect for pump.fun sniping.",
  }

  // Nur auf der Homepage alle Schemas anzeigen
  if (isHomePage) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      </>
    )
  }

  // Für andere Seiten nur das Organization-Schema
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
}
