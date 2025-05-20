"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// Type definitions for better type safety
interface CookieConsents {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
  social: boolean
}

// Type definition for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    twq: any
    fbq: any
    rdt: any
    snaptr: any
    pintrk: any
    ttq: any
  }
}

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consents, setConsents] = useState<CookieConsents>({
    necessary: true, // Always required
    functional: false,
    analytics: false,
    marketing: false,
    social: false,
  })

  // Safe wrapper functions for localStorage
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
    // Check if we're in the browser
    if (typeof window === "undefined") return

    // Check if consent has already been given
    const hasConsent = getLocalStorageItem("cookieConsent") === "true"
    const savedConsents = getLocalStorageItem("cookieConsents")

    if (hasConsent && savedConsents) {
      try {
        setConsents(JSON.parse(savedConsents))
      } catch (e) {
        console.error("Error parsing saved consents:", e)
      }
    } else {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleConsentToggle = (type: keyof CookieConsents) => {
    if (type === "necessary") return // Cannot toggle necessary cookies
    setConsents((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  const saveConsents = () => {
    setLocalStorageItem("cookieConsent", "true")
    setLocalStorageItem("cookieConsents", JSON.stringify(consents))
    setLocalStorageItem("consentTimestamp", new Date().toISOString())
    setShowBanner(false)
    applyConsents()
  }

  const acceptAllCookies = () => {
    const allConsents: CookieConsents = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      social: true,
    }
    setConsents(allConsents)
    setLocalStorageItem("cookieConsent", "true")
    setLocalStorageItem("cookieConsents", JSON.stringify(allConsents))
    setLocalStorageItem("consentTimestamp", new Date().toISOString())
    setShowBanner(false)
    applyConsents(allConsents)
  }

  const rejectNonEssentialCookies = () => {
    const minimalConsents: CookieConsents = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      social: false,
    }
    setConsents(minimalConsents)
    setLocalStorageItem("cookieConsent", "minimal")
    setLocalStorageItem("cookieConsents", JSON.stringify(minimalConsents))
    setLocalStorageItem("consentTimestamp", new Date().toISOString())
    setShowBanner(false)
    applyConsents(minimalConsents)
  }

  const applyConsents = (appliedConsents = consents) => {
    // Google Analytics / GTM Consent
    if (typeof window.dataLayer !== "undefined") {
      window.dataLayer.push({
        event: "consent_update",
        consent_status: appliedConsents.analytics ? "granted" : "denied",
        analytics_consent: appliedConsents.analytics ? "granted" : "denied",
        marketing_consent: appliedConsents.marketing ? "granted" : "denied",
        social_consent: appliedConsents.social ? "granted" : "denied",
        functional_consent: appliedConsents.functional ? "granted" : "denied",
        consent_timestamp: new Date().toISOString(),
      })
    }

    // Google Ads Consent
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: appliedConsents.marketing ? "granted" : "denied",
        analytics_storage: appliedConsents.analytics ? "granted" : "denied",
        functionality_storage: appliedConsents.functional ? "granted" : "denied",
        personalization_storage: appliedConsents.marketing ? "granted" : "denied",
        security_storage: "granted", // Always granted for security
      })
    }

    // Facebook Pixel Consent
    if (typeof window.fbq === "function") {
      if (appliedConsents.social || appliedConsents.marketing) {
        window.fbq("consent", "grant")
      } else {
        window.fbq("consent", "revoke")
      }
    }

    // Twitter/X Pixel Consent
    if (typeof window.twq === "function") {
      if (appliedConsents.social || appliedConsents.marketing) {
        window.twq("consent", "grant")
      } else {
        window.twq("consent", "revoke")
      }
    }

    // Reddit Pixel
    if (typeof window.rdt === "function") {
      if (appliedConsents.social || appliedConsents.marketing) {
        window.rdt("consent", "grant")
      } else {
        window.rdt("consent", "revoke")
      }
    }

    // Snapchat Pixel
    if (typeof window.snaptr === "function") {
      if (appliedConsents.social || appliedConsents.marketing) {
        window.snaptr("consent", "grant")
      } else {
        window.snaptr("consent", "revoke")
      }
    }

    // Pinterest Tag
    if (typeof window.pintrk === "function") {
      if (appliedConsents.social || appliedConsents.marketing) {
        window.pintrk("consent", "grant")
      } else {
        window.pintrk("consent", "revoke")
      }
    }

    // TikTok Pixel
    if (typeof window.ttq === "function") {
      if (appliedConsents.social || appliedConsents.marketing) {
        window.ttq("consent", "grant")
      } else {
        window.ttq("consent", "revoke")
      }
    }

    console.log("Consent preferences applied:", appliedConsents)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 border-t border-gray-800 shadow-lg">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-white">Cookie Consent</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
          >
            {showDetails ? (
              <>
                Hide details <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show details <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        </div>

        <p className="text-sm text-gray-300 mb-4">
          We use cookies and similar technologies to enhance your browsing experience, personalize content and ads,
          analyze our traffic, and better understand where our visitors are coming from. By clicking "Accept All", you
          consent to our use of cookies and similar technologies as described in our Cookie Policy.
        </p>

        {showDetails && (
          <div className="mb-4 bg-gray-800 rounded-lg p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Necessary Cookies</h4>
                  <p className="text-xs text-gray-400">
                    These cookies are essential for the website to function properly.
                  </p>
                </div>
                <Switch checked={consents.necessary} disabled className="data-[state=checked]:bg-primary" />
              </div>

              <Separator className="bg-gray-700" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Functional Cookies</h4>
                  <p className="text-xs text-gray-400">These cookies enable personalized features and functionality.</p>
                </div>
                <Switch
                  checked={consents.functional}
                  onCheckedChange={() => handleConsentToggle("functional")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <Separator className="bg-gray-700" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Analytics Cookies</h4>
                  <p className="text-xs text-gray-400">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                </div>
                <Switch
                  checked={consents.analytics}
                  onCheckedChange={() => handleConsentToggle("analytics")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <Separator className="bg-gray-700" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Marketing Cookies</h4>
                  <p className="text-xs text-gray-400">
                    These cookies are used to deliver advertisements more relevant to you and your interests.
                  </p>
                </div>
                <Switch
                  checked={consents.marketing}
                  onCheckedChange={() => handleConsentToggle("marketing")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <Separator className="bg-gray-700" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Social Media Cookies</h4>
                  <p className="text-xs text-gray-400">
                    These cookies enable social sharing and integration with social platforms.
                  </p>
                </div>
                <Switch
                  checked={consents.social}
                  onCheckedChange={() => handleConsentToggle("social")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="flex items-center">
            <a
              href="/privacy"
              className="text-xs text-primary hover:underline mr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="/cookies"
              className="text-xs text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie Policy
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={rejectNonEssentialCookies}
              className="text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
            >
              Reject All
            </Button>
            {showDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={saveConsents}
                className="text-primary border-primary hover:bg-primary/10"
              >
                Save Preferences
              </Button>
            )}
            <Button size="sm" onClick={acceptAllCookies} className="bg-primary hover:bg-primary/90 text-white">
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
