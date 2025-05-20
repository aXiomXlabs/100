"use client"

import { useState, useEffect } from "react"

export type ConsentCategories = {
  essential: boolean
  statistics: boolean
  marketing: boolean
}

const CONSENT_STORAGE_KEY = "userConsent"
const CONSENT_VERSION = "1.0" // Increment when consent requirements change

export function useConsent() {
  const [consent, setConsent] = useState<ConsentCategories>({
    essential: true, // Always required
    statistics: false,
    marketing: false,
  })

  const [consentShown, setConsentShown] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Load consent from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY)
      if (storedConsent) {
        const { consent: savedConsent, version } = JSON.parse(storedConsent)

        // If consent version has changed, we need to re-ask
        if (version === CONSENT_VERSION) {
          setConsent(savedConsent)
          setConsentShown(true)
        }
      }
    } catch (error) {
      console.error("Error loading consent settings:", error)
    } finally {
      setInitialized(true)
    }
  }, [])

  // Save consent to localStorage whenever it changes
  useEffect(() => {
    if (!initialized || typeof window === "undefined") return

    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          consent,
          version: CONSENT_VERSION,
          timestamp: new Date().toISOString(),
        }),
      )

      // Apply consent to tracking services
      applyConsentToServices(consent)
    } catch (error) {
      console.error("Error saving consent settings:", error)
    }
  }, [consent, initialized])

  // Function to update consent
  const updateConsent = (newConsent: Partial<ConsentCategories>) => {
    setConsent((prev) => ({ ...prev, ...newConsent }))
    setConsentShown(true)
  }

  // Accept all categories
  const acceptAll = () => {
    updateConsent({
      statistics: true,
      marketing: true,
    })
  }

  // Reject all optional categories
  const rejectAll = () => {
    updateConsent({
      statistics: false,
      marketing: false,
    })
  }

  // Apply consent settings to tracking services
  const applyConsentToServices = (currentConsent: ConsentCategories) => {
    if (typeof window === "undefined") return

    // Google Analytics
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: currentConsent.statistics ? "granted" : "denied",
        ad_storage: currentConsent.marketing ? "granted" : "denied",
      })
    }

    // Twitter Pixel
    if (typeof window.twq === "function") {
      if (currentConsent.marketing) {
        window.twq("consent", "grant")
      } else {
        window.twq("consent", "revoke")
      }
    }

    // Facebook Pixel
    if (typeof window.fbq === "function") {
      if (currentConsent.marketing) {
        window.fbq("consent", "grant")
      } else {
        window.fbq("consent", "revoke")
      }
    }

    console.log("Applied consent settings:", currentConsent)
  }

  return {
    consent,
    consentShown,
    updateConsent,
    acceptAll,
    rejectAll,
  }
}

// Add type definitions for global tracking objects
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    twq: (...args: any[]) => void
    fbq: (...args: any[]) => void
    dataLayer: any[]
  }
}
