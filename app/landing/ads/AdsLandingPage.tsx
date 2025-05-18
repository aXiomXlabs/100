"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              25ms Solana Sniper Bot
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Same-block execution & intelligent copy-trading for Solana meme coins
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Image
              src="/assets/og-ads.webp"
              alt="Solana sniper bot Rust Rocket telegram interface"
              width={1200}
              height={630}
              className="rounded-lg shadow-2xl mx-auto max-w-full"
              priority
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <FeatureCard
            title="25ms Execution"
            description="Execute trades in the same block as new token launches with our proprietary BDN network"
          />
          <FeatureCard
            title="Copy Trading"
            description="Automatically copy successful traders with customizable risk parameters"
          />
          <FeatureCard
            title="Rug Protection"
            description="Built-in safety features to protect against common scams and rug pulls"
          />
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-md mx-auto border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Join Free Beta Waitlist</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className={`w-full px-4 py-2 bg-gray-700 border ${
                  emailError ? "border-red-500" : "border-gray-600"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white`}
              />
              {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="telegram" className="block text-sm font-medium text-gray-300 mb-1">
                Telegram Username (optional)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">@</span>
                <input
                  type="text"
                  id="telegram"
                  name="telegram"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  placeholder="username"
                  className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                />
              </div>
            </div>
            <input type="hidden" name="utm_source" value={utmSource} />
            <input type="hidden" name="utm_medium" value={utmMedium} />
            <input type="hidden" name="utm_campaign" value={utmCampaign} />
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center"
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
            <p className="mt-3 text-xs text-neutral-500">Crypto assets are volatile. You may lose all capital.</p>
          </form>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">What Early Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Testimonial
              quote="I was able to get into three launches in the same block. Made 4x on each one. This bot is insane."
              author="@solana_trader"
            />
            <Testimonial
              quote="The copy trading feature alone is worth it. I've been following the top traders and my portfolio is up 300% this month."
              author="@meme_investor"
            />
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>© 2024 Rust Rocket. All rights reserved.</p>
          <div className="mt-2">
            <Link href="/privacy" className="text-gray-400 hover:text-white mx-2">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white mx-2">
              Terms of Service
            </Link>
          </div>
        </div>
      </main>

      {/* Script für UTM-Parameter */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          const p = new URLSearchParams(location.search);
          ['utm_source', 'utm_medium', 'utm_campaign'].forEach(k => {
            const f = document.querySelector(\`[name="\${k}"]\`);
            if (f) { f.value = p.get(k) || ''; }
          });
        `,
        }}
      />
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:bg-gray-800/50 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="bg-green-500/20 p-2 rounded-full mr-3">
          <Check className="h-5 w-5 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
      <p className="italic text-gray-300 mb-4">"{quote}"</p>
      <p className="text-green-500 font-medium">{author}</p>
    </div>
  )
}
