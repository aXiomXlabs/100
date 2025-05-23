"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { trackEvent, trackWaitlistSignup, trackPageView } from "@/lib/tracking"

export default function TestGoogleTrackingPage() {
  const [trackingStatus, setTrackingStatus] = useState({
    gtag: false,
    dataLayer: false,
    gtm: false,
    consent: false,
  })
  const [events, setEvents] = useState<any[]>([])
  const [testResults, setTestResults] = useState<any[]>([])

  useEffect(() => {
    // Check tracking status
    const checkStatus = () => {
      const status = {
        gtag: typeof window.gtag === "function",
        dataLayer: Array.isArray(window.dataLayer),
        gtm: window.dataLayer?.some((item: any) => item.event === "gtm.js"),
        consent: localStorage.getItem("cookieConsent") === "true",
      }
      setTrackingStatus(status)
    }

    checkStatus()

    // Monitor dataLayer events
    if (window.dataLayer) {
      const originalPush = window.dataLayer.push
      window.dataLayer.push = function (...args: any[]) {
        setEvents((prev) => [...prev, ...args])
        return originalPush.apply(this, args)
      }
    }

    // Track page view for this test page
    trackPageView("/test-google-tracking", "Google Tracking Test Page")
  }, [])

  const runTest = async (testName: string, testFunction: () => Promise<boolean>) => {
    try {
      const result = await testFunction()
      setTestResults((prev) => [
        ...prev,
        {
          name: testName,
          status: result ? "✅ PASS" : "❌ FAIL",
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
      return result
    } catch (error) {
      setTestResults((prev) => [
        ...prev,
        {
          name: testName,
          status: `❌ ERROR: ${error}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
      return false
    }
  }

  const testBasicTracking = () =>
    runTest("Basic Event Tracking", async () => {
      trackEvent({
        event: "test_basic_event",
        category: "testing",
        action: "basic_test",
        label: "test_label",
        value: 1,
      })
      return true
    })

  const testWaitlistTracking = () =>
    runTest("Waitlist Signup Tracking", async () => {
      trackWaitlistSignup("test@example.com", "test_page")
      return true
    })

  const testConversionTracking = () =>
    runTest("Conversion Tracking", async () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
          value: 1,
          currency: "USD",
          transaction_id: `test_${Date.now()}`,
        })
        return true
      }
      return false
    })

  const testEnhancedEcommerce = () =>
    runTest("Enhanced Ecommerce", async () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "purchase", {
          transaction_id: `test_purchase_${Date.now()}`,
          value: 99.99,
          currency: "USD",
          items: [
            {
              item_id: "rust_rocket_bot",
              item_name: "Rust Rocket Bot License",
              category: "software",
              quantity: 1,
              price: 99.99,
            },
          ],
        })
        return true
      }
      return false
    })

  const testCustomDimensions = () =>
    runTest("Custom Dimensions", async () => {
      trackEvent({
        event: "custom_dimension_test",
        category: "testing",
        custom_parameter_1: "test_value_1",
        custom_parameter_2: "test_value_2",
        user_type: "test_user",
        traffic_source: "test_source",
      })
      return true
    })

  const runAllTests = async () => {
    setTestResults([])
    await testBasicTracking()
    await testWaitlistTracking()
    await testConversionTracking()
    await testEnhancedEcommerce()
    await testCustomDimensions()
  }

  const clearEvents = () => {
    setEvents([])
    setTestResults([])
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Google Tracking Test Dashboard</h1>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Google Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={trackingStatus.gtag ? "default" : "destructive"}>
              {trackingStatus.gtag ? "✅ Loaded" : "❌ Not Loaded"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">DataLayer</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={trackingStatus.dataLayer ? "default" : "destructive"}>
              {trackingStatus.dataLayer ? "✅ Active" : "❌ Inactive"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">GTM</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={trackingStatus.gtm ? "default" : "destructive"}>
              {trackingStatus.gtm ? "✅ Loaded" : "❌ Not Loaded"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Consent</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={trackingStatus.consent ? "default" : "destructive"}>
              {trackingStatus.consent ? "✅ Granted" : "❌ Denied"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Tracking Tests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={testBasicTracking}>Test Basic Event</Button>
            <Button onClick={testWaitlistTracking}>Test Waitlist Signup</Button>
            <Button onClick={testConversionTracking}>Test Conversion</Button>
            <Button onClick={testEnhancedEcommerce}>Test Enhanced Ecommerce</Button>
            <Button onClick={testCustomDimensions}>Test Custom Dimensions</Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={runAllTests} variant="default">
              Run All Tests
            </Button>
            <Button onClick={clearEvents} variant="outline">
              Clear Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">{result.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{result.timestamp}</span>
                    <span>{result.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* DataLayer Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent DataLayer Events ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {events.slice(-10).map((event, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded text-xs">
                <pre>{JSON.stringify(event, null, 2)}</pre>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environment Info */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>GTM ID:</strong> {process.env.NEXT_PUBLIC_GTM_ID || "Not set"}
            </div>
            <div>
              <strong>FB Pixel ID:</strong> {process.env.NEXT_PUBLIC_FB_PIXEL_ID || "Not set"}
            </div>
            <div>
              <strong>Current URL:</strong> {typeof window !== "undefined" ? window.location.href : "Server side"}
            </div>
            <div>
              <strong>User Agent:</strong>{" "}
              {typeof window !== "undefined" ? window.navigator.userAgent.slice(0, 50) + "..." : "Server side"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
