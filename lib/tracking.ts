// Enhanced tracking library with comprehensive Google Analytics integration
interface CookieConsents {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  social: boolean
  functional: boolean
}

interface TrackingEvent {
  event: string
  category?: string
  action?: string
  label?: string
  value?: number
  currency?: string
  transaction_id?: string
  user_id?: string
  [key: string]: any
}

// Google Ads Conversion IDs - REPLACE WITH YOUR ACTUAL IDs
const GOOGLE_ADS_CONFIG = {
  ACCOUNT_ID: "AW-11335521273", // Hauptkonto-ID
  CONVERSIONS: {
    WAITLIST_SIGNUP: "Rl-yCJXS9OQYEPnLtdsp", // Waitlist Anmeldung
    PAGE_VIEW: "eBVJCLnS9OQYEPnLtdsp", // Seitenaufruf
    BUTTON_CLICK: "Rl-yCJXS9OQYEPnLtdsp", // Button-Klick
    SCROLL_DEPTH: "eBVJCLnS9OQYEPnLtdsp", // Scroll-Tiefe
    FORM_SUBMIT: "Rl-yCJXS9OQYEPnLtdsp", // Formular-Absendung
  },
}

interface ConversionData {
  conversion_id?: string // Optional, falls nicht angegeben wird ACCOUNT_ID verwendet
  conversion_label: string
  value?: number
  currency?: string
  transaction_id?: string
  user_data?: {
    email?: string
    phone?: string
    address?: {
      first_name?: string
      last_name?: string
      street?: string
      city?: string
      region?: string
      postal_code?: string
      country?: string
    }
  }
}

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

// Enhanced consent checking
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

export function hasSocialMediaConsent(): boolean {
  if (typeof window === "undefined") return false

  try {
    const consentsString = getLocalStorageItem("cookieConsents")
    if (!consentsString) return false

    const consents = JSON.parse(consentsString) as CookieConsents
    return consents.social === true
  } catch (error) {
    console.error("Error checking social media consent:", error)
    return false
  }
}

// Enhanced Google Analytics Event Tracking
export function trackEvent(eventData: TrackingEvent): void {
  if (typeof window === "undefined") return

  if (!hasAnalyticsConsent()) {
    console.log("Event not tracked (no analytics consent):", eventData)
    return
  }

  if (typeof window.gtag !== "function") {
    console.error("Google Analytics not loaded, can't track event:", eventData)
    return
  }

  try {
    // Enhanced event tracking with more parameters
    window.gtag("event", eventData.event, {
      event_category: eventData.category || "general",
      event_action: eventData.action || eventData.event,
      event_label: eventData.label,
      value: eventData.value,
      currency: eventData.currency || "USD",
      transaction_id: eventData.transaction_id,
      user_id: eventData.user_id,
      custom_parameter_1: eventData.custom_parameter_1,
      custom_parameter_2: eventData.custom_parameter_2,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      ...eventData,
    })

    // Also send to dataLayer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "custom_event",
        event_name: eventData.event,
        event_category: eventData.category,
        event_action: eventData.action,
        event_label: eventData.label,
        event_value: eventData.value,
        ...eventData,
      })
    }

    console.log("Event tracked successfully:", eventData)
  } catch (error) {
    console.error("Error tracking event:", error)
  }
}

// Enhanced Google Ads Conversion Tracking
export function trackGoogleAdsConversion(conversionData: ConversionData): void {
  if (typeof window === "undefined") return

  if (!hasMarketingConsent()) {
    console.log("Google Ads conversion not tracked (no marketing consent):", conversionData)
    return
  }

  if (typeof window.gtag !== "function") {
    console.error("Google Analytics not loaded, can't track conversion:", conversionData)
    return
  }

  try {
    // Verwende die Konto-ID aus der Konfiguration, falls keine spezifische ID angegeben wurde
    const conversion_id = conversionData.conversion_id || GOOGLE_ADS_CONFIG.ACCOUNT_ID

    // Enhanced conversion tracking with user data
    window.gtag("event", "conversion", {
      send_to: `${conversion_id}/${conversionData.conversion_label}`,
      value: conversionData.value || 0,
      currency: conversionData.currency || "USD",
      transaction_id: conversionData.transaction_id || `trans_${Date.now()}`,
      user_data: conversionData.user_data,
    })

    console.log("Google Ads conversion tracked successfully:", {
      send_to: `${conversion_id}/${conversionData.conversion_label}`,
      value: conversionData.value || 0,
    })
  } catch (error) {
    console.error("Error tracking Google Ads conversion:", error)
  }
}

// Waitlist Conversion Tracking
export function trackWaitlistSignup(email: string, source?: string): void {
  // Track as Google Analytics event
  trackEvent({
    event: "waitlist_signup",
    category: "conversion",
    action: "signup",
    label: source || "website",
    value: 1,
    user_id: email,
  })

  // Track as Google Ads conversion
  trackGoogleAdsConversion({
    conversion_label: GOOGLE_ADS_CONFIG.CONVERSIONS.WAITLIST_SIGNUP,
    value: 1,
    currency: "USD",
    transaction_id: `waitlist_${Date.now()}`,
    user_data: {
      email: email,
    },
  })

  // Track Facebook conversion
  if (hasMarketingConsent() && typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: "Waitlist Signup",
      content_category: "conversion",
      value: 1,
      currency: "USD",
    })
  }

  // Track Twitter conversion
  if (hasMarketingConsent() && typeof window.twq === "function") {
    window.twq("track", "Signup", {
      value: 1,
      currency: "USD",
    })
  }
}

