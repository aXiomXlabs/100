"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestTrackingValidationPage() {
  const [status, setStatus] = useState({
    ga: false,
    twitter: false,
    facebook: false,
    utm: false,
  })
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logMessage = `[${timestamp}] ${message}`
    console.log(logMessage)
    setLogs((prev) => [...prev, logMessage])
  }

  useEffect(() => {
    addLog("Starting tracking validation...")

    if (typeof window !== "undefined") {
      // Check Google Analytics
      const gaLoaded = typeof window.gtag === "function"
      setStatus((prev) => ({ ...prev, ga: gaLoaded }))
      addLog(`Google Analytics: ${gaLoaded ? "✅ Loaded" : "❌ Not Loaded"}`)

      if (gaLoaded) {
        addLog("Google Analytics gtag function is available")
        // Test if dataLayer exists
        if (window.dataLayer) {
          addLog(`DataLayer exists with ${window.dataLayer.length} items`)
        } else {
          addLog("DataLayer not found")
        }
      }

      // Check Twitter
      const twitterLoaded = typeof window.twq === "function"
      setStatus((prev) => ({ ...prev, twitter: twitterLoaded }))
      addLog(`Twitter Pixel: ${twitterLoaded ? "✅ Loaded" : "❌ Not Loaded"}`)

      if (twitterLoaded) {
        addLog("Twitter twq function is available")
      }

      // Check Facebook
      const facebookLoaded = typeof window.fbq === "function"
      setStatus((prev) => ({ ...prev, facebook: facebookLoaded }))
      addLog(`Facebook Pixel: ${facebookLoaded ? "✅ Loaded" : "❌ Not Loaded"}`)

      if (facebookLoaded) {
        addLog("Facebook fbq function is available")
      }

      // Check UTM
      const utmSource = sessionStorage.getItem("utm_source")
      const utmMedium = sessionStorage.getItem("utm_medium")
      const utmCampaign = sessionStorage.getItem("utm_campaign")
      const hasUtm = utmSource !== null || utmMedium !== null || utmCampaign !== null

      setStatus((prev) => ({ ...prev, utm: hasUtm }))
      addLog(`UTM Parameters: ${hasUtm ? "✅ Found" : "❌ Not Found"}`)

      if (hasUtm) {
        addLog(`UTM Source: ${utmSource || "not set"}`)
        addLog(`UTM Medium: ${utmMedium || "not set"}`)
        addLog(`UTM Campaign: ${utmCampaign || "not set"}`)
      }

      // Check environment variables
      addLog(`Environment: ${process.env.NODE_ENV || "unknown"}`)

      // Check if scripts are loaded
      const scripts = document.querySelectorAll(
        'script[src*="gtag"], script[src*="uwt.js"], script[src*="fbevents.js"]',
      )
      addLog(`Found ${scripts.length} tracking scripts in DOM`)

      scripts.forEach((script, index) => {
        const src = script.getAttribute("src")
        addLog(`Script ${index + 1}: ${src}`)
      })
    }
  }, [])

  const testGoogleAnalytics = () => {
    addLog("Testing Google Analytics...")

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      try {
        // Enable debug mode
        window.gtag("config", process.env.NEXT_PUBLIC_GTM_ID || "GA_MEASUREMENT_ID", {
          debug_mode: true,
        })

        window.gtag("event", "test_event", {
          event_category: "testing",
          event_label: "GA4 Test",
          value: 1,
          debug_mode: true,
        })

        addLog("✅ Google Analytics test event sent successfully")
        addLog("Check Network tab for 'collect' requests to Google Analytics")

        // Also try to access dataLayer
        if (window.dataLayer) {
          addLog(`DataLayer now has ${window.dataLayer.length} items`)
          addLog(`Latest dataLayer entry: ${JSON.stringify(window.dataLayer[window.dataLayer.length - 1])}`)
        }
      } catch (error) {
        addLog(`❌ Error sending GA event: ${error}`)
      }
    } else {
      addLog("❌ Google Analytics gtag function not available")
    }
  }

  const testTwitterPixel = () => {
    addLog("Testing Twitter Pixel...")

    if (typeof window !== "undefined" && typeof window.twq === "function") {
      try {
        window.twq("event", "tw-pork0-pork2", {
          value: 1,
          status: "test",
        })
        addLog("✅ Twitter Pixel test event sent successfully")
        addLog("Check Network tab for requests to 'analytics.twitter.com'")
      } catch (error) {
        addLog(`❌ Error sending Twitter event: ${error}`)
      }
    } else {
      addLog("❌ Twitter Pixel twq function not available")
    }
  }

  const testFacebookPixel = () => {
    addLog("Testing Facebook Pixel...")

    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      try {
        window.fbq("track", "PageView", {
          test_event: true,
        })
        addLog("✅ Facebook Pixel test event sent successfully")
        addLog("Check Network tab for requests to 'facebook.com'")
      } catch (error) {
        addLog(`❌ Error sending Facebook event: ${error}`)
      }
    } else {
      addLog("❌ Facebook Pixel fbq function not available")
    }
  }

  const clearLogs = () => {
    setLogs([])
    addLog("Logs cleared")
  }

  const checkNetworkRequests = () => {
    addLog("To check network requests:")
    addLog("1. Open Browser DevTools (F12)")
    addLog("2. Go to Network tab")
    addLog("3. Filter by 'gtag', 'analytics', or 'facebook'")
    addLog("4. Send test events and watch for new requests")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Tracking Validation Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Google Analytics Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Status: {status.ga ? "✅ Loaded" : "❌ Not Loaded"}</span>
              <Button onClick={testGoogleAnalytics}>Test GA Event</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Twitter Pixel Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Status: {status.twitter ? "✅ Loaded" : "❌ Not Loaded"}</span>
              <Button onClick={testTwitterPixel}>Test Twitter Event</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Facebook Pixel Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Status: {status.facebook ? "✅ Loaded" : "❌ Not Loaded"}</span>
              <Button onClick={testFacebookPixel}>Test FB Event</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UTM Parameter Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Status: {status.utm ? "✅ UTM Parameters Found" : "❌ No UTM Parameters"}</span>
              <Button onClick={checkNetworkRequests}>Check Network</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Live Debug Logs</h2>
          <Button onClick={clearLogs} variant="outline">
            Clear Logs
          </Button>
        </div>
        <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-auto">
          {logs.length === 0 ? (
            <div>No logs yet...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Debug Information</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60 text-sm">
          {JSON.stringify(
            {
              status,
              userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "Server Side",
              url: typeof window !== "undefined" ? window.location.href : "Server Side",
              timestamp: new Date().toISOString(),
              gtmId: process.env.NEXT_PUBLIC_GTM_ID || "Not set",
              fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "Not set",
              cookieConsent: typeof window !== "undefined" ? localStorage.getItem("cookieConsent") : "Server Side",
            },
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  )
}
