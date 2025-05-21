"use client"

import { useState, useEffect } from "react"

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if consent has already been given
    const consentGiven = localStorage.getItem("consentGiven")
    if (!consentGiven) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    // Store consent in local storage
    localStorage.setItem("consentGiven", "true")
    setShowBanner(false)
  }

  const handleDecline = () => {
    // Optionally handle decline (e.g., disable certain features)
    localStorage.setItem("consentGiven", "false") // Or remove the item
    setShowBanner(false)
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-200 p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <p className="text-sm">
            We use cookies to improve your experience on our site. By continuing to use our site, you agree to our{" "}
            <a href="/legal/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/legal/terms-of-service" className="text-primary hover:underline">
              Terms of Service
            </a>
            .
          </p>
        </div>
        <div>
          <button className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark mr-2" onClick={handleAccept}>
            Accept
          </button>
          <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400" onClick={handleDecline}>
            Decline
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-2 text-center">
        <a
          href="/legal/privacy-policy"
          className="text-xs text-primary hover:underline mr-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <a
          href="/legal/terms-of-service"
          className="text-xs text-primary hover:underline mr-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        <a
          href="/legal/cookie-policy"
          className="text-xs text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cookie Policy
        </a>
      </div>
    </div>
  )
}

export default ConsentBanner
