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
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error("Error accessing localStorage:", error)
    return null
  }
}

// Prüft, ob Analytics-Consent gegeben wurde
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false

  try {
    const consentsString = getLocalStorageItem("rr_consent")
    if (!consentsString) return false

    const consents = JSON.parse(consentsString) as { stat: boolean }
    return consents.stat === true
  } catch (error) {
    console.error("Error checking analytics consent:", error)
    return false
  }
}

// Prüft, ob Marketing-Consent gegeben wurde
export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false

  try {
    const consentsString = getLocalStorageItem("rr_consent")
    if (!consentsString) return false

    const consents = JSON.parse(consentsString) as { marketing: boolean }
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

  // Sende Conversion an Twitter/X Pixel
  try {
    // Sicherer Weg, Twitter-Tracking zu implementieren
    if (typeof window.twq === "function") {
      window.twq("track", eventName, params || {})
      console.log("Twitter conversion tracked successfully:", eventName)
    } else {
      console.log("Twitter Pixel not available, event queued for later:", eventName)
      // Speichere das Event für später, wenn Twitter Pixel geladen wird
      window._twqQueue = window._twqQueue || []
      window._twqQueue.push(["track", eventName, params || {}])
    }
  } catch (error) {
    console.error("Error tracking Twitter conversion:", error)
  }
}

// Sendet ein Conversion-Event an Facebook Pixel, wenn Consent gegeben wurde
export function trackFacebookConversion(eventName: string, params?: Record<string, any>): void {
  if (typeof window === "undefined") return

  // Prüfe, ob Marketing-Consent gegeben wurde
  if (!hasMarketingConsent()) {
    console.log("Facebook conversion not tracked (no consent):", eventName)
    return
  }

  // Sende Conversion an Facebook Pixel
  try {
    // Sicherer Weg, Facebook-Tracking zu implementieren
    if (typeof window.fbq === "function") {
      window.fbq("track", eventName, params || {})
      console.log("Facebook conversion tracked successfully:", eventName)
    } else {
      console.log("Facebook Pixel not available, event queued for later:", eventName)
      // Speichere das Event für später, wenn Facebook Pixel geladen wird
      window._fbqQueue = window._fbqQueue || []
      window._fbqQueue.push(["track", eventName, params || {}])
    }
  } catch (error) {
    console.error("Error tracking Facebook conversion:", error)
  }
}

// Trackt die Scroll-Tiefe
export function trackScrollDepth(): void {
  if (typeof window === "undefined") return
  if (!hasAnalyticsConsent()) return

  const scrollMarks = [25, 50, 75, 90, 100]
  const marks = new Set()

  const calculateScrollPercentage = (): number => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY
    return Math.floor((scrollTop / (documentHeight - windowHeight)) * 100)
  }

  const handleScroll = (): void => {
    const scrollPercentage = calculateScrollPercentage()

    for (const mark of scrollMarks) {
      if (scrollPercentage >= mark && !marks.has(mark)) {
        marks.add(mark)
        trackEvent({
          event: "scroll_depth",
          category: "Engagement",
          action: "Scroll",
          label: `Scrolled ${mark}%`,
          value: mark,
          non_interaction: true,
        })
      }
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })
}

// Initialisiert die Tracking-Funktionen
export function initTracking(): void {
  if (typeof window === "undefined") return

  // Definiere globale Tracking-Funktionen
  window.trackEvent = trackEvent
  window.trackTwitterConversion = trackTwitterConversion
  window.trackFacebookConversion = trackFacebookConversion

  // Initialisiere Scroll-Tracking
  trackScrollDepth()

  console.log("Tracking functions initialized")
}

// Erweitere die Window-Schnittstelle
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    twq: any
    fbq: any
    _twqQueue: any[]
    _fbqQueue: any[]
    trackEvent: typeof trackEvent
    trackTwitterConversion: typeof trackTwitterConversion
    trackFacebookConversion: typeof trackFacebookConversion
  }
}
