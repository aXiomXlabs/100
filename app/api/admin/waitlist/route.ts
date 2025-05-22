import { type NextRequest, NextResponse } from "next/server"
import { getWaitlistEntries } from "@/lib/waitlist"

export async function GET(request: NextRequest) {
  try {
    // Basic auth check (in a real app, you would use a more secure authentication method)
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const source = searchParams.get("source")
    const search = searchParams.get("search")

    // Get waitlist entries from our utility function
    const { entries, total, totalPages } = await getWaitlistEntries(page, limit, {
      source,
      search: search || undefined,
    })

    // Generate some mock source stats
    const sourceStats = [
      { referral_source: "direct", count: 15 },
      { referral_source: "twitter", count: 8 },
      { referral_source: "telegram_group", count: 12 },
      { referral_source: "discord", count: 5 },
      { referral_source: "friend", count: 3 },
    ]

    // Generate some mock time stats
    const today = new Date()
    const signupsByDay = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      return {
        date: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 5) + 1,
      }
    }).reverse()

    return NextResponse.json({
      data: entries,
      total,
      page,
      limit,
      totalPages,
      sourceStats,
      signupsByDay,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Basic auth check
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    // Get entries from localStorage
    if (typeof window !== "undefined") {
      const entriesJson = localStorage.getItem("waitlistEntries") || "[]"
      let entries = JSON.parse(entriesJson)

      // Filter out the entry to delete
      entries = entries.filter((entry: any) => entry.id !== id)

      // Save back to localStorage
      localStorage.setItem("waitlistEntries", JSON.stringify(entries))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
