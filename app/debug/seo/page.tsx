"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

interface HealthCheck {
  name: string
  status: "success" | "error" | "warning"
  message: string
  details?: any
}

export default function SEODebugPage() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([])
  const [loading, setLoading] = useState(false)

  const runHealthChecks = async () => {
    setLoading(true)
    const checks: HealthCheck[] = []

    // Test 1: Performance API
    try {
      const response = await fetch("/api/performance")
      const data = await response.json()
      checks.push({
        name: "Performance API",
        status: response.ok ? "success" : "error",
        message: response.ok ? "API responding correctly" : `HTTP ${response.status}`,
        details: data,
      })
    } catch (error) {
      checks.push({
        name: "Performance API",
        status: "error",
        message: `Connection failed: ${error}`,
      })
    }

    // Test 2: SEO Audit API
    try {
      const response = await fetch("/api/seo-audit")
      const data = await response.json()
      checks.push({
        name: "SEO Audit API",
        status: response.ok ? "success" : "error",
        message: response.ok ? "API responding correctly" : `HTTP ${response.status}`,
        details: data,
      })
    } catch (error) {
      checks.push({
        name: "SEO Audit API",
        status: "error",
        message: `Connection failed: ${error}`,
      })
    }

    // Test 3: Sitemap API
    try {
      const response = await fetch("/api/sitemap")
      checks.push({
        name: "Sitemap API",
        status: response.ok ? "success" : "error",
        message: response.ok ? "Sitemap accessible" : `HTTP ${response.status}`,
        details: response.ok ? "XML content available" : null,
      })
    } catch (error) {
      checks.push({
        name: "Sitemap API",
        status: "error",
        message: `Connection failed: ${error}`,
      })
    }

    // Test 4: Environment Variables
    const envVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

    const missingEnvVars = envVars.filter((varName) => !process.env[varName])
    checks.push({
      name: "Environment Variables",
      status: missingEnvVars.length === 0 ? "success" : "warning",
      message: missingEnvVars.length === 0 ? "All public env vars present" : `Missing: ${missingEnvVars.join(", ")}`,
      details: envVars.reduce(
        (acc, varName) => {
          acc[varName] = process.env[varName] ? "✓ Set" : "✗ Missing"
          return acc
        },
        {} as Record<string, string>,
      ),
    })

    // Test 5: Performance Monitor
    try {
      const { performanceMonitor } = await import("@/lib/performance-monitoring")
      const metrics = performanceMonitor?.getMetrics()
      checks.push({
        name: "Performance Monitor",
        status: metrics ? "success" : "warning",
        message: metrics ? "Performance monitoring active" : "Performance monitor not initialized",
        details: metrics,
      })
    } catch (error) {
      checks.push({
        name: "Performance Monitor",
        status: "error",
        message: `Failed to load: ${error}`,
      })
    }

    setHealthChecks(checks)
    setLoading(false)
  }

  useEffect(() => {
    runHealthChecks()
  }, [])

  const getStatusIcon = (status: HealthCheck["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: HealthCheck["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">OK</Badge>
      case "error":
        return <Badge variant="destructive">ERROR</Badge>
      case "warning":
        return <Badge variant="secondary">WARNING</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">SEO System Debug</h1>
          <p className="text-gray-600">Diagnose SEO dashboard and API health</p>
        </div>
        <Button onClick={runHealthChecks} disabled={loading}>
          {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Run Health Checks
        </Button>
      </div>

      <div className="grid gap-4">
        {healthChecks.map((check, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(check.status)}
                  <CardTitle className="text-lg">{check.name}</CardTitle>
                </div>
                {getStatusBadge(check.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{check.message}</p>
              {check.details && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium">Show Details</summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(check.details, null, 2)}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Debug-Tipps:</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Öffne die Browser-Konsole (F12) für detaillierte Fehlermeldungen</li>
            <li>• Prüfe Vercel Function Logs für Server-seitige Fehler</li>
            <li>• Stelle sicher, dass alle Supabase-Tabellen erstellt wurden</li>
            <li>• Überprüfe Umgebungsvariablen in Vercel Settings</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
