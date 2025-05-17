import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import ChatBubble from "@/components/ChatBubble"
import { WaitlistModalProvider } from "@/components/WaitlistModalProvider"
import Script from "next/script"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CookieBannerFixedDelay from "@/components/CookieBannerFixedDelay"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#8AE234",
}

export const metadata: Metadata = {
  title: "Rust Rocket | 25 ms Solana Sniper Bot with Pro Copy Trading",
  description:
    "Dominate Solana meme coins with Rust Rocket - the fastest same-block execution bot with intelligent copy trading. Perfect for pump.fun sniping and professional Solana trading.",
  generator: "Next.js",
  applicationName: "Rust Rocket",
  keywords: [
    "Solana sniper bot",
    "meme coin sniper",
    "copy trader bot Solana",
    "Rust Rocket bot",
    "pump.fun sniper bot",
    "Solana trading bot",
    "same-block execution",
    "Solana meme coins",
    "crypto trading automation",
  ],
  authors: [{ name: "Rust Rocket Team" }],
  creator: "Rust Rocket",
  publisher: "Rust Rocket",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.rust-rocket.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "https://rust-rocket.com/",
      de: "https://rust-rocket.com/de/",
      es: "https://rust-rocket.com/es/",
    },
  },
  openGraph: {
    title: "Rust Rocket | 25 ms Solana Sniper Bot with Pro Copy Trading",
    description:
      "Dominate Solana meme coins with Rust Rocket - the fastest same-block execution bot with intelligent copy trading.",
    url: "https://www.rust-rocket.com",
    siteName: "Rust Rocket",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rust Rocket - Solana Trading Bot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rust Rocket | 25 ms Solana Sniper Bot with Pro Copy Trading",
    description:
      "Dominate Solana meme coins with Rust Rocket - the fastest same-block execution bot with intelligent copy trading.",
    images: ["/images/twitter-image.png"],
    creator: "@rustrocket",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#8AE234",
      },
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} itemScope itemType="http://schema.org/WebPage">
      <head>
        {/* Additional meta tags can be added here if needed */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Hreflang Tags für Mehrsprachigkeit */}
        <link rel="alternate" hreflang="en" href="https://rust-rocket.com/" />
        <link rel="alternate" hreflang="de" href="https://rust-rocket.com/de/" />
        <link rel="alternate" hreflang="es" href="https://rust-rocket.com/es/" />
        <link rel="alternate" hreflang="x-default" href="https://rust-rocket.com/" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://rust-rocket.com/" />
      </head>
      <body>
        <WaitlistModalProvider>
          <Suspense>{children}</Suspense>
          <ChatBubble />
          <Analytics />
          <SpeedInsights />
          <CookieBannerFixedDelay />
        </WaitlistModalProvider>

        {/* Google Analytics 4 - Only loads if consent is given */}
        <Script
          id="ga4-check-consent"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            // Check if user has given consent for analytics cookies
            function hasAnalyticsConsent() {
              try {
                const consents = localStorage.getItem('cookieConsents');
                return consents ? JSON.parse(consents).analytics === true : false;
              } catch (e) {
                return false;
              }
            }

            // Only load GA if consent is given
            if (hasAnalyticsConsent()) {
              // Load GA script
              const gaScript = document.createElement('script');
              gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-6GRKXCYXWW";
              gaScript.async = true;
              document.head.appendChild(gaScript);

              // Initialize GA
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6GRKXCYXWW', {
                page_path: window.location.pathname,
              });
            }
          `,
          }}
        />

        {/* JSON-LD Schema for Organization */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://rust-rocket.com/#organization",
              name: "Rust Rocket",
              alternateName: "RustRocket",
              url: "https://rust-rocket.com/",
              logo: {
                "@type": "ImageObject",
                "@id": "https://rust-rocket.com/#logo",
                url: "https://rust-rocket.com/favicon-512.png",
                contentUrl: "https://rust-rocket.com/favicon-512.png",
                width: 512,
                height: 512,
                caption: "Rust Rocket Logo - Solana Sniper Bot",
              },
              image: {
                "@type": "ImageObject",
                "@id": "https://rust-rocket.com/#image",
                url: "https://rust-rocket.com/images/og-image.png",
                width: 1200,
                height: 630,
              },
              description:
                "Provider of the fastest Solana sniper bot with 25 ms execution time and intelligent copy-trading for Pump.fun and Raydium.",
              sameAs: ["https://x.com/RustRocketBot", "https://t.me/rustrocket"],
              foundingDate: "2024",
              founder: {
                "@type": "Person",
                name: "Rust Rocket Team",
              },
            }),
          }}
        />

        {/* JSON-LD Schema for Website */}
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://rust-rocket.com/#website",
              url: "https://rust-rocket.com/",
              name: "Rust Rocket | 25 ms Solana Sniper Bot",
              description:
                "The fastest Solana sniper bot for Pump.fun with same-block execution and intelligent copy-trading features.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://rust-rocket.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              keywords:
                "Solana sniper bot, Pump.fun, copy-trading, same-block execution, 25 ms latency, rug-pull protection",
            }),
          }}
        />

        {/* JSON-LD Schema for SoftwareApplication */}
        <Script
          id="schema-software-application"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Rust Rocket Solana Sniper Bot",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web-based, Telegram",
              description:
                "Advanced Solana sniper bot with 25 ms same-block execution and intelligent copy trading features for Pump.fun and Raydium",
              featureList:
                "Same-block execution, 25 ms latency, Pump.fun integration, Intelligent copy-trading, Rug-pull protection, 15 BDN gateways",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/ComingSoon",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "94",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />

        {/* JSON-LD Schema for BreadcrumbList */}
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://rust-rocket.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Solana Sniper Bot",
                  item: "https://rust-rocket.com/#solution",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "FAQ",
                  item: "https://rust-rocket.com/#faq",
                },
              ],
            }),
          }}
        />

        {/* JSON-LD Schema for LocalBusiness */}
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://rust-rocket.com/#localbusiness",
              name: "Rust Rocket",
              image: "https://rust-rocket.com/images/og-image.png",
              logo: "https://rust-rocket.com/favicon-192.png",
              url: "https://rust-rocket.com",
              telephone: "+1-555-123-4567", // Ersetze mit deiner tatsächlichen Telefonnummer
              email: "contact@rust-rocket.com", // Ersetze mit deiner tatsächlichen E-Mail
              description:
                "Rust Rocket bietet den schnellsten Solana Sniper Bot mit 25 ms Ausführungszeit, Same-Block Execution und intelligenten Copy-Trading-Funktionen für Pump.fun und Raydium.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Blockchain Avenue", // Ersetze mit deiner tatsächlichen Adresse
                addressLocality: "Crypto City", // Ersetze mit deiner tatsächlichen Stadt
                addressRegion: "CA", // Ersetze mit deinem tatsächlichen Bundesland/Region
                postalCode: "94103", // Ersetze mit deiner tatsächlichen Postleitzahl
                addressCountry: "US", // Ersetze mit deinem tatsächlichen Land
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.7749, // Ersetze mit deinen tatsächlichen Koordinaten
                longitude: -122.4194, // Ersetze mit deinen tatsächlichen Koordinaten
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "17:00",
                },
              ],
              priceRange: "$$", // Preisbereich: $ (günstig) bis $$$$ (sehr teuer)
            }),
          }}
        />

        {/* JSON-LD Schema for Product - Same-Block Execution */}
        <Script
          id="schema-product-same-block"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Rust Rocket Same-Block Execution for Pump.fun",
              image: "https://rust-rocket.com/images/og-image.png",
              description:
                "Execute trades in the exact same Solana block as the original event with 25 ms latency for maximum impact on Pump.fun and Raydium.",
              brand: {
                "@type": "Brand",
                name: "Rust Rocket",
                slogan: "25 ms Solana Sniper Bot",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/ComingSoon",
                seller: {
                  "@type": "Organization",
                  name: "Rust Rocket",
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "87",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />

        {/* JSON-LD Schema for Product - Copy Trading */}
        <Script
          id="schema-product-copy-trading"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Rust Rocket Intelligent Copy Trading for Solana",
              image: "https://rust-rocket.com/images/og-image.png",
              description:
                "Automatically identify and copy the most successful traders on Solana with custom stop-loss and auto-sell features to maximize profits.",
              brand: {
                "@type": "Brand",
                name: "Rust Rocket",
                slogan: "25 ms Solana Sniper Bot",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/ComingSoon",
                seller: {
                  "@type": "Organization",
                  name: "Rust Rocket",
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "76",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />

        {/* JSON-LD Schema for Product - BDN Network */}
        <Script
          id="schema-product-bdn-network"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Rust Rocket 15 Private BDN Gateways",
              image: "https://rust-rocket.com/images/og-image.png",
              description:
                "Our global network of 15 private BDN gateways ensures your transactions are routed via the fastest, most reliable paths with zero congestion.",
              brand: {
                "@type": "Brand",
                name: "Rust Rocket",
                slogan: "25 ms Solana Sniper Bot",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/ComingSoon",
                seller: {
                  "@type": "Organization",
                  name: "Rust Rocket",
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.7",
                reviewCount: "62",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />

        {/* JSON-LD Schema for FAQ */}
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is a Solana sniper bot?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A Solana sniper bot is an automated trading tool that executes trades on the Solana blockchain with extremely low latency. Rust Rocket's sniper bot achieves 25 ms execution time and same-block execution, allowing you to get into new token launches on platforms like Pump.fun before price surges.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does Rust Rocket's copy-trading feature work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rust Rocket's intelligent copy-trading feature automatically identifies and mirrors successful Solana traders' strategies. You can set custom parameters like stop-loss and auto-sell conditions to protect your investments and maximize profits while the bot handles the execution with 25 ms latency.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What makes Rust Rocket faster than other Solana bots?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rust Rocket achieves superior speed through our network of 15 private BDN (Block Distribution Network) gateways that provide direct, low-latency connections to the Solana blockchain. While standard bots rely on public RPCs with 400+ ms latency, our infrastructure delivers 25 ms execution time and same-block execution capabilities.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Rust Rocket work with Pump.fun?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Rust Rocket is specifically optimized for Pump.fun and Raydium, the most popular Solana meme coin launchpads. Our 25 ms execution time ensures you can participate in new token launches at the earliest possible moment, often in the same block as the launch transaction.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does Rust Rocket protect against rug pulls?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rust Rocket includes built-in rug-pull protection that analyzes token contracts and liquidity patterns in real-time. The bot can automatically set stop-loss levels and execute emergency sells if suspicious activity is detected, helping to safeguard your investments in the volatile meme coin market.",
                  },
                },
              ],
            }),
          }}
        />

        {/* JSON-LD Schema for Article Template */}
        <Script
          id="schema-article-template"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Rust Rocket: Die Zukunft des Solana-Tradings",
              image: "https://rust-rocket.com/images/og-image.png",
              author: {
                "@type": "Person",
                name: "Rust Rocket Team",
              },
              publisher: {
                "@type": "Organization",
                name: "Rust Rocket",
                logo: {
                  "@type": "ImageObject",
                  url: "https://rust-rocket.com/favicon-192.png",
                },
              },
              datePublished: "2025-05-16T12:00:00+00:00",
              dateModified: "2025-05-16T12:00:00+00:00",
              description:
                "Erfahre mehr über die neuesten Entwicklungen im Solana-Trading und wie Rust Rocket die Branche revolutioniert.",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://rust-rocket.com/blog/future-of-solana-trading",
              },
            }),
          }}
        />

        {/* Fallback Cookie Banner Script */}
        <Script id="cookie-banner-fallback" src="/js/cookie-banner.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
