"use client"

import { usePathname } from "next/navigation"

interface SchemaProps {
  type?: "website" | "article" | "product" | "organization" | "faq"
  title?: string
  description?: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
  price?: string
  currency?: string
  faqItems?: Array<{ question: string; answer: string }>
}

export default function AdvancedSeoSchema({
  type = "website",
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  price,
  currency = "USD",
  faqItems = [],
}: SchemaProps) {
  const pathname = usePathname()
  const baseUrl = "https://rust-rocket.com"
  const currentUrl = `${baseUrl}${pathname}`

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rust Rocket",
    description: "Advanced Solana trading bot with copy trading and sniping capabilities",
    url: baseUrl,
    logo: `${baseUrl}/images/RR_Logo_one_schrift.png`,
    sameAs: ["https://t.me/rust_rocket", "https://x.com/rust_rocket", "https://discord.gg/rust-rocket"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    foundingDate: "2024",
    numberOfEmployees: "2-10",
    industry: "Financial Technology",
    keywords: "Solana, Trading Bot, Copy Trading, Cryptocurrency, DeFi, Pump.fun",
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rust Rocket",
    description: description || "Advanced Solana trading bot platform",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: organizationSchema,
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: currentUrl,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author || "Rust Rocket Team",
    },
    publisher: organizationSchema,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
    image: image
      ? {
          "@type": "ImageObject",
          url: image,
          width: 1200,
          height: 630,
        }
      : undefined,
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title || "Rust Rocket Solana Trading Bot",
    description: description || "Advanced Solana trading bot with copy trading capabilities",
    url: currentUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: price || "0",
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    publisher: organizationSchema,
  }

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: pathname
      .split("/")
      .filter(Boolean)
      .map((segment, index, array) => ({
        "@type": "ListItem",
        position: index + 2,
        name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        item: `${baseUrl}/${array.slice(0, index + 1).join("/")}`,
      }))
      .concat([
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
      ])
      .sort((a, b) => a.position - b.position),
  }

  const getSchema = () => {
    const schemas = [organizationSchema, websiteSchema, breadcrumbSchema]

    switch (type) {
      case "article":
        schemas.push(articleSchema)
        break
      case "product":
        schemas.push(productSchema)
        break
      case "faq":
        if (faqSchema) schemas.push(faqSchema)
        break
    }

    return schemas
  }

  return (
    <>
      {getSchema().map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0),
          }}
        />
      ))}
    </>
  )
}
