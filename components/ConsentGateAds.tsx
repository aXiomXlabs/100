"use client"

import { useState, useEffect } from "react"

export default function ConsentGateAds() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if consent has already been given
    const hasConsent = localStorage.getItem("adsConsentGiven") === "true"
    if (!hasConsent) {
      setShowBanner(true)
    } else {
      // If consent was already given, load the scripts
      loadAdvertisingScripts()
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("adsConsentGiven", "true")
    setShowBanner(false)
    loadAdvertisingScripts()

    // Push event to dataLayer
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "cookies_accepted" })
    }
  }

  const declineCookies = () => {
    localStorage.setItem("adsConsentGiven", "false")
    setShowBanner(false)

    // Push event to dataLayer
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "cookies_declined" })
    }
  }

  const loadAdvertisingScripts = () => {
    // Load Google Analytics
    const gaScript = document.createElement("script")
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-6GRKXCYXWW"
    gaScript.async = true
    document.head.appendChild(gaScript)

    // Initialize GA
    const dataLayer = (window.dataLayer = window.dataLayer || [])
    function gtag() {
      // @ts-ignore
      dataLayer.push(arguments)
    }
    // @ts-ignore
    gtag("js", new Date())
    // @ts-ignore
    gtag("config", "G-6GRKXCYXWW")

    // Load Twitter/X Pixel
    const twScript = document.createElement("script")
    twScript.src = "https://static.ads-twitter.com/uwt.js"
    twScript.async = true
    document.head.appendChild(twScript)

    // Initialize Twitter/X Pixel
    const twq = (window.twq =
      window.twq ||
      (() => {
        // @ts-ignore
        twq.exe ? twq.exe.apply(twq, arguments) : twq.queue.push(arguments)
      }))
    // @ts-ignore
    twq.version = "1.1"
    // @ts-ignore
    twq.queue = []
    // @ts-ignore
    twq("init", "YOUR_TWITTER_PIXEL_ID") // Replace with your actual Twitter Pixel ID
    // @ts-ignore
    twq("track", "PageView")
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-300">
            Wir verwenden Cookies und ähnliche Technologien, um dein Erlebnis zu verbessern und die Effektivität unserer
            Werbung zu messen. Bitte stimme der Verwendung zu.
          </div>
          <div className="flex gap-2">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm text-gray-300 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
            >
              Ablehnen
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm text-white bg-primary rounded hover:bg-primary-hover transition-colors"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
