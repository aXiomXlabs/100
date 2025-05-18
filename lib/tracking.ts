// Typdefinitionen
interface CookieConsents {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface TrackingEvent {
  event: string
  category?: string
  action?: string
  label?: string
  value?: number
  [key: string]: any
}

// Sichere Wrapper-Funktionen für localStorage
const getLocalStorageItem = (key: string): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem(key)
}

// Prüft, ob Analytics-Consent gegeben wurde
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false

  try {
    const consentsString = getLocalStorageItem("cookieConsents")
    if (!consentsString) return false

    const consents = JSON.parse(consentsString) as CookieConsents
    return consents.analytics === true
  } catch (error) {
    console.error("Error checking analytics consent:", error)
    return false
  }
}

// Prüft, ob Marketing-Consent gegeben wurde
export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false

  try {
    const consentsString = getLocalStorageItem("cookieConsents")
    if (!consentsString) return false

    const consents = JSON.parse(consentsString) as CookieConsents
    return consents.marketing === true
  } catch (error) {
    console.error("Error checking marketing consent:", error)
    return false
  }
}

// Sendet ein Event an Google Analytics, wenn Consent gegeben wurde
export function trackEvent(eventData: TrackingEvent): void {
  if (typeof window === "undefined") return

  // Prüfe, ob Analytics-Consent gegeben wurde
  if (!hasAnalyticsConsent()) {
    console.log("Event not tracked (no consent):", eventData)
    return
  }

  // Prüfe, ob gtag verfügbar ist
  if (typeof window.gtag !== "function") {
    console.error("Google Analytics not loaded, can't track event:", eventData)
    return
  }

  // Sende Event an Google Analytics
  try {
    window.gtag("event", eventData.event, {
      event_category: eventData.category,
      event_action: eventData.action,
      event_label: eventData.label,
      value: eventData.value,
      ...eventData,
    })

    console.log("Event tracked successfully:", eventData)
  } catch (error) {
    console.error("Error tracking event:", error)
  }
}

// Sendet ein Conversion-Event an Twitter/X Pixel, wenn Consent gegeben wurde
export function trackTwitterConversion(eventName: string, params?: Record<string, any>): void {
  if (typeof window === "undefined") return

  // Prüfe, ob Marketing-Consent gegeben wurde
  if (!hasMarketingConsent()) {
    console.log("Twitter conversion not tracked (no consent):", eventName)
    return
  }

  // Prüfe, ob twq verfügbar ist
  if (typeof window.twq !== "function") {
    console.error("Twitter Pixel not loaded, can't track conversion:", eventName)
    return
  }

  // Sende Conversion an Twitter/X Pixel
  try {
    window.twq("track", eventName, params)
    console.log("Twitter conversion tracked successfully:", eventName)
  } catch (error) {
    console.error("Error tracking Twitter conversion:", error)
  }
}

// Initialisiert die Tracking-Funktionen
export function initTracking(): void {
  if (typeof window === "undefined") return

  // Definiere globale Tracking-Funktionen
  window.trackEvent = trackEvent
  window.trackTwitterConversion = trackTwitterConversion

  console.log("Tracking functions initialized")
}

// Erweitere die Window-Schnittstelle
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    twq: any
    trackEvent: typeof trackEvent
    trackTwitterConversion: typeof trackTwitterConversion
  }
}
