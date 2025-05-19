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

/**
 * Verfolgt ein Conversion-Event über verschiedene Tracking-Systeme
 * @param event Das zu verfolgende Conversion-Event
 */
export function trackConversion(event: ConversionEvent): void {
  try {
    // Google Analytics / GTM Tracking
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore - gtag ist nicht typisiert
      window.gtag("event", event.action, {
        event_category: event.category || "conversion",
        event_label: event.label || event.action,
        value: event.value || 0,
        currency: event.currency || "EUR",
        transaction_id: event.transactionId,
        page_location: event.page || window.location.href,
        ...Object.fromEntries(
          Object.entries(event).filter(
            ([key]) => !["action", "category", "label", "value", "currency", "transactionId", "page"].includes(key),
          ),
        ),
      })

      console.log(`[Tracking] Google Analytics event tracked: ${event.action}`)
    }

    // Facebook Pixel Tracking
    if (typeof window !== "undefined" && "fbq" in window) {
      // @ts-ignore - fbq ist nicht typisiert
      window.fbq("track", event.action === "waitlist_signup" ? "Lead" : event.action, {
        value: event.value || 0,
        currency: event.currency || "EUR",
        content_name: event.label || event.action,
        status: "complete",
      })

      console.log(`[Tracking] Facebook Pixel event tracked: ${event.action}`)
    }

    // Twitter/X Pixel Tracking
    if (typeof window !== "undefined" && "twq" in window) {
      // @ts-ignore - twq ist nicht typisiert
      window.twq("event", "tw-ooo", {
        currency: event.currency || "EUR",
        value: event.value || 0,
      })

      console.log(`[Tracking] Twitter/X Pixel event tracked: tw-ooo`)
    }

    // Weitere Tracking-Systeme können hier hinzugefügt werden
  } catch (error) {
    console.error("[Tracking] Error tracking conversion:", error)
  }
}

/**
 * Verfolgt einen Seitenaufruf über verschiedene Tracking-Systeme
 * @param path Der Pfad der aufgerufenen Seite
 * @param title Der Titel der aufgerufenen Seite
 */
export function trackPageView(path?: string, title?: string): void {
  try {
    const currentPath = path || (typeof window !== "undefined" ? window.location.pathname : "")
    const pageTitle = title || (typeof document !== "undefined" ? document.title : "")

    // Google Analytics / GTM Tracking
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore - gtag ist nicht typisiert
      window.gtag("event", "page_view", {
        page_path: currentPath,
        page_title: pageTitle,
        page_location: typeof window !== "undefined" ? window.location.href : "",
      })

      console.log(`[Tracking] Page view tracked: ${currentPath}`)
    }

    // Weitere Tracking-Systeme können hier hinzugefügt werden
  } catch (error) {
    console.error("[Tracking] Error tracking page view:", error)
  }
}
