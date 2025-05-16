"use client"

import { useState, useEffect } from "react"
import { Check, Shield } from "lucide-react"

export default function CookieBannerFixedDelay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Add debug logging
    console.log("CookieBannerFixedDelay mounted")

    // Function to check if cookie consent exists
    const checkCookieConsent = () => {
      try {
        // Only run in browser
        if (typeof window === 'undefined') return false
        
        // Check for consent
        const hasConsent = localStorage.getItem("cookieConsent")
        console.log("Cookie consent check:", hasConsent)
        return !!hasConsent
      } catch (error) {
        console.error("Error checking cookie consent:", error)
        return false
      }
    }

    // Don't show if consent already exists
    if (checkCookieConsent()) {
      console.log("Consent already exists, not showing banner")
      return
    }

    // Show the banner after a delay
    console.log("No consent found, scheduling banner display")
    const timer = setTimeout(() => {
      console.log("Showing cookie banner now")
      setVisible(true)
    }, 2000)

    // Cleanup timeout
    return () => clearTimeout(timer)
  }, [])

  // If not visible, don't render anything
  if (!visible) {
    return null
  }

  const acceptAll = () => {
    try {
      console.log("Accepting all cookies")
      localStorage.setItem("cookieConsent", "true")
      localStorage.setItem("cookieConsents", JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true
      }))
      setVisible(false)
      // Reload to apply analytics
      window.location.reload()
    } catch (error) {
      console.error("Error accepting cookies:", error)
    }
  }

  const rejectAll = () => {
    try {
      console.log("Rejecting optional cookies")
      localStorage.setItem("cookieConsent", "true")
      localStorage.setItem("cookieConsents", JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false
      }))
      setVisible(false)
    } catch (error) {
      console.error("Error rejecting cookies:", error)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background-secondary border-t border-gray-800 p-4 z-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-solana-purple flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium mb-1">Cookie Settings</h3>
              <p className="text-sm text-gray-400">
                We use cookies to provide you with the best possible experience on our website.
                For more information, please see our Privacy Policy.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 md:mt-0">
            <button
              onClick={rejectAll}
              className="px-4 py-2 border border-gray-700 rounded-md text-sm hover:bg-gray-800 transition-colors"
              aria-label="Accept only necessary cookies"
            >
              Decline
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 bg-solana-purple hover:bg-solana-purple/80 text-white rounded-md text-sm transition-colors flex items-center gap-1"
              aria-label="Accept all cookies"
            >
              <Check className="h-4 w-4" />
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 