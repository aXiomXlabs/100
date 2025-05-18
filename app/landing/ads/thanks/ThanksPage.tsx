"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function ThanksPage() {
  // Tracking-Events auslösen, wenn die Seite geladen wird
  useEffect(() => {
    // Google Analytics Conversion-Event
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore - gtag ist nicht typisiert
      window.gtag("event", "beta_signup", { value: 0 })
    }

    // Twitter Conversion-Event
    if (typeof window !== "undefined" && "twq" in window) {
      // @ts-ignore - twq ist nicht typisiert
      window.twq("event", "tw-ooo", { currency: "EUR", value: 0 })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-20">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center"
        >
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">You're on the List!</h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Thanks for joining our waitlist. We'll notify you as soon as your access to the Rust Rocket Solana Sniper
            Bot is ready.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-2">What's Next?</h2>
              <p className="text-gray-300">
                We're currently onboarding users in small batches to ensure the best experience. You'll receive an email
                with access instructions when it's your turn.
              </p>
            </div>

            <div className="bg-gray-700/30 p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Want Priority Access?</h2>
              <p className="text-gray-300">
                Join our Telegram channel for community updates and a chance to get early access to the beta.
              </p>
              <a
                href="https://t.me/rustxrocket"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary-hover mt-2"
              >
                Join Telegram <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </main>

      {/* Conversion-Events */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event','beta_signup',{value:0});
            twq('event','tw-ooo',{currency:'EUR',value:0});
          `,
        }}
      />
    </div>
  )
}
