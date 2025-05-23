"use client"

import { usePathname } from "next/navigation"
import Script from "next/script"

export default function SeoSchema() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Organization Schema with unique @id
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://rust-rocket.com/#organization",
    name: "Rust Rocket Labs",
    url: "https://rust-rocket.com/",
    logo: "https://rust-rocket.com/images/rust-rocket-logo.gif",
    sameAs: ["https://x.com/rustrocket", "https://t.me/rustrocket"],
  }

  // Product Schema with offers
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://rust-rocket.com/#product",
    name: "Rust Rocket Solana Sniper Bot",
    description: "25 ms Solana Sniper Bot with Same-Block Execution and intelligent copy trading",
    image: "https://rust-rocket.com/images/rust-rocket-logo.gif",
    brand: {
      "@type": "Brand",
      name: "Rust Rocket",
    },
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Alex K.",
      },
    },
  }

  // FAQ Schema with unique @id
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://rust-rocket.com/#faq",
    mainEntity: [
      {
        "@type": "Question",
        "@id": "https://rust-rocket.com/#question-what-is-solana-sniper-bot",
        name: "What is a Solana sniper bot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Solana sniper bot is an automated trading tool that executes trades on the Solana blockchain with extremely low latency. Rust Rocket achieves 25 ms execution time and same-block execution.",
        },
      },
      {
        "@type": "Question",
        "@id": "https://rust-rocket.com/#question-copy-trading",
        name: "How does Rust Rocket's copy-trading feature work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rust Rocket's intelligent copy-trading automatically identifies and mirrors successful Solana traders' strategies with custom stop-loss and auto-sell conditions.",
        },
      },
      {
        "@type": "Question",
        "@id": "https://rust-rocket.com/#question-speed",
        name: "What makes Rust Rocket faster than other Solana bots?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rust Rocket achieves superior speed through 15 private BDN gateways providing direct, low-latency connections to Solana, delivering 25 ms execution time.",
        },
      },
      {
        "@type": "Question",
        "@id": "https://rust-rocket.com/#question-availability",
        name: "When will Rust Rocket be available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rust Rocket's beta version launches on May 9, 2025. Join our waitlist now to get early access to our 25 ms Solana sniper bot.",
        },
      },
    ],
  }

  // Software Application Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://rust-rocket.com/#software",
    name: "Rust Rocket Solana Sniper Bot",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
      availability: "https://schema.org/ComingSoon",
    },
    description:
      "Dominate Solana meme coins with Rust Rocket - the fastest same-block execution bot with intelligent copy trading. Perfect for pump.fun sniping.",
  }

  // Only render schemas on appropriate pages
  if (isHomePage) {
    return (
      <>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="product-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <Script
          id="software-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </>
    )
  }

  // For non-homepage, just return organization schema
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}
