"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"

export default function ThanksPage() {
  useEffect(() => {
    // Fire conversion events
    if (typeof window !== "undefined") {
      // Google Analytics 4 conversion event
      if ("gtag" in window) {
        // @ts-ignore - gtag is not typed
        window.gtag("event", "beta_signup", {
          event_category: "conversion",
          event_label: "waitlist_signup",
          value: 0,
        })
      }

      // Twitter/X Pixel conversion event
      if ("twq" in window) {
        // @ts-ignore - twq is not typed
        window.twq("event", "tw-ooo", {
          currency: "EUR",
          value: 0,
        })
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/rust-rocket-logo.gif"
                alt="Rust Rocket Logo"
                width={120}
                height={120}
                className="rounded-full border-2 border-primary"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Thanks for Joining!</h1>
            <p className="text-xl text-gray-300 mb-8">
              You've successfully joined the Rust Rocket waitlist. We'll be in touch soon with more information about
              our beta program.
            </p>
            <Link
              href="/solana-sniper-bot"
              className="inline-block py-3 px-6 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
            >
              Learn More About Rust Rocket
            </Link>
          </div>
        </div>
      </main>

      {/* Conversion tracking scripts */}
      <Script id="conversion-events" strategy="afterInteractive">
        {`
          // This script fires conversion events for Google Analytics and Twitter/X
          if (typeof gtag === 'function') {
            gtag('event', 'beta_signup', {value: 0});
          }
          if (typeof twq === 'function') {
            twq('event', 'tw-ooo', {currency: 'EUR', value: 0});
          }
        `}
      </Script>
    </div>
  )
}
