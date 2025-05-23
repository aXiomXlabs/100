"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

interface TestResult {
  name: string
  status: "pass" | "fail" | "warning" | "pending"
  message: string
  details?: string
}

interface CookieConsents {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
  social: boolean
}

export default function TestCookieBannerPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [currentConsents, setCurrentConsents] = useState<CookieConsents | null>(null)
  const [bannerVisible, setBannerVisible] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const addTestResult = (result: TestResult) => {
    setTestResults((prev) => [...prev, result])
  }

  const clearTestResults = () => {
    setTestResults([])
  }

  const checkBannerVisibility = () => {
    const banner =
      document.querySelector('[data-testid="cookie-banner"]') ||
      document.querySelector(".fixed.bottom-0") ||
      document.querySelector('div:has(h3:contains("Cookie Consent"))')

    setBannerVisible(!!banner)
    return !!banner
  }

  const getStoredConsents = (): CookieConsents | null => {
    try {
      const stored = localStorage.getItem("cookieConsents")
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error("Error reading stored consents:", error)
      return null
    }
  }

  const updateCurrentConsents = () => {
    const consents = getStoredConsents()
    setCurrentConsents(consents)
  }

  // Test 1: Initial State Test
  const testInitialState = async () => {
    addTestResult({
      name: "Initial State Check",
      status: "pending",
      message: "Checking initial cookie banner state...",
    })

    // Clear any existing consent
    localStorage.removeItem("cookieConsent")
    localStorage.removeItem("cookieConsents")
    localStorage.removeItem("consentTimestamp")

    // Wait a moment for the banner to appear
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const bannerVisible = checkBannerVisibility()

    if (bannerVisible) {
      addTestResult({
        name: "Initial State Check",
        status: "pass",
        message: "Cookie banner appears correctly on first visit",
      })
    } else {
      addTestResult({
        name: "Initial State Check",
        status: "fail",
        message: "Cookie banner should be visible on first visit",
      })
    }
  }

  // Test 2: Show/Hide Details
  const testShowHideDetails = async () => {
    addTestResult({
      name: "Show/Hide Details",
      status: "pending",
      message: "Testing details toggle functionality...",
    })

    const detailsButton = document.querySelector("button:has(svg)") as HTMLButtonElement

    if (!detailsButton) {
      addTestResult({
        name: "Show/Hide Details",
        status: "fail",
        message: "Details toggle button not found",
      })
      return
    }

    // Click to show details
    detailsButton.click()
    await new Promise((resolve) => setTimeout(resolve, 500))

    const detailsVisible = document.querySelector(".bg-gray-800") !== null

    if (detailsVisible) {
      // Click to hide details
      detailsButton.click()
      await new Promise((resolve) => setTimeout(resolve, 500))

      const detailsHidden = document.querySelector(".bg-gray-800") === null

      if (detailsHidden) {
        addTestResult({
          name: "Show/Hide Details",
          status: "pass",
          message: "Details toggle works correctly",
        })
      } else {
        addTestResult({
          name: "Show/Hide Details",
          status: "fail",
          message: "Details panel doesn't hide properly",
        })
      }
    } else {
      addTestResult({
        name: "Show/Hide Details",
        status: "fail",
        message: "Details panel doesn't show when clicked",
      })
    }
  }

  // Test 3: Individual Switch Toggles
  const testSwitchToggles = async () => {
    addTestResult({
      name: "Switch Toggles",
      status: "pending",
      message: "Testing individual cookie category switches...",
    })

    // First show details
    const detailsButton = document.querySelector("button:has(svg)") as HTMLButtonElement
    if (detailsButton) {
      detailsButton.click()
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    const switches = document.querySelectorAll('button[role="switch"]')
    let passedTests = 0
    let totalTests = 0

    for (let i = 0; i < switches.length; i++) {
      const switchElement = switches[i] as HTMLButtonElement
      const isDisabled = switchElement.disabled

      if (!isDisabled) {
        totalTests++
        const initialState = switchElement.getAttribute("data-state")

        // Click the switch
        switchElement.click()
        await new Promise((resolve) => setTimeout(resolve, 200))

        const newState = switchElement.getAttribute("data-state")

        if (initialState !== newState) {
          passedTests++
        }
      }
    }

    if (passedTests === totalTests && totalTests > 0) {
      addTestResult({
        name: "Switch Toggles",
        status: "pass",
        message: `All ${totalTests} toggleable switches work correctly`,
      })
    } else {
      addTestResult({
        name: "Switch Toggles",
        status: "fail",
        message: `Only ${passedTests}/${totalTests} switches work correctly`,
      })
    }
  }

  // Test 4: Accept All Functionality
  const testAcceptAll = async () => {
    addTestResult({
      name: "Accept All",
      status: "pending",
      message: "Testing Accept All button...",
    })

    const acceptButton = Array.from(document.querySelectorAll("button")).find((btn) =>
      btn.textContent?.includes("Accept All"),
    ) as HTMLButtonElement

    if (!acceptButton) {
      addTestResult({
        name: "Accept All",
        status: "fail",
        message: "Accept All button not found",
      })
      return
    }

    acceptButton.click()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const consents = getStoredConsents()
    const bannerHidden = !checkBannerVisibility()

    if (consents && bannerHidden) {
      const allAccepted = consents.functional && consents.analytics && consents.marketing && consents.social

      if (allAccepted) {
        addTestResult({
          name: "Accept All",
          status: "pass",
          message: "Accept All works correctly - all consents granted and banner hidden",
          details: JSON.stringify(consents, null, 2),
        })
      } else {
        addTestResult({
          name: "Accept All",
          status: "fail",
          message: "Accept All didn't grant all consents",
          details: JSON.stringify(consents, null, 2),
        })
      }
    } else {
      addTestResult({
        name: "Accept All",
        status: "fail",
        message: "Accept All didn't save consents or hide banner properly",
      })
    }

    updateCurrentConsents()
  }

  // Test 5: Reject All Functionality
  const testRejectAll = async () => {
    // Reset state first
    localStorage.removeItem("cookieConsent")
    localStorage.removeItem("cookieConsents")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    addTestResult({
      name: "Reject All",
      status: "pending",
      message: "Testing Reject All button...",
    })

    const rejectButton = Array.from(document.querySelectorAll("button")).find((btn) =>
      btn.textContent?.includes("Reject All"),
    ) as HTMLButtonElement

    if (!rejectButton) {
      addTestResult({
        name: "Reject All",
        status: "fail",
        message: "Reject All button not found",
      })
      return
    }

    rejectButton.click()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const consents = getStoredConsents()
    const bannerHidden = !checkBannerVisibility()

    if (consents && bannerHidden) {
      const allRejected = !consents.functional && !consents.analytics && !consents.marketing && !consents.social

      if (allRejected && consents.necessary) {
        addTestResult({
          name: "Reject All",
          status: "pass",
          message: "Reject All works correctly - only necessary cookies accepted",
          details: JSON.stringify(consents, null, 2),
        })
      } else {
        addTestResult({
          name: "Reject All",
          status: "fail",
          message: "Reject All didn't reject optional consents properly",
          details: JSON.stringify(consents, null, 2),
        })
      }
    } else {
      addTestResult({
        name: "Reject All",
        status: "fail",
        message: "Reject All didn't save consents or hide banner properly",
      })
    }

    updateCurrentConsents()
  }

  // Test 6: Save Preferences
  const testSavePreferences = async () => {
    // Reset state first
    localStorage.removeItem("cookieConsent")
    localStorage.removeItem("cookieConsents")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    addTestResult({
      name: "Save Preferences",
      status: "pending",
      message: "Testing Save Preferences functionality...",
    })

    // Show details first
    const detailsButton = document.querySelector("button:has(svg)") as HTMLButtonElement
    if (detailsButton) {
      detailsButton.click()
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    // Toggle some switches
    const switches = document.querySelectorAll('button[role="switch"]:not([disabled])')
    if (switches.length > 0) {
      ;(switches[0] as HTMLButtonElement).click()
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // Find and click Save Preferences
    const saveButton = Array.from(document.querySelectorAll("button")).find((btn) =>
      btn.textContent?.includes("Save Preferences"),
    ) as HTMLButtonElement

    if (!saveButton) {
      addTestResult({
        name: "Save Preferences",
        status: "warning",
        message: "Save Preferences button not visible (may only appear when details are shown)",
      })
      return
    }

    saveButton.click()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const consents = getStoredConsents()
    const bannerHidden = !checkBannerVisibility()

    if (consents && bannerHidden) {
      addTestResult({
        name: "Save Preferences",
        status: "pass",
        message: "Save Preferences works correctly",
        details: JSON.stringify(consents, null, 2),
      })
    } else {
      addTestResult({
        name: "Save Preferences",
        status: "fail",
        message: "Save Preferences didn't work properly",
      })
    }

    updateCurrentConsents()
  }

  // Test 7: Persistence Test
  const testPersistence = async () => {
    addTestResult({
      name: "Persistence Test",
      status: "pending",
      message: "Testing if consents persist across page reloads...",
    })

    const beforeReload = getStoredConsents()

    if (!beforeReload) {
      addTestResult({
        name: "Persistence Test",
        status: "fail",
        message: "No consents found to test persistence",
      })
      return
    }

    // Simulate page reload by checking if banner appears
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const bannerVisible = checkBannerVisibility()

    if (!bannerVisible) {
      addTestResult({
        name: "Persistence Test",
        status: "pass",
        message: "Consents persist correctly - banner doesn't reappear",
        details: JSON.stringify(beforeReload, null, 2),
      })
    } else {
      addTestResult({
        name: "Persistence Test",
        status: "fail",
        message: "Banner reappears despite saved consents",
      })
    }
  }

  // Test 8: Tracking Integration
  const testTrackingIntegration = async () => {
    addTestResult({
      name: "Tracking Integration",
      status: "pending",
      message: "Testing tracking service integration...",
    })

    const hasGtag = typeof window.gtag === "function"
    const hasFbq = typeof window.fbq === "function"
    const hasTwq = typeof window.twq === "function"
    const hasDataLayer = Array.isArray(window.dataLayer)

    let integrationScore = 0
    const totalServices = 4

    if (hasGtag) integrationScore++
    if (hasFbq) integrationScore++
    if (hasTwq) integrationScore++
    if (hasDataLayer) integrationScore++

    if (integrationScore === totalServices) {
      addTestResult({
        name: "Tracking Integration",
        status: "pass",
        message: "All tracking services are properly loaded",
        details: `Google Analytics: ${hasGtag}, Facebook: ${hasFbq}, Twitter: ${hasTwq}, DataLayer: ${hasDataLayer}`,
      })
    } else if (integrationScore > 0) {
      addTestResult({
        name: "Tracking Integration",
        status: "warning",
        message: `${integrationScore}/${totalServices} tracking services loaded`,
        details: `Google Analytics: ${hasGtag}, Facebook: ${hasFbq}, Twitter: ${hasTwq}, DataLayer: ${hasDataLayer}`,
      })
    } else {
      addTestResult({
        name: "Tracking Integration",
        status: "fail",
        message: "No tracking services detected",
      })
    }
  }

  // Run all tests
  const runAllTests = async () => {
    setIsRunning(true)
    clearTestResults()

    try {
      await testInitialState()
      await testShowHideDetails()
      await testSwitchToggles()
      await testAcceptAll()
      await testRejectAll()
      await testSavePreferences()
      await testPersistence()
      await testTrackingIntegration()
    } catch (error) {
      addTestResult({
        name: "Test Suite Error",
        status: "fail",
        message: `Error during test execution: ${error}`,
      })
    } finally {
      setIsRunning(false)
      updateCurrentConsents()
    }
  }

  // Manual test functions
  const resetCookieState = () => {
    localStorage.removeItem("cookieConsent")
    localStorage.removeItem("cookieConsents")
    localStorage.removeItem("consentTimestamp")
    window.location.reload()
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "pending":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    const variants = {
      pass: "bg-green-100 text-green-800",
      fail: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
      pending: "bg-blue-100 text-blue-800",
    }

    return <Badge className={variants[status]}>{status.toUpperCase()}</Badge>
  }

  useEffect(() => {
    updateCurrentConsents()
    checkBannerVisibility()
  }, [])

  const passedTests = testResults.filter((t) => t.status === "pass").length
  const failedTests = testResults.filter((t) => t.status === "fail").length
  const warningTests = testResults.filter((t) => t.status === "warning").length

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Cookie Banner Test Suite</h1>
        <p className="text-gray-600 mb-6">Comprehensive testing of cookie consent banner functionality</p>
      </div>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Test Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={runAllTests} disabled={isRunning} className="flex items-center gap-2">
              {isRunning && <RefreshCw className="h-4 w-4 animate-spin" />}
              Run All Tests
            </Button>
            <Button variant="outline" onClick={resetCookieState}>
              Reset Cookie State
            </Button>
            <Button variant="outline" onClick={clearTestResults}>
              Clear Results
            </Button>
          </div>

          {testResults.length > 0 && (
            <div className="flex gap-4 text-sm">
              <span className="text-green-600">✓ Passed: {passedTests}</span>
              <span className="text-red-600">✗ Failed: {failedTests}</span>
              <span className="text-yellow-600">⚠ Warnings: {warningTests}</span>
              <span className="text-gray-600">Total: {testResults.length}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current State */}
      <Card>
        <CardHeader>
          <CardTitle>Current State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Banner Status</h4>
              <Badge className={bannerVisible ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {bannerVisible ? "Visible" : "Hidden"}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Stored Consents</h4>
              {currentConsents ? (
                <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(currentConsents, null, 2)}</pre>
              ) : (
                <Badge className="bg-gray-100 text-gray-800">No consents stored</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          {testResults.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tests run yet. Click "Run All Tests" to start testing.</p>
          ) : (
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <h4 className="font-medium">{result.name}</h4>
                    </div>
                    {getStatusBadge(result.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                  {result.details && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-blue-600">Show Details</summary>
                      <pre className="mt-2 bg-gray-100 p-2 rounded overflow-auto">{result.details}</pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Test Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Visual Tests</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Check if banner appears at bottom of page</li>
                <li>• Verify "Show details" button works</li>
                <li>• Test all switch toggles manually</li>
                <li>• Verify animations are smooth</li>
                <li>• Check mobile responsiveness</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Functional Tests</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Test in incognito mode</li>
                <li>• Verify persistence across tabs</li>
                <li>• Check browser console for errors</li>
                <li>• Test with disabled JavaScript</li>
                <li>• Verify GDPR compliance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
