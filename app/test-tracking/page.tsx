"use client"

import { useState, useEffect } from "react"

export default function TestTrackingPage() {
  const [consentStatus, setConsentStatus] = useState<string>("Checking...")
  const [analyticsStatus, setAnalyticsStatus] = useState<string>("Checking...")
  const [marketingStatus, setMarketingStatus] = useState<string>("Checking...")
  const [gaLoaded, setGaLoaded] = useState<boolean>(false)
  const [twitterLoaded, setTwitterLoaded] = useState<boolean>(false)

  useEffect(() => {
    // Alle localStorage-Zugriffe in useEffect verschieben, um sicherzustellen,
    // dass der Code nur auf dem Client ausgeführt wird

    // Prüfe Consent-Status
    const hasConsent = localStorage.getItem("cookieConsent") === "true"
    setConsentStatus(hasConsent ? "Gegeben" : "Nicht gegeben")

    // Prüfe Analytics-Status
    try {
      const consentsString = localStorage.getItem("cookieConsents")
      if (consentsString) {
        const consents = JSON.parse(consentsString)
        setAnalyticsStatus(consents.analytics ? "Akzeptiert" : "Abgelehnt")
        setMarketingStatus(consents.marketing ? "Akzeptiert" : "Abgelehnt")
      } else {
        setAnalyticsStatus("Nicht gesetzt")
        setMarketingStatus("Nicht gesetzt")
      }
    } catch (error) {
      setAnalyticsStatus("Fehler beim Parsen")
      setMarketingStatus("Fehler beim Parsen")
    }

    // Prüfe, ob Google Analytics geladen ist
    setGaLoaded(!!window.gtag)

    // Prüfe, ob Twitter Pixel geladen ist
    setTwitterLoaded(!!window.twq)
  }, []) // Leeres Dependency-Array, damit der Effekt nur einmal ausgeführt wird

  const resetConsent = () => {
    localStorage.removeItem("cookieConsent")
    localStorage.removeItem("cookieConsents")
    localStorage.removeItem("consentTimestamp")
    window.location.reload()
  }

  const triggerTestEvent = () => {
    if (window.gtag) {
      window.gtag("event", "test_event", {
        event_category: "testing",
        event_label: "manual_test",
        value: 1,
      })
      alert("Test-Event an Google Analytics gesendet!")
    } else {
      alert("Google Analytics ist nicht geladen!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Tracking-Test</h1>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="text-lg font-semibold mb-2">Consent-Status</h2>
            <p>
              <strong>Cookie-Consent:</strong> {consentStatus}
            </p>
            <p>
              <strong>Analytics-Consent:</strong> {analyticsStatus}
            </p>
            <p>
              <strong>Marketing-Consent:</strong> {marketingStatus}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="text-lg font-semibold mb-2">Skript-Status</h2>
            <p>
              <strong>Google Analytics:</strong>{" "}
              <span className={gaLoaded ? "text-green-600" : "text-red-600"}>
                {gaLoaded ? "Geladen ✓" : "Nicht geladen ✗"}
              </span>
            </p>
            <p>
              <strong>Twitter Pixel:</strong>{" "}
              <span className={twitterLoaded ? "text-green-600" : "text-red-600"}>
                {twitterLoaded ? "Geladen ✓" : "Nicht geladen ✗"}
              </span>
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="text-lg font-semibold mb-2">Test-Aktionen</h2>
            <div className="flex gap-4">
              <button onClick={resetConsent} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Consent zurücksetzen
              </button>
              <button
                onClick={triggerTestEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!gaLoaded}
              >
                Test-Event senden
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="text-lg font-semibold mb-2">Debugging</h2>
            <p>Öffne die Browser-Konsole (F12), um Debug-Ausgaben zu sehen.</p>
            <p>Prüfe im Network-Tab, ob die Skripte geladen werden.</p>
            <p>Prüfe im Application-Tab unter Local Storage die gespeicherten Consent-Werte.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
