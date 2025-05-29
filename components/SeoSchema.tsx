"use client"

export default function SeoSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rust Rocket",
    description: "Advanced Solana trading bot with copy trading and automated sniping capabilities",
    url: "https://rust-rocket.com",
    logo: "https://rust-rocket.com/images/RR_Logo_one_schrift.png",
    sameAs: ["https://t.me/rust_rocket", "https://x.com/rust_rocket", "https://discord.gg/rust-rocket"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    foundingDate: "2024",
    numberOfEmployees: "2-10",
    industry: "Financial Technology",
    keywords: "Solana, Trading Bot, Copy Trading, Cryptocurrency, DeFi, Pump.fun, Meme Coins, Automated Trading",
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rust Rocket - Solana Trading Bot",
    description: "Advanced Solana sniper bot with 25ms same-block execution and intelligent copy trading",
    url: "https://rust-rocket.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://rust-rocket.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: organizationSchema,
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rust Rocket Solana Sniper Bot",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    description:
      "Solana trading bot with 25ms same-block execution and intelligent copy trading for meme coins and DeFi tokens",
    url: "https://rust-rocket.com",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      validFrom: "2024-01-01",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "25ms same-block execution",
      "Intelligent copy trading",
      "Pump.fun sniping",
      "Raydium integration",
      "TVTG licensed",
      "MPC security",
      "95% success rate",
    ],
    screenshot: "https://rust-rocket.com/images/solana-trading-bot-dashboard.png",
    publisher: organizationSchema,
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Rust Rocket?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rust Rocket is an advanced Solana trading bot with 25ms same-block execution speed, designed for meme coin sniping and intelligent copy trading on Pump.fun and Raydium.",
        },
      },
      {
        "@type": "Question",
        name: "How fast is the execution speed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rust Rocket achieves 25ms average execution speed with 95% same-block fills, making it one of the fastest Solana trading bots available.",
        },
      },
      {
        "@type": "Question",
        name: "Is Rust Rocket secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Rust Rocket is TVTG-licensed and uses MPC (Multi-Party Computation) security protocols to ensure safe automated cryptocurrency trading.",
        },
      },
      {
        "@type": "Question",
        name: "What platforms does it support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rust Rocket supports Pump.fun for meme coin sniping and Raydium for DeFi trading, with intelligent copy trading capabilities across both platforms.",
        },
      },
    ],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rust-rocket.com",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema, null, 0),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema, null, 0),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema, null, 0),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema, null, 0),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema, null, 0),
        }}
      />
    </>
  )
}
