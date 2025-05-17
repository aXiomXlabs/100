"use client"

import { useEffect, useState } from "react"

export default function TestCookiePage() {
  const [cookieState, setCookieState] = useState<string>("Loading...")
  const [showDebugBanner, setShowDebugBanner] = useState(false)

  useEffect(() => {
    // Try to access localStorage
    try {
      if (typeof window !== "undefined") {
        const hasConsent = localStorage.getItem("cookieConsent")
        setCookieState(`Cookie consent state: ${hasConsent || "Not set"}`)

        // Force banner to show after 5 seconds for testing
        setTimeout(() => {
          setShowDebugBanner(true)
        }, 5000)
      } else {
        setCookieState("Not in browser environment")
      }
    } catch (error) {
      setCookieState(`Error accessing localStorage: ${error}`)
    }
  }, [])

  const acceptCookies = () => {
    try {
      localStorage.setItem("cookieConsent", "true")
      localStorage.setItem(
        "cookieConsents",
        JSON.stringify({
          necessary: true,
          analytics: true,
          marketing: true,
        }),
      )
      setCookieState("Cookies accepted")
      setShowDebugBanner(false)
    } catch (error) {
      setCookieState(`Error accepting cookies: ${error}`)
    }
  }

  const rejectCookies = () => {
    try {
      localStorage.setItem("cookieConsent", "true")
      localStorage.setItem(
        "cookieConsents",
        JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false,
        }),
      )
      setCookieState("Cookies rejected")
      setShowDebugBanner(false)
    } catch (error) {
      setCookieState(`Error rejecting cookies: ${error}`)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cookie Banner Test Page</h1>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <pre>{cookieState}</pre>
      </div>

      <div className="mb-4">
        <button
          onClick={() => localStorage.removeItem("cookieConsent")}
          className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
        >
          Clear Cookie Consent
        </button>

        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded">
          Reload Page
        </button>
      </div>

      {showDebugBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Debug Cookie Banner</h2>
                <p>This is a test banner that appears after 5 seconds</p>
              </div>
              <div>
                <button onClick={rejectCookies} className="px-4 py-2 border border-white rounded mr-2">
                  Decline
                </button>
                <button onClick={acceptCookies} className="px-4 py-2 bg-green-500 rounded">
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
