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

// Update the hasMarketingConsent function to check for the new consent structure
export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false

  try {
    const consentsString = getLocalStorageItem("cookieConsents")
    if (!consentsString) return false

    const consents = JSON.parse(consentsString) as { marketing: boolean }
    return consents.marketing === true
  } catch (error) {
    console.error("Error checking marketing consent:", error)
    return false
  }
}

// Add a new function to check for social media consent
export function hasSocialMediaConsent(): boolean {
  if (typeof window === "undefined") return false

  try {
    const consentsString = getLocalStorageItem("cookieConsents")
    if (!consentsString) return false

    const consents = JSON.parse(consentsString) as { social: boolean }
    return consents.social === true
  } catch (error) {
    console.error("Error checking social media consent:", error)
    return false
  }
}

// Update the trackConversion function to check for both marketing and social consent
export function trackConversion(event: ConversionEvent): void {
  if (typeof window === "undefined") return

  // Check if Marketing or Social Media consent has been given
  const marketingConsent = hasMarketingConsent()
  const socialConsent = hasSocialMediaConsent()

  if (!marketingConsent && !socialConsent) {
    console.log("Conversion not tracked (no consent):", event)
    return
  }

  try {
    // Google Analytics / GTM Tracking (requires marketing consent)
    if (marketingConsent && typeof window.dataLayer !== "undefined") {
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

    // Google Ads Conversion Tracking (requires marketing consent)
    if (marketingConsent && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // HIER DEINE ECHTEN WERTE EINSETZEN!
        value: event.value || 0,
        currency: event.currency || "EUR",
        transaction_id: event.transactionId,
      })
      console.log("Google Ads conversion tracked:", event)
    }

    // Facebook Pixel Tracking (requires social or marketing consent)
    if ((socialConsent || marketingConsent) && typeof window.fbq === "function") {
      window.fbq("track", event.action, {
        content_name: event.label,
        content_category: event.category,
        value: event.value || 0,
        currency: event.currency || "EUR",
        ...event,
      })
      console.log("Facebook Pixel conversion tracked:", event)
    }

    // Twitter/X Pixel Tracking (requires social or marketing consent)
    if ((socialConsent || marketingConsent) && typeof window.twq === "function") {
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
