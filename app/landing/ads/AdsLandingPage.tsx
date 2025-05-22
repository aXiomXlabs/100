"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import SolanaSniperAnimation from "@/components/SolanaSniperAnimation"
import { trackConversion, trackEvent } from "@/lib/tracking"
import { addToWaitlist } from "@/lib/waitlist"

export default function AdsLandingPage() {
  const [email, setEmail] = useState("")
  const [telegramUsername, setTelegramUsername] = useState("")
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })
  const [emailError, setEmailError] = useState("")
  const [utmParams, setUtmParams] = useState({
    source: "",
    medium: "",
    campaign: "",
    content: "",
    term: "",
  })

  const router = useRouter()
  const searchParams = useSearchParams()

  // Capture UTM parameters on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const newUtmParams = {
        source: params.get("utm_source") || "",
        medium: params.get("utm_medium") || "",
        campaign: params.get("utm_campaign") || "",
        content: params.get("utm_content") || "",
        term: params.get("utm_term") || "",
      }

      setUtmParams(newUtmParams)

      // Tracking des Seitenaufrufs mit UTM-Parametern
      if (typeof window.dataLayer !== "undefined") {
        window.dataLayer.push({
          event: "page_view",
          page_type: "landing_page",
          page_path: window.location.pathname,
          ...Object.fromEntries(Object.entries(newUtmParams).map(([key, value]) => [`utm_${key}`, value])),
        })
      }
    }

    // Track page view
    trackEvent({
      event: "page_view",
      page_title: "Ads Landing Page",
      page_location: window.location.href,
    })

    // ENTFERNT: Die automatische Weiterleitung nach 500ms wurde entfernt
    // Dieser Code war die Ursache für das Problem
  }, [router, searchParams])

  // Validate email format
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    setEmailError("")
    setFormStatus({ type: null, message: null })

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Bitte gib eine gültige E-Mail-Adresse ein")
      return
    }

    // Validate consent
    if (!consent) {
      setFormStatus({
        type: "error",
        message: "Bitte stimme den Datenschutzbestimmungen zu, um fortzufahren",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Neue Funktion zur Waitlist-Anmeldung verwenden
      const result = await addToWaitlist(email, telegramUsername, utmParams)

      if (!result.success) {
        setFormStatus({
          type: "error",
          message: result.message,
        })
        setIsSubmitting(false)
        return
      }

      // Conversion-Tracking
      trackConversion({
        action: "waitlist_signup",
        category: "conversion",
        label: "Ads Landing Page Signup",
        value: 10.0,
        currency: "EUR",
        transactionId: result.data?.transaction_id || `signup_${Date.now()}`,
        email_domain: email.split("@")[1],
        ...Object.fromEntries(Object.entries(utmParams).map(([key, value]) => [`utm_${key}`, value])),
      })

      // Show success message
      setFormStatus({
        type: "success",
        message: "Vielen Dank für deine Anmeldung! Wir melden uns bald bei dir.",
      })

      // Clear form
      setEmail("")
      setTelegramUsername("")
      setConsent(false)

      // Redirect to thanks page
      router.push("/landing/ads/thanks")
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus({
        type: "error",
        message: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden">
          {/* Hero Background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

          <div className="container relative z-10 px-4 mx-auto">
            <div className="flex justify-center items-center">
              {/* Hero Content */}
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                  <span className="text-primary">25 ms</span> Solana Sniper Bot with Same-Block Execution
                </h1>
                <p className="mb-8 text-xl text-gray-300">
                  Dominate Solana meme coins with the fastest same-block execution bot and intelligent copy trading.
                  Perfect for pump.fun sniping and professional Solana trading.
                </p>

                {/* KPI Strip */}
                <div className="grid grid-cols-3 gap-4 p-4 mb-8 bg-gray-900 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">95%</p>
                    <p className="text-sm text-gray-400">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">25 ms</p>
                    <p className="text-sm text-gray-400">Execution Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">200+</p>
                    <p className="text-sm text-gray-400">Beta Wallets</p>
                  </div>
                </div>

                {/* Animierte Grafik statt statischem Bild */}
                <div className="mb-8 rounded-lg shadow-2xl overflow-hidden">
                  <SolanaSniperAnimation />
                </div>

                {/* Waitlist Form */}
                <div className="p-6 bg-gray-900 rounded-lg">
                  <h2 className="mb-4 text-2xl font-bold text-white">Join the Free Beta Waitlist</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Email Address{" "}
                        <span className="text-red-500" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-2 bg-[#1A1A1A] border ${
                          emailError ? "border-red-500" : "border-gray-700"
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white`}
                        required
                      />
                      {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
                    </div>

                    {/* Telegram username field */}
                    <div>
                      <label htmlFor="telegram" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Telegram Username (Optional)
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-2 bg-[#1A1A1A] border border-r-0 border-gray-700 rounded-l-lg text-gray-400">
                          @
                        </span>
                        <input
                          type="text"
                          id="telegram"
                          name="telegram"
                          value={telegramUsername}
                          onChange={(e) => setTelegramUsername(e.target.value)}
                          placeholder="username"
                          className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white"
                        />
                      </div>
                    </div>

                    {/* Hidden UTM fields */}
                    <input type="hidden" name="utm_source" value={utmParams.source} />
                    <input type="hidden" name="utm_medium" value={utmParams.medium} />
                    <input type="hidden" name="utm_campaign" value={utmParams.campaign} />
                    <input type="hidden" name="utm_content" value={utmParams.content} />
                    <input type="hidden" name="utm_term" value={utmParams.term} />

                    {/* Consent checkbox */}
                    <div className="flex items-start mt-4">
                      <div className="flex items-center h-5">
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="w-4 h-4 bg-[#1A1A1A] border border-gray-700 rounded focus:ring-primary focus:ring-2"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="consent" className="text-gray-300">
                          I agree to receive updates about Rust Rocket and confirm I have read the{" "}
                          <a
                            href="https://www.rust-rocket.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </a>
                          .
                        </label>
                      </div>
                    </div>

                    {/* Status message */}
                    {formStatus.message && (
                      <div
                        className={`p-3 rounded-lg ${
                          formStatus.type === "success"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {formStatus.message}
                      </div>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        "Secure My Spot!"
                      )}
                    </button>

                    {/* Risk Disclaimer */}
                    <p className="mt-3 text-xs text-neutral-500">
                      Crypto assets are volatile. You may lose all capital.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
