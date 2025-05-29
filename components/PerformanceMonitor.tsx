"use client"

import { useEffect } from "react"
import { performanceMonitor } from "@/lib/performance-monitoring"

export default function PerformanceMonitor() {
  useEffect(() => {
    // Performance monitoring is automatically initialized
    // This component just ensures it's loaded on every page

    // Optional: Log performance data in development
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        const metrics = performanceMonitor?.getMetrics()
        const score = performanceMonitor?.getCoreWebVitalsScore()

        if (metrics && score) {
          console.group("🚀 Performance Metrics")
          console.log("LCP:", metrics.lcp ? `${Math.round(metrics.lcp)}ms` : "N/A")
          console.log("FID:", metrics.fid ? `${Math.round(metrics.fid)}ms` : "N/A")
          console.log("CLS:", metrics.cls ? metrics.cls.toFixed(3) : "N/A")
          console.log("Core Web Vitals Score:", `${score.score}% (${score.grade})`)
          console.groupEnd()
        }
      }, 3000) // Wait 3 seconds for metrics to be collected
    }
  }, [])

  return null // This component doesn't render anything
}
