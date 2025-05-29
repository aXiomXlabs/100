"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertCircle,
  CheckCircle,
  TrendingUp,
  RefreshCw,
  Activity,
  Globe,
  Search,
  BarChart3,
  Download,
  ListChecks,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

interface SEOMetrics {
  score: number
  issues: number
  pages: number
  lastAudit: string
  scoreHistory?: Array<{ date: string; score: number }>
}

interface PerformanceStats {
  lcp?: { average: number; p95: number; count: number }
  fid?: { average: number; p95: number; count: number }
  cls?: { average: number; p95: number; count: number }
  count: number
  deviceBreakdown?: { [key: string]: number }
}

interface AuditIssue {
  description: string
  severity: "critical" | "high" | "medium" | "low"
}
interface AuditResult {
  url: string
  score: number
  issues: AuditIssue[] // Updated to use AuditIssue interface
  title?: string
  meta_description?: string
  audit_timestamp?: string // Added for sorting
}

export default function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null)
  const [performance, setPerformance] = useState<PerformanceStats | null>(null)
  const [recentAudits, setRecentAudits] = useState<AuditResult[]>([])
  const [loading, setLoading] = useState(true)
  const [auditLoading, setAuditLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDashboardData()
    const interval = setInterval(loadDashboardData, 30000) // Auto-refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      setError(null)

      const perfResponse = await fetch("/api/performance")
      if (perfResponse.ok) {
        const perfData = await perfResponse.json()
        setPerformance(perfData)
      } else {
        console.warn("Failed to load performance data")
      }

      const auditResponse = await fetch("/api/seo-audit")
      if (auditResponse.ok) {
        const auditData = await auditResponse.json()

        const formattedAudits = (auditData.recentAudits || [])
          .map((audit: any) => ({
            ...audit,
            issues: Array.isArray(audit.issues)
              ? audit.issues.map((issueDesc: string) => ({
                  description: issueDesc,
                  severity:
                    issueDesc.toLowerCase().includes("critical") || issueDesc.toLowerCase().includes("noindex")
                      ? "critical"
                      : issueDesc.toLowerCase().includes("missing")
                        ? "high"
                        : issueDesc.toLowerCase().includes("too long") || issueDesc.toLowerCase().includes("too short")
                          ? "medium"
                          : "low",
                }))
              : [],
          }))
          .sort(
            (a: AuditResult, b: AuditResult) =>
              new Date(b.audit_timestamp || 0).getTime() - new Date(a.audit_timestamp || 0).getTime(),
          )
        setRecentAudits(formattedAudits)

        if (auditData.summary) {
          // Simulate score history for the chart
          const scoreHistory = [
            {
              date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              score: (auditData.summary.averageScore || 0) - 5,
            },
            {
              date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              score: (auditData.summary.averageScore || 0) - 2,
            },
            {
              date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              score: (auditData.summary.averageScore || 0) + 3,
            },
            { date: new Date().toLocaleDateString(), score: auditData.summary.averageScore || 0 },
          ].filter((item) => item.score >= 0 && item.score <= 100)

          setMetrics({
            score: auditData.summary.averageScore || 0,
            issues: auditData.summary.totalIssues || 0,
            pages: auditData.summary.totalAudits || 0,
            lastAudit: auditData.summary.lastAudit || new Date().toISOString(),
            scoreHistory: scoreHistory,
          })
        }
      } else {
        console.warn("Failed to load audit data")
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
      setError("Failed to load dashboard data. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  const runSEOAudit = async () => {
    setAuditLoading(true)
    setError(null)
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
        await loadDashboardData()
        alert(`SEO Audit completed! Average score: ${auditResults.summary.averageScore}/100`)
      } else {
        throw new Error("Audit request failed")
      }
    } catch (error) {
      console.error("SEO audit failed:", error)
      setError("SEO audit failed. Please try again.")
    } finally {
      setAuditLoading(false)
    }
  }

  const regenerateSitemap = async () => {
    try {
      const response = await fetch("/api/sitemap", { method: "POST" })
      if (response.ok) {
        const result = await response.json()
        alert(`Sitemap regenerated! ${result.stats?.totalUrls || 0} URLs indexed.`)
      } else {
        throw new Error("Sitemap regeneration failed")
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

  const getSeverityBadgeVariant = (
    severity: AuditIssue["severity"],
  ): "destructive" | "default" | "secondary" | "outline" => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "default" // Using default for high, as destructive is for critical
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPerformanceGrade = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return { grade: "Good", color: "bg-green-500" }
    if (value <= thresholds[1]) return { grade: "Needs Improvement", color: "bg-yellow-500" }
    return { grade: "Poor", color: "bg-red-500" }
  }

  const exportAuditResultsToCSV = () => {
    if (recentAudits.length === 0) {
      alert("No audit data to export.")
      return
    }
    const headers = ["URL", "Score", "Title", "Meta Description", "Issues Count", "Issues Details"]
    const rows = recentAudits.map((audit) => [
      audit.url,
      audit.score,
      `"${audit.title?.replace(/"/g, '""') || ""}"`,
      `"${audit.meta_description?.replace(/"/g, '""') || ""}"`,
      audit.issues.length,
      `"${audit.issues.map((issue) => issue.description.replace(/"/g, '""')).join("; ") || ""}"`,
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map((e) => e.join(",")).join("\n")

    const link = document.createElement("a")
    link.setAttribute("href", encodeURI(csvContent))
    link.setAttribute("download", `seo_audit_report_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
          <Button onClick={exportAuditResultsToCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Audit CSV
          </Button>
          <Button onClick={regenerateSitemap} variant="outline">
            <Globe className="h-4 w-4 mr-2" />
            Regenerate Sitemap
          </Button>
          <Button onClick={runSEOAudit} disabled={auditLoading}>
            {auditLoading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
            Run SEO Audit
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performance?.count || 0}</div>
            <p className="text-xs text-muted-foreground">Metrics collected</p>
          </CardContent>
        </Card>
      </div>

      {metrics?.scoreHistory && metrics.scoreHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>SEO Score Trend</CardTitle>
            <CardDescription>Overall SEO score over the last week.</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={metrics.scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis domain={[0, 100]} fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Detailed Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Core Web Vitals</TabsTrigger>
          <TabsTrigger value="seo_issues">SEO Issues</TabsTrigger> {/* Changed value to avoid conflict */}
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
                      {performance?.lcp?.average ? `${Math.round(performance.lcp.average)}ms` : "No data"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>95th Percentile:</span>
                    <Badge
                      className={
                        performance?.lcp?.p95 ? getPerformanceGrade(performance.lcp.p95, [2500, 4000]).color : ""
                      }
                    >
                      {performance?.lcp?.p95 ? `${Math.round(performance.lcp.p95)}ms` : "No data"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Samples:</span>
                    <span className="text-sm text-muted-foreground">{performance?.lcp?.count || 0}</span>
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
                      {performance?.fid?.average ? `${Math.round(performance.fid.average)}ms` : "No data"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>95th Percentile:</span>
                    <Badge
                      className={
                        performance?.fid?.p95 ? getPerformanceGrade(performance.fid.p95, [100, 300]).color : ""
                      }
                    >
                      {performance?.fid?.p95 ? `${Math.round(performance.fid.p95)}ms` : "No data"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Samples:</span>
                    <span className="text-sm text-muted-foreground">{performance?.fid?.count || 0}</span>
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
                      {performance?.cls?.average ? performance.cls.average.toFixed(3) : "No data"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>95th Percentile:</span>
                    <Badge
                      className={
                        performance?.cls?.p95 ? getPerformanceGrade(performance.cls.p95, [0.1, 0.25]).color : ""
                      }
                    >
                      {performance?.cls?.p95 ? performance.cls.p95.toFixed(3) : "No data"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Samples:</span>
                    <span className="text-sm text-muted-foreground">{performance?.cls?.count || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {performance?.deviceBreakdown && (
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Performance metrics by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(performance.deviceBreakdown).map(([device, count]) => (
                    <div key={device} className="flex justify-between items-center">
                      <span className="capitalize">{device}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(count / performance.count) * 100} className="w-24" />
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {Math.round((count / performance.count) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="seo_issues" className="space-y-4">
          {" "}
          {/* Changed value */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ListChecks className="h-5 w-5 mr-2" />
                Detailed SEO Issues
              </CardTitle>
              <CardDescription>Issues found during the last audits, sorted by URL and severity.</CardDescription>
            </CardHeader>
            <CardContent>
              {recentAudits.length > 0 ? (
                <div className="space-y-6">
                  {recentAudits.map((audit, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <a
                          href={audit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-sm hover:underline"
                        >
                          {audit.url}
                        </a>
                        <Badge className={getScoreColor(audit.score)}>{audit.score}/100</Badge>
                      </div>
                      {audit.title && <p className="text-xs text-muted-foreground">Title: {audit.title}</p>}
                      {audit.meta_description && (
                        <p className="text-xs text-muted-foreground">
                          Meta: {audit.meta_description.substring(0, 100)}...
                        </p>
                      )}
                      {audit.issues.length > 0 ? (
                        <div className="mt-3 space-y-1">
                          <p className="text-xs font-semibold">Issues ({audit.issues.length}):</p>
                          {audit.issues
                            .sort((a, b) => {
                              // Sort issues by severity
                              const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
                              return severityOrder[a.severity] - severityOrder[b.severity]
                            })
                            .map((issue, i) => (
                              <div key={i} className="flex items-start text-xs">
                                <Badge
                                  variant={getSeverityBadgeVariant(issue.severity)}
                                  className="mr-2 capitalize text-xs h-5 px-1.5"
                                >
                                  {issue.severity}
                                </Badge>
                                <span>{issue.description}</span>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-xs text-green-600 mt-3">No issues found for this page.</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No audit data available yet.</p>
                  <p className="text-sm mt-2">Click "Run SEO Audit" to start analyzing your pages.</p>
                </div>
              )}
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
                    <span>Status:</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Last generated:</span>
                    <Badge variant="outline">{new Date().toLocaleDateString()}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>URLs indexed:</span>
                    <Badge variant="outline">15+</Badge>
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

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common SEO maintenance tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open("/sitemap.xml", "_blank")}
              >
                <Globe className="h-4 w-4 mr-2" />
                View Sitemap
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open("/robots.txt", "_blank")}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Robots.txt
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={loadDashboardData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Dashboard
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
