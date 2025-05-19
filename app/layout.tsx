import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import ChatBubble from "@/components/ChatBubble"
import { WaitlistModalProvider } from "@/components/WaitlistModalProvider"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
// Integriere den ConsentProvider und ConsentBanner in das Layout
// Importiere den ConsentProvider und ConsentBanner am Anfang der Datei:
import { ConsentProvider } from "@/hooks/useConsent"
import ConsentBanner from "@/components/ConsentBanner" // Moved to be rendered inside ConsentProvider

// Entferne den alten ConsentGateGlobal-Import:
// Entferne: import ConsentGateGlobal from '@/components/ConsentGateGlobal';

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

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rust Rocket",
              url: "https://rust-rocket.com/",
              logo: "https://rust-rocket.com/favicon-192.png",
              sameAs: ["https://x.com/RustRocketBot", "https://t.me/rustrocket"],
            }),
          }}
        />

        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Rust Rocket",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/ComingSoon",
              },
              description:
                "Ultraschneller Solana Sniper Bot mit 25ms Ausführungszeit und Same-Block Execution Technologie.",
            }),
          }}
        />

        {/* FAQ Schema */}
        <script
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
                    text: "Rust Rocket's beta version launches on May 9, 2025. Join our waitlist now to get early access to our 25 ms Solana sniper bot.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <ConsentProvider>
          <WaitlistModalProvider>
            <Suspense>{children}</Suspense>
            <ChatBubble />
            <Analytics />
            <SpeedInsights />
            <ConsentBanner />
          </WaitlistModalProvider>
        </ConsentProvider>

        {/* UTM Parameter Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const p=new URLSearchParams(location.search);
              ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k=>{
                const f=document.querySelector(\`[name="\${k}"]\`);
                if(f){ f.value=p.get(k)||''; }
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
