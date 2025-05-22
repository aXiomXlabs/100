"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { addToWaitlist, getUTMParameters } from "@/lib/waitlist"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("")
  const [telegramUsername, setTelegramUsername] = useState("")
  const [consent, setConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
    details?: string
  }>({ type: null, message: null })
  const [emailError, setEmailError] = useState("")
  const [debugMode, setDebugMode] = useState(true) // Debug-Modus standardmäßig aktiviert

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setEmail("")
      setTelegramUsername("")
      setConsent(false)
      setMarketingConsent(false)
      setFormStatus({ type: null, message: null })
      setEmailError("")

      // Track modal open event with consent check
      trackEvent("waitlist_modal_open", "engagement", "waitlist_modal")
    }
  }, [isOpen])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
        trackEvent("waitlist_modal_close", "engagement", "escape_key")
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Enable debug mode with key combination
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+D to toggle debug mode
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        setDebugMode((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Validate email format
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Safe tracking function that respects consent
  const trackEvent = (event: string, category?: string, label?: string, value?: number) => {
    // Check if we have consent for analytics
    const consentData = localStorage.getItem("userConsent")
    if (!consentData) return

    try {
      const { consent } = JSON.parse(consentData)

      // Google Analytics tracking (requires statistics consent)
      if (consent.statistics && typeof window.gtag === "function") {
        window.gtag("event", event, {
          event_category: category,
          event_label: label,
          value: value,
        })
      }

      // Conversion tracking for successful signup (requires marketing consent)
      if (event === "beta_signup" && consent.marketing) {
        // Twitter conversion
        if (typeof window.twq === "function") {
          window.twq("event", "tw-ooo", {
            currency: "EUR",
            value: 0,
          })
        }

        // Facebook conversion
        if (typeof window.fbq === "function") {
          window.fbq("track", "Lead")
        }
      }
    } catch (error) {
      console.error("Error tracking event:", error)
    }
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
      trackEvent("waitlist_form_error", "form", "invalid_email")
      return
    }

    // Validate consent
    if (!consent) {
      setFormStatus({
        type: "error",
        message: "Please agree to the privacy policy to continue",
      })
      trackEvent("waitlist_form_error", "form", "consent_missing")
      return
    }

    setIsSubmitting(true)

    try {
      // Get UTM parameters from localStorage
      const utmParams = getUTMParameters()

      // Submit to Supabase
      const result = await addToWaitlist(email, telegramUsername || null, utmParams, {
        marketing: marketingConsent,
        terms: consent,
      })

      if (result.success) {
        // Track successful signup
        trackEvent("beta_signup", "conversion", "waitlist_signup", 0)

        // Show success message
        setFormStatus({
          type: "success",
          message: "Thanks for joining! We'll be in touch soon.",
        })

        // Clear form
        setEmail("")
        setTelegramUsername("")
        setConsent(false)
        setMarketingConsent(false)

        // Close modal after 3 seconds on success
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        setFormStatus({
          type: "error",
          message: result.message || "Something went wrong. Please try again.",
          details: debugMode ? JSON.stringify(result.error, null, 2) : undefined,
        })
        trackEvent("waitlist_form_error", "form", "submission_error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)

      setFormStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
        details: debugMode ? String(error) : undefined,
      })
      trackEvent("waitlist_form_error", "form", "server_error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleModalClose = () => {
    trackEvent("waitlist_modal_close", "engagement", "close_button")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleModalClose}
      role="dialog"
      aria-labelledby="waitlist-modal-title"
      aria-modal="true"
      id="waitlist-modal"
    >
      <div
        className="relative w-full max-w-md bg-[#2C2C2C] border border-gray-800 p-6 rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
          id="waitlist-modal-close"
          data-tracking-id="waitlist_modal_close_button"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Modal header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2" id="waitlist-modal-title">
            Join the Rust Rocket Waitlist!
          </h2>
          <p className="text-gray-300">
            Be the first to know when Rust Rocket launches. Get exclusive early access and updates.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          id="waitlist-form"
          data-tracking-id="waitlist_form"
          aria-labelledby="waitlist-modal-title"
        >
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Your Email Address{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(required)</span>
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
              aria-required="true"
              aria-invalid={emailError ? "true" : "false"}
              aria-describedby={emailError ? "email-error" : undefined}
              data-tracking-id="waitlist_email_input"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500" id="email-error" role="alert">
                {emailError}
              </p>
            )}
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
                aria-required="false"
                data-tracking-id="waitlist_telegram_input"
              />
            </div>
          </div>

          {/* Hidden UTM fields */}
          <input type="hidden" name="utm_source" />
          <input type="hidden" name="utm_medium" />
          <input type="hidden" name="utm_campaign" />
          <input type="hidden" name="utm_content" />
          <input type="hidden" name="utm_term" />

          {/* Terms Consent checkbox */}
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
                aria-required="true"
                data-tracking-id="waitlist_consent_checkbox"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="text-gray-300">
                I agree to the{" "}
                <a
                  href="https://www.rust-rocket.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  data-tracking-id="terms_link"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="https://www.rust-rocket.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  data-tracking-id="privacy_policy_link"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
          </div>

          {/* Marketing Consent checkbox */}
          <div className="flex items-start mt-2">
            <div className="flex items-center h-5">
              <input
                id="marketing-consent"
                name="marketing-consent"
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="w-4 h-4 bg-[#1A1A1A] border border-gray-700 rounded focus:ring-primary focus:ring-2"
                aria-required="false"
                data-tracking-id="waitlist_marketing_consent_checkbox"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="marketing-consent" className="text-gray-300">
                I agree to receive marketing emails about Rust Rocket products and services.
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
              role="alert"
              aria-live="assertive"
            >
              <p>{formStatus.message}</p>
              {formStatus.details && debugMode && (
                <pre className="mt-2 text-xs overflow-auto max-h-32 p-2 bg-black/30 rounded">{formStatus.details}</pre>
              )}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            id="waitlist-submit-button"
            data-tracking-id="waitlist_submit_button"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing...</span>
                <span className="sr-only">Please wait while we process your submission</span>
              </>
            ) : (
              "Secure My Spot!"
            )}
          </button>

          {/* Privacy note */}
          <p className="text-xs text-gray-400 text-center mt-4">
            We respect your privacy and will never share your information with third parties.
          </p>

          {/* Debug mode indicator */}
          {debugMode && (
            <div className="text-xs text-gray-500 text-center mt-2">Debug mode active (Ctrl+Shift+D to toggle)</div>
          )}
        </form>
      </div>
    </div>
  )
}
