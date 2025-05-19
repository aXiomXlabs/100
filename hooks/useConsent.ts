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
    if (!hasInteracted) return // Don't load scripts if user hasn't interacted yet

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
    const gaScript = document.getElementById("ga-script")
    if (gaScript) {
      gaScript.remove()
    }
    delete window.gtag
    delete window.dataLayer
  }, [])

  // Load Twitter Pixel
  const loadTwitterPixel = useCallback(() => {
    if (document.getElementById("twitter-pixel")) return

    // Twitter Pixel Script
    !((e, t, n, s, u, a) => {
      e.twq ||
        ((s = e.twq =
          (...args: any[]) => {
            s.exe ? s.exe.apply(s, args) : s.queue.push(args)
          }),
        (s.version = "1.1"),
        (s.queue = []),
        (u = t.createElement(n)),
        (u.async = !0),
        (u.src = "https://static.ads-twitter.com/uwt.js"),
        (u.id = "twitter-pixel"),
        (a = t.getElementsByTagName(n)[0]),
        a.parentNode?.insertBefore(u, a))
    })(window, document, "script")
    window.twq("init", "pork0")
  }, [])

  // Remove Twitter Pixel
  const removeTwitterPixel = useCallback(() => {
    const twitterScript = document.getElementById("twitter-pixel")
    if (twitterScript) {
      twitterScript.remove()
    }
    delete window.twq
  }, [])

  // Load Facebook Pixel
  const loadFacebookPixel = useCallback(() => {
    if (document.getElementById("fb-pixel")) return

    const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID
    if (!fbPixelId) return

    // Facebook Pixel Script
    !((f, b, e, v, n, t, s) => {
      if (f.fbq) return
      n = f.fbq = (...args: any[]) => {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = "2.0"
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      t.id = "fb-pixel"
      s = b.getElementsByTagName(e)[0]
      s.parentNode?.insertBefore(t, s)
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js")

    window.fbq("init", fbPixelId)
  }, [])

  // Remove Facebook Pixel
  const removeFacebookPixel = useCallback(() => {
    const fbScript = document.getElementById("fb-pixel")
    if (fbScript) {
      fbScript.remove()
    }
    delete window.fbq
  }, [])

  // Update consent
  const updateConsent = useCallback((newConsent: Partial<ConsentState>) => {
    setConsent((prev) => {
      const updated = { ...prev, ...newConsent }

      // Save to localStorage
      localStorage.setItem(
        "rr_consent",
        JSON.stringify({
          stat: updated.statistics,
          marketing: updated.marketing,
        }),
      )

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
    twq: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}
