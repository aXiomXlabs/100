import { hasAnalyticsConsent } from "./tracking"

// Typdefinitionen für bessere Typensicherheit
interface ConversionEvent {
  action: string
  category?: string
  label?: string
  value?: number
  currency?: string
  transactionId?: string
  page?: string
  email_domain?: string
  [key: string]: any // Für zusätzliche benutzerdefinierte Parameter
}

// Konversions-Tracking für Waitlist-Anmeldungen
export function trackWaitlistConversion(email: string, source?: string): void {
  if (typeof window === "undefined") return

  // Prüfe, ob Analytics-Consent gegeben wurde
  if (!hasAnalyticsConsent()) {
    console.log("Waitlist conversion not tracked (no consent)")
    return
  }

  // Prüfe, ob gtag verfügbar ist
  if (typeof window.gtag !== "function") {
    console.error("Google Analytics not loaded, can't track waitlist conversion")
    return
  }

  // Sende Konversion an Google Analytics
  try {
    window.gtag("event", "waitlist_signup", {
      event_category: "Conversion",
      event_label: source || "Website",
      email_domain: email.split("@")[1], // Nur die Domain für Datenschutz
      source: source || "Website",
    })

    console.log("Waitlist conversion tracked successfully")
  } catch (error) {
    console.error("Error tracking waitlist conversion:", error)
  }
}

// Konversions-Tracking für Seitenaufrufe
export function trackPageView(path: string): void {
  if (typeof window === "undefined") return

  // Prüfe, ob Analytics-Consent gegeben wurde
  if (!hasAnalyticsConsent()) {
    console.log("Page view not tracked (no consent):", path)
    return
  }

  // Prüfe, ob gtag verfügbar ist
  if (typeof window.gtag !== "function") {
    console.error("Google Analytics not loaded, can't track page view:", path)
    return
  }

  // Sende Seitenaufruf an Google Analytics
  try {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: document.title,
    })

    console.log("Page view tracked successfully:", path)
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

/**
 * Verfolgt ein Conversion-Event über verschiedene Tracking-Systeme
 * @param event Das zu verfolgende Conversion-Event
 */
export function trackConversion(event: ConversionEvent): void {
  if (typeof window === "undefined") return

  // Prüfe, ob Analytics-Consent gegeben wurde
  if (!hasAnalyticsConsent()) {
    console.log("Conversion not tracked (no analytics consent):", event)
    return
  }

  try {
    // Google Analytics / GTM Tracking
    if (typeof window.gtag === "function") {
      window.gtag("event", event.action, {
        event_category: event.category || "conversion",
        event_label: event.label || event.action,
        value: event.value || 0,
        currency: event.currency || "EUR",
        transaction_id: event.transactionId,
        page_location: event.page || (typeof window !== "undefined" ? window.location.href : ""),
        ...Object.fromEntries(
          Object.entries(event).filter(
            ([key]) => !["action", "category", "label", "value", "currency", "transactionId", "page"].includes(key),
          ),
        ),
      })

      console.log(`[Tracking] Google Analytics event tracked: ${event.action}`)
    }
  } catch (error) {
    console.error("[Tracking] Error tracking conversion:", error)
  }
}
