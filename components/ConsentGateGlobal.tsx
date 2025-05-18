"use client"

import { useState, useEffect } from "react"

export default function ConsentGateGlobal() {
  const [showBanner, setShowBanner] = useState(false)
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    // Detect language from URL path
    const path = window.location.pathname
    if (path.startsWith("/de")) {
      setLanguage("de")
    } else if (path.startsWith("/es")) {
      setLanguage("es")
    } else {
      setLanguage("en")
    }

    // Check if consent has been given
    const hasConsent = localStorage.getItem("cookieConsent")
    if (!hasConsent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    // Set consent in localStorage
    localStorage.setItem("cookieConsent", "true")
    localStorage.setItem("cookieConsentTimestamp", new Date().toISOString())

    // Grant consent to tracking services
    if (typeof window !== "undefined") {
      // Google Analytics consent
      if ("gtag" in window) {
        // @ts-ignore - gtag is not typed
        window.gtag("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted",
          functionality_storage: "granted",
          personalization_storage: "granted",
          security_storage: "granted",
        })
      }

      // Twitter/X Pixel consent
      if ("twq" in window) {
        // @ts-ignore - twq is not typed
        window.twq("consent", "grant")
      }
    }

    setShowBanner(false)
  }

  const declineCookies = () => {
    // Set minimal consent in localStorage
    localStorage.setItem("cookieConsent", "minimal")
    localStorage.setItem("cookieConsentTimestamp", new Date().toISOString())
    setShowBanner(false)
  }

  if (!showBanner) return null

  const translations = {
    en: {
      title: "Cookie Consent",
      description:
        'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
      acceptButton: "Accept All",
      declineButton: "Essential Only",
      privacyLink: "Privacy Policy",
    },
    de: {
      title: "Cookie-Zustimmung",
      description:
        'Wir verwenden Cookies, um Ihr Surferlebnis zu verbessern, personalisierte Anzeigen oder Inhalte bereitzustellen und unseren Datenverkehr zu analysieren. Durch Klicken auf „Alle akzeptieren" stimmen Sie der Verwendung von Cookies zu.',
      acceptButton: "Alle akzeptieren",
      declineButton: "Nur essenzielle",
      privacyLink: "Datenschutzrichtlinie",
    },
    es: {
      title: "Consentimiento de cookies",
      description:
        'Utilizamos cookies para mejorar su experiencia de navegación, mostrar anuncios o contenido personalizados y analizar nuestro tráfico. Al hacer clic en "Aceptar todo", usted acepta nuestro uso de cookies.',
      acceptButton: "Aceptar todo",
      declineButton: "Solo esenciales",
      privacyLink: "Política de privacidad",
    },
  }

  const content = translations[language as keyof typeof translations]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 border-t border-gray-800 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{content.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{content.description}</p>
            <a
              href="/privacy"
              className="text-xs text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.privacyLink}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
            >
              {content.declineButton}
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition-colors"
            >
              {content.acceptButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
