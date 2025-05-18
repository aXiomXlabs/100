"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import SolanaSniperAnimation from "@/components/SolanaSniperAnimation"

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
  const [utmSource, setUtmSource] = useState("")
  const [utmMedium, setUtmMedium] = useState("")
  const [utmCampaign, setUtmCampaign] = useState("")

  const router = useRouter()

  // Capture UTM parameters on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      setUtmSource(params.get("utm_source") || "")
      setUtmMedium(params.get("utm_medium") || "")
      setUtmCampaign(params.get("utm_campaign") || "")
    }
  }, [])

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
      setEmailError("Please enter a valid email address")
      return
    }

    // Validate consent
    if (!consent) {
      setFormStatus({
        type: "error",
        message: "Please agree to the privacy policy to continue",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Supabase integration
      await handleSupabaseSubmit(email, telegramUsername)

      // Show success message
      setFormStatus({
        type: "success",
        message: "Thanks for joining! We'll be in touch soon.",
      })

      // Clear form
      setEmail("")
      setTelegramUsername("")
      setConsent(false)

      // Redirect to thanks page
      router.push("/landing/ads/thanks")
    } catch (error) {
      console.error("Error submitting form:", error)

      // Check if it's a duplicate email error
      if (error instanceof Error && error.message.includes("already on our waitlist")) {
        setFormStatus({
          type: "error",
          message: "This email is already on our waitlist.",
        })
      } else {
        setFormStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Supabase submission
  const handleSupabaseSubmit = async (email: string, telegramUsername: string) => {
    const supabase = createClientSupabaseClient()

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing user:", checkError)
      throw new Error("Error checking database")
    }

    if (existingUser) {
      throw new Error("This email is already on our waitlist")
    }

    // Sammeln Sie alle UTM-Parameter in einem Feld
    let referralSource = "direct"
    if (utmSource) {
      referralSource = utmSource
      if (utmMedium || utmCampaign) {
        referralSource += ` (medium: ${utmMedium || "none"}, campaign: ${utmCampaign || "none"})`
      }
    }

    // Insert new waitlist entry with simplified referral tracking
    const { error: insertError } = await supabase.from("waitlist").insert({
      email,
      telegram_username: telegramUsername || null,
      referral_source: referralSource,
      created_at: new Date().toISOString(),
    })

    if (insertError) {
      console.error("Error inserting waitlist entry:", insertError)
      throw insertError
    }

    return true
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
                    <input type="hidden" name="utm_source" />
                    <input type="hidden" name="utm_medium" />
                    <input type="hidden" name="utm_campaign" />

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

      {/* UTM Parameter Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const p=new URLSearchParams(location.search);
            ['utm_source','utm_medium','utm_campaign'].forEach(k=>{
              const f=document.querySelector(\`[name="\${k}"]\`);
              if(f){ f.value=p.get(k)||''; }
            });
          `,
        }}
      />
    </div>
  )
}
