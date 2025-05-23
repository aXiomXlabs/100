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
import CookieConsentBanner from "@/components/CookieConsentBanner"
import SeoSchema from "@/components/SeoSchema"

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

        {/* Zentralisierte Schema-Komponente */}
        <SeoSchema />

        {/* Google Tag Manager - Muss vor allen anderen Tracking-Codes stehen */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />

        {/* Google Analytics 4 - Enhanced Configuration */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Consent Mode - Muss vor gtag('config') stehen
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500,
            });
            
            gtag('js', new Date());
            
            // Enhanced Ecommerce und Conversion Tracking
            gtag('config', '${process.env.NEXT_PUBLIC_GTM_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              cookie_flags: 'samesite=none;secure',
              cookie_domain: 'auto',
              cookie_expires: 63072000,
              allow_google_signals: true,
              allow_ad_personalization_signals: true,
              enhanced_conversions: true,
              linker: {
                domains: ['rust-rocket.com', 'www.rust-rocket.com']
              }
            });
            
            // Custom Events für besseres Tracking
            gtag('event', 'page_view', {
              'event_category': 'engagement',
              'event_label': 'initial_page_view',
              'page_title': document.title,
              'page_location': window.location.href,
              'page_path': window.location.pathname
            });
            
            // Scroll Tracking
            let scrollTracked = false;
            window.addEventListener('scroll', function() {
              if (!scrollTracked && window.scrollY > 100) {
                scrollTracked = true;
                gtag('event', 'scroll', {
                  'event_category': 'engagement',
                  'event_label': 'scroll_100px',
                  'non_interaction': true
                });
              }
            });
            
            // Time on Page Tracking
            setTimeout(function() {
              gtag('event', 'time_on_page', {
                'event_category': 'engagement',
                'event_label': '30_seconds',
                'value': 30,
                'non_interaction': true
              });
            }, 30000);
          `}
        </Script>

        {/* Google Ads Conversion Tracking */}
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            gtag('config', 'AW-CONVERSION_ID', {
              'allow_enhanced_conversions': true
            });
          `}
        </Script>

        {/* Twitter conversion tracking */}
        <Script id="twitter-pixel" strategy="afterInteractive">
          {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','pork0');
            twq('track','PageView');
          `}
        </Script>

        {/* Facebook Pixel - Enhanced */}
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
            
            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
            fbq('track', 'PageView');
            
            // Enhanced Conversions für Facebook
            fbq('track', 'ViewContent', {
              content_type: 'product',
              content_category: 'trading_bot'
            });
          `}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager - NoScript */}
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
          <CookieConsentBanner />
        </WaitlistModalProvider>
      </body>
    </html>
  )
}
