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
    fbq: any
  }
}

// Texte für verschiedene Sprachen
const translations = {
  en: {
    title: "Cookie Consent",
    description:
      'We use cookies and similar technologies to enhance your experience and measure the effectiveness of our advertising. By clicking "Accept All", you consent to our use of cookies.',
    decline: "Decline",
    accept: "Accept All",
    privacyLink: "Privacy Policy",
  },
  de: {
    title: "Cookie-Zustimmung",
    description:
      'Wir verwenden Cookies und ähnliche Technologien, um dein Erlebnis zu verbessern und die Effektivität unserer Werbung zu messen. Durch Klicken auf „Alle akzeptieren" stimmst du der Verwendung von Cookies zu.',
    decline: "Ablehnen",
    accept: "Alle akzeptieren",
    privacyLink: "Datenschutzrichtlinie",
  },
  es: {
    title: "Consentimiento de cookies",
    description:
      'Utilizamos cookies y tecnologías similares para mejorar tu experiencia y medir la efectividad de nuestra publicidad. Al hacer clic en "Aceptar todo", usted acepta nuestro uso de cookies.',
    decline: "Rechazar",
    accept: "Aceptar todo",
    privacyLink: "Política de privacidad",
  },
}

export default function ConsentGateGlobal() {
  const [showBanner, setShowBanner] = useState(false)
  const [language, setLanguage] = useState("en")

  // Sichere Wrapper-Funktionen für localStorage
  const getLocalStorageItem = (key: string): string | null => {
    if (typeof window === "undefined") return null
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      return null
    }
  }

  const setLocalStorageItem = (key: string, value: string): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
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

    // Google Analytics / GTM Consent
    if (typeof window.dataLayer !== "undefined") {
      window.dataLayer.push({
        event: "consent_update",
        consent_status: "granted",
        consent_type: "all",
        consent_timestamp: new Date().toISOString(),
      })
    }

    // Google Ads Consent
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
      })
    }

    // Facebook Pixel Consent
    if (typeof window.fbq === "function") {
      window.fbq("consent", "grant")
    }

    // Twitter/X Pixel Consent
    if (typeof window.twq === "function") {
      window.twq("consent", "grant")
    }

    console.log("Cookies accepted, consent granted to all tracking systems")
  }

  const declineCookies = () => {
    // Speichere Consent-Einstellungen mit abgelehnten Analytics/Marketing
    const consents: CookieConsents = {
      necessary: true,
      analytics: false,
      marketing: false,
    }

    setLocalStorageItem("cookieConsent", "minimal")
    setLocalStorageItem("cookieConsents", JSON.stringify(consents))
    setLocalStorageItem("consentTimestamp", new Date().toISOString())

    setShowBanner(false)

    // Google Analytics / GTM Consent Ablehnung
    if (typeof window.dataLayer !== "undefined") {
      window.dataLayer.push({
        event: "consent_update",
        consent_status: "denied",
        consent_type: "necessary_only",
        consent_timestamp: new Date().toISOString(),
      })
    }

    // Google Ads Consent Ablehnung
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
        functionality_storage: "granted",
        personalization_storage: "denied",
        security_storage: "granted",
      })
    }

    // Facebook Pixel Consent Ablehnung
    if (typeof window.fbq === "function") {
      window.fbq("consent", "revoke")
    }

    // Twitter/X Pixel Consent Ablehnung
    if (typeof window.twq === "function") {
      window.twq("consent", "revoke")
    }

    console.log("Cookies declined, only necessary cookies allowed")
  }

  if (!showBanner) return null

  // Hole die Übersetzungen für die aktuelle Sprache
  const text = translations[language as keyof typeof translations]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 border-t border-gray-800 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{text.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{text.description}</p>
            <a
              href="/privacy"
              className="text-xs text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {text.privacyLink}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
            >
              {text.decline}
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition-colors"
            >
              {text.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
