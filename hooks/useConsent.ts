"use client"

import type React from "react"

import { useState, useEffect, useCallback, createContext, useContext } from "react"

type ConsentState = {
  essential: boolean
  statistics: boolean
  marketing: boolean
}

type ConsentContextType = {
  consent: ConsentState
  isModalOpen: boolean
  hasInteracted: boolean
  updateConsent: (newConsent: Partial<ConsentState>) => void
  openModal: () => void
  closeModal: () => void
  acceptAll: () => void
  essentialOnly: () => void
}

const defaultConsent: ConsentState = {
  essential: true, // Always active
  statistics: false,
  marketing: false,
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

export const ConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(true) // Default true, set to false if no consent found

  // Load consent from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const savedConsent = localStorage.getItem("rr_consent")
      if (savedConsent) {
        const parsedConsent = JSON.parse(savedConsent)
        setConsent({
          essential: true, // Always active
          statistics: !!parsedConsent.stat,
          marketing: !!parsedConsent.marketing,
        })
      } else {
        // No consent found, show banner
        setHasInteracted(false)
      }
    } catch (error) {
      console.error("Error loading consent status:", error)
      setHasInteracted(false)
    }
  }, [])

  // Load tracking scripts based on consent
  useEffect(() => {
    if (typeof window === "undefined" || !hasInteracted) return // Don't load scripts if user hasn't interacted yet

    // Google Analytics
    if (consent.statistics) {
      loadGoogleAnalytics()
    } else {
      removeGoogleAnalytics()
    }

    // Twitter Pixel
    if (consent.marketing) {
      loadTwitterPixel()
    } else {
      removeTwitterPixel()
    }

    // Facebook Pixel
    if (consent.marketing) {
      loadFacebookPixel()
    } else {
      removeFacebookPixel()
    }
  }, [consent, hasInteracted])

  // Load Google Analytics
  const loadGoogleAnalytics = useCallback(() => {
    if (typeof window === "undefined") return
    if (document.getElementById("ga-script")) return

    // GA4 Script
    const gaScript = document.createElement("script")
    gaScript.id = "ga-script"
    gaScript.async = true
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
    document.head.appendChild(gaScript)

    // GA4 Config
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag("js", new Date())
    gtag("config", "G-XXXXXXX", { anonymize_ip: true })

    // Define GA4 globally
    window.gtag = gtag
  }, [])

  // Remove Google Analytics
  const removeGoogleAnalytics = useCallback(() => {
    if (typeof window === "undefined") return

    const gaScript = document.getElementById("ga-script")
    if (gaScript) {
      gaScript.remove()
    }
    if (window.gtag) delete window.gtag
    if (window.dataLayer) delete window.dataLayer
  }, [])

  // Load Twitter Pixel
  const loadTwitterPixel = useCallback(() => {
    if (typeof window === "undefined") return
    if (document.getElementById("twitter-pixel")) return

    // Twitter Pixel Script - Fixed the function to avoid t.josun error
    const script = document.createElement("script")
    script.id = "twitter-pixel"
    script.async = true
    script.src = "https://static.ads-twitter.com/uwt.js"
    document.head.appendChild(script)

    // Initialize Twitter Pixel safely
    if (!window.twq) {
      window.twq = (...args: any[]) => {
        window.twq.exe ? window.twq.exe.apply(window.twq, args) : window.twq.queue.push(args)
      }
      window.twq.version = "1.1"
      window.twq.queue = []
    }

    window.twq("init", "pork0")
  }, [])

  // Remove Twitter Pixel
  const removeTwitterPixel = useCallback(() => {
    if (typeof window === "undefined") return

    const twitterScript = document.getElementById("twitter-pixel")
    if (twitterScript) {
      twitterScript.remove()
    }
    if (window.twq) delete window.twq
  }, [])

  // Load Facebook Pixel
  const loadFacebookPixel = useCallback(() => {
    if (typeof window === "undefined") return
    if (document.getElementById("fb-pixel")) return

    const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID
    if (!fbPixelId) return

    // Facebook Pixel Script - Rewritten to avoid potential errors
    const script = document.createElement("script")
    script.id = "fb-pixel"
    script.async = true
    script.src = "https://connect.facebook.net/en_US/fbevents.js"
    document.head.appendChild(script)

    // Initialize Facebook Pixel safely
    if (!window.fbq) {
      window.fbq = (...args: any[]) => {
        if (window.fbq.callMethod) {
          window.fbq.callMethod.apply(window.fbq, args)
        } else {
          window.fbq.queue.push(args)
        }
      }
      window.fbq.push = window.fbq
      window.fbq.loaded = true
      window.fbq.version = "2.0"
      window.fbq.queue = []
    }

    window.fbq("init", fbPixelId)
  }, [])

  // Remove Facebook Pixel
  const removeFacebookPixel = useCallback(() => {
    if (typeof window === "undefined") return

    const fbScript = document.getElementById("fb-pixel")
    if (fbScript) {
      fbScript.remove()
    }
    if (window.fbq) delete window.fbq
  }, [])

  // Update consent
  const updateConsent = useCallback((newConsent: Partial<ConsentState>) => {
    if (typeof window === "undefined") return

    setConsent((prev) => {
      const updated = { ...prev, ...newConsent }

      // Save to localStorage
      try {
        localStorage.setItem(
          "rr_consent",
          JSON.stringify({
            stat: updated.statistics,
            marketing: updated.marketing,
          }),
        )
      } catch (error) {
        console.error("Error saving consent:", error)
      }

      return updated
    })
    setHasInteracted(true)
  }, [])

  // Accept all cookies
  const acceptAll = useCallback(() => {
    updateConsent({ statistics: true, marketing: true })
    setIsModalOpen(false)
  }, [updateConsent])

  // Accept only essential cookies
  const essentialOnly = useCallback(() => {
    updateConsent({ statistics: false, marketing: false })
    setIsModalOpen(false)
  }, [updateConsent])

  // Open modal
  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const value = {
    consent,
    isModalOpen,
    hasInteracted,
    updateConsent,
    openModal,
    closeModal,
    acceptAll,
    essentialOnly,
  }

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export const useConsent = () => {
  const context = useContext(ConsentContext)
  if (context === undefined) {
    console.warn("useConsent is being used outside of a ConsentProvider. Fallback values will be used.")
    // Return fallback values
    return {
      consent: { essential: true, statistics: false, marketing: false },
      isModalOpen: false,
      hasInteracted: true,
      updateConsent: () => {},
      openModal: () => {},
      closeModal: () => {},
      acceptAll: () => {},
      essentialOnly: () => {},
    }
  }
  return context
}

// Type definitions for global objects
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    twq: (...args: any[]) => void & {
      exe?: (...args: any[]) => void
      queue: any[]
      version: string
    }
    fbq: (...args: any[]) => void & {
      callMethod?: (...args: any[]) => void
      queue: any[]
      loaded: boolean
      version: string
      push: (...args: any[]) => void
    }
    _fbq: any
  }
}
