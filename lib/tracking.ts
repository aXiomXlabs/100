// Typdefinitionen
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

  // Initialisiere Scroll-Tracking
  trackScrollDepth()

  console.log("Tracking functions initialized")
}

// Erweitere die Window-Schnittstelle
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    trackEvent: typeof trackEvent
  }
}
