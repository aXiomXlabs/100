import { type NextRequest, NextResponse } from "next/server"

interface PerformanceData {
  metric: string
  value: number
  url: string
  timestamp: number
  userAgent: string
  connection: string
}

// In-memory storage for demo (use database in production)
const performanceData: PerformanceData[] = []

export async function POST(request: NextRequest) {
  try {
    const data: PerformanceData = await request.json()

    // Validate data
    if (!data.metric || typeof data.value !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    // Store performance data
    performanceData.push({
      ...data,
      timestamp: Date.now(),
    })

    // Keep only last 1000 entries
    if (performanceData.length > 1000) {
      performanceData.splice(0, performanceData.length - 1000)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Performance tracking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const metric = searchParams.get("metric")
  const hours = Number.parseInt(searchParams.get("hours") || "24")

  const cutoff = Date.now() - hours * 60 * 60 * 1000
  let filteredData = performanceData.filter((d) => d.timestamp > cutoff)

  if (metric) {
    filteredData = filteredData.filter((d) => d.metric === metric)
  }

  // Calculate statistics
  const stats = {
    count: filteredData.length,
    average: filteredData.length > 0 ? filteredData.reduce((sum, d) => sum + d.value, 0) / filteredData.length : 0,
    median:
      filteredData.length > 0
        ? filteredData.sort((a, b) => a.value - b.value)[Math.floor(filteredData.length / 2)]?.value || 0
        : 0,
    p95:
      filteredData.length > 0
        ? filteredData.sort((a, b) => a.value - b.value)[Math.floor(filteredData.length * 0.95)]?.value || 0
        : 0,
    data: filteredData.slice(-100), // Last 100 entries
  }

  return NextResponse.json(stats)
}
