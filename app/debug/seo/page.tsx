"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, XCircle, RefreshCw, ExternalLink } from "lucide-react"

interface HealthCheck {
  name: string
  status: "success" | "warning" | "error" | "loading"
  message: string
  details?: any
}

export default function SEODebugPage() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runHealthChecks = async () => {
    setIsRunning(true)
    const checks: HealthCheck[] = []

    // Check 1: Environment Variables
    checks.push({
      name: "Environment Variables",
      status: "loading",
      message: "Checking environment variables...",
    })
    setHealthChecks([...checks])

    try {
      const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
      const hasSupabaseAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      checks[0] = {
        name: "Environment Variables",
        status: hasSupabaseUrl && hasSupabaseAnonKey ? "success" : "warning",
        message:
          hasSupabaseUrl && hasSupabaseAnonKey
            ? "All required environment variables are present"
            : "Some environment variables are missing",
        details: {
          NEXT_PUBLIC_SUPABASE_URL: hasSupabaseUrl ? "✅ Present" : "❌ Missing",
          NEXT_PUBLIC_SUPABASE_ANON_KEY: hasSupabaseAnonKey ? "✅ Present" : "❌ Missing",
        },
      }
    } catch (error) {
      checks[0] = {
        name: "Environment Variables",
        status: "error",
        message: "Error checking environment variables",
        details: error,
      }
    }
    setHealthChecks([...checks])

    // Check 2: Sitemap API
    checks.push({
      name: "Sitemap API",
      status: "loading",
      message: "Testing sitemap API...",
    })
    setHealthChecks([...checks])

    try {
      const response = await fetch("/api/sitemap")
      const isXML = response.headers.get("content-type")?.includes("xml")
      const sitemapSource = response.headers.get("x-sitemap-source")
      const urlCount = response.headers.get("x-sitemap-urls")

      checks[1] = {
        name: "Sitemap API",
        status: response.ok ? "success" : "error",
        message: response.ok
          ? `Sitemap API working (${urlCount} URLs, source: ${sitemapSource})`
          : `HTTP ${response.status}: ${response.statusText}`,
        details: {
          status: response.status,
          contentType: response.headers.get("content-type"),
          sitemapSource,
          urlCount,
          isXML,
        },
      }
    } catch (error) {
      checks[1] = {
        name: "Sitemap API",
        status: "error",
        message: "Failed to connect to sitemap API",
        details: error,
      }
    }
    setHealthChecks([...checks])

    // Check 3: Performance API
    checks.push({
      name: "Performance API",
      status: "loading",
      message: "Testing performance API...",
    })
    setHealthChecks([...checks])

    try {
      const response = await fetch("/api/performance")
      const data = await response.json()

      checks[2] = {
        name: "Performance API",
        status: response.ok ? "success" : "error",
        message: response.ok
          ? `Performance API working (${data.metrics?.length || 0} metrics)`
          : `HTTP ${response.status}: ${response.statusText}`,
        details: data,
      }
    } catch (error) {
      checks[2] = {
        name: "Performance API",
        status: "error",
        message: "Failed to connect to performance API",
        details: error,
      }
    }
    setHealthChecks([...checks])

    // Check 4: SEO Audit API
    checks.push({
      name: "SEO Audit API",
      status: "loading",
      message: "Testing SEO audit API...",
    })
    setHealthChecks([...checks])

    try {
      const response = await fetch("/api/seo-audit")
      const data = await response.json()

      checks[3] = {
        name: "SEO Audit API",
        status: response.ok ? "success" : "error",
        message: response.ok
          ? `SEO Audit API working (${data.issues?.length || 0} issues found)`
          : `HTTP ${response.status}: ${response.statusText}`,
        details: data,
      }
    } catch (error) {
      checks[3] = {
        name: "SEO Audit API",
        status: "error",
        message: "Failed to connect to SEO audit API",
        details: error,
      }
    }
    setHealthChecks([...checks])

    // Check 5: Sitemap File Access
    checks.push({
      name: "Sitemap File Access",
      status: "loading",
      message: "Testing direct sitemap file access...",
    })
    setHealthChecks([...checks])

    try {
      const response = await fetch("/sitemap.xml")
      const isXML = response.headers.get("content-type")?.includes("xml")

      checks[4] = {
        name: "Sitemap File Access",
        status: response.ok ? "success" : "warning",
        message: response.ok
          ? "Static sitemap.xml file is accessible"
          : "Static sitemap.xml file not found (using API fallback)",
        details: {
          status: response.status,
          contentType: response.headers.get("content-type"),
          isXML,
        },
      }
    } catch (error) {
      checks[4] = {
        name: "Sitemap File Access",
        status: "warning",
        message: "Static sitemap.xml file not accessible (using API fallback)",
        details: error,
      }
    }
    setHealthChecks([...checks])

    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "loading":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "default",
      warning: "secondary",
      error: "destructive",
      loading: "outline",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status.toUpperCase()}</Badge>
  }

  useEffect(() => {
    runHealthChecks()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">SEO Debug Dashboard</h1>
          <p className="text-gray-600">Comprehensive health checks for SEO and tracking systems</p>
        </div>

        <div className="mb-6 flex gap-4">
          <Button onClick={runHealthChecks} disabled={isRunning} className="flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "Running Checks..." : "Run Health Checks"}
          </Button>

          <Button variant="outline" asChild>
            <a href="/api/sitemap" target="_blank" className="flex items-center gap-2" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
              View Sitemap
            </a>
          </Button>

          <Button variant="outline" asChild>
            <a href="/admin/seo" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              SEO Dashboard
            </a>
          </Button>
        </div>

        <div className="space-y-4">
          {healthChecks.map((check, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(check.status)}
                    {check.name}
                  </CardTitle>
                  {getStatusBadge(check.status)}
                </div>
                <CardDescription>{check.message}</CardDescription>
              </CardHeader>
              {check.details && (
                <CardContent>
                  <details className="cursor-pointer">
                    <summary className="font-medium mb-2">View Details</summary>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                      {JSON.stringify(check.details, null, 2)}
                    </pre>
                  </details>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {healthChecks.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">Click "Run Health Checks" to start diagnostics</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Quick Fixes:</h3>
          <ul className="text-sm space-y-1">
            <li>• If environment variables are missing: Check Vercel → Settings → Environment Variables</li>
            <li>• If sitemap API fails: Check Vercel Function Logs for detailed error messages</li>
            <li>• If static sitemap.xml is missing: The API will provide a fallback version</li>
            <li>• After making changes: Redeploy your project in Vercel</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
