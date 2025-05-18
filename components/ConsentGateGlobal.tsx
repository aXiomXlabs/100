"use client"

import { useState, useEffect } from "react"

// Typdefinitionen für bessere Typensicherheit
interface CookieConsents {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

// Typdefinition für window.dataLayer
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    twq: any
  }
}

// Texte für verschiedene Sprachen
const translations = {
  en: {
    description:
      "We use cookies and similar technologies to enhance your experience and measure the effectiveness of our advertising. Please consent to their use.",
    decline: "Decline",
    accept: "Accept",
  },
  de: {
    description:
      "Wir verwenden Cookies und ähnliche Technologien, um dein Erlebnis zu verbessern und die Effektivität unserer Werbung zu messen. Bitte stimme der Verwendung zu.",
    decline: "Ablehnen",
    accept: "Akzeptieren",
  },
  es: {
    description:
      "Utilizamos cookies y tecnologías similares para mejorar tu experiencia y medir la efectividad de nuestra publicidad. Por favor, acepta su uso.",
    decline: "Rechazar",
    accept: "Aceptar",
  },
}

export default function ConsentGateGlobal() {
  const [showBanner, setShowBanner] = useState(false)
  const [language, setLanguage] = useState("en")

  // Sichere Wrapper-Funktionen für localStorage
  const getLocalStorageItem = (key: string): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(key)
  }

  const setLocalStorageItem = (key: string, value: string): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(key, value)
  }

  useEffect(() => {
    // Prüfe, ob wir im Browser sind
    if (typeof window === "undefined") return

    // Bestimme die Sprache basierend auf dem Pfad
    const path = window.location.pathname
    if (path.startsWith("/de/")) {
      setLanguage("de")
    } else if (path.startsWith("/es/")) {
      setLanguage("es")
    } else {
      setLanguage("en")
    }

    // Prüfe, ob Consent bereits gegeben wurde
    const hasConsent = getLocalStorageItem("cookieConsent") === "true"

    if (!hasConsent) {
      // Zeige Banner nach kurzer Verzögerung
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1500)
      return () => clearTimeout(timer)
    } else {
      // Wenn Consent bereits gegeben wurde, lade die Skripte
      loadScripts()
    }
  }, [])

  const acceptCookies = () => {
    // Speichere Consent-Einstellungen
    const consents: CookieConsents = {
      necessary: true,
      analytics: true,
      marketing: true,
    }

    setLocalStorageItem("cookieConsent", "true")
    setLocalStorageItem("cookieConsents", JSON.stringify(consents))
    setLocalStorageItem("consentTimestamp", new Date().toISOString())

    setShowBanner(false)
    loadScripts()

    // Tracking-Event für Consent
    if (typeof window !== "undefined") {
      // Initialisiere dataLayer, falls noch nicht vorhanden
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "cookies_accepted",
        consentTimestamp: new Date().toISOString(),
        consentType: "all",
      })

      // Debugging-Ausgabe in der Konsole
      console.log("Cookies accepted, scripts loaded")
    }
  }

  const declineCookies = () => {
    // Speichere Consent-Einstellungen mit abgelehnten Analytics/Marketing
    const consents: CookieConsents = {
      necessary: true,
      analytics: false,
      marketing: false,
    }

    setLocalStorageItem("cookieConsent", "true")
    setLocalStorageItem("cookieConsents", JSON.stringify(consents))
    setLocalStorageItem("consentTimestamp", new Date().toISOString())

    setShowBanner(false)

    // Tracking-Event für Ablehnung (nur wenn bereits geladen)
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "cookies_declined",
        consentTimestamp: new Date().toISOString(),
        consentType: "necessary_only",
      })

      // Debugging-Ausgabe in der Konsole
      console.log("Cookies declined, only necessary scripts loaded")
    }
  }

  const loadScripts = () => {
    // Prüfe, ob wir im Browser sind
    if (typeof window === "undefined") return

    // Prüfe, ob wir uns auf der Ads-Seite befinden
    const isAdsPage = window.location.pathname.includes("/landing/ads")

    // Hole Consent-Einstellungen aus dem localStorage
    let analyticsConsent = false
    let marketingConsent = false

    try {
      const consentsString = getLocalStorageItem("cookieConsents")
      if (consentsString) {
        const consents = JSON.parse(consentsString) as CookieConsents
        analyticsConsent = consents.analytics
        marketingConsent = consents.marketing
      }
    } catch (error) {
      console.error("Error parsing cookie consents:", error)
    }

    // Debugging-Ausgabe
    console.log("Loading scripts with consent:", {
      analytics: analyticsConsent,
      marketing: marketingConsent,
      isAdsPage,
    })

    // Lade Google Analytics, wenn Analytics-Consent gegeben wurde
    if (analyticsConsent) {
      loadGoogleAnalytics()
    }

    // Lade Twitter/X Pixel nur auf der Ads-Seite und wenn Marketing-Consent gegeben wurde
    if (isAdsPage && marketingConsent) {
      loadTwitterPixel()
    }
  }

  // Funktion zum Laden von Google Analytics
  const loadGoogleAnalytics = () => {
    // Prüfe, ob GA bereits geladen wurde
    if (document.getElementById("ga-script")) return

    try {
      // Erstelle GA-Script-Element
      const gaScript = document.createElement("script")
      gaScript.id = "ga-script"
      gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-6GRKXCYXWW"
      gaScript.async = true
      document.head.appendChild(gaScript)

      // Initialisiere GA
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      window.gtag = gtag
      gtag("js", new Date())
      gtag("config", "G-6GRKXCYXWW", {
        page_path: window.location.pathname,
        anonymize_ip: true,
      })

      // Debugging-Ausgabe
      console.log("Google Analytics loaded successfully")
    } catch (error) {
      console.error("Error loading Google Analytics:", error)
    }
  }

  // Funktion zum Laden des Twitter/X Pixels
  const loadTwitterPixel = () => {
    // Prüfe, ob Twitter Pixel bereits geladen wurde
    if (document.getElementById("twitter-pixel")) return

    try {
      // Erstelle Twitter-Pixel-Script-Element
      const twScript = document.createElement("script")
      twScript.id = "twitter-pixel"
      twScript.src = "https://static.ads-twitter.com/uwt.js"
      twScript.async = true
      document.head.appendChild(twScript)

      // Initialisiere Twitter Pixel
      window.twq =
        window.twq ||
        (() => {
          ;(window.twq.q = window.twq.q || []).push(arguments)
        })
      window.twq.version = "1.1"
      window.twq.queue = []
      window.twq("init", "YOUR_TWITTER_PIXEL_ID") // Ersetze mit deiner tatsächlichen Twitter Pixel ID
      window.twq("track", "PageView")

      // Debugging-Ausgabe
      console.log("Twitter Pixel loaded successfully")
    } catch (error) {
      console.error("Error loading Twitter Pixel:", error)
    }
  }

  // Wenn Banner nicht angezeigt werden soll, rendere nichts
  if (!showBanner) return null

  // Hole die Übersetzungen für die aktuelle Sprache
  const text = translations[language as keyof typeof translations]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-300">{text.description}</div>
          <div className="flex gap-2">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm text-gray-300 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
            >
              {text.decline}
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
            >
              {text.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
