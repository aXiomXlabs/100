// Typdefinitionen
interface ConversionEvent {
  action: string
  category?: string
  label?: string
  value?: number
  currency?: string
  transactionId?: string
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

// Prüft, ob Marketing-Consent gegeben wurde
export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false

  try {
    const consentsString = getLocalStorageItem("cookieConsent")
    return consentsString === "true"
  } catch (error) {
    console.error("Error checking marketing consent:", error)
    return false
  }
}

// Sendet ein Conversion-Event an alle konfigurierten Tracking-Systeme
export function trackConversion(event: ConversionEvent): void {
  if (typeof window === "undefined") return

  // Prüfe, ob Marketing-Consent gegeben wurde
  if (!hasMarketingConsent()) {
    console.log("Conversion not tracked (no consent):", event)
    return
  }

  try {
    // Google Analytics / GTM Tracking
    if (typeof window.dataLayer !== "undefined") {
      window.dataLayer.push({
        event: "conversion",
        conversionAction: event.action,
        conversionCategory: event.category || "conversion",
        conversionLabel: event.label || event.action,
        conversionValue: event.value || 0,
        ...event,
      })
      console.log("GTM conversion tracked:", event)
    }

    // Google Ads Conversion Tracking
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // HIER DEINE ECHTEN WERTE EINSETZEN!
        value: event.value || 0,
        currency: event.currency || "EUR",
        transaction_id: event.transactionId,
      })
      console.log("Google Ads conversion tracked:", event)
    }

    // Facebook Pixel Tracking
    if (typeof window.fbq === "function") {
      window.fbq("track", event.action, {
        content_name: event.label,
        content_category: event.category,
        value: event.value || 0,
        currency: event.currency || "EUR",
        ...event,
      })
      console.log("Facebook Pixel conversion tracked:", event)
    }

    // Twitter/X Pixel Tracking
    if (typeof window.twq === "function") {
      window.twq("track", event.action, {
        value: event.value || 0,
        currency: event.currency || "EUR",
        ...event,
      })
      console.log("Twitter conversion tracked:", event)
    }
  } catch (error) {
    console.error("Error tracking conversion:", error)
  }
}

// Erweitere die Window-Schnittstelle
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    twq: any
    fbq: any
  }
}
