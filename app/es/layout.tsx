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
  title: "Rust Rocket | Bot Sniper #1 de Solana con Copy Trading Profesional",
  description:
    "Domina las meme coins de Solana con Rust Rocket - el bot de ejecución same-block más rápido con copy trading inteligente. Perfecto para sniping en pump.fun y trading profesional de Solana.",
  generator: "Next.js",
  applicationName: "Rust Rocket",
  keywords: [
    "Bot sniper Solana",
    "Sniper de meme coins",
    "Bot copy trader Solana",
    "Bot Rust Rocket",
    "Bot sniper pump.fun",
    "Bot de trading Solana",
    "Ejecución same-block",
    "Meme coins de Solana",
    "Automatización de trading cripto",
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
    canonical: "/es/",
    languages: {
      en: "https://rust-rocket.com/",
      de: "https://rust-rocket.com/de/",
      es: "https://rust-rocket.com/es/",
    },
  },
  openGraph: {
    title: "Rust Rocket | Bot Sniper #1 de Solana con Copy Trading Profesional",
    description:
      "Domina las meme coins de Solana con Rust Rocket - el bot de ejecución same-block más rápido con copy trading inteligente.",
    url: "https://www.rust-rocket.com/es/",
    siteName: "Rust Rocket",
    images: [
      {
        url: "/images/og-image-es.png",
        width: 1200,
        height: 630,
        alt: "Rust Rocket - Bot de Trading Solana",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rust Rocket | Bot Sniper #1 de Solana con Copy Trading Profesional",
    description:
      "Domina las meme coins de Solana con Rust Rocket - el bot de ejecución same-block más rápido con copy trading inteligente.",
    images: ["/images/twitter-image-es.png"],
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

export default function SpanishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable} itemScope itemType="http://schema.org/WebPage">
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
        <link rel="canonical" href="https://rust-rocket.com/es/" />
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
          id="schema-organization-es"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rust Rocket",
              url: "https://rust-rocket.com/es/",
              logo: "https://rust-rocket.com/favicon-192.png",
              sameAs: ["https://x.com/RustRocketBot", "https://instagram.com/rustrocketbot", "https://t.me/rustrocket"],
            }),
          }}
        />

        {/* JSON-LD Schema for Website */}
        <Script
          id="schema-website-es"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://rust-rocket.com/es/#website",
              url: "https://rust-rocket.com/es/",
              name: "Rust Rocket",
              inLanguage: "es-ES",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://rust-rocket.com/es/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* JSON-LD Schema for SoftwareApplication */}
        <Script
          id="schema-software-application-es"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Rust Rocket",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web-based, Telegram",
              description: "Bot avanzado de trading de Solana con ejecución same-block y funciones de copy trading",
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
          id="schema-breadcrumb-es"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Inicio",
                  item: "https://rust-rocket.com/es/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Características",
                  item: "https://rust-rocket.com/es/#features",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "FAQ",
                  item: "https://rust-rocket.com/es/#faq",
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
