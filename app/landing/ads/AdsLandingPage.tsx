"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import Navbar from "@/components/Navbar"
import WaitlistButton from "@/components/WaitlistButton"
import ParticlesBackground from "@/components/ParticlesBackground"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import { trackWaitlistSignup, trackEvent, trackButtonClick, trackPageView } from "@/lib/tracking"
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

  // Enhanced UTM and tracking setup
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

      // Enhanced page view tracking with UTM parameters
      trackPageView("/landing/ads", "Ads Landing Page")

      // Track specific landing page view event
      trackEvent({
        event: "landing_page_view",
        category: "ads_campaign",
        action: "page_view",
        label: "ads_landing_page",
        utm_source: newUtmParams.source,
        utm_medium: newUtmParams.medium,
        utm_campaign: newUtmParams.campaign,
        utm_content: newUtmParams.content,
        utm_term: newUtmParams.term,
      })

      // Track Google Ads specific events
      if (typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          page_title: "Ads Landing Page",
          page_location: window.location.href,
          page_path: "/landing/ads",
          campaign_source: newUtmParams.source,
          campaign_medium: newUtmParams.medium,
          campaign_name: newUtmParams.campaign,
        })
      }

      // Track Facebook Pixel for ads campaigns
      if (typeof window.fbq === "function") {
        window.fbq("track", "ViewContent", {
          content_type: "landing_page",
          content_category: "ads_campaign",
          content_name: "Solana Sniper Bot Landing",
          source: newUtmParams.source,
        })
      }
    }
  }, [])

  // Validate email format
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Enhanced form submission with comprehensive tracking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    setEmailError("")
    setFormStatus({ type: null, message: null })

    // Track form submission attempt
    trackEvent({
      event: "form_submit_attempt",
      category: "conversion",
      action: "form_interaction",
      label: "ads_landing_form",
      utm_source: utmParams.source,
      utm_campaign: utmParams.campaign,
    })

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      trackEvent({
        event: "form_validation_error",
        category: "form_error",
        action: "email_validation",
        label: "invalid_email",
      })
      return
    }

    // Validate consent
    if (!consent) {
      setFormStatus({
        type: "error",
        message: "Please agree to the privacy policy to continue",
      })
      trackEvent({
        event: "form_validation_error",
        category: "form_error",
        action: "consent_validation",
        label: "missing_consent",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Use waitlist function to submit
      const result = await addToWaitlist(email, telegramUsername, utmParams)

      if (!result.success) {
        setFormStatus({
          type: "error",
          message: result.message,
        })

        // Track submission error
        trackEvent({
          event: "form_submit_error",
          category: "conversion_error",
          action: "submission_failed",
          label: result.message,
        })

        setIsSubmitting(false)
        return
      }

      // Enhanced conversion tracking for successful submission
      trackWaitlistSignup(email, utmParams.source || "ads_landing")

      // Additional Google Ads conversion tracking
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-17075854441/Rl-yCJXS9OQYEPnLtdsp", // Waitlist signup conversion
          value: 10.0,
          currency: "USD",
          transaction_id: result.data?.transaction_id || `ads_${Date.now()}`,
          user_data: {
            email_address: email,
          },
          custom_parameters: {
            utm_source: utmParams.source,
            utm_medium: utmParams.medium,
            utm_campaign: utmParams.campaign,
            landing_page: "ads",
          },
        })
      }

      // Enhanced Facebook Pixel conversion tracking
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: "Ads Landing Signup",
          content_category: "waitlist",
          value: 10.0,
          currency: "USD",
          source: utmParams.source,
          campaign: utmParams.campaign,
        })
      }

      // Track successful conversion
      trackEvent({
        event: "conversion_complete",
        category: "conversion",
        action: "waitlist_signup",
        label: "ads_landing_success",
        value: 10,
        currency: "USD",
        transaction_id: result.data?.transaction_id,
        email_domain: email.split("@")[1],
        utm_source: utmParams.source,
        utm_medium: utmParams.medium,
        utm_campaign: utmParams.campaign,
      })

      // Show success message
      setFormStatus({
        type: "success",
        message: "Thank you for your registration! We'll be in touch soon.",
      })

      // Clear form
      setEmail("")
      setTelegramUsername("")
      setConsent(false)

      // Redirect to thanks page with UTM parameters
      const thanksUrl = new URL("/landing/ads/thanks", window.location.origin)
      Object.entries(utmParams).forEach(([key, value]) => {
        if (value) thanksUrl.searchParams.set(`utm_${key}`, value)
      })

      router.push(thanksUrl.toString())
    } catch (error) {
      console.error("Error submitting form:", error)

      // Track submission error
      trackEvent({
        event: "form_submit_error",
        category: "conversion_error",
        action: "technical_error",
        label: error instanceof Error ? error.message : "unknown_error",
      })

      setFormStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Enhanced button click tracking
  const handleButtonClick = (buttonType: string, buttonText: string) => {
    trackButtonClick(`ads_landing_${buttonType}`, buttonText)

    trackEvent({
      event: "button_click",
      category: "engagement",
      action: "click",
      label: `${buttonType}_${buttonText.toLowerCase().replace(/\s+/g, "_")}`,
      utm_source: utmParams.source,
      utm_campaign: utmParams.campaign,
    })
  }

  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main className="relative z-10 pt-24 pb-16">
        <div className="container-custom">
          {/* Enhanced Hero Section with better SEO */}
          <section className="py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  25ms Solana Sniper Bot
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                  Same-Block Execution & Copy Trading
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Get exclusive beta access to the fastest Solana sniper bot. Dominate pump.fun launches with 25ms
                  execution speed, intelligent copy trading, and advanced MEV protection. Limited spots available.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <WaitlistButton
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                    onClick={() => handleButtonClick("cta_primary", "Join Free Beta")}
                  >
                    Join Free Beta <ArrowRight className="h-5 w-5" />
                  </WaitlistButton>
                  <Link
                    href="#signup"
                    className="bg-background-secondary hover:bg-background-tertiary text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 flex items-center justify-center border border-gray-700 hover:border-gray-500"
                    onClick={() => handleButtonClick("cta_secondary", "Learn More")}
                  >
                    Learn More
                  </Link>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>Limited beta spots - Join 200+ traders already signed up</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl p-1">
                  <div className="bg-background-secondary rounded-xl overflow-hidden border border-gray-800">
                    <Image
                      src="/solana-trading-bot-dashboard.png"
                      alt="Rust Rocket Solana Sniper Bot Dashboard - 25ms Execution Speed"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                      priority
                      loading="eager"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-lg px-4 py-2 text-white text-sm">
                  <span className="font-bold">25ms</span> execution speed
                </div>
              </motion.div>
            </div>
          </section>

          {/* Enhanced Signup Form Section */}
          <section id="signup" className="py-16">
            <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 border border-gray-800">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">Secure Your Beta Access</h2>
                <p className="text-lg text-gray-300 mb-8 text-center">
                  Join 200+ traders already using Rust Rocket. Be among the first to experience same-block execution on
                  Solana.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                  {/* Email field with enhanced tracking */}
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
                      onFocus={() =>
                        trackEvent({
                          event: "form_field_focus",
                          category: "form_interaction",
                          action: "email_focus",
                          label: "ads_landing_form",
                        })
                      }
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
                        onFocus={() =>
                          trackEvent({
                            event: "form_field_focus",
                            category: "form_interaction",
                            action: "telegram_focus",
                            label: "ads_landing_form",
                          })
                        }
                        placeholder="username"
                        className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white"
                      />
                    </div>
                  </div>

                  {/* Hidden UTM fields for form submission */}
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
                        onChange={(e) => {
                          setConsent(e.target.checked)
                          trackEvent({
                            event: "form_consent_change",
                            category: "form_interaction",
                            action: e.target.checked ? "consent_given" : "consent_removed",
                            label: "privacy_policy",
                          })
                        }}
                        className="w-4 h-4 bg-[#1A1A1A] border border-gray-700 rounded focus:ring-primary focus:ring-2"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="consent" className="text-gray-300">
                        I agree to receive updates about Rust Rocket and confirm I have read the{" "}
                        <a
                          href="/legal/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                          onClick={() =>
                            trackEvent({
                              event: "privacy_policy_click",
                              category: "legal",
                              action: "click",
                              label: "ads_landing_form",
                            })
                          }
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

                  {/* Submit button with enhanced tracking */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    onClick={() =>
                      !isSubmitting &&
                      trackEvent({
                        event: "form_submit_button_click",
                        category: "conversion",
                        action: "submit_attempt",
                        label: "ads_landing_form",
                      })
                    }
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
                        <span>Securing Your Spot...</span>
                      </>
                    ) : (
                      "Get Free Beta Access"
                    )}
                  </button>

                  {/* Enhanced risk disclaimer */}
                  <p className="mt-3 text-xs text-neutral-500 text-center">
                    ⚠️ Trading cryptocurrencies involves substantial risk. You may lose all invested capital. Only invest
                    what you can afford to lose.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
