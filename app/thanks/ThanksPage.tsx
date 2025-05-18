"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { trackConversion } from "@/lib/conversion-tracking"
import { ArrowLeft, Check } from "lucide-react"

export default function ThanksPage() {
  useEffect(() => {
    // Conversion-Tracking beim Laden der Seite
    trackConversion({
      action: "waitlist_signup_complete",
      category: "conversion",
      label: "Waitlist Signup",
      value: 10.0, // Geschätzter Wert einer Anmeldung
      currency: "EUR",
      transactionId: `signup_${Date.now()}`,
      page: "/thanks",
    })
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 rounded-xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <Image
            src="/images/rust-rocket-logo.png"
            alt="Rust Rocket Logo"
            width={120}
            height={120}
            className="mx-auto mb-6"
            priority
          />

          <h1 className="text-2xl font-bold text-white mb-4">Thanks for Joining!</h1>

          <p className="text-gray-300 mb-6">
            You've successfully joined the Rust Rocket waitlist. We'll keep you updated on our launch and send you
            exclusive early access information.
          </p>

          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-white mb-2">What's Next?</h2>
            <ul className="text-gray-300 text-left space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Check your email for a confirmation message</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Follow us on Twitter for the latest updates</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Join our Telegram community for exclusive insights</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <Link
              href="https://t.me/rustrocket"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Join Telegram
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
