"use client"

interface PerformanceMetrics {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
  url: string
  timestamp: number
  userAgent: string
  connection?: string
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    url: typeof window !== "undefined" ? window.location.href : "",
    timestamp: Date.now(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  }

  constructor() {
    if (typeof window === "undefined") return

    this.initializeObservers()
    this.measureTTFB()
    this.measureFCP()
  }

  private initializeObservers() {
    // Largest Contentful Paint (LCP)
    if ("PerformanceObserver" in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          this.metrics.lcp = lastEntry.startTime
          this.reportMetric("lcp", lastEntry.startTime)
        })
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })
      } catch (e) {
        console.warn("LCP observer not supported")
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            this.metrics.fid = entry.processingStart - entry.startTime
            this.reportMetric("fid", entry.processingStart - entry.startTime)
          })
        })
        fidObserver.observe({ entryTypes: ["first-input"] })
      } catch (e) {
        console.warn("FID observer not supported")
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          this.metrics.cls = clsValue
          this.reportMetric("cls", clsValue)
        })
        clsObserver.observe({ entryTypes: ["layout-shift"] })
      } catch (e) {
        console.warn("CLS observer not supported")
      }
    }
  }

  private measureTTFB() {
    if (typeof window === "undefined") return

    try {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart
        this.reportMetric("ttfb", this.metrics.ttfb)
      }
    } catch (e) {
      console.warn("TTFB measurement failed")
    }
  }

  private measureFCP() {
    if (typeof window === "undefined") return

    try {
      const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0]
      if (fcpEntry) {
        this.metrics.fcp = fcpEntry.startTime
        this.reportMetric("fcp", fcpEntry.startTime)
      }
    } catch (e) {
      console.warn("FCP measurement failed")
    }
  }

  private reportMetric(name: string, value: number) {
    // Report to analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "web_vitals", {
        event_category: "Performance",
        event_label: name.toUpperCase(),
        value: Math.round(value),
        custom_map: {
          metric_name: name,
          metric_value: value,
        },
      })
    }

    // Report to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`🚀 Performance Metric - ${name.toUpperCase()}: ${Math.round(value)}ms`)
    }

    // Send to monitoring endpoint
    this.sendToMonitoring(name, value)
  }

  private async sendToMonitoring(name: string, value: number) {
    try {
      await fetch("/api/performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metric: name,
          value,
          url: this.metrics.url,
          timestamp: this.metrics.timestamp,
          userAgent: this.metrics.userAgent,
          connection: (navigator as any)?.connection?.effectiveType || "unknown",
        }),
      })
    } catch (e) {
      // Silently fail - don't impact user experience
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  public getCoreWebVitalsScore(): { score: number; grade: string } {
    const { lcp, fid, cls } = this.metrics

    let score = 0
    let count = 0

    // LCP scoring (Good: <2.5s, Needs Improvement: 2.5-4s, Poor: >4s)
    if (lcp !== undefined) {
      if (lcp < 2500) score += 100
      else if (lcp < 4000) score += 75
      else score += 25
      count++
    }

    // FID scoring (Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms)
    if (fid !== undefined) {
      if (fid < 100) score += 100
      else if (fid < 300) score += 75
      else score += 25
      count++
    }

    // CLS scoring (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (cls !== undefined) {
      if (cls < 0.1) score += 100
      else if (cls < 0.25) score += 75
      else score += 25
      count++
    }

    const finalScore = count > 0 ? score / count : 0
    let grade = "F"
    if (finalScore >= 90) grade = "A"
    else if (finalScore >= 80) grade = "B"
    else if (finalScore >= 70) grade = "C"
    else if (finalScore >= 60) grade = "D"

    return { score: Math.round(finalScore), grade }
  }
}

// Export singleton instance
export const performanceMonitor = typeof window !== "undefined" ? new PerformanceMonitor() : null

// Hook for React components
export function usePerformanceMonitoring() {
  return {
    getMetrics: () => performanceMonitor?.getMetrics() || {},
    getCoreWebVitalsScore: () => performanceMonitor?.getCoreWebVitalsScore() || { score: 0, grade: "N/A" },
  }
}