// Track button click as conversion
export function trackButtonClick(buttonId: string, buttonText: string): void {
  // Track as Google Analytics event
  trackEvent({
    event: "button_click",
    category: "engagement",
    action: "click",
    label: buttonId || buttonText,
    value: 1,
  })

  // Track as Google Ads conversion for important buttons
  if (buttonId.includes("waitlist") || buttonId.includes("signup") || buttonId.includes("join")) {
    trackGoogleAdsConversion({
      conversion_label: GOOGLE_ADS_CONFIG.CONVERSIONS.BUTTON_CLICK,
      value: 0.5, // Geringerer Wert als vollständige Conversion
    })
  }
}

// Track form submission
export function trackFormSubmission(formId: string, formData?: any): void {
  // Track as Google Analytics event
  trackEvent({
    event: "form_submit",
    category: "conversion",
    action: "submit",
    label: formId,
    value: 1,
    form_data: formData ? JSON.stringify(formData) : undefined,
  })

  // Track as Google Ads conversion
  trackGoogleAdsConversion({
    conversion_label: GOOGLE_ADS_CONFIG.CONVERSIONS.FORM_SUBMIT,
    value: 1,
  })
}

// Page View Tracking with Enhanced Data
export function trackPageView(pagePath?: string, pageTitle?: string): void {
  if (typeof window === "undefined") return

  if (!hasAnalyticsConsent()) {
    console.log("Page view not tracked (no analytics consent)")
    return
  }

  if (typeof window.gtag !== "function") {
    console.error("Google Analytics not loaded, can't track page view")
    return
  }

  try {
    const path = pagePath || window.location.pathname
    const title = pageTitle || document.title

    window.gtag("config", process.env.NEXT_PUBLIC_GTM_ID || "", {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
    })

    // Enhanced page view with custom dimensions
    window.gtag("event", "page_view", {
      page_title: title,
      page_location: window.location.href,
      page_path: path,
      content_group1: getContentGroup(path),
      content_group2: getTrafficSource(),
    })

    // Track important page views as conversions
    if (path.includes("/thanks") || path.includes("/landing/ads/thanks")) {
      trackGoogleAdsConversion({
        conversion_label: GOOGLE_ADS_CONFIG.CONVERSIONS.PAGE_VIEW,
        value: 1,
      })
    }

    console.log("Page view tracked:", { path, title })
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

// Helper function to determine content group
function getContentGroup(path: string): string {
  if (path.includes("/blog")) return "Blog"
  if (path.includes("/landing")) return "Landing Page"
  if (path.includes("/legal")) return "Legal"
  if (path === "/") return "Homepage"
  return "Other"
}

// Helper function to get traffic source
function getTrafficSource(): string {
  const referrer = document.referrer
  if (referrer.includes("google")) return "Google"
  if (referrer.includes("facebook")) return "Facebook"
  if (referrer.includes("twitter")) return "Twitter"
  if (referrer === "") return "Direct"
  return "Other"
}

// Initialize enhanced tracking
export function initEnhancedTracking(): void {
  if (typeof window === "undefined") return

  // Set up enhanced ecommerce
  if (typeof window.gtag === "function") {
    window.gtag("config", process.env.NEXT_PUBLIC_GTM_ID || "", {
      custom_map: {
        custom_parameter_1: "traffic_source",
        custom_parameter_2: "user_type",
      },
    })
  }

  // Track scroll depth
  const scrollDepths = [25, 50, 75, 90, 100]
  const trackedDepths = new Set()

  window.addEventListener("scroll", () => {
    if (!hasAnalyticsConsent()) return

    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
    )

    scrollDepths.forEach((depth) => {
      if (scrollPercent >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth)
        trackEvent({
          event: "scroll_depth",
          category: "engagement",
          action: "scroll",
          label: `${depth}%`,
          value: depth,
          non_interaction: true,
        })

        // Track deep scrolls as conversions
        if (depth >= 75) {
          trackGoogleAdsConversion({
            conversion_label: GOOGLE_ADS_CONFIG.CONVERSIONS.SCROLL_DEPTH,
            value: 0.5, // Geringerer Wert als vollständige Conversion
          })
        }
      }
    })
  })

  // Track time on page
  const timeIntervals = [30, 60, 120, 300] // seconds
  timeIntervals.forEach((interval) => {
    setTimeout(() => {
      if (hasAnalyticsConsent()) {
        trackEvent({
          event: "time_on_page",
          category: "engagement",
          action: "time",
          label: `${interval}s`,
          value: interval,
          non_interaction: true,
        })
      }
    }, interval * 1000)
  })

  console.log("Enhanced tracking initialized with Google Ads Conversion IDs")
}

// Extend window interface
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    twq: any
    fbq: any
    trackEvent: typeof trackEvent
    trackWaitlistSignup: typeof trackWaitlistSignup
    trackPageView: typeof trackPageView
    trackButtonClick: typeof trackButtonClick
    trackFormSubmission: typeof trackFormSubmission
  }
}

// Make functions globally available
if (typeof window !== "undefined") {
  window.trackEvent = trackEvent
  window.trackWaitlistSignup = trackWaitlistSignup
  window.trackPageView = trackPageView
  window.trackButtonClick = trackButtonClick
  window.trackFormSubmission = trackFormSubmission
}
