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
import ConsentBanner from "@/components/ConsentBanner"
import GoogleTagManager from "@/components/GoogleTagManager"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#8AE234",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "Rust Rocket | 25ms Solana Sniper Bot with Pro Copy Trading",
  description:
    "Dominate Solana meme coins with Rust Rocket - the fastest same-block execution bot with intelligent copy trading. Perfect for pump.fun sniping.",
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
  ],
  authors: [{ name: "Rust Rocket Labs", url: "https://rust-rocket.com" }],
  creator: "Rust Rocket Labs",
  publisher: "Rust Rocket Labs",
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
      "x-default": "https://rust-rocket.com/",
    },
  },
  openGraph: {
    title: "Rust Rocket | 25ms Solana Sniper Bot with Pro Copy Trading",
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
    title: "Rust Rocket | 25ms Solana Sniper Bot with Pro Copy Trading",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Hreflang Tags */}
        <link rel="alternate" hrefLang="en" href="https://rust-rocket.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://rust-rocket.com/" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://rust-rocket.com/" />

        {/* Single Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rust Rocket Labs",
              url: "https://rust-rocket.com/",
              logo: "https://rust-rocket.com/images/rust-rocket-logo.gif",
              sameAs: ["https://x.com/rustrocket", "https://t.me/rustrocket"],
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
        {/* Verbesserte Google Tag Manager-Komponente */}
        <GoogleTagManager />

        {/* Twitter Pixel - mit Consent-Mode */}
        <Script id="twitter-pixel" strategy="afterInteractive">
          {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            
            // Twitter-Pixel mit ID initialisieren
            twq('config','pork0');
            
            // Standardmäßig Tracking aktivieren (für Testzwecke)
            // In Produktionsumgebung sollte dies entfernt werden
            twq('consent', 'grant');
          `}
        </Script>

        {/* Facebook Pixel - mit Consent-Mode */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            // FB-Pixel mit ID initialisieren
            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
            
            // Standardmäßig Tracking aktivieren (für Testzwecke)
            // In Produktionsumgebung sollte dies entfernt werden
            fbq('consent', 'grant');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* UTM-Parameter-Script */}
        <Script id="utm-script" strategy="afterInteractive">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              const p = new URLSearchParams(window.location.search);
              const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
              
              utmParams.forEach(param => {
                const value = p.get(param);
                if (value) {
                  // In sessionStorage für seitenübergreifende Persistenz speichern
                  sessionStorage.setItem(param, value);
                  
                  // Formularfelder aktualisieren
                  const fields = document.querySelectorAll(\`[name="\${param}"]\`);
                  fields.forEach(field => {
                    field.value = value;
                  });
                } else if (sessionStorage.getItem(param)) {
                  // Gespeicherten Wert verwenden, falls verfügbar
                  const fields = document.querySelectorAll(\`[name="\${param}"]\`);
                  fields.forEach(field => {
                    field.value = sessionStorage.getItem(param);
                  });
                }
              });
            });
          `}
        </Script>

        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <WaitlistModalProvider>
          <Suspense>{children}</Suspense>
          <ChatBubble />
          <Analytics />
          <SpeedInsights />
          <ConsentBanner />
        </WaitlistModalProvider>
      </body>
    </html>
  )
}
