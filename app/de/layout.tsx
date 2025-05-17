import type React from "react"
import "../globals.css"
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
  title: "Rust Rocket | #1 Solana Sniper Bot mit Pro Copy Trading",
  description:
    "Dominiere Solana Meme Coins mit Rust Rocket - dem schnellsten Same-Block Execution Bot mit intelligentem Copy Trading. Perfekt für pump.fun Sniping und professionelles Solana-Trading.",
  generator: "Next.js",
  applicationName: "Rust Rocket",
  keywords: [
    "Solana Sniper Bot",
    "Meme Coin Sniper",
    "Copy Trader Bot Solana",
    "Rust Rocket Bot",
    "pump.fun Sniper Bot",
    "Solana Trading Bot",
    "Same-Block Execution",
    "Solana Meme Coins",
    "Krypto Trading Automatisierung",
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
    canonical: "/de/",
    languages: {
      en: "https://rust-rocket.com/",
      de: "https://rust-rocket.com/de/",
      es: "https://rust-rocket.com/es/",
    },
  },
  openGraph: {
    title: "Rust Rocket | #1 Solana Sniper Bot mit Pro Copy Trading",
    description:
      "Dominiere Solana Meme Coins mit Rust Rocket - dem schnellsten Same-Block Execution Bot mit intelligentem Copy Trading.",
    url: "https://www.rust-rocket.com/de/",
    siteName: "Rust Rocket",
    images: [
      {
        url: "/images/og-image-de.png",
        width: 1200,
        height: 630,
        alt: "Rust Rocket - Solana Trading Bot",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rust Rocket | #1 Solana Sniper Bot mit Pro Copy Trading",
    description:
      "Dominiere Solana Meme Coins mit Rust Rocket - dem schnellsten Same-Block Execution Bot mit intelligentem Copy Trading.",
    images: ["/images/twitter-image-de.png"],
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

export default function GermanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={inter.variable} itemScope itemType="http://schema.org/WebPage">
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
        <link rel="canonical" href="https://rust-rocket.com/de/" />
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
          id="schema-organization-de"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rust Rocket",
              url: "https://rust-rocket.com/de/",
              logo: "https://rust-rocket.com/favicon-192.png",
              sameAs: ["https://x.com/RustRocketBot", "https://instagram.com/rustrocketbot", "https://t.me/rustrocket"],
            }),
          }}
        />

        {/* JSON-LD Schema for Website */}
        <Script
          id="schema-website-de"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://rust-rocket.com/de/#website",
              url: "https://rust-rocket.com/de/",
              name: "Rust Rocket",
              inLanguage: "de-DE",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://rust-rocket.com/de/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* JSON-LD Schema for SoftwareApplication */}
        <Script
          id="schema-software-application-de"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Rust Rocket",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web-based, Telegram",
              description: "Fortschrittlicher Solana Trading Bot mit Same-Block Execution und Copy Trading Funktionen",
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
              },
            }),
          }}
        />

        {/* JSON-LD Schema for BreadcrumbList */}
        <Script
          id="schema-breadcrumb-de"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Startseite",
                  item: "https://rust-rocket.com/de/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Funktionen",
                  item: "https://rust-rocket.com/de/#features",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "FAQ",
                  item: "https://rust-rocket.com/de/#faq",
                },
              ],
            }),
          }}
        />

        {/* Fallback Cookie Banner Script */}
        <Script id="cookie-banner-fallback" src="/js/cookie-banner.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
