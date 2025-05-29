import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

interface PerformanceData {
  metric_name: string
  metric_value: number
  url: string
  user_agent?: string
  connection_type?: string
  device_type?: string
  session_id?: string
  page_load_time?: number
}

export async function POST(request: NextRequest) {
  try {
    const data: PerformanceData = await request.json()

    // Validate data
    if (!data.metric_name || typeof data.metric_value !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    // Detect device type from user agent
    const userAgent = data.user_agent || ""
    const deviceType = /Mobile|Android|iPhone|iPad/.test(userAgent) ? "mobile" : "desktop"

    // Store performance data in Supabase
    const { error } = await supabase.from("performance_metrics").insert({
      metric_name: data.metric_name,
      metric_value: data.metric_value,
      url: data.url,
      user_agent: data.user_agent,
      connection_type: data.connection_type || "unknown",
      device_type: deviceType,
      session_id: data.session_id,
      page_load_time: data.page_load_time,
    })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Performance tracking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const metric = searchParams.get("metric")
    const hours = Number.parseInt(searchParams.get("hours") || "24")
    const url = searchParams.get("url")

    // Calculate time cutoff
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()

    // Build query
    let query = supabase
      .from("performance_metrics")
      .select("*")
      .gte("timestamp", cutoff)
      .order("timestamp", { ascending: false })

    if (metric) {
      query = query.eq("metric_name", metric)
    }

    if (url) {
      query = query.eq("url", url)
    }

    const { data: performanceData, error } = await query

    if (error) {
      console.error("Supabase query error:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    // Calculate statistics for each metric
    const metrics = ["lcp", "fid", "cls", "fcp", "ttfb"]
    const stats: any = {
      count: performanceData?.length || 0,
      timeRange: `${hours}h`,
      lastUpdated: new Date().toISOString(),
    }

    for (const metricName of metrics) {
      const metricData = performanceData?.filter((d) => d.metric_name === metricName) || []

      if (metricData.length > 0) {
        const values = metricData.map((d) => d.metric_value).sort((a, b) => a - b)

        stats[metricName] = {
          count: values.length,
          average: values.reduce((sum, val) => sum + val, 0) / values.length,
          median: values[Math.floor(values.length / 2)] || 0,
          p75: values[Math.floor(values.length * 0.75)] || 0,
          p95: values[Math.floor(values.length * 0.95)] || 0,
          min: values[0] || 0,
          max: values[values.length - 1] || 0,
        }
      } else {
        stats[metricName] = {
          count: 0,
          average: 0,
          median: 0,
          p75: 0,
          p95: 0,
          min: 0,
          max: 0,
        }
      }
    }

    // Add device breakdown
    const deviceBreakdown =
      performanceData?.reduce((acc: any, item) => {
        const device = item.device_type || "unknown"
        acc[device] = (acc[device] || 0) + 1
        return acc
      }, {}) || {}

    stats.deviceBreakdown = deviceBreakdown

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Performance API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
