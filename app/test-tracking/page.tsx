"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestTrackingPage() {
  const [consentStatus, setConsentStatus] = useState<any>(null)
  const [dataLayerEvents, setDataLayerEvents] = useState<any[]>([])

  useEffect(() => {
    // Consent-Status aus localStorage abrufen
    try {
      const hasConsent = localStorage.getItem("cookieConsent") === "true"
      const consentsString = localStorage.getItem("cookieConsents")

      if (consentsString) {
        setConsentStatus({
          hasConsent,
          consents: JSON.parse(consentsString),
        })
      } else {
        setConsentStatus({
          hasConsent,
          consents: null,
        })
      }
    } catch (e) {
      console.error("Error checking consent:", e)
    }

    // dataLayer-Events überwachen
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      const originalPush = window.dataLayer.push

      window.dataLayer.push = function (...args: any[]) {
        setDataLayerEvents((prev) => [...prev, ...args])
        return originalPush.apply(this, args)
      }
    }
  }, [])

  const sendTestEvent = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "test_event", {
        event_category: "Testing",
        event_label: "Test Event",
        value: 1,
      })

      alert("Test-Event gesendet! Überprüfe die Google Analytics-Echtzeit-Ansicht.")
    } else {
      alert("gtag ist nicht verfügbar. Überprüfe die Google Tag Manager-Integration.")
    }
  }

  const grantConsent = () => {
    if (typeof window !== "undefined") {
      // Consent in localStorage speichern
      localStorage.setItem("cookieConsent", "true")
      localStorage.setItem(
        "cookieConsents",
        JSON.stringify({
          necessary: true,
          functional: true,
          analytics: true,
          marketing: true,
          social: true,
        }),
      )

      // Consent an GTM übermitteln
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
          functionality_storage: "granted",
          personalization_storage: "granted",
          security_storage: "granted",
        })
      }

      // Seite neu laden, um die Änderungen zu übernehmen
      window.location.reload()
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Google Analytics Tracking-Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Consent-Status</CardTitle>
          </CardHeader>
          <CardContent>
            {consentStatus ? (
              <div>
                <p>
                  <strong>Cookie-Consent erteilt:</strong> {consentStatus.hasConsent ? "Ja" : "Nein"}
                </p>
                {consentStatus.consents && (
                  <div className="mt-4">
                    <p>
                      <strong>Detaillierte Einstellungen:</strong>
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Notwendig: {consentStatus.consents.necessary ? "Erlaubt" : "Abgelehnt"}</li>
                      <li>Funktional: {consentStatus.consents.functional ? "Erlaubt" : "Abgelehnt"}</li>
                      <li>Analytisch: {consentStatus.consents.analytics ? "Erlaubt" : "Abgelehnt"}</li>
                      <li>Marketing: {consentStatus.consents.marketing ? "Erlaubt" : "Abgelehnt"}</li>
                      <li>Social Media: {consentStatus.consents.social ? "Erlaubt" : "Abgelehnt"}</li>
                    </ul>
                  </div>
                )}

                <Button onClick={grantConsent} className="mt-4">
                  Alle Cookies erlauben
                </Button>
              </div>
            ) : (
              <p>Consent-Status wird geladen...</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test-Event senden</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Klicke auf den Button, um ein Test-Event an Google Analytics zu senden. Überprüfe dann die
              Echtzeit-Ansicht in Google Analytics, um zu sehen, ob das Event angekommen ist.
            </p>
            <Button onClick={sendTestEvent}>Test-Event senden</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>DataLayer-Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            {dataLayerEvents.length > 0 ? (
              dataLayerEvents.map((event, index) => (
                <pre key={index} className="bg-gray-100 p-3 rounded mb-2 text-xs">
                  {JSON.stringify(event, null, 2)}
                </pre>
              ))
            ) : (
              <p>Keine dataLayer-Events gefunden.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
