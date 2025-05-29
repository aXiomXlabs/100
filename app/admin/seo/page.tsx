"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, TrendingUp, RefreshCw } from "lucide-react"

interface SEOMetrics {
  score: number
  issues: number
  pages: number
  lastAudit: string
}

interface PerformanceStats {
  lcp: { average: number; p95: number }
  fid: { average: number; p95: number }
  cls: { average: number; p95: number }
  count: number
}

export default function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null)
  const [performance, setPerformance] = useState<PerformanceStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [auditLoading, setAuditLoading] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Load performance data
      const perfResponse = await fetch("/api/performance")
      if (perfResponse.ok) {
        const perfData = await perfResponse.json()
        setPerformance(perfData)
      }

      // Simulate SEO metrics (in production, load from database)
      setMetrics({
        score: 87,
        issues: 12,
        pages: 15,
        lastAudit: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const runSEOAudit = async () => {
    setAuditLoading(true)
    try {
      const urls = [
        "https://rust-rocket.com",
        "https://rust-rocket.com/solana-sniper-bot",
        "https://rust-rocket.com/faq",
        "https://rust-rocket.com/blog",
        "https://rust-rocket.com/legal/privacy",
      ]

      const response = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      })

      if (response.ok) {
        const auditResults = await response.json()
        console.log("SEO Audit Results:", auditResults)

        // Update metrics with audit results
        setMetrics({
          score: Math.round(auditResults.summary.averageScore),
          issues: auditResults.summary.totalIssues,
          pages: auditResults.summary.totalPages,
          lastAudit: auditResults.timestamp,
        })
      }
    } catch (error) {
      console.error("SEO audit failed:", error)
    } finally {
      setAuditLoading(false)
    }
  }

  const regenerateSitemap = async () => {
    try {
      const response = await fetch("/api/sitemap", { method: "POST" })
      if (response.ok) {
        alert("Sitemap regenerated successfully!")
      }
    } catch (error) {
      console.error("Failed to regenerate sitemap:", error)
      alert("Failed to regenerate sitemap")
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getPerformanceGrade = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return { grade: "Good", color: "bg-green-500" }
    if (value <= thresholds[1]) return { grade: "Needs Improvement", color: "bg-yellow-500" }
    return { grade: "Poor", color: "bg-red-500" }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">SEO Dashboard</h1>
          <p className="text-gray-600">Monitor and optimize your website's SEO performance</p>
        </div>
        <div className="space-x-2">
          <Button onClick={regenerateSitemap} variant="outline">
            Regenerate Sitemap
          </Button>
          <Button onClick={runSEOAudit} disabled={auditLoading}>
            {auditLoading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : null}
            Run SEO Audit
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(metrics?.score || 0)}`}>{metrics?.score || 0}/100</div>
            <Progress value={metrics?.score || 0} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.issues || 0}</div>
            <p className="text-xs text-muted-foreground">Across {metrics?.pages || 0} pages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pages Audited</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.pages || 0}</div>
            <p className="text-xs text-muted-foreground">
              Last: {metrics?.lastAudit ? new Date(metrics.lastAudit).toLocaleDateString() : "Never"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Data</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performance?.count || 0}</div>
            <p className="text-xs text-muted-foreground">Metrics collected</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Core Web Vitals</TabsTrigger>
          <TabsTrigger value="seo">SEO Issues</TabsTrigger>
          <TabsTrigger value="technical">Technical SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Largest Contentful Paint (LCP)</CardTitle>
                <CardDescription>Loading performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average:</span>
                    <Badge variant="outline">
                      {performance?.lcp?.average ? `${Math.round(performance.lcp.average)}ms` : "N/A"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>95th Percentile:</span>
                    <Badge
                      className={
                        performance?.lcp?.p95 ? getPerformanceGrade(performance.lcp.p95, [2500, 4000]).color : ""
                      }
                    >
                      {performance?.lcp?.p95 ? `${Math.round(performance.lcp.p95)}ms` : "N/A"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>First Input Delay (FID)</CardTitle>
                <CardDescription>Interactivity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average:</span>
                    <Badge variant="outline">
                      {performance?.fid?.average ? `${Math.round(performance.fid.average)}ms` : "N/A"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>95th Percentile:</span>
                    <Badge
                      className={
                        performance?.fid?.p95 ? getPerformanceGrade(performance.fid.p95, [100, 300]).color : ""
                      }
                    >
                      {performance?.fid?.p95 ? `${Math.round(performance.fid.p95)}ms` : "N/A"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cumulative Layout Shift (CLS)</CardTitle>
                <CardDescription>Visual stability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average:</span>
                    <Badge variant="outline">
                      {performance?.cls?.average ? performance.cls.average.toFixed(3) : "N/A"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>95th Percentile:</span>
                    <Badge
                      className={
                        performance?.cls?.p95 ? getPerformanceGrade(performance.cls.p95, [0.1, 0.25]).color : ""
                      }
                    >
                      {performance?.cls?.p95 ? performance.cls.p95.toFixed(3) : "N/A"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common SEO Issues</CardTitle>
              <CardDescription>Issues found during the last audit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Missing meta descriptions</span>
                  <Badge variant="destructive">3 pages</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Images without alt text</span>
                  <Badge variant="destructive">5 images</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Long title tags</span>
                  <Badge variant="secondary">2 pages</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Missing canonical tags</span>
                  <Badge variant="secondary">1 page</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sitemap Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>URLs in sitemap:</span>
                    <Badge variant="outline">15</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Last updated:</span>
                    <Badge variant="outline">Today</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className="bg-green-500">Valid</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Robots.txt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className="bg-green-500">Valid</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Sitemap declared:</span>
                    <Badge className="bg-green-500">Yes</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Crawl delay:</span>
                    <Badge variant="outline">1s</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
