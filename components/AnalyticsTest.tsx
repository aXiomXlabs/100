"use client"

import { useEffect } from "react"

export default function AnalyticsTest() {
  useEffect(() => {
    // Sende ein Test-Event an Google Analytics
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      console.log("Sending test event to Google Analytics...")
      window.gtag("event", "analytics_test", {
        event_category: "testing",
        event_label: "analytics_test_event",
        value: 1,
        non_interaction: true,
      })
    } else {
      console.error("Google Analytics not loaded correctly")
    }
  }, [])

  return null // Diese Komponente rendert nichts
}
